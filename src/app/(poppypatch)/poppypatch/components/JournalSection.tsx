import React, { useState } from 'react';
import { JournalArticle, JournalCategory } from '../data/poppyPatchData';
import { filterJournalArticles } from '../utils/storeLogic';
import { BookOpen } from 'lucide-react';

interface JournalSectionProps {
  articles: JournalArticle[];
  onReadArticle: (article: JournalArticle) => void;
}

const CATEGORIES: Array<'All' | JournalCategory> = [
  'All',
  'Getting started',
  'Care',
  'Recipes'
];

export function JournalSection({ articles, onReadArticle }: JournalSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | JournalCategory>('All');

  const visibleArticles = filterJournalArticles(articles, activeCategory);

  return (
    <section
      id="the-journal"
      aria-labelledby="journal-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/50"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header + Filter Tabs Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              THE LITTLE GROWING JOURNAL
            </p>
            <h2
              id="journal-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Field notes, misting wisdom & skillet recipes.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Filter journal stories by topic"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F0E2C8] border border-[#4A2E25]/15"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                const count =
                  category === 'All'
                    ? articles.length
                    : articles.filter((a) => a.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#4A2E25] ${
                      isActive
                        ? 'bg-[#4A2E25] text-[#FAF3E3] shadow-sm'
                        : 'text-[#4A2E25] hover:bg-[#FAF3E3]/70'
                    }`}
                  >
                    <span>{category === 'All' ? 'All Notes' : category}</span>
                    <span className="ml-1.5 opacity-75 tabular-nums">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtered Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleArticles.map((article) => (
            <article
              key={article.id}
              className="card-papier bg-[#FAF3E3] border border-[#4A2E25]/15 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Thumbnail */}
                <div
                  style={{ backgroundColor: article.accentTint }}
                  className="w-full aspect-[16/10] rounded-2xl border border-[#4A2E25]/10 mb-5 flex items-center justify-center p-4 overflow-hidden"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    width={260}
                    height={180}
                    referrerPolicy="no-referrer"
                    className="w-36 h-36 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_10px_14px_rgba(90,54,40,0.18)]"
                  />
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7A5447] mb-2">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.seasonNote}</span>
                </div>

                <h3 className="font-serif-display font-bold text-xl text-[#4A2E25] leading-snug mb-2.5 group-hover:text-[#B85338] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-[#563A32] leading-relaxed mb-5">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#4A2E25]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onReadArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#4A2E25] hover:text-[#B85338] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4A2E25] rounded"
                >
                  <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Read Field Note →</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
