import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#511C2F", color: "#F4E7D1", padding: 62 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>GRANDSTAND / REPERTORY THEATRE</span><span>THE SEASON IS OPEN</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 0.9, fontWeight: 800 }}><span>TONIGHT</span><span>BEGINS HERE.</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>A LITTLE CLOSER TO THE STORY</span><span>TAKE YOUR SEAT →</span></div></div>, size);
}
