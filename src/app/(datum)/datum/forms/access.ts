export type AccessFields = {
  name: string;
  email: string;
  runtime: "WebGL2" | "WebGPU" | "Both";
  notes: string;
};

export type AccessErrors = Partial<Record<keyof AccessFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateAccess(fields: AccessFields): AccessErrors {
  const errors: AccessErrors = {};
  if (!fields.name.trim()) {
    errors.name = "Enter your name.";
  }
  if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "Enter a valid work email.";
  }
  if (fields.notes.trim().length < 8) {
    errors.notes = "Describe your target scene or frame bottleneck (at least 8 characters).";
  }
  return errors;
}

/** Deterministic local ticket stamp derived from the active pipeline configuration. */
export function ticketReference(parts: readonly (string | number)[]): string {
  let hash = 2166136261;
  for (const part of parts) {
    const str = String(part);
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
  }
  const code = (hash >>> 0).toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `DT-${code}`;
}

export function formatLocalBrief(
  fields: AccessFields,
  config: {
    reference: string;
    activePass: string;
    enabledCount: number;
    resolutionScale: number;
    targetFps: number;
    totalMs: number;
  },
): string {
  return [
    `DATUM — SPATIAL PROFILER BRIEF (${config.reference})`,
    `====================================================`,
    `Status: Prepared locally in your browser. This brief has NOT been transmitted.`,
    ``,
    `Engineer: ${fields.name.trim()}`,
    `Email:    ${fields.email.trim()}`,
    `Runtime:  ${fields.runtime}`,
    ``,
    `Pinned Pipeline Snapshot`,
    `- Active Pass:      ${config.activePass}`,
    `- Active Stages:    ${config.enabledCount} / 5`,
    `- Resolution Scale: ${config.resolutionScale.toFixed(2)}x`,
    `- Target Refresh:   ${config.targetFps} Hz`,
    `- Frame Estimate:   ${config.totalMs.toFixed(1)} ms`,
    ``,
    `Scene / Bottleneck Notes:`,
    fields.notes.trim(),
    ``,
  ].join("\n");
}
