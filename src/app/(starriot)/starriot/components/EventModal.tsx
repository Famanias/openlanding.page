"use client";

import React, { useEffect, useRef } from "react";

interface EventModalProps {
  isOpen: boolean;
  eventId: string;
  onClose: () => void;
  onRsvp: (eventId: string) => void;
}

const EVENT_CATALOG: Record<
  string,
  {
    schedule: string;
    title: string;
    desc: string;
    slots: [string, string][];
  }
> = {
  "friday-frequency": {
    schedule: "EVERY FRIDAY • 10 PM – 4 AM",
    title: "FRIDAY FREQUENCY",
    desc: "High-voltage house, laser-cut disco edits, and loud neon colors to detonate the workweek.",
    slots: [
      ["10:00 PM – 12:00 AM", "SYNTHIA (Warm Analog Edits)"],
      ["12:00 AM – 02:30 AM", "DJ ORBIT (Peak Supernova Set)"],
      ["02:30 AM – 04:00 AM", "KIKI NOVA (Late Hours Acid Disco)"],
    ],
  },
  "saturday-starburst": {
    schedule: "EVERY SATURDAY • 10 PM – 5 AM",
    title: "SATURDAY STARBURST",
    desc: "70s & 80s disco classics recharged with live brass horns, confetti drops, and cosmic synth bass.",
    slots: [
      ["10:00 PM – 12:00 AM", "MILES ELECTRIC (Crate-Dug Funk)"],
      ["12:00 AM – 03:00 AM", "LUNA VEX + THE RIOT HORNS (Live Brass Disco)"],
      ["03:00 AM – 05:00 AM", "STARBURST B2B CLOSING SET"],
    ],
  },
  "sunday-slowburn": {
    schedule: "SELECT SUNDAYS • 8 PM – 2 AM",
    title: "SUNDAY SLOWBURN",
    desc: "Deep crate-dug boogie, analog soul, warm coral lights, and the friendliest late-weekend afterglow.",
    slots: [
      ["08:00 PM – 10:00 PM", "SOLARIS (Sunset Vinyl Boogie)"],
      ["10:00 PM – 12:30 AM", "RIO SONIC (Cosmic Soul & Electro-Funk)"],
      ["12:30 AM – 02:00 AM", "VELVET ECHO (Afterglow Classics)"],
    ],
  },
};

export function EventModal({ isOpen, eventId, onClose, onRsvp }: EventModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const data = EVENT_CATALOG[eventId] || EVENT_CATALOG["friday-frequency"];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.setAttribute("open", "open");
      }
    } else {
      if (typeof dialog.close === "function") {
        if (dialog.open) {
          dialog.close();
        }
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="event-modal"
      className="sr-club-modal"
      aria-labelledby="modal-event-title"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="sr-modal-top-bar">
        <span className="sr-modal-top-title">✦ STAR RIOT NIGHT BRIEFING</span>
        <button
          type="button"
          className="sr-modal-close-btn"
          id="close-modal-btn"
          aria-label="Close event details"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="sr-modal-body">
        <div className="sr-modal-schedule-kicker" id="modal-event-schedule">
          {data.schedule}
        </div>
        <h2 id="modal-event-title" className="sr-display-type sr-modal-event-heading">
          {data.title}
        </h2>
        <p className="sr-modal-event-summary" id="modal-event-desc">
          {data.desc}
        </p>

        <div className="sr-modal-lineup-box" id="modal-lineup-list">
          {data.slots.map(([time, artist]) => (
            <div key={time} className="sr-modal-lineup-row">
              <strong>{time}</strong>
              <span>{artist}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="sr-btn-neon-pill"
          id="modal-rsvp-btn"
          style={{ width: "100%" }}
          onClick={() => {
            onRsvp(eventId);
            onClose();
          }}
        >
          <span>GET ON THE LIST FOR THIS NIGHT</span>
          <span className="sr-btn-arrow" aria-hidden="true">↗</span>
        </button>
      </div>
    </dialog>
  );
}
