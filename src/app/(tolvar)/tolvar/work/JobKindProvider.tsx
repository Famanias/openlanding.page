"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { KindId } from "./services";

/** "unsure" is the default: plenty of callers do not know which of the four their job is. */
export type QuoteKind = KindId | "unsure";

type JobKindValue = { kind: QuoteKind; setKind: (kind: QuoteKind) => void };

const JobKindContext = createContext<JobKindValue>({ kind: "unsure", setKind: () => {} });

/** Carries the kind of work picked in the work section down to the estimate form. */
export function JobKindProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<QuoteKind>("unsure");
  const value = useMemo(() => ({ kind, setKind }), [kind]);
  return <JobKindContext.Provider value={value}>{children}</JobKindContext.Provider>;
}

export function useJobKind(): JobKindValue {
  return useContext(JobKindContext);
}
