export type SignalCategory = 'CONTACT' | 'PIPELINE' | 'FOLLOW-UP' | 'FORECAST';
export type SignalFilterCategory = 'ALL' | SignalCategory;
export type SignalSortOrder = 'RECENT' | 'PRIORITY';
export type SignalStatus = 'ACTIVE' | 'REVIEWED';

export interface SignalRecord {
  id: string;
  code: string;
  title: string;
  category: SignalCategory;
  sampleTimeLabel: string;
  recencyRank: number; // lower = more recent
  priorityRank: number; // lower = higher priority
  priorityLabel: string;
  confidenceBand?: string;
  signalStrength: string;
  contextSummary: string;
  traceOrigin: string;
  connectedThreads: string[];
  suggestedNextAction: string;
  status: SignalStatus;
}

export const INITIAL_SIGNALS: SignalRecord[] = [
  {
    id: 'sig-contact-01',
    code: 'SIG // 01-C',
    title: 'Follow up with a warm prospect',
    category: 'CONTACT',
    sampleTimeLabel: 'SAMPLE · 14M AGO',
    recencyRank: 1,
    priorityRank: 2,
    priorityLabel: 'HIGH ALIGNMENT',
    signalStrength: '0.92 INDEX',
    contextSummary:
      'Three separate technical stakeholders revisited the architecture brief within 24 hours after two weeks of silence. Buying committee alignment is forming around deployment scope.',
    traceOrigin: 'inbound brief view + thread reply sequence',
    connectedThreads: [
      'Technical scope review notes',
      'Security questionnaire thread',
      'Q2 evaluation timeline',
    ],
    suggestedNextAction:
      'Send a concise implementation timeline summary directly to the technical lead before Friday.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-pipeline-02',
    code: 'SIG // 02-P',
    title: 'Pipeline stage waiting for context',
    category: 'PIPELINE',
    sampleTimeLabel: 'SAMPLE · 2H AGO',
    recencyRank: 2,
    priorityRank: 1,
    priorityLabel: 'CRITICAL PATH',
    signalStrength: '0.96 INDEX',
    contextSummary:
      'An active mid-stage evaluation has remained in validation for 11 days without a logged decision owner. Recent meeting transcripts mention procurement review, but stage criteria remain incomplete.',
    traceOrigin: 'stage duration threshold + meeting note parse',
    connectedThreads: [
      'Validation stage checklist',
      'Procurement handoff note',
      'Executive sponsor intro',
    ],
    suggestedNextAction:
      'Confirm the named decision owner and attach the mutual evaluation schedule to unlock stage progression.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-followup-03',
    code: 'SIG // 03-F',
    title: 'A scheduled check-in is overdue',
    category: 'FOLLOW-UP',
    sampleTimeLabel: 'SAMPLE · 1D AGO',
    recencyRank: 3,
    priorityRank: 3,
    priorityLabel: 'TIMING DRIFT',
    signalStrength: '0.84 INDEX',
    contextSummary:
      'A promised post-workshop follow-up window passed 36 hours ago while action items from the session remain unassigned across the account team.',
    traceOrigin: 'calendar cadence gap + open action item',
    connectedThreads: [
      'Workshop recap draft',
      'Integration requirements list',
      'Account owner handoff',
    ],
    suggestedNextAction:
      'Share the three-point workshop synthesis and confirm whether the technical sandbox requires extension.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-forecast-04',
    code: 'SIG // 04-R',
    title: 'Forecast needs refreshed opportunity notes',
    category: 'FORECAST',
    sampleTimeLabel: 'SAMPLE · 3D AGO',
    recencyRank: 4,
    priorityRank: 4,
    priorityLabel: 'CALIBRATION',
    signalStrength: '0.79 INDEX',
    contextSummary:
      'Target close window is scheduled for the current quarter, but the last recorded stakeholder exchange occurred nine days ago prior to scope revision.',
    traceOrigin: 'close window proximity + activity delta',
    connectedThreads: [
      'Quarterly commit ledger',
      'Revised seat allocation draft',
      'Legal redline log',
    ],
    suggestedNextAction:
      'Verify revised rollout phasing with the account lead and update the commit confidence note.',
    status: 'ACTIVE',
  },
];

export const SIGNAL_CATEGORIES: SignalFilterCategory[] = [
  'ALL',
  'CONTACT',
  'PIPELINE',
  'FOLLOW-UP',
  'FORECAST',
];

export function filterAndSortSignals(
  signals: SignalRecord[],
  category: SignalFilterCategory,
  sortOrder: SignalSortOrder
): SignalRecord[] {
  const filtered =
    category === 'ALL'
      ? [...signals]
      : signals.filter((item) => item.category === category);

  filtered.sort((a, b) => {
    if (sortOrder === 'RECENT') {
      return a.recencyRank - b.recencyRank;
    }
    return a.priorityRank - b.priorityRank;
  });

  return filtered;
}

export function resolveSelectedSignalId(
  visibleSignals: SignalRecord[],
  currentSelectedId: string | null
): string | null {
  if (visibleSignals.length === 0) {
    return null;
  }
  if (currentSelectedId && visibleSignals.some((s) => s.id === currentSelectedId)) {
    return currentSelectedId;
  }
  return visibleSignals[0].id;
}

export function toggleSignalReviewStatus(
  signals: SignalRecord[],
  targetId: string
): SignalRecord[] {
  return signals.map((item) => {
    if (item.id !== targetId) return item;
    return {
      ...item,
      status: item.status === 'REVIEWED' ? 'ACTIVE' : 'REVIEWED',
    };
  });
}

export function formatSignalBriefForClipboard(signal: SignalRecord): string {
  return [
    `FORUM — SAMPLE SIGNAL BRIEF (CONCEPT DEMO)`,
    `ID: ${signal.code}`,
    `TITLE: ${signal.title}`,
    `CATEGORY: ${signal.category} (${signal.priorityLabel})`,
    `STATUS: ${signal.status}`,
    `CONTEXT: ${signal.contextSummary}`,
    `NEXT MOVE: ${signal.suggestedNextAction}`,
    `NOTE: Illustrative sample data — no live CRM connection.`,
  ].join('\n');
}

export interface ManifestoDot {
  id: number;
  noiseX: number;
  noiseY: number;
  gridX: number;
  gridY: number;
  size: number;
  isPrimary: boolean;
}

/**
 * Generates a deterministic set of 72 schematic nodes for Chapter 02 (#about).
 * Progress 0 -> dispersed visual noise; Progress 1 -> ordered constellation grid.
 */
export function generateManifestoDots(count = 72): ManifestoDot[] {
  const cols = 12;
  const rows = Math.ceil(count / cols);
  const dots: ManifestoDot[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Ordered grid coordinates in a 720x320 SVG viewBox
    const gridX = 70 + col * 52;
    const gridY = 58 + row * 40;

    // Deterministic pseudo-random dispersed noise using golden-angle / prime harmonics
    const seed1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
    const frac1 = seed1 - Math.floor(seed1);
    const seed2 = Math.cos((i + 1) * 78.233) * 19341.1234;
    const frac2 = seed2 - Math.floor(seed2);

    const noiseX = Math.round(28 + frac1 * 664);
    const noiseY = Math.round(22 + frac2 * 276);

    dots.push({
      id: i,
      noiseX,
      noiseY,
      gridX,
      gridY,
      size: i % 6 === 0 ? 4.5 : 3,
      isPrimary: i % 6 === 0 || row === 2,
    });
  }

  return dots;
}
