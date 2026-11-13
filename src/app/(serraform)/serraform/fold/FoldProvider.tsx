'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { DEFAULT_DESIGN, FOLD_CONSTANTS, ViewId, ViewState } from './config';
import { deriveFold, FoldPose } from './geometry';
import {
  createInitialFoldState,
  DesignState,
  foldReducer,
  getEffectiveOpening,
  OwnershipMode,
} from './state';
import {
  computeDemoFoldChoreography,
  computeEntranceChoreography,
  UnfoldChoreographyFrame,
} from './unfold';
import { loadValidatedImageFile, UploadedArtworkResource } from './upload';
import { useReducedMotion } from '../motion/useReducedMotion';

export interface EnvironmentFlags {
  enhancedDesktop: boolean;
  isCoarsePointer: boolean;
  saveData: boolean;
  reducedMotion: boolean;
}

export type StageHostId = 'hero' | 'studio';
export type ChoreographyMode = 'idle' | 'entrance' | 'demo';

type StoryFrameListener = (opening: number, chapter: 0 | 1 | 2) => void;
type ChainFrameListener = (frame: UnfoldChoreographyFrame | null) => void;

export interface FoldContextValue {
  mode: OwnershipMode;
  design: DesignState;
  view: ViewState;
  effectiveOpening: number;
  effectivePose: FoldPose;
  chapter: 0 | 1 | 2;
  env: EnvironmentFlags;
  isCustomized: boolean;
  choreographyMode: ChoreographyMode;
  demoActive: boolean;
  entranceSettled: boolean;
  uploadedArt: UploadedArtworkResource | null;
  uploadError: string | null;
  isUploading: boolean;
  activeWebglHost: StageHostId | null;
  acquireWebglHost: (hostId: StageHostId, disposePrevious: () => void) => void;
  releaseWebglHost: (hostId: StageHostId) => void;
  setOpening: (opening: number) => void;
  setBaseHex: (hex: string) => void;
  setDesignHex: (hex: string) => void;
  setPrint: (print: DesignState['print']) => void;
  setMotifScale: (scale: number) => void;
  setTintUpload: (tintUpload: boolean) => void;
  setViewPreset: (viewId: ViewId) => void;
  setViewAngles: (yawDeg: number, elevationDeg: number) => void;
  rotateViewStep: (deltaYawDeg: number) => void;
  resetView: () => void;
  resetShape: () => void;
  resetDesign: () => void;
  followStory: () => void;
  replayFoldSequence: () => void;
  cancelChoreography: () => void;
  uploadFile: (file: File) => Promise<void>;
  clearUpload: () => void;
  clearUploadError: () => void;
  pushStoryFrame: (opening: number, chapter: 0 | 1 | 2) => void;
  getLiveOpening: () => number;
  getLiveChainFrame: () => UnfoldChoreographyFrame | null;
  subscribeStoryFrame: (listener: StoryFrameListener) => () => void;
  subscribeChainFrame: (listener: ChainFrameListener) => () => void;
}

const FoldContext = createContext<FoldContextValue | null>(null);

const DEFAULT_ENV: EnvironmentFlags = {
  enhancedDesktop: true,
  isCoarsePointer: false,
  saveData: false,
  reducedMotion: false,
};

function readEnvFlags(reducedMotion: boolean): EnvironmentFlags {
  if (typeof window === 'undefined') {
    return {
      ...DEFAULT_ENV,
      reducedMotion,
    };
  }
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const wideEnough = window.innerWidth >= 900 && window.innerHeight >= 640;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = Boolean(conn?.saveData);

  return {
    enhancedDesktop: !coarse && wideEnough && !reducedMotion,
    isCoarsePointer: coarse,
    saveData,
    reducedMotion,
  };
}

export const FoldProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const [env, setEnv] = useState<EnvironmentFlags>(DEFAULT_ENV);

  const [state, dispatch] = useReducer(
    foldReducer,
    DEFAULT_ENV.enhancedDesktop,
    (enhanced) => createInitialFoldState(enhanced),
  );

  const storyOpeningRef = useRef<number>(FOLD_CONSTANTS.defaultOpening);
  const [chapter, setChapter] = useState<0 | 1 | 2>(0);
  const chapterRef = useRef<0 | 1 | 2>(0);
  const listenersRef = useRef<Set<StoryFrameListener>>(new Set());

  // Mechanical hinge-chain choreography state (entrance & "See how it folds")
  const [choreographyMode, setChoreographyMode] = useState<ChoreographyMode>(() =>
    reducedMotion ? 'idle' : 'entrance',
  );
  const [entranceSettled, setEntranceSettled] = useState<boolean>(reducedMotion);
  const choreographyRef = useRef<ChoreographyMode>(reducedMotion ? 'idle' : 'entrance');
  const chainFrameRef = useRef<UnfoldChoreographyFrame | null>(
    reducedMotion
      ? null
      : computeEntranceChoreography(0, FOLD_CONSTANTS.defaultOpening, false),
  );
  const chainListenersRef = useRef<Set<ChainFrameListener>>(new Set());
  const choreographyRafRef = useRef<number>(0);

  // Transient local upload resource (session-only, never serialized into brief/JSON)
  const [uploadedArt, setUploadedArt] = useState<UploadedArtworkResource | null>(null);
  const uploadedArtRef = useRef<UploadedArtworkResource | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadGenRef = useRef(0);
  const unmountedRef = useRef(false);

  // Singleton WebGL ownership coordinator across Hero & Studio stages (<= 1 renderer active)
  const [activeWebglHost, setActiveWebglHost] = useState<StageHostId | null>(null);
  const activeHostRef = useRef<StageHostId | null>(null);
  const activeDisposeRef = useRef<(() => void) | null>(null);

  const emitChainFrame = useCallback((frame: UnfoldChoreographyFrame | null) => {
    chainFrameRef.current = frame;
    chainListenersRef.current.forEach((fn) => fn(frame));
  }, []);

  const stopChoreographyLoop = useCallback(() => {
    if (choreographyRafRef.current) {
      cancelAnimationFrame(choreographyRafRef.current);
      choreographyRafRef.current = 0;
    }
  }, []);

  const cancelChoreography = useCallback(() => {
    if (choreographyRef.current === 'idle') return;
    stopChoreographyLoop();
    choreographyRef.current = 'idle';
    setChoreographyMode('idle');
    setEntranceSettled(true);
    emitChainFrame(null);
  }, [emitChainFrame, stopChoreographyLoop]);

  const startTimedChoreography = useCallback(
    (kind: 'entrance' | 'demo', targetOpening: number) => {
      stopChoreographyLoop();
      if (reducedMotion) {
        choreographyRef.current = 'idle';
        setChoreographyMode('idle');
        setEntranceSettled(true);
        emitChainFrame(null);
        return;
      }

      choreographyRef.current = kind;
      setChoreographyMode(kind);
      const startMs = performance.now();

      const firstFrame =
        kind === 'entrance'
          ? computeEntranceChoreography(0, targetOpening, false)
          : computeDemoFoldChoreography(0, targetOpening, false);
      emitChainFrame(firstFrame);

      const tick = (now: number) => {
        if (unmountedRef.current || choreographyRef.current !== kind) return;
        const elapsedSec = (now - startMs) / 1000;
        const frame =
          kind === 'entrance'
            ? computeEntranceChoreography(elapsedSec, targetOpening, false)
            : computeDemoFoldChoreography(elapsedSec, targetOpening, false);

        emitChainFrame(frame);

        if (frame.done) {
          choreographyRef.current = 'idle';
          setChoreographyMode('idle');
          setEntranceSettled(true);
          emitChainFrame(null);
          return;
        }

        choreographyRafRef.current = requestAnimationFrame(tick);
      };

      choreographyRafRef.current = requestAnimationFrame(tick);
    },
    [emitChainFrame, reducedMotion, stopChoreographyLoop],
  );

  // Run signature unfolding entrance sequence once on mount unless reduced motion
  useEffect(() => {
    unmountedRef.current = false;
    if (!reducedMotion) {
      startTimedChoreography('entrance', FOLD_CONSTANTS.defaultOpening);
    } else {
      choreographyRef.current = 'idle';
      setChoreographyMode('idle');
      setEntranceSettled(true);
      emitChainFrame(null);
    }

    return () => {
      unmountedRef.current = true;
      stopChoreographyLoop();
      uploadGenRef.current += 1;
      uploadedArtRef.current?.dispose();
      uploadedArtRef.current = null;
      activeDisposeRef.current?.();
      activeDisposeRef.current = null;
      activeHostRef.current = null;
    };
    // Intentionally mounted once; dynamic reducedMotion handled in effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cancel active choreography immediately if reduced motion turns on
  useEffect(() => {
    if (reducedMotion) {
      cancelChoreography();
    }
  }, [reducedMotion, cancelChoreography]);

  // Synchronize viewport & reduced-motion layout eligibility
  useEffect(() => {
    const sync = () => {
      const next = readEnvFlags(reducedMotion);
      setEnv(next);
      dispatch({
        type: 'SYNC_LAYOUT',
        enhanced: next.enhancedDesktop,
        currentOpening: storyOpeningRef.current,
      });
    };

    sync();
    const mql = window.matchMedia?.('(min-width: 900px) and (min-height: 640px)');
    window.addEventListener('resize', sync, { passive: true });
    mql?.addEventListener?.('change', sync);
    return () => {
      window.removeEventListener('resize', sync);
      mql?.removeEventListener?.('change', sync);
    };
  }, [reducedMotion]);

  const acquireWebglHost = useCallback(
    (hostId: StageHostId, disposePrevious: () => void) => {
      if (activeHostRef.current && activeHostRef.current !== hostId) {
        const prevDispose = activeDisposeRef.current;
        activeDisposeRef.current = null;
        prevDispose?.();
      }
      activeHostRef.current = hostId;
      activeDisposeRef.current = disposePrevious;
      setActiveWebglHost(hostId);
    },
    [],
  );

  const releaseWebglHost = useCallback((hostId: StageHostId) => {
    if (activeHostRef.current === hostId) {
      activeHostRef.current = null;
      activeDisposeRef.current = null;
      setActiveWebglHost(null);
    }
  }, []);

  const pushStoryFrame = useCallback(
    (opening: number, nextChapter: 0 | 1 | 2) => {
      storyOpeningRef.current = opening;
      if (chapterRef.current !== nextChapter) {
        chapterRef.current = nextChapter;
        setChapter(nextChapter);
      }
      if (choreographyRef.current === 'idle') {
        listenersRef.current.forEach((fn) => fn(opening, nextChapter));
      }
    },
    [],
  );

  const subscribeStoryFrame = useCallback((listener: StoryFrameListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const subscribeChainFrame = useCallback((listener: ChainFrameListener) => {
    chainListenersRef.current.add(listener);
    return () => {
      chainListenersRef.current.delete(listener);
    };
  }, []);

  const getLiveOpening = useCallback(() => {
    if (choreographyRef.current !== 'idle' && chainFrameRef.current) {
      return chainFrameRef.current.averageOpening;
    }
    return getEffectiveOpening(state, storyOpeningRef.current);
  }, [state]);

  const getLiveChainFrame = useCallback(() => {
    return chainFrameRef.current;
  }, []);

  const setOpening = useCallback(
    (opening: number) => {
      cancelChoreography();
      dispatch({ type: 'SET_OPENING', opening });
    },
    [cancelChoreography],
  );

  const captureCurrentOpening = useCallback(() => {
    if (choreographyRef.current !== 'idle' && chainFrameRef.current) {
      return chainFrameRef.current.averageOpening;
    }
    return storyOpeningRef.current;
  }, []);

  const setBaseHex = useCallback(
    (hex: string) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_BASE_HEX',
        hex,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setDesignHex = useCallback(
    (hex: string) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_DESIGN_HEX',
        hex,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setPrint = useCallback(
    (print: DesignState['print']) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_PRINT',
        print,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setMotifScale = useCallback(
    (motifScale: number) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_MOTIF_SCALE',
        motifScale,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setTintUpload = useCallback(
    (tintUpload: boolean) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_TINT_UPLOAD',
        tintUpload,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setViewPreset = useCallback(
    (viewId: ViewId) => {
      cancelChoreography();
      dispatch({
        type: 'SET_VIEW_PRESET',
        viewId,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const setViewAngles = useCallback(
    (yawDeg: number, elevationDeg: number) => {
      cancelChoreography();
      dispatch({
        type: 'SET_VIEW_ANGLES',
        yawDeg,
        elevationDeg,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const rotateViewStep = useCallback(
    (deltaYawDeg: number) => {
      cancelChoreography();
      dispatch({
        type: 'ROTATE_VIEW_STEP',
        deltaYawDeg,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const resetView = useCallback(() => {
    cancelChoreography();
    dispatch({
      type: 'RESET_VIEW',
      currentOpening: storyOpeningRef.current,
    });
  }, [cancelChoreography]);

  const resetShape = useCallback(() => {
    cancelChoreography();
    dispatch({ type: 'RESET_SHAPE' });
  }, [cancelChoreography]);

  const resetDesign = useCallback(() => {
    cancelChoreography();
    uploadGenRef.current += 1;
    if (uploadedArtRef.current) {
      uploadedArtRef.current.dispose();
      uploadedArtRef.current = null;
    }
    setUploadedArt(null);
    setUploadError(null);
    setIsUploading(false);
    dispatch({
      type: 'RESET_DESIGN',
      currentOpening: storyOpeningRef.current,
    });
  }, [cancelChoreography]);

  const followStory = useCallback(() => {
    cancelChoreography();
    dispatch({ type: 'FOLLOW_STORY' });
  }, [cancelChoreography]);

  const replayFoldSequence = useCallback(() => {
    const anchor = getEffectiveOpening(state, storyOpeningRef.current);
    startTimedChoreography('demo', anchor);
  }, [startTimedChoreography, state]);

  const uploadFile = useCallback(
    async (file: File) => {
      cancelChoreography();
      const token = ++uploadGenRef.current;
      setIsUploading(true);
      setUploadError(null);

      const result = await loadValidatedImageFile(
        file,
        token,
        (t) => !unmountedRef.current && t === uploadGenRef.current,
      );

      if (unmountedRef.current || token !== uploadGenRef.current) {
        if (result.ok) {
          result.resource.dispose();
        }
        return;
      }

      setIsUploading(false);

      if (!result.ok) {
        if (result.error) {
          setUploadError(result.error);
        }
        return;
      }

      const previous = uploadedArtRef.current;
      uploadedArtRef.current = result.resource;
      setUploadedArt(result.resource);
      setUploadError(null);
      dispatch({
        type: 'SET_PRINT',
        print: 'upload',
        currentOpening: storyOpeningRef.current,
      });

      if (previous) {
        previous.dispose();
      }
    },
    [cancelChoreography],
  );

  const clearUpload = useCallback(() => {
    uploadGenRef.current += 1;
    setIsUploading(false);
    setUploadError(null);
    if (uploadedArtRef.current) {
      uploadedArtRef.current.dispose();
      uploadedArtRef.current = null;
    }
    setUploadedArt(null);
    if (state.design.print === 'upload') {
      dispatch({
        type: 'SET_PRINT',
        print: 'solid',
        currentOpening: storyOpeningRef.current,
      });
    }
  }, [state.design.print]);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const effectiveOpening = getEffectiveOpening(state, storyOpeningRef.current);
  const effectivePose = useMemo(
    () => deriveFold(effectiveOpening),
    [effectiveOpening],
  );

  const isCustomized =
    state.design.opening !== DEFAULT_DESIGN.opening ||
    state.design.baseHex !== DEFAULT_DESIGN.baseHex ||
    state.design.designHex !== DEFAULT_DESIGN.designHex ||
    state.design.print !== DEFAULT_DESIGN.print ||
    state.design.motifScale !== DEFAULT_DESIGN.motifScale ||
    Boolean(state.design.tintUpload) !== Boolean(DEFAULT_DESIGN.tintUpload) ||
    uploadedArt !== null;

  const demoActive = choreographyMode === 'demo';

  const value = useMemo<FoldContextValue>(
    () => ({
      mode: state.mode,
      design: state.design,
      view: state.view,
      effectiveOpening,
      effectivePose,
      chapter,
      env,
      isCustomized,
      choreographyMode,
      demoActive,
      entranceSettled,
      uploadedArt,
      uploadError,
      isUploading,
      activeWebglHost,
      acquireWebglHost,
      releaseWebglHost,
      setOpening,
      setBaseHex,
      setDesignHex,
      setPrint,
      setMotifScale,
      setTintUpload,
      setViewPreset,
      setViewAngles,
      rotateViewStep,
      resetView,
      resetShape,
      resetDesign,
      followStory,
      replayFoldSequence,
      cancelChoreography,
      uploadFile,
      clearUpload,
      clearUploadError,
      pushStoryFrame,
      getLiveOpening,
      getLiveChainFrame,
      subscribeStoryFrame,
      subscribeChainFrame,
    }),
    [
      state.mode,
      state.design,
      state.view,
      effectiveOpening,
      effectivePose,
      chapter,
      env,
      isCustomized,
      choreographyMode,
      demoActive,
      entranceSettled,
      uploadedArt,
      uploadError,
      isUploading,
      activeWebglHost,
      acquireWebglHost,
      releaseWebglHost,
      setOpening,
      setBaseHex,
      setDesignHex,
      setPrint,
      setMotifScale,
      setTintUpload,
      setViewPreset,
      setViewAngles,
      rotateViewStep,
      resetView,
      resetShape,
      resetDesign,
      followStory,
      replayFoldSequence,
      cancelChoreography,
      uploadFile,
      clearUpload,
      clearUploadError,
      pushStoryFrame,
      getLiveOpening,
      getLiveChainFrame,
      subscribeStoryFrame,
      subscribeChainFrame,
    ],
  );

  return <FoldContext.Provider value={value}>{children}</FoldContext.Provider>;
};

export function useFold(): FoldContextValue {
  const ctx = useContext(FoldContext);
  if (!ctx) {
    throw new Error('useFold must be used within FoldProvider');
  }
  return ctx;
}
