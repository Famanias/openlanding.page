'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, RotateCcw, X } from 'lucide-react';
import {
  DESTINATIONS,
  PHOTO_STYLES,
  STAMP_DEFINITIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from '../../lib/postmark/sampleMemories';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

interface PostcardPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  destinationId: DestinationId;
  photoStyleId: PhotoStyleId;
  stampStyleId: StampStyleId;
  note: string;
  onReset: () => void;
}

export const PostcardPreviewDialog: React.FC<PostcardPreviewDialogProps> = ({
  open,
  onClose,
  destinationId,
  photoStyleId,
  stampStyleId,
  note,
  onReset,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  const destination = DESTINATIONS[destinationId];
  const photoStyle = PHOTO_STYLES.find((p) => p.id === photoStyleId) ?? PHOTO_STYLES[0];
  const stampDef = STAMP_DEFINITIONS[stampStyleId];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCopyNote = async () => {
    const textToCopy = `${note.trim()} — ${destination.city}, ${destination.country} (${destination.dateLabel})`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const tempArea = document.createElement('textarea');
        tempArea.value = textToCopy;
        tempArea.setAttribute('readonly', 'true');
        tempArea.className = 'sr-only';
        document.body.appendChild(tempArea);
        tempArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="pm-preview-dialog-title"
      className="pm-dialog m-auto w-[min(94vw,820px)] max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--pm-brown)]/30 bg-[var(--pm-paper)] p-0 text-[var(--pm-ink)] shadow-[0_32px_90px_rgba(37,41,44,0.34)]"
    >
      <div className="relative p-5 sm:p-8 pm-paper-grain">
        {/* Top Airmail Accent */}
        <div className="pm-airmail-band absolute inset-x-0 top-0 h-2" aria-hidden="true" />

        {/* Header Row */}
        <div className="mt-1 flex items-start justify-between gap-4 border-b border-[var(--pm-brown)]/15 pb-4">
          <div>
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
              INTERACTIVE DEMO — NO ACCOUNT OR MEMORY SAVED
            </p>
            <h2
              id="pm-preview-dialog-title"
              className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[var(--pm-ink)]"
            >
              Your Collectible Digital Postcard
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close postcard preview"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Front & Back Correspondence Card Layout */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pm-postcard-sheet p-4 sm:p-6">
          {/* Left: Selected Photo Print inside Matte Frame */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className={`relative overflow-hidden border border-[var(--pm-brown)]/20 p-2.5 ${photoStyle.frameTintClass}`}>
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-parchment)]">
                <img
                  src={photoStyle.assetUrl}
                  alt={`${destination.city} — ${photoStyle.label}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full ${photoStyle.cropClass}`}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between font-ui text-[11px] text-[var(--pm-brown)]">
                <span className="font-semibold uppercase tracking-[0.1em]">{destination.city}, {destination.country}</span>
                <span>{destination.code}</span>
              </div>
            </div>
            <p className="mt-3 font-ui text-xs text-[var(--pm-ink)]/65">
              {photoStyle.label} · {destination.coordinatesLabel}
            </p>
          </div>

          {/* Right: Correspondence Side with Handwritten Note, Address Lines & Cancelled Stamp */}
          <div className="md:col-span-7 flex flex-col justify-between md:border-l md:border-[var(--pm-brown)]/20 md:pl-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-editorial text-xl tracking-[0.04em] text-[var(--pm-brown)]">
                  POST CARD
                </p>
                <p className="mt-0.5 font-ui text-xs uppercase tracking-[0.14em] text-[var(--pm-ink)]/60">
                  {destination.dateLabel} · {destination.postmarkCode}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <PostalCancellationSeal
                  topText={destination.city.toUpperCase()}
                  bottomText="KEPT MEMORY"
                  centerText={destination.code}
                  className="h-14 w-14 text-[var(--pm-brown)]/75 -mr-3 z-10"
                />
                <SVGStamp stampId={stampStyleId} size="sm" cancelled={false} />
              </div>
            </div>

            {/* Handwritten Note Surface */}
            <div className="my-5 pm-ruled-paper border border-[var(--pm-brown)]/15 p-4 min-h-[132px]">
              <p className="font-hand text-[25px] leading-[1.32] text-[var(--pm-ink)] break-words">
                {note.trim() || destination.sampleNote}
              </p>
            </div>

            {/* Stamp & Location Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--pm-brown)]/15 font-ui text-xs text-[var(--pm-brown)]">
              <span>Stamp: {stampDef.title} ({stampDef.denomination}c)</span>
              <span aria-hidden="true">·</span>
              <span>Local browser preview only</span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <PaperButton variant="primary" size="md" onClick={handleCopyNote}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Note Copied' : 'Copy Note'}</span>
            </PaperButton>

            <PaperButton
              variant="parchment"
              size="md"
              onClick={() => {
                onReset();
              }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Sample</span>
            </PaperButton>
          </div>

          <PaperButton variant="outline" size="md" onClick={onClose}>
            Done
          </PaperButton>
        </div>
      </div>
    </dialog>
  );
};
