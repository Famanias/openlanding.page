import { notFound } from "next/navigation";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Tagline } from "./sections/Tagline";
import { Principles } from "./sections/Principles";
import { CalibrationBench } from "./bench/CalibrationBench";
import { Workflow } from "./sections/Workflow";
import { Access } from "./sections/Access";
import { FieldNotes } from "./sections/FieldNotes";
import { Footer } from "./sections/Footer";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";

export default function LucentraPage() {
  notFound();
  return <div className="lc-shell"><a className="lc-skip" href="#main">Skip to content</a><ScrollProgress /><SmoothScroll /><Header /><main id="main"><Hero /><Tagline /><Principles /><CalibrationBench /><Workflow /><Access /><FieldNotes /></main><Footer /></div>;
}
