import { Barlow_Condensed } from "next/font/google";
import { ImageResponse } from "next/og";
import siteConfig from "@/lib/metadata";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

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
          background: "#071007",
          color: "#d9ff4f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "40px",
            border: "2px solid rgba(217, 255, 79, 0.18)",
            borderRadius: "40px",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 670,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 24,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.82,
              }}
            >
              <span style={{ width: 72, height: 2, background: "rgba(217,255,79,0.72)" }} />
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 164,
                lineHeight: 0.76,
                letterSpacing: "-0.16em",
                fontWeight: 900,
                textTransform: "uppercase",
                fontFamily: display.style.fontFamily,
                color: "#d9ff4f",
                textShadow: "0 2px 0 rgba(255,255,255,0.08)",
              }}
            >
              J
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.25,
                maxWidth: 580,
                opacity: 0.78,
              }}
            >
              Arquitetura residencial, comercial e interiores com presença visual forte.
            </div>
          </div>
          <div
            style={{
              width: 390,
              height: 390,
              borderRadius: 108,
              background: "#d9ff4f",
              border: "10px solid rgba(217,255,79,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 26px 0 rgba(217,255,79,0.08)",
              color: "#071007",
              fontSize: 264,
              fontWeight: 900,
              letterSpacing: "-0.14em",
              fontFamily: display.style.fontFamily,
              lineHeight: 1,
              textShadow: "0 2px 0 rgba(255,255,255,0.08)",
            }}
          >
            J
          </div>
        </div>
      </div>
    ),
    size
  );
}
