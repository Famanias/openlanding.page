'use client';

import React, { useEffect, useRef } from 'react';
import { BasketLineItem, ProduceId } from '../basket/model';
import { SafeImage } from './SafeImage';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lines: BasketLineItem[];
  totalCount: number;
  sampleSubtotal: number;
  onAdd: (id: ProduceId) => void;
  onDecrement: (id: ProduceId) => void;
  onRemove: (id: ProduceId) => void;
  onClear: () => void;
  basketPillRef: React.RefObject<HTMLButtonElement | null>;
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({
  isOpen,
  onClose,
  lines,
  totalCount,
  sampleSubtotal,
  onAdd,
  onDecrement,
  onRemove,
  onClear,
  basketPillRef,
}) => {
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => drawerCloseRef.current?.focus(), 30);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        basketPillRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, basketPillRef]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mm-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
          basketPillRef.current?.focus();
        }
      }}
    >
      <div className="bg-[#FDF5E7] text-[#24211D] border-l-2 border-[#24211D] w-full max-w-md h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b-2 border-[#24211D] pb-4">
            <div>
              <div className="mm-mono text-[11px] font-bold text-[#D94C32] tracking-wider uppercase">
                ILLUSTRATIVE MARKET BASKET
              </div>
              <h3 id="mm-drawer-title" className="mm-display font-extrabold text-2xl">
                Your Harvest Crate ({totalCount})
              </h3>
            </div>
            <button
              ref={drawerCloseRef}
              type="button"
              onClick={() => {
                onClose();
                basketPillRef.current?.focus();
              }}
              className="px-3 py-1 bg-[#24211D] text-[#FDF5E7] mm-mono text-xs rounded cursor-pointer hover:bg-[#3F7047] transition-colors"
            >
              Esc / Close
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="py-12 text-center space-y-2 border-2 border-dashed border-[#24211D]/30 rounded-xl p-6">
              <div className="mm-display font-bold text-xl">Your crate is empty</div>
              <p className="text-xs text-[#24211D]/75">
                Add seasonal vegetables, fruit, or hearth bread from the shelf to preview your sample box.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.product.id}
                  className="bg-white border-2 border-[#24211D] rounded-lg p-3 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#24211D]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      <SafeImage
                        src={line.product.image}
                        alt={line.product.name}
                        fallbackTint="transparent"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{line.product.name}</div>
                      <div className="mm-mono text-[11px] text-[#24211D]/70">
                        ${line.product.samplePrice.toFixed(2)} each · Subtotal $
                        {line.lineSubtotal.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onDecrement(line.product.id)}
                      aria-label={`Decrease ${line.product.name}`}
                      className="w-7 h-7 border border-[#24211D] rounded mm-mono text-xs font-bold hover:bg-[#F2C94D] transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="mm-mono text-xs font-bold w-5 text-center">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      disabled={line.qty >= line.product.maxQty}
                      onClick={() => onAdd(line.product.id)}
                      aria-label={`Increase ${line.product.name}`}
                      className="w-7 h-7 border border-[#24211D] rounded mm-mono text-xs font-bold hover:bg-[#F2C94D] disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(line.product.id)}
                      aria-label={`Remove ${line.product.name} from basket`}
                      className="ml-1 px-1.5 py-1 text-[10px] mm-mono bg-[#D94C32]/15 text-[#D94C32] rounded hover:bg-[#D94C32] hover:text-white transition-colors cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-[#24211D] pt-4 space-y-3 mt-6">
          <div className="flex items-center justify-between mm-mono text-base font-bold">
            <span>SAMPLE SUBTOTAL</span>
            <span className="text-xl text-[#D94C32]">${sampleSubtotal.toFixed(2)}</span>
          </div>
          <p className="mm-mono text-[11px] text-[#24211D]/75">
            Sample basket only — no checkout, delivery scheduling, or payment is performed.
          </p>
          <div className="flex gap-2">
            {lines.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="px-4 py-2.5 border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold uppercase hover:bg-[#D94C32]/15 transition-colors cursor-pointer"
              >
                Clear Crate
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onClose();
                document.getElementById('mm-checkout')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 py-2.5 bg-[#3F7047] text-[#FDF5E7] border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold uppercase hover:bg-[#315938] transition-colors cursor-pointer"
            >
              View Sample Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
