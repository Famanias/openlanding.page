"use client";

import { useSyncExternalStore } from "react";
import { TOOLS, type ToolItem, type ToolCategory } from "./workbench-data";

export interface WorkbenchState {
  activeCategory: ToolCategory;
  unlatchedToolId: string | null;
  stagedTools: ToolItem[];
  loanDays: number;
  isMember: boolean;
}

let state: WorkbenchState = {
  activeCategory: "all",
  unlatchedToolId: "tool-of1400", // Start with the first tool unlatched for immediate discovery
  stagedTools: [TOOLS[0]],
  loanDays: 3,
  isMember: true,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export const workbenchStore = {
  getSnapshot(): WorkbenchState {
    return state;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setCategory(category: ToolCategory) {
    state = { ...state, activeCategory: category };
    notify();
  },

  unlatchTool(id: string) {
    state = { ...state, unlatchedToolId: state.unlatchedToolId === id ? null : id };
    notify();
  },

  stageTool(tool: ToolItem) {
    if (!state.stagedTools.some((t) => t.id === tool.id)) {
      state = { ...state, stagedTools: [...state.stagedTools, tool], unlatchedToolId: tool.id };
      notify();
    }
  },

  unstageTool(id: string) {
    state = {
      ...state,
      stagedTools: state.stagedTools.filter((t) => t.id !== id),
    };
    notify();
  },

  clearTray() {
    state = { ...state, stagedTools: [] };
    notify();
  },

  setLoanDays(days: number) {
    state = { ...state, loanDays: Math.max(1, Math.min(days, 14)) };
    notify();
  },

  toggleMembership() {
    state = { ...state, isMember: !state.isMember };
    notify();
  },
};

export function useWorkbench(): WorkbenchState {
  return useSyncExternalStore(
    workbenchStore.subscribe,
    workbenchStore.getSnapshot,
    workbenchStore.getSnapshot,
  );
}
