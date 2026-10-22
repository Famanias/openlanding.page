"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../brand/Logo";
import { MenuIcon, XIcon, ArrowRightIcon } from "./icons";
import { JourneyTelemetry } from "../journey/JourneyTelemetry";
import { scrollToStop } from "../journey/storyScroll";
import type { StopId } from "../journey/story";

export function LandingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navLinks: Array<{ label: string; stop: StopId; href: string }> = [
    { label: "Departure", stop: "depart", href: "#depart" },
    { label: "Prepare Load", stop: "prepare", href: "#prepare" },
    { label: "On the Road", stop: "truck", href: "#connected" },
    { label: "Workspace", stop: "workspace", href: "#workspace" },
    { label: "Arrival", stop: "closeout", href: "#arrive" },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-[#8E8294]/20 bg-[#FAF7F2]/90 backdrop-blur-md transition-colors"
    >
      <JourneyTelemetry />
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] max-[660px]:w-[min(100%-28px,1240px)]">
        <div className="flex min-h-[72px] items-center justify-between gap-7 max-[660px]:min-h-[64px]">
          <Link
            href="#top"
            aria-label="KINETIC home"
            onClick={(e) => {
              if (scrollToStop("depart")) e.preventDefault();
            }}
            className="group inline-flex min-w-max items-center gap-3 transition-transform hover:scale-105"
          >
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#workspace"
              onClick={(e) => {
                if (scrollToStop("workspace")) e.preventDefault();
              }}
              className="hidden sm:inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#8E8294]/30 px-5 text-[13px] font-mono font-bold uppercase tracking-wider text-[#1B1522] hover:border-[#1B1522] hover:bg-[#FFE6D2]/50 transition-all"
            >
              Command Center
            </a>
            <a
              href="#arrive"
              onClick={(e) => {
                if (scrollToStop("arrive")) e.preventDefault();
              }}
              className="hidden md:inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-[#FF6B2B] px-5 text-[13px] font-mono font-bold uppercase tracking-wider text-[#FAF7F2] shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <span>Dispatch Unit 104</span>
              <ArrowRightIcon size={14} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#8E8294]/30 text-[#1B1522] lg:hidden hover:bg-[#FFE6D2]/60"
            >
              {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[#8E8294]/20 py-4 lg:hidden">
            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-[#8E8294]">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setOpen(false);
                    if (scrollToStop(item.stop)) e.preventDefault();
                  }}
                  className="py-2 hover:text-[#FF6B2B]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default LandingNav;
