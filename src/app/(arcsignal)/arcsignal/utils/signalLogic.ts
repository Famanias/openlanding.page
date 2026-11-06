export interface SignalAnchorPoint {
  id: string;
  x: number;
  y: number;
  /** Optional tangent direction vector (dx, dy) in document space */
  tangentX?: number;
  tangentY?: number;
}

export type CapabilityId = 'orchestrate' | 'route' | 'observe' | 'govern';

export type RouteModelId = 'model-1' | 'model-2' | 'model-3';

export type RoutingPreference = 'latency' | 'balance' | 'reasoning';

export type WorkflowStageId = 'trigger' | 'context' | 'plan' | 'execute' | 'review' | 'result';

export type WorkflowRunStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'awaiting_approval'
  | 'completed'
  | 'rejected';

export type StageStateBadge =
  | 'Active'
  | 'Pending'
  | 'Awaiting approval'
  | 'Completed'
  | 'Rejected';

export type ExperienceMode = 'booting' | 'idle' | 'routing' | 'executing' | 'converging';

export type VisibleSectionId = 'hero' | 'capabilities' | 'product' | 'cta';

export interface ExperienceState {
  mode: ExperienceMode;
  visibleSection: VisibleSectionId;
  activeCapability: CapabilityId;
  selectedModel: 0 | 1 | 2;
  demoStatus: WorkflowRunStatus;
  activeStage: number; // 0-5
  reducedMotion: boolean;
  syncPulseActive: boolean;
}

/**
 * Pure priority resolver for the page-wide ExperienceMode.
 * Priority rules:
 * 1. Initial boot window -> 'booting'
 * 2. Active user-driven workflow demo ('running' | 'paused' | 'awaiting_approval') -> 'executing'
 * 3. Recent route/capability/model interaction window -> 'routing'
 * 4. Viewing the Final CTA section when demo is not running -> 'converging'
 * 5. Otherwise -> 'idle'
 */
export function deriveExperienceMode(params: {
  isBooting: boolean;
  demoStatus: WorkflowRunStatus;
  isRoutingTransient: boolean;
  visibleSection: VisibleSectionId;
}): ExperienceMode {
  if (params.isBooting) return 'booting';
  if (
    params.demoStatus === 'running' ||
    params.demoStatus === 'paused' ||
    params.demoStatus === 'awaiting_approval'
  ) {
    return 'executing';
  }
  if (params.isRoutingTransient) return 'routing';
  if (params.visibleSection === 'cta') return 'converging';
  return 'idle';
}

export interface WorkflowStageSpec {
  id: WorkflowStageId;
  indexLabel: string;
  shortCode: string;
  title: string;
  subtitle: string;
  agentOrRole: string;
  modelConfig: string;
  durationMs: number;
  inputs: string[];
  tools: string[];
  policies: string[];
  traceLogs: { time: string; message: string }[];
  sampleInputPayload: string;
  sampleOutputPayload: string;
  routingRationale: string;
}

export const WORKFLOW_STAGES: WorkflowStageSpec[] = [
  {
    id: 'trigger',
    indexLabel: '01',
    shortCode: '01 / TRIGGER',
    title: 'Trigger',
    subtitle: 'New support request',
    agentOrRole: 'Ingress Gateway',
    modelConfig: 'DETERMINISTIC / SCHEMA_V2',
    durationMs: 42,
    inputs: ['Webhook payload: ticket_id #AS-8942', 'Customer tier: Enterprise Core', 'Channel: Priority API Ingress'],
    tools: ['Schema Validator', 'PII Redaction Filter', 'Deduplication Queue'],
    policies: ['Zero-retention PII scrubbing active', 'Rate limit: 250 req/sec verified'],
    traceLogs: [
      { time: '10:42:00', message: 'Ingress envelope validated' },
      { time: '10:42:00', message: 'PII redaction mask applied' },
      { time: '10:42:01', message: 'Context lookup dispatched' },
    ],
    sampleInputPayload: '{ "ticket": "AS-8942", "severity": "P1", "region": "eu-central" }',
    sampleOutputPayload: '{ "normalized_id": "req_01H9X", "sanitized": true, "next": "context" }',
    routingRationale: 'Deterministic schema gate requires zero LLM invocation; routed directly to knowledge indexer.',
  },
  {
    id: 'context',
    indexLabel: '02',
    shortCode: '02 / CONTEXT',
    title: 'Context',
    subtitle: 'Retrieve account knowledge',
    agentOrRole: 'Knowledge Retriever',
    modelConfig: 'EMBEDDING / HYBRID-VECTOR',
    durationMs: 118,
    inputs: ['Sanitized request req_01H9X', 'Account graph: Tenant #409', 'Recent incident history (30d)'],
    tools: ['Vector Index Query', 'Entitlements Graph', 'Telemetry Snapshot'],
    policies: ['Tenant boundary isolation enforced', 'Max context window: 16,384 tokens'],
    traceLogs: [
      { time: '10:42:01', message: 'Tenant #409 namespace mounted' },
      { time: '10:42:01', message: 'Retrieved 4 high-relevance runbooks' },
      { time: '10:42:02', message: 'Context bundle signed for planning' },
    ],
    sampleInputPayload: '{ "tenant": "409", "query_vector": "[0.021, -0.084, ...]" }',
    sampleOutputPayload: '{ "chunks_retrieved": 4, "confidence": 0.94, "bundle_id": "ctx_77B" }',
    routingRationale: 'Hybrid lexical + vector retrieval selected for sub-120ms grounding prior to reasoning stage.',
  },
  {
    id: 'plan',
    indexLabel: '03',
    shortCode: '03 / PLAN',
    title: 'Plan',
    subtitle: 'Reasoning agent',
    agentOrRole: 'Reasoning Agent',
    modelConfig: 'AUTO-ROUTED',
    durationMs: 640,
    inputs: ['Context bundle ctx_77B', 'SLA remediation constraints', 'Available tool manifest (6 tools)'],
    tools: ['Dependency Graph Planner', 'Cost & Latency Estimator', 'Policy Pre-check'],
    policies: ['Require human checkpoint for billing credits > $500', 'Deterministic JSON output schema'],
    traceLogs: [
      { time: '10:42:01', message: 'Agent initialized' },
      { time: '10:42:03', message: 'Executing plan' },
      { time: '10:42:04', message: 'Policy verified' },
      { time: '10:42:05', message: 'Action pending' },
    ],
    sampleInputPayload: '{ "context": "ctx_77B", "goal": "Diagnose EU webhook timeout & prepare remedy" }',
    sampleOutputPayload: '{ "steps": ["rebind_route", "issue_sla_credit"], "requires_review": true }',
    routingRationale: 'Multi-constraint root-cause analysis routed to Model B (Balanced) / Model C (Reasoning) per active routing policy.',
  },
  {
    id: 'execute',
    indexLabel: '04',
    shortCode: '04 / EXECUTE',
    title: 'Execute',
    subtitle: 'CRM + support tools',
    agentOrRole: 'Tool Execution Worker',
    modelConfig: 'MODEL B / BALANCED-TOOL',
    durationMs: 290,
    inputs: ['Execution graph plan_92A', 'Scoped OAuth token (read/staging)', 'Dry-run verification flag'],
    tools: ['CRM Case Updater', 'Endpoint Health Probe', 'SLA Credit Calculator'],
    policies: ['Sandboxed dry-run before commit', 'No destructive writes without review token'],
    traceLogs: [
      { time: '10:42:05', message: 'CRM staging draft created' },
      { time: '10:42:06', message: 'Endpoint health verified: 99.98%' },
      { time: '10:42:06', message: 'Staged action awaiting human gate' },
    ],
    sampleInputPayload: '{ "action": "stage_remediation", "dry_run": true }',
    sampleOutputPayload: '{ "crm_draft": "drf_301", "credit_staged": "$750.00", "gate": "review" }',
    routingRationale: 'Structured function-calling endpoint selected for low-latency tool orchestration.',
  },
  {
    id: 'review',
    indexLabel: '05',
    shortCode: '05 / REVIEW',
    title: 'Review',
    subtitle: 'Human approval',
    agentOrRole: 'Governance Checkpoint',
    modelConfig: 'HUMAN-IN-THE-LOOP GATE',
    durationMs: 0,
    inputs: ['Staged CRM draft drf_301', 'Proposed SLA adjustment ($750)', 'Reasoning audit trail'],
    tools: ['Approval Ledger', 'Cryptographic Sign-off', 'Diff Inspector'],
    policies: ['Mandatory human approval for tier-1 account mutations', 'Immutable audit log entry'],
    traceLogs: [
      { time: '10:42:07', message: 'Checkpoint triggered: Policy #GOV-04' },
      { time: '10:42:07', message: 'Operator notification dispatched' },
      { time: '10:42:08', message: 'Awaiting operator Approve / Reject' },
    ],
    sampleInputPayload: '{ "checkpoint": "GOV-04", "staged_diff": "+credit $750, +route_patch" }',
    sampleOutputPayload: '{ "decision": "PENDING_OPERATOR", "audit_hash": "0x9f8c...31a" }',
    routingRationale: 'Execution paused by Governance Policy #GOV-04 until operator explicitly approves or rejects.',
  },
  {
    id: 'result',
    indexLabel: '06',
    shortCode: '06 / RESULT',
    title: 'Result',
    subtitle: 'Resolution prepared',
    agentOrRole: 'Synthesis & Dispatch',
    modelConfig: 'MODEL A / FAST-SYNTHESIS',
    durationMs: 95,
    inputs: ['Signed approval token', 'Executed CRM record', 'Customer communication template'],
    tools: ['Response Synthesizer', 'Telemetry Emitter', 'Audit Archiver'],
    policies: ['Attach verifiable trace ID to response', 'Archive execution snapshot'],
    traceLogs: [
      { time: '10:42:09', message: 'Operator approval token verified' },
      { time: '10:42:09', message: 'Resolution dispatched to customer' },
      { time: '10:42:10', message: 'Pipeline completed in sync' },
    ],
    sampleInputPayload: '{ "approval": "SIGNED", "crm_commit": true }',
    sampleOutputPayload: '{ "status": "RESOLVED", "trace_id": "tr_AS_2026_099", "sync": "COMPLETE" }',
    routingRationale: 'Fast synthesis endpoint formats verified resolution summary with minimal tail latency.',
  },
];

/**
 * Generates a single mathematically continuous cubic Bezier SVG path (`M ... C ...`)
 * through an ordered list of document-space anchors, guaranteeing C0 and C1 continuity
 * at every interior join (zero kinks or disconnected jumps at section boundaries).
 */
export function buildContinuousSignalPath(anchors: SignalAnchorPoint[]): string {
  if (!anchors || anchors.length === 0) return '';
  if (anchors.length === 1) {
    const a = anchors[0];
    return `M ${round2(a.x)} ${round2(a.y)}`;
  }

  const tangents = computeAnchorTangents(anchors);

  let d = `M ${round2(anchors[0].x)} ${round2(anchors[0].y)}`;

  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[i];
    const p1 = anchors[i + 1];
    const t0 = tangents[i];
    const t1 = tangents[i + 1];

    const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    const maxHandle = Math.max(24, dist * 0.48);

    const h0Len = Math.hypot(t0.x, t0.y) || 1;
    const h1Len = Math.hypot(t1.x, t1.y) || 1;

    const scale0 = h0Len > maxHandle ? maxHandle / h0Len : 1;
    const scale1 = h1Len > maxHandle ? maxHandle / h1Len : 1;

    const cp1x = p0.x + t0.x * scale0;
    const cp1y = p0.y + t0.y * scale0;
    const cp2x = p1.x - t1.x * scale1;
    const cp2y = p1.y - t1.y * scale1;

    d += ` C ${round2(cp1x)} ${round2(cp1y)}, ${round2(cp2x)} ${round2(cp2y)}, ${round2(p1.x)} ${round2(p1.y)}`;
  }

  return d;
}

/**
 * Builds a companion fiber-optic strand path offset laterally along the normal of each anchor tangent,
 * tapering to 0 offset at the start and end ports so all strands fuse cleanly into intake/output ports.
 */
export function buildParallelStrandPath(
  anchors: SignalAnchorPoint[],
  normalOffsetPx: number
): string {
  if (!anchors || anchors.length === 0) return '';
  if (anchors.length === 1) return buildContinuousSignalPath(anchors);

  const tangents = computeAnchorTangents(anchors);
  const shifted: SignalAnchorPoint[] = anchors.map((pt, i) => {
    // Taper offset at start and end ports so strands merge into the physical port collar
    const endTaper = i === 0 || i === anchors.length - 1 ? 0.15 : i % 2 === 0 ? 1 : -0.75;
    const t = tangents[i];
    const len = Math.hypot(t.x, t.y) || 1;
    const nx = -t.y / len;
    const ny = t.x / len;
    const offset = normalOffsetPx * endTaper;
    return {
      ...pt,
      x: pt.x + nx * offset,
      y: pt.y + ny * offset,
    };
  });

  return buildContinuousSignalPath(shifted);
}

function computeAnchorTangents(anchors: SignalAnchorPoint[]): { x: number; y: number }[] {
  return anchors.map((pt, i) => {
    if (typeof pt.tangentX === 'number' && typeof pt.tangentY === 'number') {
      return { x: pt.tangentX, y: pt.tangentY };
    }
    if (i === 0) {
      const next = anchors[1];
      return { x: (next.x - pt.x) * 0.35, y: (next.y - pt.y) * 0.35 };
    }
    if (i === anchors.length - 1) {
      const prev = anchors[i - 1];
      return { x: (pt.x - prev.x) * 0.35, y: (pt.y - prev.y) * 0.35 };
    }
    const prev = anchors[i - 1];
    const next = anchors[i + 1];
    const dx = (next.x - prev.x) * 0.28;
    const dy = (next.y - prev.y) * 0.28;
    return { x: dx, y: dy };
  });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Pure state machine transition for the Customer Resolution Pipeline simulation.
 * Ensures that advancing from EXECUTE pauses at REVIEW (`awaiting_approval`),
 * and only an explicit `approve` advances to RESULT (`completed`), while `reject`
 * transitions to `rejected` (never falsely completing).
 */
export interface PipelineSimulationState {
  status: WorkflowRunStatus;
  activeStageIndex: number; // 0..5
}

export type PipelineAction =
  | { type: 'RUN' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'STEP_TICK' }
  | { type: 'APPROVE' }
  | { type: 'REJECT' };

export function transitionPipelineState(
  state: PipelineSimulationState,
  action: PipelineAction
): PipelineSimulationState {
  switch (action.type) {
    case 'RUN': {
      if (state.status === 'completed' || state.status === 'rejected') {
        return { status: 'running', activeStageIndex: 0 };
      }
      if (state.status === 'awaiting_approval') {
        return state;
      }
      return {
        status: 'running',
        activeStageIndex: state.status === 'idle' ? 0 : state.activeStageIndex,
      };
    }
    case 'PAUSE': {
      if (state.status === 'running') {
        return { ...state, status: 'paused' };
      }
      return state;
    }
    case 'RESET': {
      return { status: 'idle', activeStageIndex: 2 }; // Default selected stage is 03 / PLAN (index 2)
    }
    case 'STEP_TICK': {
      if (state.status !== 'running') return state;
      const nextIndex = state.activeStageIndex + 1;
      // Index 4 is 05 / REVIEW — must pause and request human action!
      if (nextIndex === 4) {
        return { status: 'awaiting_approval', activeStageIndex: 4 };
      }
      if (nextIndex >= 5) {
        return { status: 'completed', activeStageIndex: 5 };
      }
      return { status: 'running', activeStageIndex: nextIndex };
    }
    case 'APPROVE': {
      if (state.status !== 'awaiting_approval') return state;
      return { status: 'completed', activeStageIndex: 5 };
    }
    case 'REJECT': {
      if (state.status !== 'awaiting_approval') return state;
      return { status: 'rejected', activeStageIndex: 4 };
    }
    default:
      return state;
  }
}

/**
 * Computes the semantic badge for any stage index (0..5) given the current pipeline simulation state.
 */
export function getStageBadge(
  stageIndex: number,
  sim: PipelineSimulationState
): StageStateBadge {
  if (sim.status === 'idle') {
    if (stageIndex < sim.activeStageIndex) return 'Completed';
    if (stageIndex === sim.activeStageIndex) return 'Active';
    return 'Pending';
  }
  if (sim.status === 'rejected') {
    if (stageIndex < 4) return 'Completed';
    if (stageIndex === 4) return 'Rejected';
    return 'Pending';
  }
  if (sim.status === 'completed') {
    return 'Completed';
  }
  if (sim.status === 'awaiting_approval') {
    if (stageIndex < 4) return 'Completed';
    if (stageIndex === 4) return 'Awaiting approval';
    return 'Pending';
  }
  // running or paused
  if (stageIndex < sim.activeStageIndex) return 'Completed';
  if (stageIndex === sim.activeStageIndex) return 'Active';
  return 'Pending';
}

/**
 * Maps a routing preference ('latency' | 'balance' | 'reasoning') to the recommended model endpoint.
 */
export function getModelForPreference(pref: RoutingPreference): {
  modelId: RouteModelId;
  endpointName: string;
  badge: string;
  latencyLabel: string;
  rationale: string;
} {
  switch (pref) {
    case 'latency':
      return {
        modelId: 'model-1',
        endpointName: 'Model A — Fast',
        badge: 'SUB-80MS STREAM',
        latencyLabel: '64 ms avg (sample)',
        rationale:
          'Routes high-volume classification and synthesis tasks to compact low-latency endpoints with deterministic schema enforcement.',
      };
    case 'reasoning':
      return {
        modelId: 'model-3',
        endpointName: 'Model C — Reasoning',
        badge: 'DEEP VERIFICATION',
        latencyLabel: '820 ms avg (sample)',
        rationale:
          'Allocates multi-step chain-of-thought and policy-sensitive root-cause diagnostics to high-depth reasoning models.',
      };
    case 'balance':
    default:
      return {
        modelId: 'model-2',
        endpointName: 'Model B — Balanced',
        badge: 'OPTIMAL EQUILIBRIUM',
        latencyLabel: '240 ms avg (sample)',
        rationale:
          'Balances structured tool invocation accuracy with responsive latency for multi-agent orchestration pipelines.',
      };
  }
}

export interface DemoRequestInput {
  name: string;
  email: string;
  company: string;
  objective: string;
}

export interface DemoValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DemoRequestInput, string>>;
}

export function validateDemoRequest(input: DemoRequestInput): DemoValidationResult {
  const errors: Partial<Record<keyof DemoRequestInput, string>> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid work email address.';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Please enter your team or company name.';
  }
  if (!input.objective || input.objective.trim().length < 8) {
    errors.objective = 'Briefly describe what you would like to orchestrate (at least 8 characters).';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Scene 2 — Maps normalized Control Plane scroll progress [0..1] to the 4 capability modules:
 * 0.00 - 0.25 -> 'orchestrate'
 * 0.25 - 0.50 -> 'route'
 * 0.50 - 0.75 -> 'observe'
 * 0.75 - 1.00 -> 'govern'
 */
export function getScrollCapabilityForProgress(progress: number): CapabilityId {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped < 0.25) return 'orchestrate';
  if (clamped < 0.5) return 'route';
  if (clamped < 0.75) return 'observe';
  return 'govern';
}

/**
 * Scene 3 — Maps normalized Platform section scroll progress [0..1] to stage index 0..5
 * for reversible scroll-scrubbed preview when the interactive demo is idle.
 */
export function getScrollStageForProgress(progress: number): number {
  const clamped = Math.min(0.9999, Math.max(0, progress));
  return Math.floor(clamped * WORKFLOW_STAGES.length);
}

/**
 * Scene 4 — Maps normalized Convergence Reactor scroll progress [0..1] to 1..5 connected streams.
 */
export function getConvergedStreamCount(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped < 0.18) return 1;
  if (clamped < 0.36) return 2;
  if (clamped < 0.54) return 3;
  if (clamped < 0.72) return 4;
  return 5;
}

export interface AmbientFieldInput {
  scrollProgress: number;
  selectedCapability: CapabilityId;
  activeStageIndex: number;
  demoStatus: WorkflowRunStatus;
  ctaScrollProgress: number;
  reducedMotion?: boolean;
}

export interface AmbientFieldState {
  focusXPercent: number;
  focusYPercent: number;
  secondaryXPercent: number;
  secondaryYPercent: number;
  fieldIntensity: number;
  gridOpacity: number;
  heroWeight: number;
  controlPlaneWeight: number;
  platformWeight: number;
  convergenceWeight: number;
  footerWeight: number;
  ghostPacketSpeed: number;
  ghostPacketsPaused: boolean;
}

/**
 * Computes continuous, reversible Living Signal Field parameters across the entire document
 * without abrupt section resets or hard boundaries.
 * Keeps the left editorial headline zones dark (<40% X) and shifts illumination
 * smoothly across the right-hand orchestration structures.
 */
export function computeAmbientFieldState(input: AmbientFieldInput): AmbientFieldState {
  const p = Math.min(1, Math.max(0, input.scrollProgress));

  // Smooth bell/ramp weights for each scene along the document scroll [0..1]
  const smoothstep = (edge0: number, edge1: number, x: number): number => {
    const t = Math.min(1, Math.max(0, (x - edge0) / Math.max(0.0001, edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const heroWeight = 1 - smoothstep(0.08, 0.32, p);
  const controlPlaneWeight =
    smoothstep(0.12, 0.28, p) * (1 - smoothstep(0.46, 0.62, p));
  const platformWeight =
    smoothstep(0.42, 0.56, p) * (1 - smoothstep(0.74, 0.86, p));
  const convergenceWeight =
    smoothstep(0.7, 0.84, p) * (1 - smoothstep(0.93, 0.995, p));
  const footerWeight = smoothstep(0.9, 1.0, p);

  // Capability module local bias inside 01 / Control Plane (always in the right-hand matrix zone)
  const capOffset =
    input.selectedCapability === 'orchestrate'
      ? { dx: -7, dy: -8 }
      : input.selectedCapability === 'route'
      ? { dx: 9, dy: -8 }
      : input.selectedCapability === 'observe'
      ? { dx: -7, dy: 9 }
      : { dx: 9, dy: 9 };

  // Workflow stage horizontal shift inside 02 / Inside the Platform (stages 0..5)
  const clampedStage = Math.min(5, Math.max(0, input.activeStageIndex));
  const stageDx = ((clampedStage - 2.5) / 2.5) * 9;

  // Continuous focal center interpolation (kept in right 56%..82% zone so left headlines stay dark)
  const baseFocusX =
    heroWeight * 71 +
    controlPlaneWeight * (69 + capOffset.dx) +
    platformWeight * (68 + stageDx) +
    convergenceWeight * 70 +
    footerWeight * 58;

  const baseFocusY =
    heroWeight * 42 +
    controlPlaneWeight * (48 + capOffset.dy) +
    platformWeight * 52 +
    convergenceWeight * 46 +
    footerWeight * 76;

  const focusXPercent = Math.min(86, Math.max(52, baseFocusX));
  const focusYPercent = Math.min(84, Math.max(28, baseFocusY));

  const secondaryXPercent = Math.min(88, Math.max(48, focusXPercent + 8 - p * 12));
  const secondaryYPercent = Math.min(88, Math.max(24, focusYPercent + 14 - p * 8));

  // Field intensity: wakes in hero, organizes in control plane, responds to simulator in platform,
  // peaks gently at reactor convergence, and subsides in the footer.
  const simBoost =
    input.demoStatus === 'running'
      ? 0.08
      : input.demoStatus === 'awaiting_approval'
      ? 0.05
      : 0;
  const streamCount = getConvergedStreamCount(input.ctaScrollProgress);
  const convergenceBoost = convergenceWeight * (streamCount / 5) * 0.09;

  const rawIntensity =
    0.34 * heroWeight +
    0.36 * controlPlaneWeight +
    (0.35 + simBoost) * platformWeight +
    (0.41 + convergenceBoost) * convergenceWeight +
    0.18 * footerWeight;

  const fieldIntensity = Number(Math.min(0.56, Math.max(0.16, rawIntensity)).toFixed(3));

  // Selective technical grid opacity: never dominant; slightly more legible in Control Plane & Platform,
  // quieter in Hero & Convergence, and very quiet in Footer.
  const rawGridOpacity =
    0.095 * heroWeight +
    0.125 * controlPlaneWeight +
    0.135 * platformWeight +
    0.09 * convergenceWeight +
    0.055 * footerWeight;

  const gridOpacity = Number(Math.min(0.16, Math.max(0.04, rawGridOpacity)).toFixed(3));

  const ghostPacketsPaused = Boolean(
    input.reducedMotion ||
      input.demoStatus === 'paused' ||
      input.demoStatus === 'rejected'
  );

  const ghostPacketSpeed = ghostPacketsPaused
    ? 0
    : input.demoStatus === 'running'
    ? 1.35
    : 1.0 + convergenceWeight * 0.25;

  return {
    focusXPercent: Number(focusXPercent.toFixed(2)),
    focusYPercent: Number(focusYPercent.toFixed(2)),
    secondaryXPercent: Number(secondaryXPercent.toFixed(2)),
    secondaryYPercent: Number(secondaryYPercent.toFixed(2)),
    fieldIntensity,
    gridOpacity,
    heroWeight: Number(heroWeight.toFixed(3)),
    controlPlaneWeight: Number(controlPlaneWeight.toFixed(3)),
    platformWeight: Number(platformWeight.toFixed(3)),
    convergenceWeight: Number(convergenceWeight.toFixed(3)),
    footerWeight: Number(footerWeight.toFixed(3)),
    ghostPacketSpeed: Number(ghostPacketSpeed.toFixed(2)),
    ghostPacketsPaused,
  };
}


