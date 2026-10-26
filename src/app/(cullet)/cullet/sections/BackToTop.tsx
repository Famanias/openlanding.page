"use client";
import { goto } from "../motion/SmoothScroll";

export function BackToTop() {
  return (
    <a href="#cullet" className="fc-link fc-link--quiet fc-foot__top-link" onClick={(e) => { e.preventDefault(); goto("top"); }}>
      Back to the slab <span aria-hidden="true">↑</span>
    </a>
  );
}
