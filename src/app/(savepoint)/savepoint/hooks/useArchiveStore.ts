import { create } from 'zustand';
export type ExperiencePhase = 'archive' | 'extracting' | 'console-entering' | 'aligning' | 'inserting' | 'booting' | 'screen-expanding' | 'game-detail' | 'returning';
interface ArchiveState {
    activeIndex: number;
    phase: ExperiencePhase;
    direction: number;
    select: (index: number, direction?: number) => void;
    setPhase: (phase: ExperiencePhase) => void;
}
export const useArchiveStore = create<ArchiveState>((set) => ({ activeIndex: 0, phase: 'archive', direction: 1, select: (index, direction) => set((state) => ({ activeIndex: ((index % 10) + 10) % 10, direction: direction ?? (index - state.activeIndex >= 0 ? 1 : -1) })), setPhase: (phase) => set({ phase }) }));
