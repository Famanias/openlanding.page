import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "HIYAS — Plan the line. Earn the summit.";
const BLACK = "#05070A"; const BLUE = "#0B2A4A"; const WHITE = "#FFFFFF";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: BLACK, color: WHITE, padding: "58px 68px", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: ".04em" }}>HIYAS</div><div style={{ display: "flex", fontSize: 14, color: BLUE }}>ALPINE EXPEDITIONS</div></div><div style={{ display: "flex", padding: "10px 14px", border: `2px solid ${WHITE}`, fontSize: 14, letterSpacing: ".1em" }}>FIELD / ROUTE ROOM</div></div><div style={{ display: "flex", flexDirection: "column", maxWidth: 840 }}><div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: .9, letterSpacing: "-.04em" }}>Plan the line.<br/><span style={{ color: BLUE }}>Earn the summit.</span></div><div style={{ display: "flex", marginTop: 24, fontSize: 22 }}>Fourteen peaks. One prepared return.</div></div></div>, { ...size });
}

