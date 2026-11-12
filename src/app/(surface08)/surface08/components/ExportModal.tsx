'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, FileCode } from 'lucide-react';
import type { BackgroundEffect } from '../engine/effectTypes';
import { getExportBundleForEffect } from '../export/componentSourceRegistry';
import { copyTextToClipboard, downloadEffectZipBundle } from '../export/exportBundle';

export interface ExportModalProps {
  open: boolean;
  activeEffect: BackgroundEffect;
  interaction: number;
  speed: number;
  paletteIndex: number;
  onClose: () => void;
}

export function ExportModal({
  open,
  activeEffect,
  interaction,
  speed,
  paletteIndex,
  onClose,
}: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'snippet' | 'source' | 'readme'>('snippet');
  const [copied, setCopied] = useState(false);
  const [downloadedZipName, setDownloadedZipName] = useState<string | null>(null);

  if (!open) return null;

  const bundle = getExportBundleForEffect(activeEffect, interaction, speed, paletteIndex);

  const displayedCode =
    activeTab === 'snippet'
      ? bundle.integrationSnippet
      : activeTab === 'source'
      ? bundle.standaloneComponentCode
      : bundle.readmeMarkdown;

  const handleCopyCode = async () => {
    const ok = await copyTextToClipboard(displayedCode);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownloadZip = async () => {
    const filename = await downloadEffectZipBundle(
      activeEffect,
      interaction,
      speed,
      paletteIndex
    );
    setDownloadedZipName(filename);
    setTimeout(() => setDownloadedZipName(null), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75"
      data-ui-interactive="true"
    >
      <div className="relative flex flex-col w-full max-w-3xl max-h-[86vh] rounded-xl border border-white/20 bg-[#0b0d14] text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 id="export-modal-title" className="text-base font-semibold text-white">
              Export Reusable Surface · {activeEffect.indexNumber} {activeEffect.label}
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Self-contained React + TypeScript + Three.js module (`npm install three @types/three`)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Export Dialog"
            className="p-1.5 text-white/65 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Tabs & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#10131e] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('snippet')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'snippet'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Integration Snippet</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('source')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'source'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>{bundle.componentName}.tsx</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('readme')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'readme'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <span>README.md</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#181d2c] hover:bg-[#22293d] border border-white/15 text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadZip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#ff6b4a] hover:bg-[#ff8164] text-[#08090d] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              <span>
                {downloadedZipName ? `Saved ${downloadedZipName}` : 'Download .ZIP Bundle'}
              </span>
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-auto p-6 bg-[#07090e]">
          <pre className="text-xs font-tech-mono leading-relaxed text-white/90 overflow-x-auto">
            <code>{displayedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
