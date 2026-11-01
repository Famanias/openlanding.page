"use client";
import { useState } from "react";
const brief = "Create a landing page template for my project. Start with the audience and the central idea, then develop the visual direction, page, motion, and responsive details.";
export function CopyBrief() {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setMessage("Copied. Paste it into your agent to start."); }
    catch { setMessage("Copy isn’t available here. Select the brief and copy it manually."); }
  }
  return <div className="lx-brief"><div className="lx-brief-top lx-mono"><span>STARTER BRIEF</span><span>01 / YOUR TURN</span></div><p className="lx-brief-text">{brief}</p><div className="lx-brief-bottom"><span className="lx-mono">MAKE IT YOUR OWN &nbsp; ↗</span><button type="button" className="lx-copy-button" onClick={copy}>Copy brief <span>↗</span></button></div><p className="lx-copy-status" role="status">{message}</p></div>;
}
