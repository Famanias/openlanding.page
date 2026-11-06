export type TaskCategory = 'lavender' | 'powder' | 'peach' | 'mint';
export type SidebarTab = 'Inbox' | 'Today' | 'Projects' | 'Calendar' | 'Notes';
export type WeekdayKey = 'Mon' | 'Ton' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface PlannerTask {
  id: string;
  title: string;
  subtitle: string;
  category: TaskCategory;
  tab: SidebarTab;
  day: WeekdayKey;
  duration: string;
  energy: 'Deep focus' | 'Collaborative' | 'Light flow';
  notes: string;
  completed: boolean;
  hasAvatars?: boolean;
}

export interface TemplatePreset {
  id: string;
  name: string;
  tagline: string;
  accent: TaskCategory;
  rhythmLabel: string;
  focusBlocks: number;
  summary: string;
  tasks: Array<{
    title: string;
    subtitle: string;
    category: TaskCategory;
    duration: string;
    energy: 'Deep focus' | 'Collaborative' | 'Light flow';
  }>;
}

export const INITIAL_TASKS: PlannerTask[] = [
  {
    id: 'task-1',
    title: 'Design system review',
    subtitle: 'Today',
    category: 'lavender',
    tab: 'Today',
    day: 'Ton',
    duration: '45 min',
    energy: 'Collaborative',
    notes: 'Audit token contrast across light ivory surfaces, button states, and spacing scale with Maya & Liam.',
    completed: false,
    hasAvatars: true,
  },
  {
    id: 'task-2',
    title: 'Deep work session',
    subtitle: 'Write code for main view',
    category: 'powder',
    tab: 'Today',
    day: 'Ton',
    duration: '90 min',
    energy: 'Deep focus',
    notes: 'Complete keyboard navigation and FLIP transition logic for the daily planner timeline without notifications.',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Write blog post outline',
    subtitle: 'Today',
    category: 'peach',
    tab: 'Today',
    day: 'Ton',
    duration: '30 min',
    energy: 'Light flow',
    notes: 'Draft three-part structure on why calm interfaces reduce cognitive switching cost during creative mornings.',
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Team check-in',
    subtitle: '10:00 AM',
    category: 'mint',
    tab: 'Today',
    day: 'Ton',
    duration: '25 min',
    energy: 'Collaborative',
    notes: 'Share weekly rhythm priorities, unblock QA items, and confirm Friday demo scope.',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Triage reader notes & ideas',
    subtitle: 'Inbox · 3 items',
    category: 'peach',
    tab: 'Inbox',
    day: 'Mon',
    duration: '20 min',
    energy: 'Light flow',
    notes: 'Sort incoming thoughts captured via Quick Task shortcut into this week’s calm milestones.',
    completed: false,
  },
  {
    id: 'task-6',
    title: 'Desktop typography polish',
    subtitle: 'Halo v0.9 Milestone',
    category: 'lavender',
    tab: 'Projects',
    day: 'Tue',
    duration: '60 min',
    energy: 'Deep focus',
    notes: 'Refine headline balance and tabular numeral alignment across the weekly overview.',
    completed: false,
  },
  {
    id: 'task-7',
    title: 'Architecture sync block',
    subtitle: '2:00 PM · Studio room',
    category: 'mint',
    tab: 'Calendar',
    day: 'Wed',
    duration: '40 min',
    energy: 'Collaborative',
    notes: 'Walk through offline local storage schema and keyboard shortcut map.',
    completed: false,
  },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'gentle-monday',
    name: 'A gentle Monday',
    tagline: 'Ease into the week before opening messages',
    accent: 'lavender',
    rhythmLabel: '3 calm blocks · 15m buffer',
    focusBlocks: 3,
    summary: 'Starts with 25 minutes of quiet triage, followed by one protected deep-work block before midday check-ins.',
    tasks: [
      {
        title: 'Quiet weekly intention sweep',
        subtitle: '9:00 AM · Warm up',
        category: 'lavender',
        duration: '25 min',
        energy: 'Light flow',
      },
      {
        title: 'Core priority deep block',
        subtitle: '9:45 AM · Focus timer ready',
        category: 'powder',
        duration: '75 min',
        energy: 'Deep focus',
      },
      {
        title: 'Async team status digest',
        subtitle: '11:30 AM · Calm check-in',
        category: 'mint',
        duration: '20 min',
        energy: 'Collaborative',
      },
    ],
  },
  {
    id: 'creative-sprint',
    name: 'Creative sprint',
    tagline: 'Long uninterrupted studio hours for makers',
    accent: 'powder',
    rhythmLabel: '2 deep blocks · 1 review',
    focusBlocks: 4,
    summary: 'Pushes meetings to late afternoon so sketching, writing, and prototyping stay unbroken while your mind is fresh.',
    tasks: [
      {
        title: 'Concept exploration & wireframes',
        subtitle: 'Morning block',
        category: 'powder',
        duration: '90 min',
        energy: 'Deep focus',
      },
      {
        title: 'Prototype interaction pass',
        subtitle: 'Midday studio',
        category: 'peach',
        duration: '60 min',
        energy: 'Deep focus',
      },
      {
        title: 'Critique notes & export',
        subtitle: '3:30 PM',
        category: 'lavender',
        duration: '30 min',
        energy: 'Collaborative',
      },
    ],
  },
  {
    id: 'study-rhythm',
    name: 'Study rhythm',
    tagline: 'Structured reading, synthesis, and active recall',
    accent: 'peach',
    rhythmLabel: '4×25m intervals · Notes linked',
    focusBlocks: 4,
    summary: 'Alternates focused reading intervals with short synthesis notes so complex material settles without burnout.',
    tasks: [
      {
        title: 'Primary source close reading',
        subtitle: 'Chapter 4 & margin notes',
        category: 'peach',
        duration: '50 min',
        energy: 'Deep focus',
      },
      {
        title: 'Synthesize key arguments in Notes',
        subtitle: 'Today',
        category: 'lavender',
        duration: '30 min',
        energy: 'Light flow',
      },
      {
        title: 'Spaced recall card review',
        subtitle: '4:00 PM',
        category: 'mint',
        duration: '25 min',
        energy: 'Light flow',
      },
    ],
  },
  {
    id: 'weekly-reset',
    name: 'Weekly reset',
    tagline: 'Close open loops and clear the desk for Friday',
    accent: 'mint',
    rhythmLabel: 'Reflect · Archive · Prepare',
    focusBlocks: 2,
    summary: 'Reviews completed tasks, archives stray sticky notes, and sets three realistic anchors for next Monday.',
    tasks: [
      {
        title: 'Archive finished project threads',
        subtitle: 'Friday afternoon',
        category: 'mint',
        duration: '25 min',
        energy: 'Light flow',
      },
      {
        title: 'Capture wins & lessons in Notes',
        subtitle: 'Weekly reflection',
        category: 'peach',
        duration: '20 min',
        energy: 'Light flow',
      },
      {
        title: 'Choose 3 anchors for Monday',
        subtitle: 'Next week preview',
        category: 'lavender',
        duration: '15 min',
        energy: 'Deep focus',
      },
    ],
  },
];

export function validateQuickTaskTitle(raw: string): { valid: boolean; cleaned: string; error?: string } {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) {
    return { valid: false, cleaned: '', error: 'Please enter a task title before adding.' };
  }
  if (cleaned.length < 2) {
    return { valid: false, cleaned, error: 'Task title should be at least 2 characters.' };
  }
  if (cleaned.length > 72) {
    return { valid: false, cleaned: cleaned.slice(0, 72), error: 'Keep task titles concise (under 72 characters).' };
  }
  return { valid: true, cleaned };
}

export function createQuickTask(
  tasks: PlannerTask[],
  rawTitle: string,
  category: TaskCategory = 'lavender',
  day: WeekdayKey = 'Ton',
  tab: SidebarTab = 'Today'
): { tasks: PlannerTask[]; created?: PlannerTask; error?: string } {
  const validation = validateQuickTaskTitle(rawTitle);
  if (!validation.valid) {
    return { tasks, error: validation.error };
  }

  const newTask: PlannerTask = {
    id: `task-custom-${Date.now()}-${tasks.length + 1}`,
    title: validation.cleaned,
    subtitle: day === 'Ton' ? 'Today' : `${day} · Scheduled`,
    category,
    tab,
    day,
    duration: '30 min',
    energy: category === 'powder' ? 'Deep focus' : category === 'mint' ? 'Collaborative' : 'Light flow',
    notes: 'Added via Quick Task in the live planner preview.',
    completed: false,
  };

  return {
    tasks: [newTask, ...tasks],
    created: newTask,
  };
}

export function toggleTaskCompletion(
  tasks: PlannerTask[],
  taskId: string
): { tasks: PlannerTask[]; changedTask?: PlannerTask } {
  let changedTask: PlannerTask | undefined;
  const updated = tasks.map((t) => {
    if (t.id === taskId) {
      changedTask = { ...t, completed: !t.completed };
      return changedTask;
    }
    return t;
  });

  // Sort active tasks before completed tasks while preserving relative order
  const active = updated.filter((t) => !t.completed);
  const done = updated.filter((t) => t.completed);
  return { tasks: [...active, ...done], changedTask };
}

export function applyTemplateToTasks(
  existingTasks: PlannerTask[],
  preset: TemplatePreset
): PlannerTask[] {
  const mapped: PlannerTask[] = preset.tasks.map((item, idx) => ({
    id: `tpl-${preset.id}-${idx}`,
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    tab: 'Today',
    day: 'Ton',
    duration: item.duration,
    energy: item.energy,
    notes: `From "${preset.name}" template: ${preset.summary}`,
    completed: false,
    hasAvatars: idx === 0,
  }));

  const nonToday = existingTasks.filter((t) => t.tab !== 'Today');
  return [...mapped, ...nonToday];
}

export function formatTimerSeconds(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function computeTimerProgress(remainingSeconds: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0;
  const elapsed = Math.max(0, Math.min(durationSeconds, durationSeconds - remainingSeconds));
  return Number((elapsed / durationSeconds).toFixed(4));
}

export function validateEarlyAccessEmail(rawEmail: string): { valid: boolean; error?: string } {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter an email address to save your local preview invite.' };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (for example, name@domain.com).' };
  }
  return { valid: true };
}
