import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.28), transparent 26%), linear-gradient(135deg, #d9ff4f 0%, #8fb05d 42%, #6d7f71 100%)",
          borderRadius: 44,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#162114",
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: "-0.1em",
            fontFamily: '"Arial Black", Arial, Helvetica, sans-serif',
            lineHeight: 1,
            textShadow: "0 4px 0 rgba(255,255,255,0.28)",
          }}
        >
          JF
        </div>
      </div>
    ),
    size
  );
}
