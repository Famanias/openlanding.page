'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Download, Pencil } from 'lucide-react';
import { FOLD_CONSTANTS, PRINT_SPECS } from '../fold/config';
import { deriveFold, FoldMetrics, formatMeters } from '../fold/geometry';
import { useFold } from '../fold/FoldProvider';
import { usesActivePrintColor } from '../fold/state';
import {
  BriefDesignSnapshot,
  BriefErrors,
  BriefFields,
  buildBriefText,
  formatColorWithPreset,
  formatViewSummary,
  ROOM_OPTIONS,
  validateBrief,
} from './brief';

interface SubmittedSnapshot {
  fields: BriefFields;
  snapshot: BriefDesignSnapshot;
  metrics: FoldMetrics;
  receiptText: string;
}

export const BriefForm: React.FC = () => {
  const {
    design,
    view,
    effectiveOpening,
    effectivePose,
    env,
    uploadedArt,
    getLiveOpening,
  } = useFold();

  const [fields, setFields] = useState<BriefFields>({
    projectName: '',
    room: '',
    notes: '',
  });
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<'editing' | 'preparing' | 'ready'>(
    'editing',
  );
  const [submitted, setSubmitted] = useState<SubmittedSnapshot | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const roomSelectRef = useRef<HTMLSelectElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prepareTimerRef = useRef<number>(0);
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (prepareTimerRef.current) clearTimeout(prepareTimerRef.current);
      if (activeUrlRef.current) URL.revokeObjectURL(activeUrlRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'preparing') return;

    const validationErrors = validateBrief(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.projectName) {
        nameInputRef.current?.focus();
      } else if (validationErrors.room) {
        roomSelectRef.current?.focus();
      } else if (validationErrors.notes) {
        notesInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const liveOpening = getLiveOpening();
    const capturedSnapshot: BriefDesignSnapshot = {
      design: {
        ...design,
        opening: liveOpening,
      },
      view: { ...view },
      uploadedImageName:
        design.print === 'upload' && uploadedArt ? uploadedArt.filename : null,
    };
    const capturedPose = deriveFold(liveOpening);
    const cleanFields: BriefFields = {
      projectName: fields.projectName.trim(),
      room: fields.room,
      notes: fields.notes.trim(),
    };
    const receiptText = buildBriefText(
      cleanFields,
      capturedSnapshot,
      capturedPose.metrics,
    );

    const finalize = () => {
      setSubmitted({
        fields: cleanFields,
        snapshot: capturedSnapshot,
        metrics: capturedPose.metrics,
        receiptText,
      });
      setStatus('ready');
      setAnnouncement('Your room brief is ready.');
      requestAnimationFrame(() => {
        successHeadingRef.current?.focus();
      });
    };

    if (env.reducedMotion) {
      finalize();
    } else {
      setStatus('preparing');
      prepareTimerRef.current = window.setTimeout(finalize, 220);
    }
  };

  const handleDownload = () => {
    if (!submitted) return;
    if (activeUrlRef.current) {
      URL.revokeObjectURL(activeUrlRef.current);
    }
    const blob = new Blob([submitted.receiptText], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    activeUrlRef.current = url;

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'serraform-room-brief.txt';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.setTimeout(() => {
      if (activeUrlRef.current === url) {
        URL.revokeObjectURL(url);
        activeUrlRef.current = null;
      }
    }, 1000);
  };

  const handleEdit = () => {
    setStatus('editing');
    requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });
  };

  if (status === 'ready' && submitted) {
    const snapDesign = submitted.snapshot.design;
    const snapPrintSpec = PRINT_SPECS[snapDesign.print];
    return (
      <div className="srf-receipt-card p-6 sm:p-8" data-testid="brief-receipt">
        <div className="srf-receipt-corner" aria-hidden="true" />

        <div className="inline-flex items-center gap-2 text-[var(--srf-oxblood)] srf-mono-caption mb-3">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--srf-sage)]/45">
            <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)]" aria-hidden="true" />
          </span>
          <span>Prepared locally · Nothing was sent</span>
        </div>

        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="srf-h3 text-[var(--srf-oxblood)] mb-2 focus:outline-none"
        >
          Your room brief is ready.
        </h3>
        <p className="text-[var(--srf-mauve)] text-base mb-6">
          Your design, shape, and notes are gathered below. Download a copy to keep them.
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-5 border-y border-[var(--srf-hairline)] text-sm">
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Project name</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] break-words">
              {submitted.fields.projectName}
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Room</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {submitted.fields.room}
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Base color</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                style={{ backgroundColor: snapDesign.baseHex }}
                aria-hidden="true"
              />
              <span>{formatColorWithPreset(snapDesign.baseHex)}</span>
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {snapPrintSpec.name}
            </dd>
          </div>
          {usesActivePrintColor(snapDesign) && (
            <div>
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print color</dt>
              <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                  style={{ backgroundColor: snapDesign.designHex }}
                  aria-hidden="true"
                />
                <span>{formatColorWithPreset(snapDesign.designHex)}</span>
              </dd>
            </div>
          )}
          {snapPrintSpec.usesScale && (
            <div>
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">
                {snapPrintSpec.scaleLabel}
              </dt>
              <dd className="font-medium text-[var(--srf-oxblood)]">
                {Math.round(snapDesign.motifScale)}%
              </dd>
            </div>
          )}
          {submitted.snapshot.uploadedImageName && (
            <div className="sm:col-span-2">
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Your image</dt>
              <dd className="font-medium text-[var(--srf-oxblood)] break-words">
                {submitted.snapshot.uploadedImageName} (local session only)
              </dd>
            </div>
          )}
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Opening</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {Math.round(snapDesign.opening)}%
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Outer span / depth</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {formatMeters(submitted.metrics.outerSpan)} ×{' '}
              {formatMeters(submitted.metrics.outerDepth)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Preview angle</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {formatViewSummary(submitted.snapshot.view)}
            </dd>
          </div>
          {submitted.fields.notes.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Notes</dt>
              <dd className="font-normal text-[var(--srf-oxblood)] whitespace-pre-wrap break-words mt-1">
                {submitted.fields.notes}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="srf-btn-primary"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download brief</span>
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="srf-btn-secondary"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span>Edit brief</span>
          </button>
        </div>

        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    );
  }

  const printSpec = PRINT_SPECS[design.print];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      <div className="lg:col-span-7 space-y-6">
        <div>
          <label
            htmlFor="srf-project-name"
            className="block text-base font-medium text-[var(--srf-oxblood)] mb-2"
          >
            Project name
          </label>
          <input
            ref={nameInputRef}
            id="srf-project-name"
            name="projectName"
            type="text"
            required
            maxLength={80}
            value={fields.projectName}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, projectName: val }));
              if (errors.projectName) {
                setErrors((prev) => ({ ...prev, projectName: undefined }));
              }
            }}
            aria-invalid={errors.projectName ? 'true' : undefined}
            aria-describedby={
              errors.projectName ? 'srf-project-name-error' : undefined
            }
            placeholder="e.g. Studio North Reading Room"
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)] placeholder:text-[var(--srf-mauve)]/65"
          />
          {errors.projectName && (
            <p
              id="srf-project-name-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.projectName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="srf-room-type"
            className="block text-base font-medium text-[var(--srf-oxblood)] mb-2"
          >
            Room
          </label>
          <select
            ref={roomSelectRef}
            id="srf-room-type"
            name="room"
            required
            value={fields.room}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, room: val }));
              if (errors.room) {
                setErrors((prev) => ({ ...prev, room: undefined }));
              }
            }}
            aria-invalid={errors.room ? 'true' : undefined}
            aria-describedby={errors.room ? 'srf-room-error' : undefined}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)]"
          >
            <option value="">Select a room type</option>
            {ROOM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.room && (
            <p
              id="srf-room-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.room}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label
              htmlFor="srf-notes"
              className="block text-base font-medium text-[var(--srf-oxblood)]"
            >
              Notes
            </label>
            <span className="srf-mono-caption text-[var(--srf-mauve)]">
              {fields.notes.length}/500
            </span>
          </div>
          <textarea
            ref={notesInputRef}
            id="srf-notes"
            name="notes"
            rows={4}
            value={fields.notes}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, notes: val }));
              if (errors.notes) {
                setErrors((prev) => ({ ...prev, notes: undefined }));
              }
            }}
            aria-invalid={errors.notes ? 'true' : undefined}
            aria-describedby={errors.notes ? 'srf-notes-error' : undefined}
            placeholder="Optional placement notes, daylight direction, or furniture clearance."
            className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)] placeholder:text-[var(--srf-mauve)]/65"
          />
          {errors.notes && (
            <p
              id="srf-notes-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.notes}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'preparing'}
            className="srf-btn-primary"
          >
            <span>
              {status === 'preparing' ? 'Preparing…' : 'Build your room brief'}
            </span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </button>

          <p className="srf-mono-caption text-[var(--srf-mauve)]">
            Prepared locally. Nothing is sent.
          </p>
        </div>
      </div>

      {/* Live studio configuration summary alongside form */}
      <aside
        aria-label="Current Fold 16 design configuration"
        data-testid="brief-live-summary"
        className="lg:col-span-5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] p-6"
      >
        <div className="srf-mono-caption text-[var(--srf-mauve)] mb-3">
          Included design
        </div>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="w-6 h-6 rounded-full border border-[var(--srf-oxblood)]/20 shrink-0"
            style={{ backgroundColor: design.baseHex }}
            aria-hidden="true"
          />
          <div className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--srf-oxblood)]">
            Fold {FOLD_CONSTANTS.panels} · {printSpec.name}
          </div>
        </div>

        <dl className="space-y-3 border-t border-[var(--srf-hairline)] pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Base color</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatColorWithPreset(design.baseHex)}
            </dd>
          </div>
          {usesActivePrintColor(design) && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">Print color</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
                {formatColorWithPreset(design.designHex)}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Print</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {printSpec.name}
            </dd>
          </div>
          {printSpec.usesScale && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">{printSpec.scaleLabel}</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
                {design.motifScale}%
              </dd>
            </div>
          )}
          {design.print === 'upload' && uploadedArt && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">Your image</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)] truncate max-w-[200px]">
                {uploadedArt.filename}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Opening</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {Math.round(effectiveOpening)}%
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Outer span</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatMeters(effectivePose.metrics.outerSpan)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Outer depth</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatMeters(effectivePose.metrics.outerDepth)}
            </dd>
          </div>
        </dl>
      </aside>
    </form>
  );
};
