import type { Metadata } from "next";
import "./kinfield/kinfield.css";

export const metadata: Metadata = {
  title: "KINFIELD — Move in your own rhythm",
  description: "A fictional movement studio and an interactive study in finding your own rhythm.",
};

export default function KinfieldLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="kf-body">{children}</body></html>;
}
