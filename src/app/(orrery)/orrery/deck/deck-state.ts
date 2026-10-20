export type DeckState = { index: number; count: number };

export type DeckAction =
  | { type: "next" | "prev" | "first" | "last" }
  | { type: "goto"; index: number };

const clamp = (index: number, count: number) => Math.min(count - 1, Math.max(0, index));

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  const target = (() => {
    switch (action.type) {
      case "next":
        return state.index + 1;
      case "prev":
        return state.index - 1;
      case "first":
        return 0;
      case "last":
        return state.count - 1;
      case "goto":
        return action.index;
    }
  })();
  const index = clamp(target, state.count);
  return index === state.index ? state : { ...state, index };
}

/** "03 / 10" for the third of ten slides. */
export function formatCounter(index: number, count: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(index + 1)} / ${pad(count)}`;
}
