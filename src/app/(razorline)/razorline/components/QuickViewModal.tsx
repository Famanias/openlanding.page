"use client";

import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { ProductModel, US_SHOE_SIZES } from '../data/catalog';

interface QuickViewModalProps {
  model: ProductModel | null;
  selectedSize: number;
  onSelectSize: (modelId: string, size: number) => void;
  onAddToBag: (model: ProductModel, size: number) => void;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  model,
  selectedSize,
  onSelectSize,
  onAddToBag,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'macro'>('profile');

  useEffect(() => {
    setActiveTab('profile');
  }, [model?.id]);

  useEffect(() => {
    if (!model) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [model, onClose]);

  if (!model) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0B0A]/85 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl bg-[#111210] border border-[#D3FF35]/60 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-[#D3FF35] uppercase">
              SPECIFICATION SHEET // {model.code}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view dialog"
            className="w-9 h-9 border border-[#F1F0E9]/20 hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visual Switcher (6 columns) */}
          <div className="lg:col-span-6">
            <div className="h-64 sm:h-72 bg-[#0B0B0A] border border-[#F1F0E9]/15 flex items-center justify-center p-4 bg-blueprint-grid mb-3 overflow-hidden">
              <img
                src={activeTab === 'profile' ? model.heroImage : model.detailImage}
                alt={model.altText}
                width={640}
                height={500}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  activeTab === 'profile' ? 'object-contain' : 'object-cover'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`h-10 font-mono-tech text-xs uppercase cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                    : 'bg-[#0B0B0A] text-[#F1F0E9]/70 border border-[#F1F0E9]/15'
                }`}
              >
                01. LATERAL PROFILE
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('macro')}
                className={`h-10 font-mono-tech text-xs uppercase cursor-pointer ${
                  activeTab === 'macro'
                    ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                    : 'bg-[#0B0B0A] text-[#F1F0E9]/70 border border-[#F1F0E9]/15'
                }`}
              >
                02. MACRO CHASSIS
              </button>
            </div>
          </div>

          {/* Right Specifications & Full Size Matrix (6 columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#777A7A] mb-1">{model.statusLabel}</div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  id="quickview-title"
                  className="font-display italic font-black text-3xl sm:text-4xl text-[#F1F0E9] uppercase"
                >
                  {model.name}
                </h2>
                <span className="font-mono-tech text-2xl font-bold text-[#D3FF35]">
                  ${model.price}
                </span>
              </div>

              <p className="text-[#F1F0E9]/80 text-sm leading-relaxed mb-5">
                {model.description}
              </p>

              {/* Architecture Notes */}
              <div className="mb-5 border-y border-[#F1F0E9]/10 py-3.5 space-y-1.5">
                {model.architectureNotes.map((note, idx) => (
                  <div key={idx} className="font-mono-tech text-xs text-[#F1F0E9]/75">
                    0{idx + 1}. {note}
                  </div>
                ))}
              </div>

              {/* Full US Size Matrix */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tech text-xs text-[#777A7A] uppercase">
                    FULL SIZE RUN (US)
                  </span>
                  <span className="font-mono-tech text-xs text-[#D3FF35]">
                    SELECTED: US {selectedSize.toFixed(1)}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {US_SHOE_SIZES.map((size) => {
                    const available = model.availableSizes.includes(size);
                    const selected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!available}
                        onClick={() => onSelectSize(model.id, size)}
                        aria-pressed={selected}
                        className={`h-9 font-mono-tech text-xs cursor-pointer ${
                          selected
                            ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                            : available
                            ? 'bg-[#0B0B0A] text-[#F1F0E9] border border-[#F1F0E9]/20 hover:border-[#F1F0E9]/60'
                            : 'bg-[#0B0B0A]/40 text-[#777A7A]/35 border border-[#F1F0E9]/5 cursor-not-allowed line-through'
                        }`}
                      >
                        {size.toFixed(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToBag(model, selectedSize);
                onClose();
              }}
              className="w-full h-12 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-lg tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ADD TO BAG · US {selectedSize.toFixed(1)} · ${model.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
