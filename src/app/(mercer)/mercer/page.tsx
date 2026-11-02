import type { Metadata } from "next";
import MercerApp from "./MercerApp";
import MercerContinuation from "./continuation/MercerContinuation";
import "./continuation/continuation.css";

export const metadata: Metadata = {
  title: "Jules Mercer // Creative Developer Portfolio",
  description: "Independent creative developer crafting interactive 3D WebGL experiences. Design-minded development where code becomes creativity.",
  openGraph: { title: "Jules Mercer // Creative Developer", description: "I build what you imagine. Interactive experiences, written in code.", type: "website" },
};

export default function MercerPage() {
  return <><MercerApp /><MercerContinuation /></>;
}
