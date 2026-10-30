import React, { useState } from 'react';
import { ScenicFooter } from './ScenicFooter';
import { PRODUCTS } from '../data/products';
import { NfcVerificationResult, verifyNfcChipCode } from '../utils/storeLogic';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: '01 // HOW DOES 3-LAYER ePTFE MEMBRANE CARE WORK?',
    answer:
      'Machine wash cold (30°C) with liquid technical detergent. Do not use powder detergents, fabric softeners, or bleach. Tumble dry low for 20 minutes to reactivate the fluorocarbon-free DWR outer treatment. Never iron directly on laminated seams.',
  },
  {
    id: 'faq-2',
    question: '02 // ORBITAL EXPRESS SHIPPING & CUSTOMS TELEMETRY',
    answer:
      'All orders over $800 USD qualify for complimentary Orbital Express priority air courier (2–4 business days globally). Duties and import taxes for USD, JPY, and EUR sectors are calculated and cleared at dispatch.',
  },
  {
    id: 'faq-3',
    question: '03 // MODULAR FIDLOCK® & MOLLE HARDWARE COMPATIBILITY',
    answer:
      'Every KINETIX // ARCHIVE outer shell, utility harness, and stabilizer sling utilizes standardized 25mm Fidlock® V-Buckle magnetic-mechanical fasteners and laser-cut hypalon PALS/MOLLE grids for cross-collection attachment.',
  },
];

export const TyvekFooter: React.FC = () => {
  const [nfcInput, setNfcInput] = useState<string>('JKT-01A');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [nfcResult, setNfcResult] = useState<NfcVerificationResult | null>(null);

  const [dispatchEmail, setDispatchEmail] = useState<string>('');
  const [dispatchSubscribed, setDispatchSubscribed] = useState<boolean>(false);

  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const handleVerifyChip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nfcInput.trim()) return;
    setIsScanning(true);
    setNfcResult(null);

    setTimeout(() => {
      const res = verifyNfcChipCode(nfcInput, PRODUCTS);
      setNfcResult(res);
      setIsScanning(false);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchEmail.trim() || !dispatchEmail.includes('@')) return;
    setDispatchSubscribed(true);
  };

  return (
    <footer
      aria-label="Woven Tyvek Specification Care-Tag Footer"
      className="w-full tyvek-surface text-[#090B0E] border-t-2 border-dashed border-[#090B0E]/60"
    >
      {/* Top Sewn Stitch Bar */}
      <div className="border-b border-[#090B0E]/20 py-2.5 px-4 lg:px-8 font-mono-tech text-[11px] flex flex-wrap items-center justify-between gap-4">
        <span className="font-bold tracking-widest">
          SEWN SPECIFICATION LABEL // KINETIX ARCHIVE CORP. TOKYO-09
        </span>
        <span>SPECIFICATION REF: MIL-DTL-32439 // ISO-9001 CERTIFIED</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Column 1 (5 cols): Interactive NFC Garment Authenticity Verifier */}
        <div id="footer-verifier" className="lg:col-span-5 space-y-5 border border-[#090B0E]/30 bg-white/60 p-6">
          <div className="flex items-center justify-between border-b border-[#090B0E]/20 pb-3 font-mono-tech text-xs">
            <span className="font-bold bg-[#090B0E] text-[#F1F5F9] px-2 py-0.5">
              NFC CHIP REGISTRY
            </span>
            <span>SHA-256 GARMENT VERIFIER</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#090B0E] tracking-wide">
            INTERACTIVE NFC GARMENT AUTHENTICITY VERIFIER
          </h3>

          <p className="text-xs text-[#090B0E]/80 font-mono-tech leading-relaxed">
            Enter any garment serial or unit code (e.g., <strong>JKT-01A</strong>,{' '}
            <strong>PNT-05B</strong>, or <strong>KNX-8849</strong>) to query the embedded
            cryptographic NFC tag.
          </p>

          <form onSubmit={handleVerifyChip} className="space-y-3">
            <label htmlFor="nfc-verifier-input" className="sr-only">
              Product Serial or NFC Chip Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="nfc-verifier-input"
                type="text"
                value={nfcInput}
                onChange={(e) => setNfcInput(e.target.value)}
                placeholder="E.G. JKT-01A OR KNX-8849"
                className="flex-1 bg-[#F1F5F9] border-2 border-[#090B0E] px-3.5 py-2.5 font-mono-tech text-xs font-bold text-[#090B0E] uppercase outline-none"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="bg-[#090B0E] hover:bg-[#00F0FF] hover:text-[#090B0E] text-[#F1F5F9] font-mono-tech text-xs font-bold px-5 py-2.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                {isScanning ? '[SCANNING CHIP...]' : '[VERIFY CHIP]'}
              </button>
            </div>
          </form>

          {/* 1.5s Cryptographic Scan Animation or Result Readout */}
          {isScanning && (
            <div
              data-testid="nfc-scan-progress"
              className="p-3 bg-[#090B0E] text-[#00F0FF] font-mono-tech text-xs space-y-2"
            >
              <div className="flex justify-between">
                <span>DECRYPTING NFC PAYLOAD...</span>
                <span>1.5S HANDSHAKE</span>
              </div>
              <div className="w-full h-1.5 bg-[#11161D] overflow-hidden">
                <div className="h-full bg-[#00F0FF] w-3/4 animate-pulse" />
              </div>
            </div>
          )}

          {nfcResult && !isScanning && (
            <div
              data-testid="nfc-verification-result"
              className={`p-3.5 font-mono-tech text-xs border-2 ${
                nfcResult.valid
                  ? 'bg-[#090B0E] text-[#D4FF00] border-[#090B0E]'
                  : 'bg-[#FF7A00]/20 text-[#090B0E] border-[#FF7A00]'
              }`}
            >
              <div className="font-bold">{nfcResult.message}</div>
              <div className="text-[10px] text-[#F1F5F9]/80 mt-1 flex justify-between">
                <span>BATCH: {nfcResult.batchId}</span>
                <span>VERIFIED: {nfcResult.code}</span>
              </div>
            </div>
          )}

          {/* Encrypted Dispatch Newsletter Signup */}
          <div className="pt-4 border-t border-[#090B0E]/20 space-y-2.5">
            <div className="font-mono-tech text-xs font-bold uppercase">
              ENCRYPTED DISPATCH // DROP 05 EARLY ACCESS
            </div>
            {dispatchSubscribed ? (
              <div
                data-testid="newsletter-confirmation"
                className="p-2.5 bg-[#090B0E] text-[#00F0FF] font-mono-tech text-xs font-bold"
              >
                DISPATCH LINK ESTABLISHED // {dispatchEmail.toUpperCase()} REGISTERED
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <label htmlFor="dispatch-email-input" className="sr-only">
                  Encrypted Dispatch Email
                </label>
                <input
                  id="dispatch-email-input"
                  type="email"
                  required
                  value={dispatchEmail}
                  onChange={(e) => setDispatchEmail(e.target.value)}
                  placeholder="OPERATOR@SECTOR09.IO"
                  className="flex-1 bg-[#F1F5F9] border border-[#090B0E] px-3 py-2 font-mono-tech text-xs text-[#090B0E] outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#090B0E] text-[#F1F5F9] hover:bg-[#FF007F] font-mono-tech text-xs font-bold px-4 py-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  [JOIN DISPATCH]
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 2 (7 cols): Collapsible FAQ/Shipping Accordions + ISO Care Matrix */}
        <div id="footer-care" className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-3">
            <div className="font-mono-tech text-xs font-bold tracking-wider uppercase border-b border-[#090B0E]/30 pb-2">
              TECHNICAL SPECIFICATIONS, SHIPPING & GARMENT CARE PROTOCOLS
            </div>

            <div className="divide-y divide-[#090B0E]/25 border border-[#090B0E]/30 bg-white/50">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="w-full px-4 py-3.5 text-left font-mono-tech text-xs font-bold flex items-center justify-between gap-4 hover:bg-[#090B0E]/5 cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <span className="text-sm">{isOpen ? '[-]' : '[+]'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-[#090B0E]/85 leading-relaxed font-mono-tech">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ISO Care Symbols + Monochrome Vector Payment Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#090B0E]/25 font-mono-tech text-xs">
            <div className="space-y-2">
              <span className="font-bold block">ISO 3758 MEMBRANE CARE SYMBOLS</span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="border border-[#090B0E] px-2 py-1 font-bold">30°C GENTLE</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">NO BLEACH</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">NO IRON</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">DWR LOW DRY</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold block">ENCRYPTED SETTLEMENT NETWORKS</span>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  VISA // CRYPTO
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  MASTERCARD
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  AMEX
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  JPY PAY-ID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-[#090B0E]/25 py-4 px-4 lg:px-8 font-mono-tech text-[11px] flex flex-wrap items-center justify-between gap-4">
        <span>
          © 2026 KINETIX // ARCHIVE™ — ENGINEERED URBAN SHELL SYSTEMS. ALL RIGHTS RESERVED.
        </span>
        <span>LOT #KNX-FW26-09 // PRINTED ON UNBLEACHED DUPONT™ TYVEK®</span>
      </div>
      <ScenicFooter />
    </footer>
  );
};
