import React, { useState } from 'react';
import { validateNewsletterEmail } from '../utils/storeLogic';
import { SparkleStar, CoralUnderline } from './DoodleSvg';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FinalCtaSectionProps {
  onScrollToKits: () => void;
}

export function FinalCtaSection({ onScrollToKits }: FinalCtaSectionProps) {
  const [emailInput, setEmailInput] = useState('');
  const [favoriteVariety, setFavoriteVariety] = useState('Coral Oyster');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewsletterEmail(emailInput);

    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please enter a valid email address.');
      setSubmittedEmail(null);
      return;
    }

    setErrorMsg(null);
    setSubmittedEmail(validation.normalizedEmail || emailInput.trim());
    setEmailInput('');
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="card-papier bg-[#F9DFD5] border-2 border-[#4A2E25]/15 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative pistachio paper-cut circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#E3EBC9]/80 border border-[#4A2E25]/10"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Big Papier-Collé Heading & Kit CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E3] border border-[#4A2E25]/20 text-xs font-bold uppercase tracking-wider text-[#4A2E25]">
                <SparkleStar className="w-3.5 h-3.5" />
                <span>READY FOR YOUR FIRST HARVEST?</span>
              </div>

              <div>
                <h2
                  id="final-cta-heading"
                  className="font-serif-display font-black text-[#4A2E25] text-[clamp(2.4rem,4.8vw,4.1rem)] leading-[1.02] tracking-tight uppercase"
                  style={{ textWrap: 'balance' }}
                >
                  LET’S GROW SOMETHING GOOD.
                </h2>
                <div className="w-64 mt-1">
                  <CoralUnderline className="w-full h-4" />
                </div>
              </div>

              <p className="text-[17px] text-[#4A2E25]/90 max-w-[48ch] leading-relaxed">
                Pick a starter block for your own kitchen counter or send a little box of everyday wonder to a curious friend.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={onScrollToKits}
                  className="btn-clay-coral px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer whitespace-nowrap"
                >
                  CHOOSE YOUR FIRST KIT
                </button>

                <div className="flex items-center gap-3">
                  <img
                    src="/templates/poppypatch/cutout-gardener.png"
                    alt="Miniature clay gardener holding watering can"
                    width={56}
                    height={66}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-contain rounded-lg"
                  />
                  <span className="text-xs font-medium text-[#563A32] max-w-[22ch]">
                    Includes our illustrated 16-page starter field guide in every box.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Field Notes Club Form (Demo State) */}
            <div className="lg:col-span-5 bg-[#FAF3E3] rounded-3xl p-6 sm:p-8 border border-[#4A2E25]/18 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A4D38]">
                  SUNDAY GROWING NOTES
                </span>
                <span className="postage-stamp px-2 py-0.5 text-[10px] font-bold uppercase text-[#4A2E25] rounded">
                  DEMO SIGNUP
                </span>
              </div>

              <h3 className="font-serif-display font-bold text-2xl text-[#4A2E25] mb-2">
                Get seasonal care tips & skillet recipes
              </h3>
              <p className="text-sm text-[#563A32] mb-5 leading-relaxed">
                Join our studio dispatch for printable misting calendars and seasonal mushroom recipes.
              </p>

              {submittedEmail ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-2xl bg-[#E3EBC9] border border-[#4A2E25]/20 space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#2E3A13] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Welcome to the Poppy Patch Journal!</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3A461C] leading-relaxed">
                    Demo confirmation: We’ve registered <strong>{submittedEmail}</strong> with a preference for <strong>{favoriteVariety}</strong> notes.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedEmail(null)}
                    className="text-xs font-bold underline text-[#2E3A13] cursor-pointer"
                  >
                    Register another email address
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="newsletter-variety"
                      className="block text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1.5"
                    >
                      Variety You’re Most Curious About
                    </label>
                    <select
                      id="newsletter-variety"
                      value={favoriteVariety}
                      onChange={(e) => setFavoriteVariety(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/25 text-sm font-medium text-[#4A2E25] focus:outline-2 focus:outline-[#4A2E25]"
                    >
                      <option value="Coral Oyster">Terracotta Coral Oyster</option>
                      <option value="Cream Pearl Oyster">Cream Pearl Oyster</option>
                      <option value="Velvet Lilac Oyster">Velvet Lilac Oyster</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1.5"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="clara@kitchenpatch.com"
                      aria-invalid={Boolean(errorMsg)}
                      aria-describedby={errorMsg ? 'newsletter-error' : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/25 text-sm text-[#4A2E25] placeholder:text-[#7A5447]/60 focus:outline-2 focus:outline-[#4A2E25]"
                    />
                    {errorMsg && (
                      <p
                        id="newsletter-error"
                        role="alert"
                        className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-[#B42318]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4A2E25] hover:bg-[#382119] text-[#FAF3E3] font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Send Me Field Notes
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
