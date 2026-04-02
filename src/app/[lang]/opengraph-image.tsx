import { ImageResponse } from "next/og";

export const alt = "ZMA Resulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(165deg, #0c141c 0%, #05080c 55%, #020406 100%)",
          border: "1px solid rgba(114, 229, 255, 0.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "rgba(245, 250, 252, 0.96)",
              lineHeight: 1.05,
            }}
          >
            ZMA Resulting
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(114, 229, 255, 0.92)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Digital environment · Custom build
          </div>
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(196, 210, 220, 0.75)",
            maxWidth: 720,
            lineHeight: 1.45,
          }}
        >
          Websites, Telegram systems, automation — structured delivery, no template noise.
        </div>
      </div>
    ),
    { ...size },
  );
}
