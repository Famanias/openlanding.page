import { ImageResponse } from "next/og";

export const alt = "Tolvar Earthworks: dig it right, move it once";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DIESEL = "#1B1A17";
const LIMESTONE = "#ECE7DC";
const BLADE = "#F2B31B";
const CLAY = "#9A4A2B";
const TOPSOIL = "#2F261E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: DIESEL, color: LIMESTONE }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 72px 44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* the mark: a slab with a notch dug out, and the block that came out of it */}
            <div style={{ display: "flex", position: "relative", width: 78, height: 66 }}>
              <div style={{ display: "flex", position: "absolute", left: 0, bottom: 0, width: 78, height: 34, background: LIMESTONE }} />
              <div style={{ display: "flex", position: "absolute", left: 12, bottom: 12, width: 26, height: 22, background: DIESEL }} />
              <div style={{ display: "flex", position: "absolute", left: 44, top: 0, width: 26, height: 22, background: BLADE }} />
            </div>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: 6 }}>TOLVAR EARTHWORKS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 128, lineHeight: 0.95, fontWeight: 800, letterSpacing: -2 }}>DIG IT RIGHT.</div>
            <div style={{ display: "flex", fontSize: 128, lineHeight: 0.95, fontWeight: 800, letterSpacing: -2, color: BLADE }}>MOVE IT ONCE.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, opacity: 0.85 }}>CUT · FILL · PIPE · HAUL · AITKIN, MINNESOTA · EST. 2002</div>
        </div>
        {/* finished grade, then the ground under it */}
        <div style={{ display: "flex", height: 8, background: BLADE }} />
        <div style={{ display: "flex", height: 56, background: CLAY }}>
          <div style={{ display: "flex", marginLeft: 420, width: 260, height: 40, background: TOPSOIL }} />
        </div>
      </div>
    ),
    size,
  );
}
