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
          background:
            "radial-gradient(circle at 18% 18%, rgba(217, 255, 79, 0.42), transparent 28%), radial-gradient(circle at 82% 24%, rgba(109, 127, 113, 0.56), transparent 30%), linear-gradient(135deg, #0f170f 0%, #8fb05d 48%, #d9ff4f 100%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "40px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
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
              gap: 14,
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
                opacity: 0.86,
              }}
            >
              <span style={{ width: 72, height: 2, background: "rgba(255,255,255,0.72)" }} />
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 116,
                lineHeight: 0.82,
                letterSpacing: "-0.08em",
                fontWeight: 900,
                textTransform: "uppercase",
                fontFamily: '"Arial Black", Arial, Helvetica, sans-serif',
                color: "#162114",
                textShadow: "0 8px 0 rgba(255,255,255,0.26)",
              }}
            >
              JF
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.25,
                maxWidth: 580,
                opacity: 0.92,
              }}
            >
              Arquitetura residencial, comercial e interiores com presença visual forte.
            </div>
          </div>
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: 96,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 24px 100px rgba(0,0,0,0.28)",
              color: "#162114",
              fontSize: 170,
              fontWeight: 900,
              letterSpacing: "-0.1em",
              fontFamily: '"Arial Black", Arial, Helvetica, sans-serif',
              lineHeight: 1,
              textShadow: "0 10px 0 rgba(255,255,255,0.25)",
            }}
          >
            JF
          </div>
        </div>
      </div>
    ),
    size
  );
}
