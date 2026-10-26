"use client";
import { useEffect } from "react";
export function SmoothScroll() { useEffect(() => { if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return; document.documentElement.style.scrollBehavior = "smooth"; return () => { document.documentElement.style.scrollBehavior = ""; }; }, []); return null; }
