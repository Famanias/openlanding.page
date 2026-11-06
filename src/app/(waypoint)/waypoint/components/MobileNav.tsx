"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { containDialogFocus } from "../lib/dialogFocus";

export function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
    const previous = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      id="waypoint-mobile-navigation"
      className="wyp-mobile-nav"
      aria-label="Mobile navigation"
      onKeyDown={containDialogFocus}
      onCancel={onClose}
    >
      <div className="wyp-mobile-nav-header">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <nav>
        {[
          { href: "#features", label: "Features" },
          { href: "#pipeline", label: "Pipeline" },
          { href: "#pricing", label: "Pricing" },
          { href: "#faq", label: "FAQ" },
        ].map((link, i) => (
          <a
            href={link.href}
            key={link.href}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="wyp-mobile-nav-actions">
        <a href="#signin" onClick={onClose}>
          Sign in
        </a>
        <a
          href="#get-started"
          className="wyp-button wyp-button-dark"
          onClick={onClose}
        >
          Get started free
        </a>
      </div>
    </dialog>
  );
}
