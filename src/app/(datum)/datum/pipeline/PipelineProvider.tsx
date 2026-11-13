"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { sectionProgress } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";
import { computePassBudget, type BudgetSummary } from "./passes";
import { INITIAL_PIPELINE_STATE, pipelineReducer, type PipelineAction, type PipelineState } from "./state";

type PipelineContextValue = {
  state: PipelineState;
  dispatch: Dispatch<PipelineAction>;
  budget: BudgetSummary;
  explodeRef: MutableRefObject<number>;
};

const PipelineContext = createContext<PipelineContextValue | null>(null);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pipelineReducer, INITIAL_PIPELINE_STATE);
  const reduced = useReducedMotion();
  const explodeRef = useRef(reduced ? 1 : 0);
  const explodedRef = useRef(state.exploded);

  useEffect(() => {
    explodedRef.current = state.exploded;
  }, [state.exploded]);

  useEffect(() => {
    const dissectionEl = document.getElementById("dissection");
    if (reduced) {
      explodeRef.current = 1;
      dissectionEl?.style.setProperty("--explode", "1");
      return;
    }

    let sectionTop = 0;
    let sectionHeight = 1600;
    let vh = window.innerHeight || 900;
    let frame = 0;

    const measure = () => {
      const target = document.getElementById("dissection");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = Math.max(target.offsetHeight, 1);
      vh = window.innerHeight || 900;
    };

    const write = () => {
      frame = 0;
      const scrollP = sectionProgress(window.scrollY, sectionTop, sectionHeight, vh);
      const effective = explodedRef.current ? 1 : scrollP;
      explodeRef.current = effective;
      const target = document.getElementById("dissection");
      target?.style.setProperty("--explode", effective.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    write();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [reduced, state.exploded]);

  const budget = useMemo(
    () => computePassBudget(state.enabledPassIds, state.resolutionScale, state.targetFps),
    [state.enabledPassIds, state.resolutionScale, state.targetFps],
  );

  const value = useMemo(
    () => ({ state, dispatch, budget, explodeRef }),
    [state, budget],
  );

  return <PipelineContext.Provider value={value}>{children}</PipelineContext.Provider>;
}

export function usePipeline(): PipelineContextValue {
  const ctx = useContext(PipelineContext);
  if (!ctx) throw new Error("usePipeline must be used inside PipelineProvider");
  return ctx;
}
