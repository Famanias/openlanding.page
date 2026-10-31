export type WorkspaceStageId = 'input' | 'processing' | 'output';
export type ProcessingSubStep = 'classify' | 'summarize' | 'route';
export type PlaybookPreviewId = 'find' | 'design' | 'build';

export interface ValidationResult {
  valid: boolean;
  normalizedEmail: string;
  error?: string;
}

export interface SubmissionGuardResult {
  allowed: boolean;
  reason?: string;
}

export interface IncomingTaskScenario {
  id: string;
  categoryLabel: string;
  title: string;
  sourceMeta: string;
  classification: {
    intent: string;
    priority: string;
    department: string;
  };
  summaryBullets: string[];
  routeDestination: string;
  outputDraft: {
    summaryTitle: string;
    prioritizedTask: string;
    preparedResponse: string;
    reviewStatus: string;
  };
}

export interface PlaybookPreviewPage {
  id: PlaybookPreviewId;
  stepNumber: string;
  tabLabel: string;
  pageNumber: string;
  chapterTitle: string;
  subtitle: string;
  summary: string;
  sections: {
    heading: string;
    items: string[];
  }[];
  promptTemplate?: {
    label: string;
    promptText: string;
  };
}

export interface HowItWorksStep {
  id: 'map' | 'automate' | 'review';
  number: string;
  label: string;
  headline: string;
  description: string;
  nodes: {
    id: string;
    title: string;
    detail: string;
    kind: 'trigger' | 'input' | 'ai' | 'checkpoint' | 'output';
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const STAGE_CAPTIONS: Record<WorkspaceStageId, string> = {
  input: 'A new request enters the workflow.',
  processing:
    'The workflow classifies the request, extracts important information, and proposes a destination.',
  output: 'A structured draft and next actions are prepared for review.',
};

export const DEFAULT_STAGE_CAPTION =
  'Select any stage panel—Input, AI Processing, or Output—to inspect how scattered requests become structured, review-ready work.';

export function getStageCaption(stage: WorkspaceStageId | null): string {
  if (!stage) return DEFAULT_STAGE_CAPTION;
  return STAGE_CAPTIONS[stage];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateWorkEmail(rawInput: string): ValidationResult {
  const normalizedEmail = rawInput.trim();

  if (!normalizedEmail) {
    return {
      valid: false,
      normalizedEmail: '',
      error: 'Please enter your work email address to access the playbook.',
    };
  }

  if (normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
    return {
      valid: false,
      normalizedEmail,
      error: 'Please enter a valid email address (for example, name@company.com).',
    };
  }

  return {
    valid: true,
    normalizedEmail: normalizedEmail.toLowerCase(),
  };
}

export function canSubmitEmail(
  normalizedEmail: string,
  lastSubmittedEmail: string | null,
  lastSubmitTimestamp: number | null,
  nowTimestamp: number,
  cooldownMs = 4000
): SubmissionGuardResult {
  if (!normalizedEmail) {
    return { allowed: false, reason: 'Email is required.' };
  }

  if (
    lastSubmittedEmail &&
    lastSubmittedEmail.toLowerCase() === normalizedEmail.toLowerCase() &&
    lastSubmitTimestamp !== null &&
    nowTimestamp - lastSubmitTimestamp < cooldownMs
  ) {
    return {
      allowed: false,
      reason: 'Submission already processed. Your playbook access panel is ready.',
    };
  }

  return { allowed: true };
}

export function getPreviewStackOrder(
  activePreviewId: PlaybookPreviewId
): Record<PlaybookPreviewId, 'front' | 'middle' | 'back'> {
  if (activePreviewId === 'find') {
    return { find: 'front', design: 'middle', build: 'back' };
  }
  if (activePreviewId === 'design') {
    return { design: 'front', build: 'middle', find: 'back' };
  }
  return { build: 'front', find: 'middle', design: 'back' };
}

export const WORKSPACE_SCENARIOS: IncomingTaskScenario[] = [
  {
    id: 'emails',
    categoryLabel: 'Emails',
    title: 'Client scope revision & Q4 timeline inquiry',
    sourceMeta: 'Inbox · Enterprise Operations',
    classification: {
      intent: 'Scope Change Request',
      priority: 'High Priority · 24h SLA',
      department: 'Delivery & Account Lead',
    },
    summaryBullets: [
      'Client requested adding regional compliance review before Nov 14 milestone.',
      'Requires updated milestone table and confirmation of review owner.',
    ],
    routeDestination: 'Account Lead Queue + Project Tracker',
    outputDraft: {
      summaryTitle: 'Scope Revision Brief — Regional Compliance',
      prioritizedTask: 'Verify timeline impact with Legal & update Nov 14 schedule',
      preparedResponse: 'Draft reply acknowledging scope addition with proposed review dates',
      reviewStatus: 'Awaiting human approval before sending',
    },
  },
  {
    id: 'documents',
    categoryLabel: 'Documents',
    title: 'Vendor security questionnaire (28 pages)',
    sourceMeta: 'PDF Upload · Procurement',
    classification: {
      intent: 'Security & Compliance Review',
      priority: 'Standard · 3-Day Window',
      department: 'Security Operations',
    },
    summaryBullets: [
      'Extracted 14 standard SOC2 controls and 3 custom data-retention clauses.',
      'Flagged Section 4.2 (sub-processor notice window) for manual legal sign-off.',
    ],
    routeDestination: 'Security Review Board',
    outputDraft: {
      summaryTitle: 'Extracted Clause Matrix & Exception Report',
      prioritizedTask: 'Inspect 3 custom retention clauses in Section 4.2',
      preparedResponse: 'Pre-filled standard responses for 14 verified control items',
      reviewStatus: 'Ready for Security Lead verification',
    },
  },
  {
    id: 'tasks',
    categoryLabel: 'Tasks',
    title: 'Onboarding checklist request for 4 new analysts',
    sourceMeta: 'Service Desk · Internal Ops',
    classification: {
      intent: 'Internal Provisioning',
      priority: 'Scheduled · Starts Monday',
      department: 'IT & People Operations',
    },
    summaryBullets: [
      'Consolidated workspace permissions, dataset access, and orientation schedule.',
      'Grouped role-specific permissions by analytics team function.',
    ],
    routeDestination: 'IT Provisioning & Manager Approval',
    outputDraft: {
      summaryTitle: 'Structured 4-Person Onboarding Packet',
      prioritizedTask: 'Approve dataset access tier for Analytics Cohort',
      preparedResponse: 'Welcome schedule and workspace guide prepared for distribution',
      reviewStatus: 'Pending manager sign-off checkpoint',
    },
  },
  {
    id: 'notes',
    categoryLabel: 'Meeting notes',
    title: 'Weekly product architecture sync transcript',
    sourceMeta: 'Transcript · 42 mins',
    classification: {
      intent: 'Action Item Extraction',
      priority: 'Normal · Weekly Cadence',
      department: 'Product Engineering',
    },
    summaryBullets: [
      'Identified 3 architecture decisions and 5 assigned engineering follow-ups.',
      'Separated unresolved API pagination question into dedicated follow-up thread.',
    ],
    routeDestination: 'Engineering Sprint Board',
    outputDraft: {
      summaryTitle: 'Architecture Sync Decisions & Action Log',
      prioritizedTask: 'Finalize API pagination schema before Thursday review',
      preparedResponse: 'Formatted summary brief drafted for team channel',
      reviewStatus: 'Ready for Tech Lead review',
    },
  },
];

export const PLAYBOOK_PREVIEW_PAGES: PlaybookPreviewPage[] = [
  {
    id: 'find',
    stepNumber: '01',
    tabLabel: '01 — Find the right workflows',
    pageNumber: 'PAGE 04 / 16',
    chapterTitle: 'Automation Opportunity Checklist',
    subtitle: 'Score repetitive recurring work before writing a single prompt.',
    summary:
      'Not every task benefits from AI automation. Start with high-frequency, rules-guided tasks where structured preparation saves time while keeping final judgment in human hands.',
    sections: [
      {
        heading: 'Primary Qualification Criteria',
        items: [
          'The task occurs at least 5–10 times per week across a consistent format.',
          'Inputs arrive as unstructured text (emails, notes, forms, or PDFs) that require sorting or synthesis.',
          'The desired output follows a repeatable template (summary brief, task ticket, or draft response).',
          'A clear human reviewer can verify the output in under two minutes.',
        ],
      },
      {
        heading: 'Tasks to Keep Manual First',
        items: [
          'One-off strategic decisions with ambiguous goals or unstated context.',
          'Sensitive personnel, legal, or financial commitments lacking a review gate.',
        ],
      },
    ],
    promptTemplate: {
      label: 'DIAGNOSTIC AUDIT RULE',
      promptText:
        'If a task takes 15 minutes to prepare and 2 minutes to verify, automate the preparation—never the verification.',
    },
  },
  {
    id: 'design',
    stepNumber: '02',
    tabLabel: '02 — Design the process',
    pageNumber: 'PAGE 08 / 16',
    chapterTitle: 'Workflow Mapping Framework',
    subtitle: 'Decompose work into Trigger, Input, AI Step, Checkpoint, and Output.',
    summary:
      'Reliable workflows separate data collection, language processing, and deterministic routing into explicit stages so errors are easy to spot and correct.',
    sections: [
      {
        heading: 'The Five-Stage Blueprint',
        items: [
          '01. Trigger: Define the exact event that starts the workflow (new form entry, tagged email, uploaded transcript).',
          '02. Context Assembly: Gather only the required reference fields and strip unrelated sensitive data.',
          '03. Structured AI Step: Constrain the model to three focused jobs—Classify, Summarize, and Propose Route.',
          '04. Human Checkpoint: Present the source excerpt side-by-side with the proposed draft for fast approval.',
        ],
      },
    ],
    promptTemplate: {
      label: 'REUSABLE PROMPT STRUCTURE',
      promptText:
        'Role: Operations Analyst | Input: [Source Text] | Tasks: 1) Classify category & urgency 2) Summarize in 3 factual bullets 3) Draft response using [Template]. Do not invent facts outside the source.',
    },
  },
  {
    id: 'build',
    stepNumber: '03',
    tabLabel: '03 — Build and review',
    pageNumber: 'PAGE 12 / 16',
    chapterTitle: 'Worked Example: Incoming Request Triage',
    subtitle: 'How a 4-step workflow turns scattered inbound emails into review-ready responses.',
    summary:
      'See how an operations team structures inbound client requests without losing oversight or sending unverified automated replies.',
    sections: [
      {
        heading: 'End-to-End Execution Path',
        items: [
          'Step A — Intake: Shared inbox message arrives with project questions and attachment notes.',
          'Step B — Classification & Extraction: Workflow tags request type, extracts requested dates, and highlights missing fields.',
          'Step C — Draft Preparation: Creates an internal summary card and a draft reply grounded in approved policy docs.',
          'Step D — Human Review Gate: Account owner reviews the summary, adjusts tone if needed, and approves delivery.',
        ],
      },
    ],
    promptTemplate: {
      label: 'VERIFICATION CHECKLIST',
      promptText:
        'Verify before approval: Are extracted dates accurate? Are uncertain items explicitly flagged? Does the draft match approved scope?',
    },
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'map',
    number: 'STEP 01',
    label: 'MAP',
    headline: 'Understand the task.',
    description: 'Identify triggers, inputs, decisions, and outputs before selecting tools.',
    nodes: [
      {
        id: 'trigger',
        title: 'Trigger Event',
        detail: 'Inbound client email or meeting transcript arrives',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'Raw Inputs',
        detail: 'Unstructured message body, attachments, and historical context',
        kind: 'input',
      },
      {
        id: 'decisions',
        title: 'Decision Rules',
        detail: 'Urgency criteria, routing owner, and required response format',
        kind: 'ai',
      },
      {
        id: 'outputs',
        title: 'Target Output',
        detail: 'Structured brief and prepared response draft',
        kind: 'output',
      },
    ],
  },
  {
    id: 'automate',
    number: 'STEP 02',
    label: 'AUTOMATE',
    headline: 'Design the steps that AI and connected tools can support.',
    description: 'Clarify where AI classification and drafting help—and where human oversight is necessary.',
    nodes: [
      {
        id: 'trigger',
        title: 'Structured Intake',
        detail: 'Normalized request payload enters workflow pipeline',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'AI Classify & Summarize',
        detail: 'Extracts key entities, summarizes intent, and tags priority',
        kind: 'ai',
      },
      {
        id: 'decisions',
        title: 'Human Oversight Gate',
        detail: 'Routes edge cases and external replies to designated reviewer',
        kind: 'checkpoint',
      },
      {
        id: 'outputs',
        title: 'Draft & Task Creation',
        detail: 'Populates workspace ticket and prepares response draft',
        kind: 'output',
      },
    ],
  },
  {
    id: 'review',
    number: 'STEP 03',
    label: 'REVIEW',
    headline: 'Test the workflow, verify outputs, and improve the process.',
    description: 'Run real sample inputs, verify accuracy against source data, and refine prompt constraints.',
    nodes: [
      {
        id: 'trigger',
        title: 'Sample Test Run',
        detail: 'Evaluate workflow against 10 representative real requests',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'Factual Verification',
        detail: 'Confirm zero fabricated details in summaries or dates',
        kind: 'checkpoint',
      },
      {
        id: 'decisions',
        title: 'Prompt & Rule Tuning',
        detail: 'Tighten formatting rules and fallback handling',
        kind: 'ai',
      },
      {
        id: 'outputs',
        title: 'Verified Production Workflow',
        detail: 'Repeatable, auditable workflow with clear human sign-off',
        kind: 'output',
      },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'free',
    question: 'Is the playbook free?',
    answer:
      'Yes. The AI Workflow Playbook is offered as a free downloadable resource with no subscription or credit card required.',
  },
  {
    id: 'technical',
    question: 'Do I need technical experience?',
    answer:
      'No. The introductory frameworks, opportunity checklists, and workflow mapping templates are designed to be clear and practical without advanced programming skills.',
  },
  {
    id: 'platform',
    question: 'Does the guide require a specific AI platform?',
    answer:
      'No. The core workflow planning concepts—mapping triggers, structuring prompts, and placing review checkpoints—can be adapted to the tools and platforms your team already uses.',
  },
  {
    id: 'receive',
    question: 'What will I receive?',
    answer:
      'You receive a 16-page PDF guide containing workflow planning frameworks, the automation opportunity checklist, worked before-and-after examples, reusable prompt structures, and an implementation verification checklist.',
  },
  {
    id: 'automatic',
    question: 'Will the workflows run automatically?',
    answer:
      'No. The playbook helps you design and structure workflows; implementing them in your environment requires connecting your chosen tools, configuring permissions, and maintaining human review.',
  },
  {
    id: 'privacy',
    question: 'How is my email used?',
    answer:
      'This interactive preview runs in client-side demonstration mode: your work email is validated locally in your browser to unlock the playbook preview and download panel, and is not transmitted to an external marketing database or third-party mailing list.',
  },
];
