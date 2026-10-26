"use client";

import { useState } from "react";

export function AlignmentControl() {
  const [value, setValue] = useState(50);
  const update = (next: number) => { setValue(next); window.dispatchEvent(new CustomEvent("stl:alignment", { detail: next })); };
  return <div className="stl-alignment-control"><div><span className="stl-kicker">Lunar offset</span><output>{value.toString().padStart(3, "0")} / 100</output></div><input aria-label="Lunar offset" type="range" min="0" max="100" value={value} onChange={(event) => update(Number(event.target.value))} /><div className="stl-range-labels"><span>first contact</span><span>totality</span><span>afterglow</span></div></div>;
}
