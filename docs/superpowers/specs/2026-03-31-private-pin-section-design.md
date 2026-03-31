# Seccion privada con PIN — Itinerario Japon 2026

## Contexto

El portfolio necesita una seccion oculta protegida por PIN para alojar un itinerario de viaje a Japon (HTML standalone con estetica momiji propia). Solo el propietario y su pareja deben poder acceder. La pagina no aparece en la navegacion publica — solo accesible por URL directa.

## Decisiones de diseno

| Decision | Eleccion | Motivo |
|----------|----------|--------|
| Seguridad | Moderada (server-side) | El contenido no llega al navegador sin PIN valido |
| Acceso | URL directa oculta | Sin enlace en navbar/footer |
| Diseno | Standalone (estetica momiji propia) | Conservar el look del HTML original |
| Sesion | Cookie httpOnly 24h | Comodo sin ser excesivo; cookie funcional exenta de consentimiento GDPR |

## Arquitectura

```
GET /es/private/japan-2026
        |
   Middleware
        |
  Cookie valida? ─── SI ──> Server Component renderiza itinerario HTML
        |
       NO
        |
  Redirect a /{locale}/private/login?redirect=/es/private/japan-2026
        |
  Formulario PIN (client component)
        |
  POST /api/pin/verify { pin }
        |
  PIN === PRIVATE_PIN? ─── SI ──> Set-Cookie: private_session (httpOnly, 24h)
        |                          Redirect a pagina original
       NO
        |
  Respuesta 401 + mensaje error
```

## Archivos a crear

### 1. `src/lib/pin-auth.ts` — Utilidad de autenticacion

Constantes y funciones compartidas:

- `COOKIE_NAME = "private_session"`
- `COOKIE_MAX_AGE = 86400` (24h en segundos)
- `createToken(pin: string): string` — Genera HMAC-SHA256 del timestamp actual usando `pin` como secreto. Retorna `timestamp.hmac` en base64url.
- `verifyToken(token: string, pin: string): boolean` — Extrae timestamp, recalcula HMAC, compara. Rechaza si el token tiene mas de 24h.

Usa `crypto` nativo de Node.js (sin dependencias externas).

### 2. `src/app/api/pin/verify/route.ts` — API Route

POST handler:
- Lee `pin` del body JSON
- Compara con `process.env.PRIVATE_PIN`
- Si correcto: crea token con `createToken()`, setea cookie httpOnly/secure/sameSite=strict con maxAge=24h, retorna 200
- Si incorrecto: retorna 401 con mensaje generico ("PIN incorrecto")

### 3. Reestructuracion con Route Groups — Layout sin navbar/footer

**Problema:** El layout de `[locale]/layout.tsx` incluye Navbar y Footer. Los layouts de Next.js son anidados e inmutables, asi que cualquier layout hijo hereda del padre.

**Solucion:** Route groups de Next.js App Router. Separar paginas publicas y privadas en grupos con layouts propios:

```
src/app/[locale]/
  layout.tsx              # SOLO: html, body, fonts, providers, Analytics
  (main)/
    layout.tsx            # Navbar + Footer + main wrapper (NUEVO)
    page.tsx              # Home (MOVIDO desde [locale]/)
    experience/           # MOVIDO
    projects/             # MOVIDO
    contact/              # MOVIDO
    privacy/              # MOVIDO
    error.tsx             # MOVIDO
    not-found.tsx         # MOVIDO
    opengraph-image.tsx   # MOVIDO
  (private)/
    private/
      layout.tsx          # Layout minimalista sin Navbar/Footer (NUEVO)
      login/page.tsx      # Formulario PIN (NUEVO)
      japan-2026/page.tsx # Itinerario (NUEVO)
```

**Cambios en layouts:**
- `[locale]/layout.tsx` actual: se le QUITA Navbar, Footer, main wrapper. Solo conserva html, body, fonts, NextIntlClientProvider, Analytics, SpeedInsights.
- `[locale]/(main)/layout.tsx` NUEVO: contiene Navbar, `<main className="flex-1 pt-16">`, Footer, grain-overlay. Es un fragment wrapper, no otro html/body.
- `[locale]/(private)/private/layout.tsx` NUEVO: wrapper minimalista, sin Navbar ni Footer.

**Las URLs no cambian** — los route groups `(main)` y `(private)` son invisibles en la URL. La ruta sigue siendo `/es/private/japan-2026`.

**Los archivos existentes se MUEVEN, no se reescriben.** Solo cambian de directorio.

### 4. `src/app/[locale]/private/login/page.tsx` — Formulario PIN

Client component ("use client") con:
- Diseno alineado con estetica momiji (colores calidos: #FAF6F1, #C4553A, etc.)
- Input para PIN (type="password", autocomplete="off")
- Boton de submit
- Estado de error si PIN incorrecto
- POST a `/api/pin/verify` con fetch
- Si 200: redirect a `searchParams.redirect` o default `/private/japan-2026`
- Si 401: mostrar mensaje de error

### 5. `src/app/[locale]/private/japan-2026/page.tsx` — Pagina del itinerario

Server Component que:
- Lee el archivo HTML desde `src/content/japan-2026.html` usando `fs.readFileSync`
- Extrae el contenido del `<body>` (o el HTML completo incluyendo styles)
- Renderiza con `dangerouslySetInnerHTML`
- El middleware ya garantiza que solo se sirve con cookie valida

### 6. `src/content/japan-2026.html` — Contenido movido

El archivo `japon-momiji-2026-app.html` se mueve aqui (fuera de `public/`, fuera de la raiz). No accesible como static file.

## Archivos a modificar

### 1. `src/middleware.ts`

Extender el middleware actual para:
- Importar `routing` de next-intl Y logica de verificacion de cookie
- Para rutas que matchean `/{locale}/private/*` (excepto `/{locale}/private/login`):
  - Leer cookie `private_session`
  - Verificar HMAC con `process.env.PRIVATE_PIN`
  - Si invalida: redirect a `/{locale}/private/login?redirect={pathname}`
- Para todas las demas rutas: comportamiento actual de next-intl sin cambios

Nota: La verificacion en middleware usa Web Crypto API (disponible en Edge Runtime), no Node crypto. La funcion `verifyToken` necesitara una version compatible con edge para el middleware.

### 2. `.env.local`

Anadir:
```
PRIVATE_PIN=<pin-elegido>
```

### 3. Pagina de privacidad

Anadir una linea en la seccion de cookies mencionando la cookie funcional de sesion para secciones restringidas.

## Consideraciones tecnicas

### Edge Runtime vs Node Runtime
- El middleware de Next.js corre en Edge Runtime → usar Web Crypto API para HMAC
- La API route y Server Components corren en Node Runtime → pueden usar `node:crypto`
- Solucion: `pin-auth.ts` exporta funciones que funcionan en ambos entornos, o se crean dos implementaciones (una para edge, otra para node)

### Seguridad
- Cookie httpOnly: no accesible desde JavaScript del cliente
- Cookie secure: solo se envia por HTTPS
- Cookie sameSite=strict: no se envia en peticiones cross-origin
- HMAC firmado: no se puede falsificar sin conocer el PIN
- Timing-safe comparison para evitar timing attacks en la comparacion del PIN
- El HTML del itinerario nunca esta en el bundle publico ni en static files

### i18n
- Las rutas privadas estan dentro de `[locale]/` asi que next-intl sigue funcionando
- La pagina de login puede tener traducciones basicas (mensajes de error, placeholder)
- El itinerario en si esta en espanol (no necesita i18n)

## Verificacion

1. `npm run build` pasa sin errores
2. `npm run dev` — acceder a `http://localhost:3000/es/private/japan-2026` sin cookie → redirige a login
3. Introducir PIN correcto → cookie seteada, redirige al itinerario, contenido visible
4. Recargar pagina → itinerario visible sin pedir PIN
5. PIN incorrecto → mensaje de error, no redirige
6. Esperar expiracion cookie (o borrarla manualmente) → redirige a login
7. Acceder directamente a `/api/pin/verify` con PIN incorrecto → 401
8. El HTML del itinerario NO aparece en el source del bundle (`_next/static/`)
