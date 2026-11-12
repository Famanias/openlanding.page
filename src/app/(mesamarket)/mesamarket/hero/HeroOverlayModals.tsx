'use client';

import React from 'react';
import { ArrowUpRight, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { fraunces, ibmPlexMono } from './fonts';
import {
  PRODUCE_CATALOG,
  type BasketItemInstance,
  type ProduceId,
} from './basketState';
import type { NavTopic } from './TopNav';

interface BasketDrawerProps {
  open: boolean;
  items: BasketItemInstance[];
  onClose: () => void;
  onAddProduce: (produceId: ProduceId) => void;
  onRemoveInstance: (instanceId: string) => void;
  onClearBasket: () => void;
  onBuildCurated: () => void;
}

export function BasketDrawer({
  open,
  items,
  onClose,
  onAddProduce,
  onRemoveInstance,
  onClearBasket,
  onBuildCurated,
}: BasketDrawerProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Harvest Basket"
      className="fixed inset-0 z-40 flex justify-end bg-[#1A1714]/25"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#F7F1E5] border-l border-[#1E1A17]/20 px-6 py-7 flex flex-col justify-between shadow-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#1E1A17]/15">
            <div>
              <p
                className={`${ibmPlexMono.className} text-[11px] uppercase tracking-[0.08em] text-[#5B5248]`}
              >
                CAPAY &amp; SONOMA CRATE
              </p>
              <h2
                className={`${fraunces.className} text-2xl font-bold text-[#181512] mt-0.5`}
              >
                Your Harvest Basket
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Basket Drawer"
              className="w-10 h-10 rounded-full border border-[#1E1A17]/25 flex items-center justify-center text-[#1E1A17] hover:bg-[#1E1A17]/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-left">
              <p className="text-[15.5px] text-[#3B342D] leading-relaxed mb-6">
                Your wooden harvest crate is currently empty. Click any seasonal
                produce around the crate — or build a curated assortment — to pack
                your box.
              </p>
              <button
                type="button"
                onClick={() => {
                  onBuildCurated();
                  onClose();
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#D85432] hover:bg-[#C44727] text-[#FDF9F2] px-6 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Fill Curated Harvest Crate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-4 divide-y divide-[#1E1A17]/10">
              {items.map((inst) => {
                const spec = PRODUCE_CATALOG[inst.produceId];
                return (
                  <div
                    key={inst.instanceId}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-[#181512] truncate">
                        {spec.name}
                      </p>
                      <p className="text-xs text-[#5B5248] truncate">
                        {spec.farm} · {spec.unitLabel}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onAddProduce(inst.produceId)}
                        aria-label={`Add another ${spec.name}`}
                        className="w-8 h-8 rounded-full border border-[#1E1A17]/25 flex items-center justify-center text-[#1E1A17] hover:bg-[#1E1A17]/5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveInstance(inst.instanceId)}
                        aria-label={`Remove ${spec.name} item ${inst.addedSeq}`}
                        className="w-8 h-8 rounded-full border border-[#D85432]/40 flex items-center justify-center text-[#D85432] hover:bg-[#D85432]/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-[#1E1A17]/15 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClearBasket}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1E1A17]/30 px-4 py-2.5 text-xs font-medium text-[#1E1A17] hover:bg-[#1E1A17]/5 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Empty Crate</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D85432] hover:bg-[#C44727] text-[#FDF9F2] px-5 py-2.5 text-xs font-medium cursor-pointer whitespace-nowrap"
            >
              <span>Continue Packing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface HarvestManifestModalProps {
  topic: NavTopic | null;
  onClose: () => void;
  onAddProduce: (produceId: ProduceId) => void;
}

const TOPIC_COPY: Record<
  NavTopic,
  { kicker: string; title: string; subtitle: string }
> = {
  shop: {
    kicker: 'THIS WEEK’S HARVEST MANIFEST',
    title: 'Picked within 24 hours of delivery.',
    subtitle:
      'Add individual bunches, orchard fruit, or small-batch pantry staples directly into your 2.5D wooden crate.',
  },
  'how-it-works': {
    kicker: 'FARM-TO-DOOR IN THREE STEPS',
    title: 'Interactive custom crate packing.',
    subtitle:
      'Click any produce item around the crate to toss it in with unlimited quantities, or click any item inside the crate to remove just that piece.',
  },
  'our-farms': {
    kicker: 'CAPAY VALLEY & SONOMA COUNTY',
    title: '100% certified organic partner growers.',
    subtitle:
      'We partner directly with family-run orchards, dry-farmed tomato fields, and heritage hearth bakeries across Northern California.',
  },
  stories: {
    kicker: 'FIELD NOTES — AUTUMN HARVEST',
    title: 'Why dry-farmed Early Girls & Goldrush apples shine now.',
    subtitle:
      'Cool coastal fog paired with warm valley afternoons concentrates natural sugars in late-season tomatoes, peppers, and orchard apples.',
  },
};

export function HarvestManifestModal({
  topic,
  onClose,
  onAddProduce,
}: HarvestManifestModalProps) {
  if (!topic) return null;
  const header = TOPIC_COPY[topic];
  const allProduce = Object.values(PRODUCE_CATALOG);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={header.title}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#1A1714]/25 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] bg-[#F7F1E5] border-[1.5px] border-[#1E1A17] rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#1E1A17]/15">
          <div>
            <p
              className={`${ibmPlexMono.className} text-[11.5px] uppercase tracking-[0.08em] text-[#5B5248]`}
            >
              {header.kicker}
            </p>
            <h2
              className={`${fraunces.className} text-2xl sm:text-3xl font-bold text-[#181512] mt-1`}
            >
              {header.title}
            </h2>
            <p className="text-sm text-[#3B342D] mt-2 leading-relaxed max-w-xl">
              {header.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Harvest Dialog"
            className="w-10 h-10 rounded-full border border-[#1E1A17]/25 flex items-center justify-center text-[#1E1A17] hover:bg-[#1E1A17]/5 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5">
          {allProduce.map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl border border-[#1E1A17]/15 bg-[#EFE7D6]/55 p-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-[#181512]">
                    {prod.name}
                  </h3>
                  <span className="text-xs text-[#5B5248] whitespace-nowrap">
                    {prod.unitLabel}
                  </span>
                </div>
                <p className="text-xs text-[#5B5248] mt-0.5">{prod.farm}</p>
                <p className="text-xs text-[#332C26] mt-2 leading-relaxed">
                  {prod.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAddProduce(prod.id);
                  onClose();
                }}
                className="self-start inline-flex items-center gap-1.5 rounded-full border border-[#1E1A17] px-3.5 py-1.5 text-xs font-medium text-[#181512] hover:bg-[#D85432] hover:border-[#D85432] hover:text-[#FDF9F2] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Toss Into Crate</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
