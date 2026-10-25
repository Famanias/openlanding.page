import { ImageResponse } from "next/og";

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
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF4E8",
          color: "#231F2B",
          padding: "56px 64px",
          border: "12px solid #231F2B",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "#231F2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FAF4E8",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              T
            </div>
            <span style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              TALLY.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#C8E6D0",
              border: "2px solid #231F2B",
              borderRadius: "999px",
              padding: "8px 20px",
              fontSize: "16px",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            SHOPIFY SERVICE COUNTER · CLAIM #TLY-26-1050
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
            <div
              style={{
                fontSize: "74px",
                lineHeight: 1.03,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "20px",
              }}
            >
              Sell your hours like your goods.
            </div>
            <div style={{ fontSize: "24px", lineHeight: 1.4, fontFamily: "sans-serif" }}>
              Appointments, repair intakes, partial deposits, and perforated bench-tracked claim stubs for small Shopify businesses.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "340px",
              backgroundColor: "#F7C8B6",
              border: "3px solid #231F2B",
              borderRadius: "12px",
              padding: "24px",
              fontFamily: "monospace",
            }}
          >
            <div style={{ fontSize: "14px", letterSpacing: "0.08em", marginBottom: "8px" }}>
              CUSTOMER CLAIM STUB
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, marginBottom: "12px" }}>
              50% DEPOSIT PAID
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "2px dashed #231F2B",
                paddingTop: "12px",
                fontSize: "15px",
              }}
            >
              <span>BENCH STAGE 04</span>
              <span>READY</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #231F2B",
            paddingTop: "20px",
            fontSize: "16px",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          <span>01 CHECKOUT DEPOSIT · 02 POS INTAKE · 03 WORKBENCH · 04 STUB TEAR</span>
          <span
            style={{
              backgroundColor: "#CFD6F6",
              padding: "4px 14px",
              borderRadius: "6px",
              border: "1px solid #231F2B",
            }}
          >
            ONLINE STORE 2.0 + POS
          </span>
        </div>
      </div>
    ),
    size
  );
}
