'use client';
import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { CAMERA_FINISHES, CameraFinishId } from '../lib/assets';
import { validateWaitlistInput } from '../lib/motion';

export interface WaitlistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preferredFinish: CameraFinishId;
  onChangePreferredFinish: (finish: CameraFinishId) => void;
}

const STORAGE_KEY = 'kairo_k01_demo_waitlist';

export const WaitlistDialog: React.FC<WaitlistDialogProps> = ({
  isOpen,
  onClose,
  preferredFinish,
  onChangePreferredFinish,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEntry, setSubmittedEntry] = useState<{
    email: string;
    finish: CameraFinishId;
  } | null>(null);

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setErrorMessage(null);

    const timer = window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateWaitlistInput(email);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid email address.');
      return;
    }

    setErrorMessage(null);
    const payload = {
      email: validation.normalizedEmail,
      name: name.trim(),
      finish: preferredFinish,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors in restricted environments
    }

    setSubmittedEntry({
      email: validation.normalizedEmail,
      finish: preferredFinish,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kairo-waitlist-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121315]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-[2px] bg-[#181a1e] border border-[#f2efe9]/20 p-6 md:p-8 text-[#f2efe9] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono-kairo text-xs tracking-[0.2em] text-[#e68f63]">
              KAIRO / K-01 DISPATCH
            </p>
            <h2
              id="kairo-waitlist-title"
              className="font-display-kairo mt-1.5 text-2xl md:text-3xl font-semibold text-[#f2efe9]"
            >
              Join the KAIRO list
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close waitlist dialog"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] border border-[#f2efe9]/15 text-[#a8aaa9] hover:text-[#f2efe9] hover:border-[#e68f63] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedEntry ? (
          <div className="mt-6 pt-6 border-t border-[#f2efe9]/12">
            <div className="flex items-start gap-3 p-4 rounded-[2px] bg-[#121315] border border-[#e68f63]/45">
              <CheckCircle2 className="w-5 h-5 text-[#e68f63] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display-kairo text-base font-semibold text-[#f2efe9]">
                  Local concept preference recorded
                </h3>
                <p className="mt-1 text-xs md:text-sm leading-relaxed text-[#a8aaa9]">
                  Recorded <span className="text-[#f2efe9]">{submittedEntry.email}</span>{' '}
                  with interest in the{' '}
                  <span className="text-[#e68f63] uppercase font-mono-kairo">
                    {submittedEntry.finish}
                  </span>{' '}
                  finish.
                </p>
                <p className="mt-2 font-mono-kairo text-[11px] text-[#a8aaa9]">
                  Demo transparency note: KAIRO K-01 is a fictional camera concept.
                  Your entry is stored locally in this browser only and no external
                  email was transmitted.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmittedEntry(null);
                  setEmail('');
                }}
                className="kairo-btn-secondary"
              >
                Update preference
              </button>
              <button
                type="button"
                onClick={onClose}
                className="kairo-btn-primary"
              >
                Return to KAIRO
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-5">
            <p className="text-sm text-[#a8aaa9] leading-relaxed">
              Explore how the K-01 concept develops. This interactive preview
              validates your input locally without sending data to an external server.
            </p>

            <div>
              <label
                htmlFor="waitlist-email"
                className="block font-mono-kairo text-xs text-[#f2efe9] mb-2"
              >
                EMAIL ADDRESS *
              </label>
              <input
                ref={emailInputRef}
                id="waitlist-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="photographer@studio.com"
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? 'waitlist-email-error' : undefined}
                className="w-full px-4 py-3 text-sm bg-[#121315] border border-[#f2efe9]/20 rounded-[2px] text-[#f2efe9] placeholder:text-[#a8aaa9]/50 focus:border-[#e68f63] focus:outline-none"
              />
              {errorMessage && (
                <p
                  id="waitlist-email-error"
                  role="alert"
                  className="mt-2 text-xs font-mono-kairo text-[#e68f63]"
                >
                  {errorMessage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="waitlist-name"
                className="block font-mono-kairo text-xs text-[#f2efe9]/80 mb-2"
              >
                NAME OR STUDIO (OPTIONAL)
              </label>
              <input
                id="waitlist-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Vance"
                className="w-full px-4 py-3 text-sm bg-[#121315] border border-[#f2efe9]/20 rounded-[2px] text-[#f2efe9] placeholder:text-[#a8aaa9]/50 focus:border-[#e68f63] focus:outline-none"
              />
            </div>

            <div>
              <span className="block font-mono-kairo text-xs text-[#f2efe9]/80 mb-2">
                PREFERRED K-01 FINISH
              </span>
              <div className="grid grid-cols-3 gap-2">
                {CAMERA_FINISHES.map((finish) => {
                  const selected = finish.id === preferredFinish;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChangePreferredFinish(finish.id)}
                      className={`py-2.5 px-3 text-xs font-mono-kairo rounded-[2px] border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold'
                          : 'bg-[#121315] text-[#f2efe9]/80 border-[#f2efe9]/15 hover:border-[#e68f63]'
                      }`}
                    >
                      {finish.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-mono-kairo text-[11px] text-[#a8aaa9]">
                Interactive local demo · Press Esc to close
              </p>
              <button type="submit" className="kairo-btn-primary">
                Join the KAIRO list
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
