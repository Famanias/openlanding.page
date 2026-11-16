import type { Metadata, Viewport } from "next";
import { B612_Mono, Sofia_Sans_Extra_Condensed, Work_Sans } from "next/font/google";
import "./tolvar/tolvar.css";

// Sofia Sans Extra Condensed: tall, tight door lettering. It carries every headline and button.
const plate = Sofia_Sans_Extra_Condensed({ subsets: ["latin"], variable: "--font-sofia-condensed", display: "swap" });
const work = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });
// B612 Mono was drawn for instrument panels: readouts, tickets, phone numbers.
const gauge = B612_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-b612-mono", display: "swap", preload: false });

const TITLE = "Tolvar Earthworks: excavating, grading and hauling in Aitkin, Minnesota";
const DESCRIPTION =
  "Dig it right. Move it once. Family-run excavating since 2002: basements, building pads, ponds, water line, storm drain and trucking. Free estimates. A fictional company; details are illustrative.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ECE7DC" };

export default function TolvarLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plate.variable} ${work.variable} ${gauge.variable}`}>
      <body className="tv-body">
        <noscript>
          {/* without JavaScript nothing waits for a reveal, and every work panel and job is laid out in full */}
          <style>{`[data-reveal],[data-reveal] *,.tv-line>span{opacity:1!important;transform:none!important;clip-path:none!important}.tv-panel{position:static!important;visibility:visible!important;opacity:1!important;transform:none!important}.tv-panels{display:block!important}.tv-acc-panel{grid-template-rows:1fr!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
