import { ImageResponse } from "next/og";

export const alt = "Bonay Santiago — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1e1b18",
          color: "#f5f3ef",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Línea decorativa vermillion */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#e84d3d",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Bonay Santiago
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#e84d3d",
            marginBottom: "24px",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#968c7d",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          AI-powered enterprise solutions · Full-stack development · Data
          engineering
        </div>
      </div>
    ),
    { ...size }
  );
}
