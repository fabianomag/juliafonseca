import { Barlow_Condensed } from "next/font/google";
import { ImageResponse } from "next/og";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

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
          background: "#d9ff4f",
          borderRadius: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#071007",
            fontSize: 102,
            fontWeight: 900,
            letterSpacing: "-0.08em",
            fontFamily: display.style.fontFamily,
            lineHeight: 0.8,
          }}
        >
          JF
        </div>
      </div>
    ),
    size
  );
}
