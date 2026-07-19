import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase();

  return NextResponse.json(
    { suggestPortuguese: country === "BR" },
    {
      headers: {
        "Cache-Control": "private, max-age=300",
        "Vercel-CDN-Cache-Control": "no-store",
        Vary: "x-vercel-ip-country",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
