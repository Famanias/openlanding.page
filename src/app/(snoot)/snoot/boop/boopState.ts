/** Boops logged at the front desk so far today (fictional). */
export const BOOPS_TODAY = 1284;
export const SNEEZE_EVERY = 5;

export const REACTIONS = ["Boop!", "Hehe.", "Again?", "Snrrk."] as const;

export type BoopState = {
  /** Today's running total, including yours. */
  count: number;
  /** Your boops this visit. */
  mine: number;
  sneeze: boolean;
  reaction: string;
};

export function initialBoop(): BoopState {
  return { count: BOOPS_TODAY, mine: 0, sneeze: false, reaction: "" };
}

export function boop(state: BoopState): BoopState {
  const mine = state.mine + 1;
  const sneeze = mine % SNEEZE_EVERY === 0;
  const plain = mine - Math.floor(mine / SNEEZE_EVERY);
  return {
    count: state.count + 1,
    mine,
    sneeze,
    reaction: sneeze ? "Achoo!" : REACTIONS[(plain - 1) % REACTIONS.length],
  };
}
