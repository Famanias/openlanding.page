"use client";

import { useEffect, useState, useRef } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFinish?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  selectedFinish = "Limestone",
}: InquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [finish, setFinish] = useState(selectedFinish);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setFinish(selectedFinish);
  }, [selectedFinish]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("is-locked");
    } else {
      if (dialog.open) dialog.close();
      document.body.classList.remove("is-locked");
      setSubmitted(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      id="inquire-dialog"
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          type="button"
          className="dialog-close"
          id="dialog-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          &times;
        </button>
        <span className="eyebrow">Studio acquisition</span>
        <h2 id="dialog-title">Vessel No. 01</h2>
        <p className="dialog-lede">
          Direct studio release. Numbered certificate, custom felt-lined timber crate, and insured global delivery.
        </p>

        {submitted ? (
          <div className="py-8 text-center" role="status">
            <h3 className="text-xl font-serif text-[#f4ecdf] mb-2">Inquiry Transmitted</h3>
            <p className="text-sm text-[#bda996]">
              Thank you, {name}. The Kyoto studio will be in touch within 24 business hours regarding availability of the {finish} edition.
            </p>
            <button
              type="button"
              className="submit-btn mt-6"
              onClick={onClose}
            >
              Return to studio
            </button>
          </div>
        ) : (
          <form id="inquiry-form" className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="client-name">Full name</label>
              <input
                type="text"
                id="client-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Architect, collector, or gallery"
              />
            </div>
            <div className="form-row">
              <label htmlFor="client-email">Email address</label>
              <input
                type="email"
                id="client-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@studio.com"
              />
            </div>
            <div className="form-row">
              <label htmlFor="client-finish">Preferred finish</label>
              <select
                id="client-finish"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
              >
                <option value="Limestone">Limestone — Bone white chalky mineral</option>
                <option value="Volcanic">Volcanic — Charcoal graphite depth</option>
                <option value="Terracotta">Terracotta — Sun-fired raw earth</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="client-notes">Notes or shipping destination</label>
              <textarea
                id="client-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Country, space context, or delivery timeframe..."
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Transmit studio inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
