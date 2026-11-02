import React, { useState } from 'react';
import { JournalArticle, MushroomKit } from '../data/poppyPatchData';
import { BagItem, calculateBagSummary } from '../utils/storeLogic';
import { X, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface KitDetailModalProps {
  kit: MushroomKit | null;
  onClose: () => void;
  onAddToBag: (kit: MushroomKit) => void;
}

export function KitDetailModal({ kit, onClose, onAddToBag }: KitDetailModalProps) {
  if (!kit) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1812]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-papier bg-[#FAF3E3] border-2 border-[#4A2E25]/25 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#4A2E25]"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#4A2E25]/12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A4D38]">
              {kit.tag} · {kit.typicalDays}
            </span>
            <h2 id="kit-modal-title" className="font-serif-display font-bold text-2xl sm:text-3xl mt-0.5">
              {kit.name} — ${kit.price}
            </h2>
            <p className="text-sm text-[#69493E]">{kit.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close kit details dialog"
            className="w-10 h-10 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center hover:bg-[#E58267]/30 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 items-center">
          <div
            style={{ backgroundColor: kit.cardBg }}
            className="sm:col-span-5 aspect-square rounded-2xl p-4 flex items-center justify-center border border-[#4A2E25]/12"
          >
            <img
              src={kit.image}
              alt={kit.name}
              width={260}
              height={260}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="sm:col-span-7 space-y-4 text-sm">
            <p className="text-[15px] leading-relaxed text-[#4A2E25]">
              {kit.shortDescription}
            </p>

            <div>
              <h3 className="font-bold uppercase text-xs tracking-wider text-[#8A4D38] mb-1.5">
                What’s Inside the Kraft Box
              </h3>
              <ul className="space-y-1 text-[#563A32] list-disc list-inside">
                {kit.boxContents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7ECD6] border border-[#4A2E25]/12 space-y-1 text-xs text-[#563A32]">
              <p>
                <strong className="text-[#4A2E25]">Substrate:</strong> {kit.substrateInfo}
              </p>
              <p>
                <strong className="text-[#4A2E25]">Realistic harvest note:</strong> {kit.yieldNote}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#4A2E25]/12 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-[#4A2E25]/25 text-sm font-bold text-[#4A2E25] hover:bg-[#F2E3C6] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onAddToBag(kit);
              onClose();
            }}
            className="btn-clay-coral px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer"
          >
            Add {kit.name} to Bag · ${kit.price}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ArticleReaderModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1812]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-papier bg-[#FAF3E3] border-2 border-[#4A2E25]/25 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-9 text-[#4A2E25]"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#4A2E25]/12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A4D38] mb-1">
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.seasonNote}</span>
            </div>
            <h2 id="article-modal-title" className="font-serif-display font-bold text-2xl sm:text-3xl leading-snug">
              {article.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close journal article"
            className="w-10 h-10 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center hover:bg-[#E58267]/30 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-5">
          <div
            style={{ backgroundColor: article.accentTint }}
            className="w-full h-44 rounded-2xl border border-[#4A2E25]/12 flex items-center justify-center p-4"
          >
            <img
              src={article.image}
              alt={article.title}
              width={160}
              height={160}
              referrerPolicy="no-referrer"
              className="w-36 h-36 object-contain drop-shadow-md"
            />
          </div>

          {article.recipeIngredients && (
            <div className="p-5 rounded-2xl bg-[#E3EBC9]/60 border border-[#4A2E25]/15">
              <h3 className="font-serif-display font-bold text-lg text-[#4A2E25] mb-2">
                Skillet Ingredients
              </h3>
              <ul className="space-y-1 text-sm text-[#4A2E25] list-disc list-inside">
                {article.recipeIngredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 text-[15px] text-[#563A32] leading-relaxed">
            {article.bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/15">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A4D38] mb-2">
              Quick Countertop Takeaways
            </h3>
            <ul className="space-y-1.5 text-sm text-[#4A2E25] list-disc list-inside">
              {article.keyTakeaways.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#4A2E25]/12 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#4A2E25] text-[#FAF3E3] text-sm font-bold cursor-pointer"
          >
            Back to Journal
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQty: (kit: MushroomKit, delta: number) => void;
  onClearBag: () => void;
}

export function ShoppingBagDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onClearBag
}: ShoppingBagDrawerProps) {
  const [demoOrderPlaced, setDemoOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const summary = calculateBagSummary(items);

  const handlePlaceDemoOrder = () => {
    setDemoOrderPlaced(true);
    onClearBag();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A1812]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF3E3] h-full shadow-2xl border-l border-[#4A2E25]/20 flex flex-col justify-between p-6 text-[#4A2E25]"
      >
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#4A2E25]/15">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 id="bag-drawer-title" className="font-serif-display font-bold text-2xl">
                Your Growing Bag
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setDemoOrderPlaced(false);
                onClose();
              }}
              aria-label="Close shopping bag"
              className="w-9 h-9 rounded-full bg-[#F7ECD6] border border-[#4A2E25]/20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {items.length > 0 && (
            <div className="my-4 p-3.5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/12 text-xs">
              {summary.qualifiesForFreeShipping ? (
                <p className="font-bold text-[#3E5216]">
                  ✦ Your patch qualifies for complimentary studio shipping!
                </p>
              ) : (
                <p className="text-[#563A32]">
                  Add <strong className="font-bold text-[#4A2E25] tabular-nums">${summary.amountToFreeShipping}</strong> more for free shipping (orders $55+).
                </p>
              )}
            </div>
          )}

          {/* Bag Contents or Demo Order Confirmation */}
          {demoOrderPlaced ? (
            <div className="my-8 p-6 rounded-3xl bg-[#E3EBC9] border border-[#4A2E25]/20 space-y-3 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#2E3A13] mx-auto" />
              <h3 className="font-serif-display font-bold text-2xl text-[#2E3A13]">
                Demo Patch Preview Reserved!
              </h3>
              <p className="text-sm text-[#3A461C] leading-relaxed">
                Poppy Patch is a fictional concept showcase—no payment was processed or charged. Happy countertop growing!
              </p>
              <button
                type="button"
                onClick={() => {
                  setDemoOrderPlaced(false);
                  onClose();
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#4A2E25] text-[#FAF3E3] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <img
                src="/templates/poppypatch/cutout-cream-mushrooms.png"
                alt=""
                width={100}
                height={100}
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-contain mx-auto opacity-85"
              />
              <p className="font-serif-display font-bold text-xl text-[#4A2E25]">
                Your bag is waiting for its first sprout.
              </p>
              <p className="text-sm text-[#69493E] max-w-[28ch] mx-auto">
                Explore our starter kits to bring a miniature mushroom garden to your kitchen counter.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#4A2E25]/12 max-h-[52vh] overflow-y-auto pr-1">
              {items.map(({ kit, quantity }) => (
                <li key={kit.id} className="py-4 flex items-center gap-4">
                  <div
                    style={{ backgroundColor: kit.cardBg }}
                    className="w-16 h-16 rounded-xl p-2 border border-[#4A2E25]/12 shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={kit.image}
                      alt={kit.name}
                      width={56}
                      height={56}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-display font-bold text-base text-[#4A2E25] truncate">
                      {kit.name}
                    </h3>
                    <p className="text-xs text-[#69493E] truncate">{kit.subtitle}</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-[#F7ECD6] rounded-lg px-2 py-1 border border-[#4A2E25]/15">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(kit, -1)}
                        aria-label={`Decrease quantity of ${kit.name}`}
                        className="p-0.5 hover:text-[#B85338] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold tabular-nums px-1">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(kit, 1)}
                        aria-label={`Increase quantity of ${kit.name}`}
                        className="p-0.5 hover:text-[#B85338] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-serif-display font-bold text-base tabular-nums">
                    ${kit.price * quantity}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bag Footer */}
        {items.length > 0 && !demoOrderPlaced && (
          <div className="pt-4 border-t border-[#4A2E25]/15 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#563A32]">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold">${summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#563A32]">
                <span>Estimated Shipping</span>
                <span className="tabular-nums font-semibold">
                  {summary.shippingEstimate === 0 ? 'Free' : `$${summary.shippingEstimate}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-display font-bold text-[#4A2E25] pt-1 border-t border-[#4A2E25]/10">
                <span>Total (Demo Preview)</span>
                <span className="tabular-nums">${summary.grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceDemoOrder}
              className="w-full btn-clay-coral py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-[#4A2E25] cursor-pointer"
            >
              Complete Demo Order Preview
            </button>
            <p className="text-[11px] text-center text-[#69493E]">
              Fictional concept brand · No real checkout or payment is collected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
