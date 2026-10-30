import React, { useEffect, useState } from 'react';
import { CURRENCY_CONFIG, CurrencyCode } from '../data/products';

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  cartCount: number;
  cartWeightKg: string;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  cartWeightKg,
  onOpenCart,
}) => {
  const [clockText, setClockText] = useState<string>('UTC 16:42:09 // JST 01:42:09');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.toISOString().slice(11, 19);
      const jstDate = new Date(now.getTime() + 9 * 3600 * 1000);
      const jst = jstDate.toISOString().slice(11, 19);
      setClockText(`UTC ${utc} // JST ${jst}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090B0E]/95 backdrop-blur-md border-b border-[rgba(226,232,240,0.14)]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand wordmark + live system clock and coordinates */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <a
            href="#"
            className="font-display text-lg font-bold tracking-[0.1em] text-[#F8FAFC] whitespace-nowrap flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-[#00F0FF]" />
            synapxe
          </a>
          <div className="hidden xl:flex flex-col border-l border-[rgba(226,232,240,0.14)] pl-3 font-mono-tech text-[10px] leading-tight text-[#94A3B8] whitespace-nowrap">
            <span className="text-[#00F0FF]">{clockText}</span>
            <span>35.6762° N, 139.6503° E // SECTOR 09</span>
          </div>
        </div>

        {/* Center: Navigation anchor links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-3 xl:gap-4 font-mono-tech text-[11px] tracking-wider text-[#94A3B8] shrink-0"
        >
          <a
            href="#shells-grid"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [01 // SHELLS]
          </a>
          <a
            href="#fabric-lab"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [02 // FABRIC LAB]
          </a>
          <a
            href="#loadout-builder"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [03 // LOADOUT BUILDER]
          </a>
          <a
            href="#biometric-fit"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [04 // BIOMETRIC FIT]
          </a>
        </nav>

        {/* Right: Currency selector + Cart Trigger button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            role="group"
            aria-label="Currency Selector"
            className="flex items-center border border-[rgba(226,232,240,0.14)] bg-[#11161D] p-0.5 font-mono-tech text-[11px]"
          >
            {(['USD', 'JPY', 'EUR'] as CurrencyCode[]).map((code) => {
              const active = currency === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {CURRENCY_CONFIG[code].label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="chamfer-btn bg-[#11161D] hover:bg-[#00F0FF] hover:text-[#090B0E] text-[#F8FAFC] border border-[#00F0FF]/50 px-3 py-2 font-mono-tech text-[11px] font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>[LOADOUT BAG ({cartCount})]</span>
            <span className="hidden sm:inline text-[10px] opacity-85 border-l border-current/30 pl-2">
              {cartWeightKg} KG
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
