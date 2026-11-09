import type { Metadata } from "next";
import "./daymark/daymark.css";
export const metadata: Metadata = { title: "DAYMARK — A brighter way to power home", description: "An illustrative study in sunlight and residential solar design." };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
