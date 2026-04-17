import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
        }}
      >
        <div
          style={{
            width: 512,
            height: 512,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#162114",
            fontSize: 248,
            fontWeight: 900,
            letterSpacing: "-0.1em",
            fontFamily: '"Arial Black", Arial, Helvetica, sans-serif',
            lineHeight: 1,
            textShadow: "0 8px 0 rgba(255,255,255,0.32)",
          }}
        >
          JF
        </div>
      </div>
    ),
    size
  );
}
