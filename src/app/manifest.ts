import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZMA Resulting",
    short_name: "ZMA",
    description: "Custom websites, Telegram systems, automation, SEO.",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
