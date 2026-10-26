"use client";
import { useEffect, useState } from "react";
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) { const [shown, setShown] = useState(0); useEffect(() => { const start = performance.now(); const id = requestAnimationFrame(function tick(now) { const p = Math.min(1, (now - start) / 900); setShown(value * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); }); return () => cancelAnimationFrame(id); }, [value]); return <span aria-hidden>{shown.toFixed(value % 1 ? 1 : 0)}{suffix}</span>; }
