import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Templateflow",
  description: "Landing-page templates for design inspiration.",
};

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
