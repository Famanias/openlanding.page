import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pipkin: small-batch jam, cooked Tuesday and on your doorstep by Friday.";

const pill = (bg: string, w: number, h: number, left: number, top: number) => (
  <div style={{ display: "flex", position: "absolute", left, top, width: w, height: h, borderRadius: h / 2, background: bg, border: "5px solid #3B2A47" }} />
);

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FFF8EC", color: "#3B2A47", position: "relative", flexDirection: "column", justifyContent: "center", padding: "0 72px" }}>
        {pill("#FFD6E2", 250, 112, 910, 64)}
        {pill("#CBEBDA", 200, 112, 960, 212)}
        {pill("#E3D8F6", 270, 112, 890, 360)}
        {pill("#FFEBA6", 190, 112, 970, 508)}
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", background: "#FF9DBB", padding: "8px 26px", borderRadius: 40, alignSelf: "flex-start", border: "4px solid #3B2A47" }}>Pipkin jam</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.06, marginTop: 34, width: 800 }}>Cooked Tuesday.</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.06, width: 800 }}>At your door Friday.</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 30, width: 760 }}>Small-batch jam from one kitchen, two cooks, 36 jars at a time.</div>
      </div>
    ),
    size,
  );
}
