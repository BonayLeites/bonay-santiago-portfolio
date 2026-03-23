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
          background: "#1e1b18",
          borderRadius: "36px",
        }}
      >
        <span
          style={{
            fontSize: "90px",
            fontWeight: 700,
            color: "#e84d3d",
            letterSpacing: "-2px",
          }}
        >
          SB
        </span>
      </div>
    ),
    { ...size }
  );
}
