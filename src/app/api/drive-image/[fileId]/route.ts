import { NextRequest, NextResponse } from "next/server";

/**
 * Drive Image Proxy
 *
 * Proxies Google Drive images through our domain so that:
 * 1. next/image can optimize them
 * 2. No raw Drive URLs leak to the client
 * 3. Caching headers are properly set
 *
 * Usage: /api/drive-image/FILE_ID?w=800
 *
 * Requires the Drive folder to be shared as "Anyone with the link can view".
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const { fileId } = params;
  const width = parseInt(request.nextUrl.searchParams.get("w") || "1600", 10);
  const clampedWidth = Math.min(Math.max(width, 200), 2400);

  // Google Drive thumbnail endpoint — works for publicly shared files
  const driveUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w${clampedWidth}`;

  try {
    const response = await fetch(driveUrl, {
      headers: {
        "User-Agent": "Julia-Fonseca-Site/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image not found or not shared" },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "CDN-Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch image from Drive" },
      { status: 502 }
    );
  }
}
