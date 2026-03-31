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
