import { DeckSlotConfig, ProfileDefinition, ProfileId } from './types';

export const CURATED_PROFILES: Record<ProfileId, ProfileDefinition> = {
  STUDIO: {
    id: 'STUDIO',
    name: 'STUDIO · POST & COLOR',
    tagline: 'Video editing, timeline cutting, LUT grading, and render macros.',
    description:
      'Designed for editors, colorists, and sound designers who want timeline markers, blade cuts, LUT comparisons, and proxy exports under five fingertips.',
    audience: 'Video Editors · Colorists · Sound Designers',
    slots: [
      { slotIndex: 0, actionId: 'start-record', customLabel: 'TRACK REC' },
      { slotIndex: 1, actionId: 'drop-marker', customLabel: 'ADD MARKER' },
      { slotIndex: 2, actionId: 'razor-split', customLabel: 'RAZOR CUT' },
      { slotIndex: 3, actionId: 'color-grade', customLabel: 'CYCLE LUT' },
      { slotIndex: 4, actionId: 'lut-compare', customLabel: 'A/B GRADE' },
      { slotIndex: 5, actionId: 'keyframe-ease', customLabel: 'EASE CURVE' },
      { slotIndex: 6, actionId: 'audio-duck', customLabel: 'DUCK -12DB' },
      { slotIndex: 7, actionId: 'render-draft', customLabel: 'RENDER H264' },
      { slotIndex: 8, actionId: 'next-scene', customLabel: 'MONITOR CAM' },
      { slotIndex: 9, actionId: 'cam-zoom', customLabel: '2X PUNCH' },
      { slotIndex: 10, actionId: 'open-notes', customLabel: 'EDIT NOTES' },
      { slotIndex: 11, actionId: 'launch-timer', customLabel: 'SPRINT 15M' },
      { slotIndex: 12, actionId: 'focus-mode', customLabel: 'SOLO DESK' },
      { slotIndex: 13, actionId: 'ambient-synth', customLabel: 'TONE 440HZ' },
      { slotIndex: 14, actionId: 'folder-jump', customLabel: 'MK.2 SPECS' },
    ],
  },
  LIVE: {
    id: 'LIVE',
    name: 'LIVE · BROADCAST CONTROL',
    tagline: 'Instant scene switching, mic control, overlays, and VOD markers.',
    description:
      'Built for live streamers, educators, and showrunners managing multi-camera scenes, lower-third graphics, audio mute states, and highlight clips on the fly.',
    audience: 'Livestreamers · Showrunners · Technical Producers',
    slots: [
      { slotIndex: 0, actionId: 'start-record', customLabel: 'GO LIVE' },
      { slotIndex: 1, actionId: 'mute-mic', customLabel: 'MUTE MIC' },
      { slotIndex: 2, actionId: 'next-scene', customLabel: 'NEXT SCENE' },
      { slotIndex: 3, actionId: 'standby-slate', customLabel: 'BRB SLATE' },
      { slotIndex: 4, actionId: 'lower-third', customLabel: 'NAME CARD' },
      { slotIndex: 5, actionId: 'cam-zoom', customLabel: 'CAM 2X' },
      { slotIndex: 6, actionId: 'audio-duck', customLabel: 'DUCK MUSIC' },
      { slotIndex: 7, actionId: 'stream-clip', customLabel: 'CLIP 30S' },
      { slotIndex: 8, actionId: 'chat-marker', customLabel: 'VOD STAMP' },
      { slotIndex: 9, actionId: 'color-grade', customLabel: 'CAM LOOK' },
      { slotIndex: 10, actionId: 'open-notes', customLabel: 'SHOW RUNNER' },
      { slotIndex: 11, actionId: 'launch-timer', customLabel: 'BREAK TIMER' },
      { slotIndex: 12, actionId: 'dice-prompt', customLabel: 'Q&A TOPIC' },
      { slotIndex: 13, actionId: 'window-tidy', customLabel: 'TIDY STAGE' },
      { slotIndex: 14, actionId: 'folder-jump', customLabel: 'MK.2 INFO' },
    ],
  },
  EVERYDAY: {
    id: 'EVERYDAY',
    name: 'EVERYDAY · DEEP WORK',
    tagline: 'Focus blocks, window tiling, quick scratchpads, and desk rituals.',
    description:
      'Stream Deck MK.2 is not just for broadcasts. Automate daily standup notes, deep-work timers, window layouts, and repetitive shortcut sequences.',
    audience: 'Designers · Developers · Productive Makers',
    slots: [
      { slotIndex: 0, actionId: 'focus-mode', customLabel: 'FOCUS MODE' },
      { slotIndex: 1, actionId: 'launch-timer', customLabel: 'TIMER 15M' },
      { slotIndex: 2, actionId: 'open-notes', customLabel: 'SCRATCHPAD' },
      { slotIndex: 3, actionId: 'daily-log', customLabel: 'DAILY STAMP' },
      { slotIndex: 4, actionId: 'window-tidy', customLabel: 'TILE DESK' },
      { slotIndex: 5, actionId: 'coffee-break', customLabel: 'STEEP 4M' },
      { slotIndex: 6, actionId: 'mute-mic', customLabel: 'CALL MUTE' },
      { slotIndex: 7, actionId: 'calc-macro', customLabel: 'DECK AUDIT' },
      { slotIndex: 8, actionId: 'dice-prompt', customLabel: 'IDEA SPARK' },
      { slotIndex: 9, actionId: 'folder-jump', customLabel: 'MK.2 SPECS' },
      { slotIndex: 10, actionId: 'drop-marker', customLabel: 'PIN TASK' },
      { slotIndex: 11, actionId: 'color-grade', customLabel: 'PREVIEW LUT' },
      { slotIndex: 12, actionId: 'next-scene', customLabel: 'DESK CAM' },
      { slotIndex: 13, actionId: 'ambient-synth', customLabel: 'CHIME TEST' },
      { slotIndex: 14, actionId: 'start-record', customLabel: 'VOICE MEMO' },
    ],
  },
};

export function cloneProfileSlots(profileId: ProfileId): DeckSlotConfig[] {
  const profile = CURATED_PROFILES[profileId];
  return profile.slots.map((slot) => ({ ...slot }));
}

export function isProfileModified(profileId: ProfileId, currentSlots: DeckSlotConfig[]): boolean {
  const defaultSlots = CURATED_PROFILES[profileId].slots;
  if (currentSlots.length !== defaultSlots.length) return true;
  for (let i = 0; i < defaultSlots.length; i++) {
    const curr = currentSlots[i];
    const def = defaultSlots[i];
    if (
      curr.actionId !== def.actionId ||
      (curr.customLabel || '') !== (def.customLabel || '') ||
      curr.customIcon !== def.customIcon ||
      curr.customAccent !== def.customAccent
    ) {
      return true;
    }
  }
  return false;
}
