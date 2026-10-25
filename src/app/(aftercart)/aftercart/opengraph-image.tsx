import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_TOKENS = {
  paper: "#FFF7F3",
  ink: "#4C4668",
  mint: "#BFE7D3",
  lilac: "#DCCFF4",
  peach: "#FFCCB8",
  face: "Arial",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: OG_TOKENS.paper,
        color: OG_TOKENS.ink,
        fontFamily: OG_TOKENS.face,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: "0.08em" }}>
        <span>Aftercart</span>
        <span style={{ color: OG_TOKENS.mint }}>Store health / 04</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.02 }}>Keep your shop ready.</div>
        <div style={{ fontSize: 30, color: OG_TOKENS.ink }}>Shopify care after launch.</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 22 }}>
        <span style={{ padding: "14px 18px", background: OG_TOKENS.lilac, borderRadius: 12 }}>Conversion 78</span>
        <span style={{ padding: "14px 18px", background: OG_TOKENS.peach, borderRadius: 12 }}>Next check / today</span>
      </div>
    </div>,
  );
}
