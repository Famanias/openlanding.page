"use client";

import React, { useEffect } from "react";
import { Logo } from "./Logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#121417]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-[#EDE6DF] p-6 shadow-2xl flex flex-col justify-between border-l border-[#D8D0C5]">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#D8D0C5]">
            <Logo size={26} />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#121417] hover:bg-[#E5DDD4] transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-4">
            <a
              href="#features"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Features
            </a>
            <a
              href="#pipeline"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Pipeline
            </a>
            <a
              href="#pricing"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              FAQ
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-[#D8D0C5]">
          <a
            href="#signin"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-semibold text-[#121417] hover:bg-[#E5DDD4] rounded-lg transition"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-bold bg-[#121417] text-[#F5EFEB] rounded-full shadow hover:bg-[#2B2F38] transition"
          >
            Get started free
          </a>
        </div>
      </div>
    </div>
  );
}
