import { describe, it, expect } from 'vitest';
import {
  INITIAL_TASKS,
  TEMPLATE_PRESETS,
  validateQuickTaskTitle,
  createQuickTask,
  toggleTaskCompletion,
  applyTemplateToTasks,
  formatTimerSeconds,
  computeTimerProgress,
  validateEarlyAccessEmail,
} from './plannerLogic';

describe('Halo Desk Planner Logic', () => {
  it('validateQuickTaskTitle rejects empty and short strings and trims valid input', () => {
    expect(validateQuickTaskTitle('   ').valid).toBe(false);
    expect(validateQuickTaskTitle('a').valid).toBe(false);
    const valid = validateQuickTaskTitle('  Review quarterly roadmap  ');
    expect(valid.valid).toBe(true);
    expect(valid.cleaned).toBe('Review quarterly roadmap');
  });

  it('createQuickTask prepends a validated task and preserves existing tasks on error', () => {
    const invalidAttempt = createQuickTask(INITIAL_TASKS, '');
    expect(invalidAttempt.tasks.length).toBe(INITIAL_TASKS.length);
    expect(invalidAttempt.error).toBeTruthy();

    const validAttempt = createQuickTask(INITIAL_TASKS, 'Prepare design critique notes', 'mint', 'Ton', 'Today');
    expect(validAttempt.tasks.length).toBe(INITIAL_TASKS.length + 1);
    expect(validAttempt.tasks[0].title).toBe('Prepare design critique notes');
    expect(validAttempt.tasks[0].category).toBe('mint');
  });

  it('toggleTaskCompletion toggles state and reorders completed tasks after active tasks', () => {
    const firstId = INITIAL_TASKS[0].id;
    const afterComplete = toggleTaskCompletion(INITIAL_TASKS, firstId);
    expect(afterComplete.changedTask?.completed).toBe(true);
    expect(afterComplete.tasks[afterComplete.tasks.length - 1].id).toBe(firstId);

    const afterUndo = toggleTaskCompletion(afterComplete.tasks, firstId);
    expect(afterUndo.changedTask?.completed).toBe(false);
  });

  it('applyTemplateToTasks replaces Today tasks with selected template tasks', () => {
    const preset = TEMPLATE_PRESETS[1]; // Creative sprint
    const updated = applyTemplateToTasks(INITIAL_TASKS, preset);
    const todayTasks = updated.filter((t) => t.tab === 'Today');
    expect(todayTasks.length).toBe(preset.tasks.length);
    expect(todayTasks[0].title).toBe(preset.tasks[0].title);
  });

  it('formatTimerSeconds formats remaining seconds as mm:ss', () => {
    expect(formatTimerSeconds(0)).toBe('00:00');
    expect(formatTimerSeconds(65)).toBe('01:05');
    expect(formatTimerSeconds(1500)).toBe('25:00');
  });

  it('computeTimerProgress calculates progress ratio between 0 and 1', () => {
    expect(computeTimerProgress(1500, 1500)).toBe(0);
    expect(computeTimerProgress(750, 1500)).toBe(0.5);
    expect(computeTimerProgress(0, 1500)).toBe(1);
  });

  it('validateEarlyAccessEmail validates email addresses correctly', () => {
    expect(validateEarlyAccessEmail('').valid).toBe(false);
    expect(validateEarlyAccessEmail('invalid-email').valid).toBe(false);
    expect(validateEarlyAccessEmail('user@example.com').valid).toBe(true);
  });
});
