import React, { useState } from 'react';
import { CurrencyCode } from '../data/products';
import {
  CartItem,
  FREE_SHIPPING_THRESHOLD_USD,
  calculateCartTotals,
  formatPrice,
  generateTrackingHash,
} from '../utils/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  promoCode,
  onApplyPromoCode,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [promoInput, setPromoInput] = useState<string>(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<string>('');
  const [orderHash, setOrderHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, promoCode);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    onApplyPromoCode(cleaned);
    if (cleaned === 'CYBER26' || cleaned === 'ARCHIVE10') {
      setPromoFeedback(
        `TERMINAL CONFIRMED // CODE [${cleaned}] ACTIVE (-10% PROTOCOL DISCOUNT)`
      );
    } else {
      setPromoFeedback(
        'ACCESS DENIED // ENTER VALID TERMINAL CODE: CYBER26 OR ARCHIVE10'
      );
    }
  };

  const handleInitiateCheckout = () => {
    if (items.length === 0) return;
    setOrderHash(generateTrackingHash());
  };

  const handleCloseOrderModal = () => {
    setOrderHash(null);
    onClearCart();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hardware Loadout Cart Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Slide-out Drawer Panel */}
      <aside className="sx-cart-enter relative z-10 w-full max-w-lg bg-[#090B0E] border-l border-[rgba(226,232,240,0.2)] h-full flex flex-col justify-between overflow-hidden">
        {/* Drawer Header + Free Orbital Express Shipping Bar */}
        <div className="p-5 border-b border-[rgba(226,232,240,0.14)] space-y-4 bg-[#11161D]">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-tech text-[10px] text-[#00F0FF] block">
                ENCRYPTED HARDWARE MANIFEST
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] tracking-wider">
                LOADOUT BAG ({totals.itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Cart Drawer"
              className="px-3 py-1.5 bg-[#090B0E] border border-[rgba(226,232,240,0.2)] font-mono-tech text-xs text-[#F8FAFC] hover:border-[#00F0FF] cursor-pointer"
            >
              [CLOSE ×]
            </button>
          </div>

          {/* Free Orbital Express Shipping Progress Bar ($800 USD threshold) */}
          <div className="space-y-1.5 font-mono-tech text-xs">
            <div className="flex justify-between">
              {totals.isFreeShippingUnlocked ? (
                <span className="text-[#D4FF00] font-bold">
                  ORBITAL EXPRESS SHIPPING: UNLOCKED (FREE)
                </span>
              ) : (
                <span className="text-[#94A3B8]">
                  ADD{' '}
                  <strong className="text-[#00F0FF]">
                    {formatPrice(totals.amountToFreeShippingUsd, currency)}
                  </strong>{' '}
                  FOR FREE ORBITAL EXPRESS SHIPPING ({formatPrice(FREE_SHIPPING_THRESHOLD_USD, currency)})
                </span>
              )}
              <span className="text-[#F8FAFC]">{totals.freeShippingProgressPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#090B0E] border border-[rgba(226,232,240,0.14)] overflow-hidden">
              <div
                className="h-full bg-[#00F0FF] transition-all duration-300"
                style={{ width: `${totals.freeShippingProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[rgba(226,232,240,0.14)]">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono-tech">
              <div className="text-sm text-[#94A3B8]">
                [MANIFEST EMPTY // NO HARDWARE EQUIPPED]
              </div>
              <p className="text-xs text-[#94A3B8]/70">
                Select garments from the Archive Grid or configure a 3-slot bundle.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const lineWeightGrams = item.product.weightGrams * item.quantity;
              const linePriceUsd = item.product.priceUsd * item.quantity;
              return (
                <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="w-20 h-24 bg-[#11161D] border border-[rgba(226,232,240,0.14)] shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono-tech text-[11px] text-[#00F0FF] font-bold">
                          {item.product.code}
                        </span>
                        {item.isBundleDiscounted && (
                          <span className="ml-2 font-mono-tech text-[10px] text-[#FF007F] font-bold">
                            [-15% BUNDLE]
                          </span>
                        )}
                        <h3 className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                          {item.product.title}
                        </h3>
                      </div>
                      <span className="font-mono-tech text-xs font-bold text-[#D4FF00]">
                        {formatPrice(linePriceUsd, currency)}
                      </span>
                    </div>

                    <div className="font-mono-tech text-[11px] text-[#94A3B8] flex flex-wrap gap-2">
                      <span>SIZE: {item.size}</span>
                      <span>·</span>
                      <span>{item.colorway}</span>
                      <span>·</span>
                      <span>{lineWeightGrams}g</span>
                    </div>

                    {/* Quantity [-] [+] Controls */}
                    <div className="pt-1 flex items-center gap-2 font-mono-tech text-xs">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.product.title}`}
                        onClick={() => onUpdateQuantity(item.key, -1)}
                        className="w-7 h-7 bg-[#11161D] border border-[rgba(226,232,240,0.2)] hover:border-[#00F0FF] text-[#F8FAFC] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-[#F8FAFC] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.product.title}`}
                        onClick={() => onUpdateQuantity(item.key, 1)}
                        className="w-7 h-7 bg-[#11161D] border border-[rgba(226,232,240,0.2)] hover:border-[#00F0FF] text-[#F8FAFC] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Terminal & Checkout Summary */}
        <div className="p-5 bg-[#11161D] border-t border-[rgba(226,232,240,0.14)] space-y-4">
          {/* Promo Code Terminal Input */}
          <form onSubmit={handlePromoSubmit} className="space-y-1.5">
            <label
              htmlFor="promo-terminal-input"
              className="block font-mono-tech text-[11px] text-[#94A3B8]"
            >
              PROMO TERMINAL (TRY <span className="text-[#00F0FF]">CYBER26</span> OR{' '}
              <span className="text-[#00F0FF]">ARCHIVE10</span>):
            </label>
            <div className="flex gap-2">
              <input
                id="promo-terminal-input"
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="ENTER ACCESS CODE..."
                className="flex-1 bg-[#090B0E] border border-[rgba(226,232,240,0.2)] focus:border-[#00F0FF] px-3 py-2 font-mono-tech text-xs text-[#F8FAFC] outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#090B0E] border border-[#00F0FF]/60 hover:bg-[#00F0FF] hover:text-[#090B0E] font-mono-tech text-xs font-bold text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
              >
                [APPLY]
              </button>
            </div>
            {(promoFeedback || totals.promoValid) && (
              <div
                data-testid="promo-terminal-feedback"
                className={`font-mono-tech text-[11px] ${
                  totals.promoValid ? 'text-[#D4FF00]' : 'text-[#FF7A00]'
                }`}
              >
                {promoFeedback ||
                  `TERMINAL CONFIRMED // CODE [${promoCode}] ACTIVE (-10%)`}
              </div>
            )}
          </form>

          {/* Totals Telemetry */}
          <div className="space-y-1.5 font-mono-tech text-xs border-t border-[rgba(226,232,240,0.14)] pt-3">
            <div className="flex justify-between text-[#94A3B8]">
              <span>TOTAL PAYLOAD MASS</span>
              <span className="text-[#F8FAFC]">{totals.totalWeightKg} KG</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>RAW SUBTOTAL</span>
              <span className="text-[#F8FAFC]">
                {formatPrice(totals.rawSubtotalUsd, currency)}
              </span>
            </div>
            {totals.bundleDiscountUsd > 0 && (
              <div className="flex justify-between text-[#FF007F]">
                <span>15% LOADOUT BUNDLE DISCOUNT</span>
                <span>-{formatPrice(totals.bundleDiscountUsd, currency)}</span>
              </div>
            )}
            {totals.promoDiscountUsd > 0 && (
              <div className="flex justify-between text-[#00F0FF]">
                <span>10% TERMINAL PROMO ({promoCode.toUpperCase()})</span>
                <span>-{formatPrice(totals.promoDiscountUsd, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#D4FF00] pt-2 border-t border-[rgba(226,232,240,0.14)]">
              <span>ENCRYPTED TOTAL</span>
              <span data-testid="cart-final-total">
                {formatPrice(totals.finalTotalUsd, currency)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleInitiateCheckout}
            className="w-full chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] disabled:opacity-40 text-[#090B0E] font-mono-tech text-xs sm:text-sm font-bold tracking-wider py-3.5 px-5 transition-colors cursor-pointer whitespace-nowrap"
          >
            [INITIATE ENCRYPTED CHECKOUT]
          </button>
        </div>

        {/* Simulated Cryptographic Order Confirmation Modal */}
        {orderHash && (
          <div
            data-testid="checkout-confirmation-modal"
            className="absolute inset-0 z-30 bg-[#090B0E]/96 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center space-y-5"
          >
            <div className="w-12 h-12 border-2 border-[#00F0FF] flex items-center justify-center font-mono-tech text-lg font-bold text-[#00F0FF]">
              ✓
            </div>
            <div className="space-y-1">
              <span className="font-mono-tech text-xs text-[#00F0FF] tracking-widest">
                CRYPTOGRAPHIC DISPATCH AUTHORIZED
              </span>
              <h3 className="font-display text-2xl font-bold text-[#F8FAFC]">
                ORDER CONFIRMED // SECTOR 09
              </h3>
            </div>

            <div className="w-full bg-[#11161D] border border-[#00F0FF]/50 p-4 font-mono-tech text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">TRACKING HASH:</span>
                <span className="text-[#D4FF00] font-bold">{orderHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">PAYLOAD UNITS:</span>
                <span className="text-[#F8FAFC]">{totals.itemCount} UNITS ({totals.totalWeightKg} KG)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">SETTLEMENT AMOUNT:</span>
                <span className="text-[#00F0FF] font-bold">
                  {formatPrice(totals.finalTotalUsd, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">DISPATCH PROTOCOL:</span>
                <span className="text-[#F8FAFC]">ORBITAL EXPRESS // PRIORITY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseOrderModal}
              className="chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs font-bold px-6 py-3 cursor-pointer"
            >
              [ACKNOWLEDGE & RETURN TO ARCHIVE]
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
