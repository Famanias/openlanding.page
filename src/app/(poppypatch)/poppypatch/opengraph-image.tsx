import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#F7ECD6",
          color: "#4A2E25",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#4A2E25",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M8 22C8 12.5 14.5 7 22 7C29.5 7 36 12.5 36 22C36 24.5 33.5 25.5 22 25.5C10.5 25.5 8 24.5 8 22Z"
              fill="#E58267"
              stroke="#4A2E25"
              strokeWidth="2.5"
            />
            <path
              d="M17.5 25.5C17 30.5 16 35 17.5 37.5C19 39.5 25 39.5 26.5 37.5C28 35 27 30.5 26.5 25.5"
              fill="#FAF3E3"
              stroke="#4A2E25"
              strokeWidth="2.5"
            />
            <circle cx="16" cy="15" r="2" fill="#FAF3E3" />
            <circle cx="23" cy="13" r="2.4" fill="#FAF3E3" />
            <circle cx="29" cy="17" r="1.8" fill="#FAF3E3" />
          </svg>
          poppy patch
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.08,
            fontWeight: 700,
          }}
        >
          Fresh kitchen-grown mushrooms.{" "}
          <span style={{ color: "#E58267" }}>Mist twice daily, harvest in 10 days.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#735449" }}>
          Playful, tactile starter kits for growing edible mushrooms at home.
        </div>
      </div>
    ),
    size
  );
}
