"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { staggerDelay } from "../motion/math";
import { FILTERS, JOBS, countByFilter, countLabel, filterJobs, jobLabel, stepIndex, type JobFilter } from "./jobs";

/**
 * The photo job log: filter chips, a column-flow grid of tickets, and a native <dialog> viewer.
 * Changing the filter re-keys the grid so the matching tiles drop back in; the viewer steps through
 * whatever the filter is showing.
 */
export function JobLog() {
  const [filter, setFilter] = useState<JobFilter>("all");
  const [filtered, setFiltered] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement | null>(null);

  const shown = filterJobs(JOBS, filter);
  const job = viewing === null ? null : shown[viewing];

  const choose = (next: JobFilter) => {
    if (next === filter) return;
    setFilter(next);
    setFiltered(true);
  };

  const step = (delta: number) => setViewing((index) => (index === null ? index : stepIndex(index, delta, shown.length)));

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (viewing !== null && !node.open) {
      node.showModal();
      document.documentElement.classList.add("tv-locked");
    }
    if (viewing === null && node.open) node.close();
  }, [viewing]);

  const onClose = () => {
    document.documentElement.classList.remove("tv-locked");
    setViewing(null);
  };

  return (
    <div className="tv-log-body" data-tv-log data-filter={filter}>
      <div className="tv-filters" role="group" aria-label="Filter the job log by kind of work">
        {FILTERS.map((item) => (
          <button key={item.id} type="button" className="tv-filter tv-gauge" aria-pressed={item.id === filter} onClick={() => choose(item.id)} data-tv-filter={item.id}>
            {item.label}
            <span className="tv-filter-count">{countByFilter(JOBS, item.id)}</span>
          </button>
        ))}
      </div>
      <p className="tv-log-count tv-gauge" aria-live="polite" data-tv-count>
        {countLabel(shown.length, JOBS.length)}
      </p>

      <ul className="tv-log-grid" key={filter} data-filtered={filtered}>
        {shown.map((item, index) => (
          <li key={item.no} className="tv-job" style={{ "--d": `${staggerDelay(index, 45, 540)}ms` } as CSSProperties}>
            <button type="button" className="tv-job-open" onClick={() => setViewing(index)} aria-label={`${jobLabel(item.no)}: ${item.title}. Open photo.`}>
              <span className="tv-job-photo">
                <Picture assetKey={item.assetKey} alt={item.alt} sizes="(min-width: 1100px) 24vw, (min-width: 700px) 32vw, 48vw" />
              </span>
              <span className="tv-job-meta">
                <span className="tv-job-no tv-gauge">
                  {jobLabel(item.no)} · {item.kind === "built" ? "Built" : item.kind}
                </span>
                <span className="tv-job-title">{item.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="tv-viewer"
        aria-label="Job photo"
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        data-lenis-prevent
      >
        {job ? (
          <div className="tv-viewer-card">
            <div className="tv-viewer-photo" key={job.no}>
              <Picture assetKey={job.assetKey} alt={job.alt} sizes="(min-width: 900px) 70vw, 100vw" />
            </div>
            <div className="tv-viewer-foot">
              <div className="tv-viewer-text" aria-live="polite">
                <p className="tv-gauge tv-viewer-no">
                  {jobLabel(job.no)} · {(viewing ?? 0) + 1} of {shown.length}
                </p>
                <p className="tv-viewer-title">{job.title}</p>
                <p className="tv-viewer-note">{job.note}</p>
              </div>
              <div className="tv-viewer-keys">
                <button type="button" className="tv-key" onClick={() => step(-1)} aria-label="Previous job">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
                </button>
                <button type="button" className="tv-key" onClick={() => step(1)} aria-label="Next job">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                </button>
                <button type="button" className="tv-key tv-key-close" onClick={() => dialog.current?.close()} aria-label="Close photo">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
