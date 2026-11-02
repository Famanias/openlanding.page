"use client";

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { BagItem, BagTotals } from '../utils/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  totals: BagTotals;
  onUpdateQty: (key: string, delta: number) => void;
  onClearBag: () => void;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  totals,
  onUpdateQty,
  onClearBag,
  onClose
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setOrderConfirmed(false);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDemoCheckout = () => {
    setOrderConfirmed(true);
    onClearBag();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#0B0B0A]/80 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-[#111210] border-l border-[#F1F0E9]/20 h-full flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 flex items-center justify-between">
          <div>
            <h2
              id="bag-drawer-title"
              className="font-display italic font-black text-2xl text-[#F1F0E9] uppercase tracking-tight"
            >
              YOUR BAG ({totals.itemCount})
            </h2>
            <p className="font-mono-tech text-[11px] text-[#777A7A]">
              FICTIONAL DEMO STOREFRONT · NO REAL CHARGE
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-9 h-9 border border-[#F1F0E9]/20 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {orderConfirmed ? (
            <div
              data-testid="demo-order-confirmation"
              className="border border-[#D3FF35] bg-[#0B0B0A] p-6 space-y-4"
            >
              <CheckCircle2 className="w-8 h-8 text-[#D3FF35]" />
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase">
                ORDER #RL-1042 CONFIRMED (DEMO)
              </div>
              <h3 className="font-display italic font-black text-2xl text-[#F1F0E9] uppercase">
                ALLOCATION RESERVED
              </h3>
              <p className="text-sm text-[#F1F0E9]/75 leading-relaxed">
                This is a fictional RAZORLINE product demonstration. Your simulated RL-01 order has been logged with zero payment transmission.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full h-11 bg-[#D3FF35] text-[#0B0B0A] font-display italic font-black text-base uppercase cursor-pointer"
              >
                RETURN TO STOREFRONT
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <p className="font-display italic font-bold text-2xl text-[#F1F0E9]/60 uppercase mb-2">
                YOUR BAG IS EMPTY
              </p>
              <p className="text-sm text-[#777A7A] max-w-xs mb-6">
                Select a size from the RL-01 Collection to configure your pair.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 h-11 bg-[#D3FF35] text-[#0B0B0A] font-display italic font-black text-sm uppercase tracking-wider cursor-pointer"
              >
                EXPLORE RL-01 MODELS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  data-testid={`bag-item-${item.key}`}
                  className="bg-[#0B0B0A] border border-[#F1F0E9]/15 p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={75}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-contain bg-[#111210] p-1 border border-[#F1F0E9]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display italic font-black text-lg text-[#F1F0E9] uppercase truncate">
                        {item.name}
                      </h3>
                      <span className="font-mono-tech text-sm font-bold text-[#D3FF35]">
                        ${item.unitPrice * item.quantity}
                      </span>
                    </div>
                    <div className="font-mono-tech text-xs text-[#777A7A] mb-3">
                      SIZE: US {item.size.toFixed(1)} · ${item.unitPrice} EA
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, -1)}
                        aria-label={`Decrease quantity for ${item.name} US ${item.size.toFixed(1)}`}
                        className="w-7 h-7 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span
                        data-testid={`bag-qty-${item.key}`}
                        className="font-mono-tech text-xs font-bold w-6 text-center text-[#F1F0E9]"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, 1)}
                        aria-label={`Increase quantity for ${item.name} US ${item.size.toFixed(1)}`}
                        className="w-7 h-7 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && !orderConfirmed && (
          <div className="p-6 bg-[#0B0B0A] border-t border-[#F1F0E9]/15 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between font-mono-tech text-xs text-[#777A7A]">
                <span>EXPRESS DISPATCH</span>
                <span>{totals.shippingLabel}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#F1F0E9]/10">
                <span className="font-mono-tech text-xs text-[#F1F0E9] uppercase">
                  DEMO SUBTOTAL
                </span>
                <span
                  data-testid="bag-subtotal"
                  className="font-mono-tech text-2xl font-bold text-[#D3FF35]"
                >
                  ${totals.subtotal}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoCheckout}
              className="w-full h-12 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-lg tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>COMPLETE DEMO ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
