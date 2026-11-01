import { cloneProfileSlots } from './presets';
import { DeckSlotConfig, ProfileId } from './types';

const STORAGE_KEY = 'ctrl_room_os_demo_state_v1';

export interface StoredDemoState {
  activeProfile: ProfileId;
  profiles: Record<ProfileId, DeckSlotConfig[]>;
  notesContent: string;
  savedAt: string;
}

export function createDefaultProfilesState(): Record<ProfileId, DeckSlotConfig[]> {
  return {
    STUDIO: cloneProfileSlots('STUDIO'),
    LIVE: cloneProfileSlots('LIVE'),
    EVERYDAY: cloneProfileSlots('EVERYDAY'),
  };
}

export function loadDemoStateFromStorage(): StoredDemoState | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredDemoState;
    if (
      !parsed ||
      !parsed.activeProfile ||
      !parsed.profiles ||
      !Array.isArray(parsed.profiles.STUDIO) ||
      parsed.profiles.STUDIO.length !== 15
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveDemoStateToStorage(state: Omit<StoredDemoState, 'savedAt'>): string | null {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const payload: StoredDemoState = {
        ...state,
        savedAt: timestamp,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return timestamp;
    }
  } catch {
    return null;
  }
  return null;
}

export function clearDemoStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
  }
}
