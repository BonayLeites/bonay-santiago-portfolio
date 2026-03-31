import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let cachedHtml: string | null = null;

export async function GET() {
  if (!cachedHtml) {
    const htmlPath = join(process.cwd(), "src/content/japan-2026.html");
    cachedHtml = await readFile(htmlPath, "utf-8");
  }

  return new NextResponse(cachedHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
