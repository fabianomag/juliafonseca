import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "#171713",
          borderRadius: 38,
          color: "#ef4a24",
          fontSize: 78,
          fontWeight: 650,
          letterSpacing: "-0.08em",
        }}
      >
        SF
      </div>
    ),
    size,
  );
}
