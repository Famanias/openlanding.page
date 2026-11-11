'use client';

import React from 'react';

interface BasketPillProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  totalCount: number;
  sampleSubtotal: number;
  onOpen: () => void;
}

export const BasketPill: React.FC<BasketPillProps> = ({
  buttonRef,
  totalCount,
  sampleSubtotal,
  onOpen,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        ref={buttonRef}
        type="button"
        onClick={onOpen}
        aria-label={`Open sample produce basket drawer, ${totalCount} items, subtotal $${sampleSubtotal.toFixed(2)}`}
        className="px-5 py-3 bg-[#D94C32] text-[#FDF5E7] mm-mono text-xs font-bold uppercase rounded-full border-2 border-[#24211D] shadow-[4px_4px_0px_#24211D] hover:bg-[#b83b24] transition-colors cursor-pointer flex items-center gap-2.5"
      >
        <span>Crate Basket ({totalCount})</span>
        <span className="px-2 py-0.5 bg-[#F2C94D] text-[#24211D] rounded-full">
          ${sampleSubtotal.toFixed(2)}
        </span>
      </button>
    </div>
  );
};
