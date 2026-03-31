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
