"use client";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { passById } from "../pipeline/passes";
import { usePipeline } from "../pipeline/PipelineProvider";
import {
  formatLocalBrief,
  ticketReference,
  validateAccess,
  type AccessErrors,
  type AccessFields,
} from "./access";

type Status = "idle" | "loading" | "success";

const EMPTY: AccessFields = {
  name: "",
  email: "",
  runtime: "WebGPU",
  notes: "",
};

const RUNTIMES: readonly AccessFields["runtime"][] = ["WebGL2", "WebGPU", "Both"];
const FAKE_LATENCY_MS = 680;

/**
 * Client-side early-access brief builder. Validates inputs locally, transitions to
 * a stamped receipt, and exports a plain-text brief without transmitting data.
 */
export function AccessForm() {
  const { state, budget } = usePipeline();
  const formId = useId();
  const [fields, setFields] = useState<AccessFields>(EMPTY);
  const [errors, setErrors] = useState<AccessErrors>({});
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const timerRef = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (attempt === 0) return;
    const order: (keyof AccessErrors)[] = ["name", "email", "notes"];
    const first = order.find((key) => errors[key]);
    if (first) document.getElementById(`${formId}-${first}`)?.focus();
    // Focus only on new failed submit attempts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const activePass = passById(state.activePassId);
  const reference = ticketReference([
    activePass.id,
    state.enabledPassIds.length,
    state.resolutionScale,
    state.targetFps,
  ]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (status !== "idle") return;
    const found = validateAccess(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }
    setStatus("loading");
    timerRef.current = window.setTimeout(() => setStatus("success"), FAKE_LATENCY_MS);
  };

  const downloadBrief = () => {
    const text = formatLocalBrief(fields, {
      reference,
      activePass: activePass.name,
      enabledCount: state.enabledPassIds.length,
      resolutionScale: state.resolutionScale,
      targetFps: state.targetFps,
      totalMs: budget.totalMs,
    });
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `datum-brief-${reference.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const restart = () => {
    setFields(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="dt-access-grid">
      <aside className="dt-access-summary" aria-label="Pinned Pipeline Snapshot">
        <div className="dt-summary-head">
          <span className="dt-mono dt-summary-eyebrow">SNAPSHOT // READY</span>
          <span className="dt-mono dt-summary-ref">{reference}</span>
        </div>
        <h3 className="dt-display dt-h3">Current Workbench State</h3>
        <dl className="dt-summary-list">
          <div>
            <dt>Active Z-Pass</dt>
            <dd>
              {activePass.code} · {activePass.shortName}
            </dd>
          </div>
          <div>
            <dt>Enabled Stages</dt>
            <dd>{state.enabledPassIds.length} / 5 active</dd>
          </div>
          <div>
            <dt>Resolution Scale</dt>
            <dd>{state.resolutionScale.toFixed(2)}x</dd>
          </div>
          <div>
            <dt>Target Refresh</dt>
            <dd>
              {state.targetFps} Hz ({budget.targetMs.toFixed(1)} ms)
            </dd>
          </div>
          <div className="dt-summary-total">
            <dt>Estimated Frame</dt>
            <dd className={budget.overBudget ? "dt-text-amber" : "dt-text-emerald"}>
              {budget.totalMs.toFixed(1)} ms
            </dd>
          </div>
        </dl>
        <p className="dt-fineprint">
          Adjust passes or scale in the Budget Lab above to update this telemetry snapshot.
        </p>
      </aside>

      <div className="dt-access-form-wrap" data-state={status}>
        <form
          onSubmit={onSubmit}
          noValidate
          aria-hidden={status === "success"}
          inert={status === "success"}
        >
          <h3 className="dt-display dt-h3">Prepare an SDK brief</h3>
          <p className="dt-body-copy">
            Generate a local diagnostic workspace specification seeded with your current pipeline configuration.
          </p>

          <div className="dt-runtime-group" role="radiogroup" aria-label="Target Graphics API">
            {RUNTIMES.map((runtime) => {
              const selected = fields.runtime === runtime;
              return (
                <button
                  key={runtime}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className="dt-chip"
                  data-selected={selected}
                  disabled={status === "loading"}
                  onClick={() => setFields((prev) => ({ ...prev, runtime }))}
                >
                  {runtime}
                </button>
              );
            })}
          </div>

          <div key={`name-${attempt}`} className="dt-field" data-invalid={Boolean(errors.name)}>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder=" "
              value={fields.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-err` : undefined}
              disabled={status === "loading"}
              onChange={(e) => setFields((prev) => ({ ...prev, name: e.target.value }))}
            />
            <label htmlFor={`${formId}-name`}>Engineer name</label>
            <div className="dt-field-error" data-open={Boolean(errors.name)}>
              <p id={`${formId}-name-err`} role={errors.name ? "alert" : undefined}>
                {errors.name}
              </p>
            </div>
          </div>

          <div key={`email-${attempt}`} className="dt-field" data-invalid={Boolean(errors.email)}>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder=" "
              value={fields.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-err` : undefined}
              disabled={status === "loading"}
              onChange={(e) => setFields((prev) => ({ ...prev, email: e.target.value }))}
            />
            <label htmlFor={`${formId}-email`}>Work email</label>
            <div className="dt-field-error" data-open={Boolean(errors.email)}>
              <p id={`${formId}-email-err`} role={errors.email ? "alert" : undefined}>
                {errors.email}
              </p>
            </div>
          </div>

          <div key={`notes-${attempt}`} className="dt-field" data-invalid={Boolean(errors.notes)}>
            <textarea
              id={`${formId}-notes`}
              name="notes"
              rows={3}
              placeholder=" "
              value={fields.notes}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? `${formId}-notes-err` : undefined}
              disabled={status === "loading"}
              onChange={(e) => setFields((prev) => ({ ...prev, notes: e.target.value }))}
            />
            <label htmlFor={`${formId}-notes`}>Target scene or bottleneck</label>
            <div className="dt-field-error" data-open={Boolean(errors.notes)}>
              <p id={`${formId}-notes-err`} role={errors.notes ? "alert" : undefined}>
                {errors.notes}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="dt-btn dt-btn-primary dt-submit"
            disabled={status === "loading"}
            data-loading={status === "loading"}
          >
            <span className="dt-btn-label" data-label="Generate Local Brief">
              {status === "loading" ? "Compiling brief" : "Generate Local Brief"}
            </span>
            <span className="dt-spinner" aria-hidden="true" />
          </button>

          <p className="dt-fineprint">
            Local demonstration only — nothing is transmitted to any external server.
          </p>
        </form>

        <div
          className="dt-success"
          role="status"
          aria-hidden={status !== "success"}
          inert={status !== "success"}
        >
          <svg className="dt-stamp" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="dt-stamp-ring" cx="60" cy="60" r="50" pathLength="1" />
            <path className="dt-stamp-check" d="M36 62l16 16 32-36" pathLength="1" />
          </svg>
          {status === "success" ? (
            <>
              <span className="dt-mono dt-ref">{reference}</span>
              <h3 className="dt-display dt-h3">
                Brief compiled for {fields.name.trim().split(/\s+/)[0]}.
              </h3>
              <p>
                Captured {fields.runtime} target profile at {budget.totalMs.toFixed(1)} ms ({state.enabledPassIds.length} passes,{" "}
                {state.resolutionScale.toFixed(2)}x scale). Prepared locally in your browser — it has not been sent.
              </p>
              <div className="dt-success-actions">
                <button type="button" className="dt-btn dt-btn-phosphor dt-btn-small" onClick={downloadBrief}>
                  <span className="dt-btn-label" data-label="Download Brief (.txt)">
                    Download Brief (.txt)
                  </span>
                </button>
                <button type="button" className="dt-btn dt-btn-ghost-light dt-btn-small" onClick={restart}>
                  <span className="dt-btn-label" data-label="New Configuration">
                    New Configuration
                  </span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
