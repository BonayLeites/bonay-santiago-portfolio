import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bonay Santiago — Software Engineer",
    short_name: "SB Portfolio",
    description:
      "Software engineer specialized in AI-powered enterprise solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#e84d3d",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
