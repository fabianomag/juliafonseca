import { ImageResponse } from "next/og";
import siteConfig from "@/lib/metadata";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 45%, rgba(217,255,79,0.14), transparent 32%), linear-gradient(135deg, #071007 0%, #111111 100%)",
          color: "#d9ff4f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "44px",
            borderRadius: "44px",
            border: "1px solid rgba(217,255,79,0.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 72,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.86,
          }}
        >
          <span style={{ width: 72, height: 2, background: "rgba(217,255,79,0.7)" }} />
          {siteConfig.name}
        </div>

        <svg
          viewBox="0 0 512 512"
          width="420"
          height="420"
          aria-hidden="true"
          style={{
            display: "block",
            filter: "drop-shadow(0 10px 0 rgba(217,255,79,0.08))",
          }}
        >
          <rect width="512" height="512" rx="128" fill="#071007" />
          <path
            d="M256 32L266 128L340 68L324 164L420 128L372 214L472 224L384 256L472 288L372 298L420 384L324 348L340 444L266 384L256 480L246 384L172 444L188 348L92 384L140 298L40 288L128 256L40 224L140 214L92 128L188 164L172 68L246 128L256 32Z"
            fill="#d9ff4f"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: 74,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 12,
          }}
          >
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Arte & Interiores
          </div>
          <div
            style={{
              width: 96,
              height: 2,
              background: "rgba(217,255,79,0.75)",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
