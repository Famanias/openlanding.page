"use client";

import dynamic from "next/dynamic";

// The experience reads window/WebGL during its first render, so it never prerenders.
const LoamExperience = dynamic(() => import("./LoamExperience").then((m) => m.LoamExperience), { ssr: false });

export function LoamApp() {
  return <LoamExperience />;
}
