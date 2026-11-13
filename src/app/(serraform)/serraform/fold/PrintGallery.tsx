'use client';

import React, { useEffect, useRef } from 'react';
import { Check, ImagePlus, RefreshCw, Trash2 } from 'lucide-react';
import { renderTextileToCanvas } from './artwork';
import { BUILTIN_PRINT_ORDER, PRINT_SPECS, PrintId } from './config';
import { useFold } from './FoldProvider';

const SwatchPreviewCanvas: React.FC<{
  printId: PrintId;
  baseHex: string;
  designHex: string;
  motifScale: number;
  tintUpload?: boolean;
  uploadedBitmap?: ImageBitmap | null;
}> = ({ printId, baseHex, designHex, motifScale, tintUpload, uploadedBitmap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderTextileToCanvas(
        canvas,
        {
          baseHex,
          designHex,
          print: printId,
          motifScale,
          tintUpload,
        },
        uploadedBitmap ?? null,
      );
    });
    return () => cancelAnimationFrame(id);
  }, [printId, baseHex, designHex, motifScale, tintUpload, uploadedBitmap]);

  return (
    <canvas
      ref={canvasRef}
      width={192}
      height={108}
      aria-hidden="true"
      className="w-full h-14 object-cover rounded-[4px] border border-[var(--srf-oxblood)]/15 block"
    />
  );
};

export const PrintGallery: React.FC<{
  idPrefix?: string;
  onAnnounce?: (msg: string) => void;
}> = ({ idPrefix = 'srf', onAnnounce }) => {
  const {
    design,
    uploadedArt,
    uploadError,
    isUploading,
    setPrint,
    setMotifScale,
    setTintUpload,
    uploadFile,
    clearUpload,
    clearUploadError,
  } = useFold();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const printSpec = PRINT_SPECS[design.print];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value so re-choosing the same file works cleanly
    e.target.value = '';
    if (!file) return;
    await uploadFile(file);
    onAnnounce?.(`Processed image selection.`);
  };

  const triggerFilePicker = () => {
    clearUploadError();
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Textile print library">
        {BUILTIN_PRINT_ORDER.map((id) => {
          const spec = PRINT_SPECS[id];
          const active = design.print === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setPrint(id);
                onAnnounce?.(`Print set to ${spec.name}.`);
              }}
              className={`group flex flex-col gap-2 p-2 rounded-[8px] border text-left transition-colors ${
                active
                  ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
                  : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)] bg-[var(--srf-rose)]'
              }`}
            >
              <SwatchPreviewCanvas
                printId={id}
                baseHex={design.baseHex}
                designHex={design.designHex}
                motifScale={id === design.print ? design.motifScale : 100}
              />
              <div className="flex items-center justify-between gap-1 px-0.5">
                <span className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
                  {spec.name}
                </span>
                {active && (
                  <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
                )}
              </div>
            </button>
          );
        })}

        {/* Your image tile */}
        <button
          type="button"
          aria-pressed={design.print === 'upload' && Boolean(uploadedArt)}
          onClick={() => {
            if (uploadedArt) {
              setPrint('upload');
              onAnnounce?.(`Print set to Your image.`);
            } else {
              triggerFilePicker();
            }
          }}
          className={`flex flex-col gap-2 p-2 rounded-[8px] border text-left transition-colors ${
            design.print === 'upload' && uploadedArt
              ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
              : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)] bg-[var(--srf-rose)]'
          }`}
        >
          {uploadedArt ? (
            design.tintUpload ? (
              <SwatchPreviewCanvas
                printId="upload"
                baseHex={design.baseHex}
                designHex={design.designHex}
                motifScale={design.motifScale}
                tintUpload
                uploadedBitmap={uploadedArt.bitmap}
              />
            ) : (
              <img
                src={uploadedArt.previewUrl}
                alt=""
                className="w-full h-14 object-cover rounded-[4px] border border-[var(--srf-oxblood)]/15 block"
              />
            )
          ) : (
            <div className="w-full h-14 rounded-[4px] border border-dashed border-[var(--srf-hairline-strong)] bg-[var(--srf-surface-soft)] flex flex-col items-center justify-center gap-1 text-[var(--srf-mauve)]">
              <ImagePlus className="w-4 h-4 text-[var(--srf-oxblood)]" aria-hidden="true" />
              <span className="srf-mono-caption text-[11px]">
                {isUploading ? 'Opening…' : 'PNG / JPEG / WebP'}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-1 px-0.5">
            <span className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
              Your image
            </span>
            {design.print === 'upload' && uploadedArt && (
              <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
            )}
          </div>
        </button>
      </div>

      {/* Hidden native file input strictly filtered to PNG/JPEG/WebP */}
      <input
        ref={fileInputRef}
        type="file"
        data-testid={`${idPrefix}-upload-input`}
        accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload custom artwork image (PNG, JPEG, or WebP)"
      />

      {/* Uploaded artwork active session details + opt-in tint + Replace/Remove controls */}
      {uploadedArt && (
        <div className="p-3.5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
                {uploadedArt.filename}
              </div>
              <div className="srf-mono-caption text-[var(--srf-mauve)]">
                Your image stays in this browser session.
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2.5 pt-0.5 cursor-pointer select-none">
            <input
              id={`${idPrefix}-tint-upload-toggle`}
              data-testid={`${idPrefix}-tint-upload-toggle`}
              type="checkbox"
              checked={Boolean(design.tintUpload)}
              onChange={(e) => {
                setTintUpload(e.target.checked);
                onAnnounce?.(
                  e.target.checked
                    ? 'Applied Print Color tint to uploaded artwork.'
                    : 'Restored original colors on uploaded artwork.',
                );
              }}
              className="mt-0.5 h-4 w-4 accent-[var(--srf-oxblood)] rounded shrink-0"
            />
            <span className="text-xs text-[var(--srf-oxblood)] leading-snug">
              <span className="font-medium block">Tint uploaded image with Print color</span>
              <span className="srf-mono-caption text-[var(--srf-mauve)] block">
                Off by default — preserves original colors unless enabled.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={triggerFilePicker}
              className="srf-btn-secondary !min-h-[38px] !py-1.5 !px-3 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replace image</span>
            </button>
            <button
              type="button"
              onClick={() => {
                clearUpload();
                onAnnounce?.('Removed uploaded image and returned to Solid.');
              }}
              className="srf-btn-secondary !min-h-[38px] !py-1.5 !px-3 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Remove image</span>
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p
          role="alert"
          data-testid={`${idPrefix}-upload-error`}
          className="text-xs font-medium text-[var(--srf-clay)] bg-[var(--srf-porcelain)] border border-[var(--srf-clay)]/35 rounded-[6px] px-3 py-2"
        >
          {uploadError}
        </p>
      )}

      {/* Scale range: Motif size or Artwork zoom (50–200%, step 5%) */}
      <div className="pt-1">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <label
            htmlFor={`${idPrefix}-scale-range`}
            className="text-sm font-medium text-[var(--srf-oxblood)]"
          >
            {printSpec.scaleLabel}
          </label>
          <span className="srf-mono-dim text-[var(--srf-oxblood)]">
            {design.motifScale}%
          </span>
        </div>

        <input
          id={`${idPrefix}-scale-range`}
          type="range"
          min={50}
          max={200}
          step={5}
          disabled={!printSpec.usesScale}
          value={design.motifScale}
          onChange={(e) => setMotifScale(Number(e.target.value))}
          className={`srf-range !h-9 ${!printSpec.usesScale ? 'opacity-45 cursor-not-allowed' : ''}`}
        />

        <p className="srf-mono-caption text-[var(--srf-mauve)]">
          {!printSpec.usesScale
            ? 'Motif size is unavailable on Solid felt.'
            : design.print === 'landscape' || design.print === 'upload'
              ? '100% fits across all 16 panels; higher zooms in evenly.'
              : 'Adjust pattern repeat scale across the continuous sheet.'}
        </p>
      </div>
    </div>
  );
};
