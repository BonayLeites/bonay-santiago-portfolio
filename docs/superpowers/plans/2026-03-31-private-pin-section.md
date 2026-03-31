# Private PIN Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a PIN-protected hidden section to the portfolio that serves a standalone Japan itinerary HTML page, with server-side validation and cookie-based session.

**Architecture:** Middleware intercepts `/*/private/*` routes and checks for a signed HMAC cookie. If missing/invalid, redirects to a login page. PIN is validated via an API route that sets an httpOnly cookie (24h). The itinerary is served as raw HTML via a route handler, completely standalone from the portfolio's React app. Existing pages are reorganized into route groups to enable separate layouts.

**Tech Stack:** Next.js 15 App Router, Web Crypto API (HMAC-SHA256), next-intl 4, Tailwind CSS 3

---

### Task 1: Pin Auth Utility

**Files:**
- Create: `src/lib/pin-auth.ts`

- [ ] **Step 1: Create the auth utility file**

```typescript
// src/lib/pin-auth.ts
export const COOKIE_NAME = "private_session";
export const COOKIE_MAX_AGE = 86400; // 24 horas

async function hmacSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function createToken(pin: string): Promise<string> {
  const timestamp = Date.now().toString();
  const hmac = await hmacSign(timestamp, pin);
  return `${timestamp}.${hmac}`;
}

export async function verifyToken(
  token: string,
  pin: string
): Promise<boolean> {
  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const timestamp = token.substring(0, dotIndex);
  const hmac = token.substring(dotIndex + 1);

  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  if (Date.now() - ts > COOKIE_MAX_AGE * 1000) return false;

  const expectedHmac = await hmacSign(timestamp, pin);
  return constantTimeEqual(hmac, expectedHmac);
}

export function verifyPin(pin: string, expected: string): boolean {
  return constantTimeEqual(pin, expected);
}
```

Uses Web Crypto API (`crypto.subtle`) — compatible with both Edge Runtime (middleware) and Node Runtime (API routes).

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/lib/pin-auth.ts`
Expected: No errors (or run `npm run build` later to catch issues)

- [ ] **Step 3: Commit**

```bash
git add src/lib/pin-auth.ts
git commit -m "feat: add PIN auth utility with HMAC token creation and verification"
```

---

### Task 2: API Route for PIN Verification

**Files:**
- Create: `src/app/api/pin/verify/route.ts`
- Create: `.env.local`

- [ ] **Step 1: Create .env.local with the PIN**

```bash
# .env.local
PRIVATE_PIN=<pin-elegido-por-el-usuario>
```

Nota: Preguntar al usuario que PIN quiere usar.

- [ ] **Step 2: Add .env.local to .gitignore if not already present**

Check if `.env.local` is in `.gitignore`. Next.js projects typically include it by default.

Run: `grep -q '.env.local' .gitignore && echo "Already ignored" || echo ".env.local" >> .gitignore`

- [ ] **Step 3: Create the API route**

```typescript
// src/app/api/pin/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  createToken,
  verifyPin,
} from "@/lib/pin-auth";

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();
    const expectedPin = process.env.PRIVATE_PIN;

    if (!pin || !expectedPin || !verifyPin(pin, expectedPin)) {
      return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
    }

    const token = await createToken(expectedPin);
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds without errors

- [ ] **Step 5: Commit**

```bash
git add src/app/api/pin/verify/route.ts
git commit -m "feat: add API route for PIN verification with cookie session"
```

---

### Task 3: Route Group Restructure

Move existing portfolio pages into a `(main)` route group and split the layout so private pages don't inherit Navbar/Footer.

**Files:**
- Move: all pages/files from `src/app/[locale]/` into `src/app/[locale]/(main)/`
- Modify: `src/app/[locale]/layout.tsx` (strip Navbar/Footer)
- Create: `src/app/[locale]/(main)/layout.tsx` (Navbar/Footer wrapper)

- [ ] **Step 1: Create (main) directory and move existing pages**

```bash
mkdir -p 'src/app/[locale]/(main)'
# Mover todas las paginas y archivos existentes
mv 'src/app/[locale]/page.tsx' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/experience' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/projects' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/contact' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/privacy' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/error.tsx' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/not-found.tsx' 'src/app/[locale]/(main)/'
mv 'src/app/[locale]/opengraph-image.tsx' 'src/app/[locale]/(main)/'
```

- [ ] **Step 2: Create (main) layout with Navbar and Footer**

```tsx
// src/app/[locale]/(main)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
```

- [ ] **Step 3: Strip Navbar/Footer from root locale layout**

Modify `src/app/[locale]/layout.tsx` — remove Navbar, Footer, main wrapper, and grain overlay. Keep only html, body, fonts, NextIntlClientProvider, Analytics, SpeedInsights:

```tsx
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Playfair_Display,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonay.dev";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", ja: "/ja" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Bonay Santiago",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es" | "ja")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${playfair.variable} ${sourceSans.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build and that existing routes still work**

Run: `npm run build`
Expected: Build succeeds. All existing pages compile.

Run: `npm run dev` and check:
- `http://localhost:3000/es` — Home with Navbar/Footer
- `http://localhost:3000/es/projects` — Projects page with Navbar/Footer
- `http://localhost:3000/en/contact` — Contact page with Navbar/Footer

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: reorganize pages into (main) route group for layout separation"
```

---

### Task 4: Private Layout and Route Structure

**Files:**
- Create: `src/app/[locale]/(private)/private/layout.tsx`

- [ ] **Step 1: Create private route group directory structure**

```bash
mkdir -p 'src/app/[locale]/(private)/private/login'
mkdir -p 'src/app/[locale]/(private)/private/japan-2026'
```

- [ ] **Step 2: Create minimal private layout**

```tsx
// src/app/[locale]/(private)/private/layout.tsx
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

This is a passthrough layout — private pages render directly inside the root locale layout's body (no Navbar/Footer, no portfolio styling).

- [ ] **Step 3: Commit**

```bash
git add 'src/app/[locale]/(private)'
git commit -m "feat: add private route group with minimal layout"
```

---

### Task 5: Extend Middleware for Private Route Protection

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Update middleware to check PIN cookie on private routes**

Replace the entire content of `src/middleware.ts`:

```typescript
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "./lib/pin-auth";

const intlMiddleware = createMiddleware(routing);

const PRIVATE_ROUTE_PATTERN = /^\/(en|es|ja)\/private(?!\/login)/;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = PRIVATE_ROUTE_PATTERN.exec(pathname);

  if (match) {
    const locale = match[1];
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const pin = process.env.PRIVATE_PIN;

    if (!token || !pin || !(await verifyToken(token, pin))) {
      const loginUrl = new URL(`/${locale}/private/login`, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|manifest|.*\\..*).*)"],
};
```

Flow:
1. If route matches `/{locale}/private/*` (except login): check cookie
2. If cookie missing/invalid: redirect to `/{locale}/private/login?redirect=<original-path>`
3. If cookie valid OR not a private route: pass to next-intl middleware

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: extend middleware to protect private routes with PIN cookie"
```

---

### Task 6: Login Page

**Files:**
- Create: `src/app/[locale]/(private)/private/login/page.tsx`
- Create: `src/app/[locale]/(private)/private/login/LoginForm.tsx`

- [ ] **Step 1: Create the LoginForm client component**

```tsx
// src/app/[locale]/(private)/private/login/LoginForm.tsx
"use client";

import { useState } from "react";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath = redirect || "../japan-2026";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        window.location.href = redirectPath;
      } else {
        setError("PIN incorrecto");
        setPin("");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#FAF6F1" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl block" aria-hidden="true">
            🍁
          </span>
          <h1
            className="mt-4 text-2xl font-light tracking-wide"
            style={{ color: "#2C2420", fontFamily: "Georgia, serif" }}
          >
            Área privada
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#7A6E64" }}>
            Introduce el PIN para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            autoComplete="off"
            autoFocus
            className="w-full px-4 py-3 text-center text-lg tracking-[0.5em] rounded-lg border outline-none transition-colors focus:ring-0"
            style={{
              background: "#FFFFFF",
              borderColor: error ? "#C4553A" : "#E5DDD4",
              color: "#2C2420",
            }}
          />

          {error && (
            <p className="text-center text-sm" style={{ color: "#C4553A" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{ background: "#C4553A", color: "#FAF6F1" }}
          >
            {loading ? "Verificando..." : "Acceder"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

Uses `window.location.href` (not `router.push`) because the destination is a route handler (raw HTML), not a React page.

- [ ] **Step 2: Create the page component (server component)**

```tsx
// src/app/[locale]/(private)/private/login/page.tsx
import LoginForm from "./LoginForm";

export default async function PrivateLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return <LoginForm redirect={redirect} />;
}
```

Uses `searchParams` server-side (avoids the `useSearchParams` Suspense boundary requirement).

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Verify login page renders**

Run: `npm run dev` and visit `http://localhost:3000/es/private/login`
Expected: See a centered PIN form with momiji styling, maple leaf emoji, "Área privada" heading.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/[locale]/(private)/private/login'
git commit -m "feat: add PIN login page with momiji-styled form"
```

---

### Task 7: Japan 2026 Itinerary Page

**Files:**
- Move: `japon-momiji-2026-app.html` to `src/content/japan-2026.html`
- Create: `src/app/[locale]/(private)/private/japan-2026/route.ts`
- Modify: `next.config.mjs` (add outputFileTracingIncludes)

- [ ] **Step 1: Move the HTML file to src/content/**

```bash
mkdir -p src/content
mv japon-momiji-2026-app.html src/content/japan-2026.html
```

- [ ] **Step 2: Create the route handler**

```typescript
// src/app/[locale]/(private)/private/japan-2026/route.ts
import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = join(process.cwd(), "src/content/japan-2026.html");
  const html = readFileSync(htmlPath, "utf-8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
```

This is a **route handler** (not a page component). It serves the raw HTML as a standalone document. The middleware already verified the cookie before this handler runs. `force-dynamic` prevents Next.js from caching/prerendering.

- [ ] **Step 3: Add outputFileTracingIncludes for Vercel compatibility**

Modify `next.config.mjs` to ensure `src/content/` is included in the Vercel deployment:

```javascript
// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/content/**"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/content/japan-2026.html 'src/app/[locale]/(private)/private/japan-2026/route.ts' next.config.mjs
git commit -m "feat: add japan-2026 route handler serving standalone HTML itinerary"
```

---

### Task 8: Privacy Page Update + Translation Keys

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Modify: `messages/ja.json`

- [ ] **Step 1: Update cookie section in translation files**

In all 3 message files, replace the `noCookiesTitle`/`noCookies` keys:

**messages/en.json:**
```json
"noCookiesTitle": "Cookies",
"noCookies": "This website uses a single functional cookie for authenticated access to restricted sections. This session cookie is httpOnly, secure, and expires after 24 hours. No tracking cookies are used. The analytics services mentioned above operate without cookies."
```

**messages/es.json:**
```json
"noCookiesTitle": "Cookies",
"noCookies": "Este sitio web utiliza una única cookie funcional para el acceso autenticado a secciones restringidas. Esta cookie de sesión es httpOnly, segura y expira a las 24 horas. No se utilizan cookies de seguimiento. Los servicios de analítica mencionados funcionan sin cookies."
```

**messages/ja.json:**
```json
"noCookiesTitle": "Cookie",
"noCookies": "本ウェブサイトは、制限されたセクションへの認証アクセスのために単一の機能的なCookieを使用します。このセッションCookieはhttpOnlyで安全であり、24時間後に期限切れになります。トラッキングCookieは使用されません。上記の分析サービスはCookieなしで動作します。"
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/es.json messages/ja.json
git commit -m "docs: update privacy policy cookie section to reflect PIN session cookie"
```

---

### Task 9: End-to-End Verification

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Manual E2E verification with dev server**

Run: `npm run dev`

Test the following scenarios:

1. **Unauthenticated access to itinerary:**
   - Visit `http://localhost:3000/es/private/japan-2026`
   - Expected: Redirect to `/es/private/login?redirect=/es/private/japan-2026`

2. **Login page renders:**
   - At the login page, verify: maple leaf emoji, "Área privada", PIN input, "Acceder" button
   - Expected: Clean momiji-styled form

3. **Wrong PIN:**
   - Enter wrong PIN and submit
   - Expected: "PIN incorrecto" error message, input cleared

4. **Correct PIN:**
   - Enter correct PIN (from .env.local) and submit
   - Expected: Redirect to Japan 2026 itinerary HTML page with full styling and functionality

5. **Session persistence:**
   - Reload `http://localhost:3000/es/private/japan-2026`
   - Expected: Itinerary loads without asking for PIN again

6. **Portfolio unchanged:**
   - Visit `http://localhost:3000/es` — Home with Navbar/Footer
   - Visit `http://localhost:3000/es/projects` — Projects with Navbar/Footer
   - Visit `http://localhost:3000/en/contact` — Contact with Navbar/Footer
   - Expected: All portfolio pages work exactly as before

7. **Hidden from public:**
   - Verify no link to private section in Navbar, Footer, or sitemap
   - Expected: Only accessible via direct URL

- [ ] **Step 4: Verify cookie properties**

Open browser DevTools > Application > Cookies after logging in:
- Name: `private_session`
- HttpOnly: true
- Secure: false (localhost) / true (production)
- SameSite: Strict
- Max-Age: ~86400

- [ ] **Step 5: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address issues found during E2E verification"
```
