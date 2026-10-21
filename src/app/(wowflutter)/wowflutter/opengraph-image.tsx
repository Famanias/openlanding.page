import { ImageResponse } from "next/og";

export const alt = "WOWFLUTTER — Every record is an issue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#EFE6D4",
          color: "#14110F",
          position: "relative",
        }}
      >
        <svg width="560" height="560" viewBox="0 0 64 64" style={{ position: "absolute", right: 40, top: 35 }}>
          <path fill="#14110F" fillRule="evenodd" d="M2 32a30 30 0 1 0 60 0a30 30 0 1 0-60 0ZM32 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z" />
          <g fill="none" stroke="#EFE6D4" strokeWidth="1">
            <circle cx="32" cy="32" r="17.5" />
            <circle cx="32" cy="32" r="21.5" />
            <circle cx="32" cy="32" r="25.5" />
          </g>
          <path fill="#FF3D8B" fillRule="evenodd" d="M19 32a13 13 0 1 0 26 0a13 13 0 1 0-26 0ZM32 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "70px 80px" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#5E564D" }}>ISSUE 07 · THE SOUND OF ROOMS</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", position: "relative", fontSize: 150, fontWeight: 700, lineHeight: 0.9 }}>
              <div style={{ display: "flex", position: "absolute", left: 8, top: 8, color: "#FF3D8B" }}>wowflutter</div>
              <div style={{ display: "flex" }}>wowflutter</div>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#14110F" }}>Every record is an issue.</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
