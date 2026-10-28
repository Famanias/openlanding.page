"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Logo } from "../brand/Logo";
import { Hanko } from "../brand/Hanko";
import { COLOURWAYS } from "../data/colourways";
import { Canopy } from "../sections/Canopy";
import { Commission } from "../sections/Commission";
import { Hero } from "../sections/Hero";
import { Light } from "../sections/Light";
import { Making } from "../sections/Making";
import { Structure } from "../sections/Structure";
import { SectionBackdrop } from "../bg/SectionBackdrop";
import { SoundToggle } from "../audio/SoundToggle";
import { Motion } from "../motion/Motion";
import { WagasaCanvas } from "./WagasaCanvas";
import { ScrollDirector } from "./ScrollDirector";
import { initialDirector } from "./director";
import { AnatomyControls, AnatomyDetails } from "./AnatomyControls";
import {
  anatomyReducer,
  createAnatomy,
  isPart,
  type AnatomyEvent,
  type PartId,
} from "./anatomy";
import {
  WORLD_CHAPTERS,
  getChapterStateAtProgress,
  type Tool,
  type ChapterProgressState,
} from "../logic/chapters";
import { computeTimeOfDay } from "../logic/timeOfDay";
import {
  createInspect,
  exit,
  toggleKeyboardEngage,
  exitOnChapterChange,
} from "../logic/inspect";
import { paperLitAt } from "../logic/atmosphere";
import type { ScrollController } from "./scroll";
import { MAKING_STEPS } from "../data/steps";
import { progressForAssembly } from "./makingSequence";
import { PartCallout } from "../ui/PartCallout";
export function AmaotoShell() {
  const director = useRef(initialDirector()),
    controls = useRef<ScrollController | null>(null),
    inspection = useRef(createInspect()),
    owner = useRef(""),
    previousFocus = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"static" | "loading" | "cinematic">(
      "static",
    ),
    [reason, setReason] = useState(""),
    [story, setStory] = useState(getChapterStateAtProgress(0)),
    [chapter, setChapter] = useState(0),
    [tool, setTool] = useState<Tool>(null);
  const [anatomy, rawDispatch] = useReducer(
      anatomyReducer,
      undefined,
      createAnatomy,
    ),
    [hovered, setHovered] = useState<PartId>(),
    [time, setTime] = useState(0.75),
    [rain, setRain] = useState(true),
    [colourway, setColourway] = useState("cream"),
    [closed, setClosed] = useState(false),
    [dyeOrigin, setDyeOrigin] = useState<[number, number]>([0.5, 0.5]);
  useEffect(() => {
    director.current.timeOfDay = time;
  }, [time]);
  const day = useMemo(() => computeTimeOfDay(time), [time]),
    colour = COLOURWAYS.find((c) => c.id === colourway) ?? COLOURWAYS[0];
  const close = useCallback(() => {
    owner.current = "";
    setTool(null);
    inspection.current = exit(inspection.current);
    controls.current?.setScrollPaused(false);
    rawDispatch({ type: "overview" });
    previousFocus.current?.focus({ preventScroll: true });
  }, []);
  const changeChapter = useCallback((n: number) => {
    owner.current = "";
    setChapter(n);
    setHovered(undefined);
    setTool(null);
    inspection.current = exit(inspection.current);
    controls.current?.setScrollPaused(false);
    rawDispatch({ type: "overview" });
  }, []);
  const onState = useCallback(
    (s: ChapterProgressState) => {
      setStory(s);
      inspection.current = exitOnChapterChange(
        inspection.current,
        `${s.activeChapterIndex}:${s.subRest ?? ""}`,
      );
      if (
        owner.current &&
        owner.current !== `${s.activeChapterIndex}:${s.subRest ?? ""}`
      )
        close();
    },
    [close],
  );
  const engage = useCallback((value: Tool, focusStage = false) => {
    if (!value) return;
    const first = !owner.current;
    if (first) previousFocus.current = document.activeElement as HTMLElement;
    owner.current = `${director.current.world.activeChapterIndex}:${director.current.world.subRest ?? ""}`;
    setTool(value);
    controls.current?.setScrollPaused(true);
    if (value === "anatomy" && inspection.current.phase !== "engaged")
      inspection.current = toggleKeyboardEngage(
        inspection.current,
        owner.current,
      );
    if (first || focusStage)
      setTimeout(
        () =>
          document
            .querySelector<HTMLElement>(
              focusStage ? ".am-canvas" : ".am-tool-close",
            )
            ?.focus({ preventScroll: true }),
        0,
      );
  }, []);
  const dispatch = useCallback(
    (event: AnatomyEvent) => {
      if (
        event.type !== "overview" &&
        event.type !== "finish" &&
        director.current.chapter === 1
      )
        engage("anatomy");
      rawDispatch(event);
    },
    [engage],
  );
  const select = useCallback(
    (id: string, index?: number) => {
      if (isPart(id) && director.current.chapter === 1) {
        engage("anatomy");
        rawDispatch({ type: "select", part: id, ribIndex: index });
      }
    },
    [engage],
  );
  const ready = useCallback(() => setMode("cinematic"), []),
    fallback = useCallback(() => {
      close();
      inspection.current = createInspect();
      setMode("static");
      setReason("fallback");
    }, [close]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion:reduce)");
    const update = () => {
      setMode(media.matches ? "static" : "loading");
      setReason(media.matches ? "reduced-motion" : "");
      setTool(null);
      inspection.current = createInspect();
      owner.current = "";
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tool) {
        e.preventDefault();
        close();
      }
    };
    const highlight = (e: Event) => {
      const id = (e as CustomEvent<unknown>).detail;
      setHovered(isPart(id) ? id : undefined);
    };
    const runner = (e: Event) => {
      const v = (e as CustomEvent<unknown>).detail;
      if (typeof v === "number" && Number.isFinite(v))
        rawDispatch({ type: "open", value: v });
    };
    document.addEventListener("keydown", key);
    document.addEventListener("amaoto-highlight", highlight);
    document.addEventListener("amaoto-runner", runner);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("amaoto-highlight", highlight);
      document.removeEventListener("amaoto-runner", runner);
    };
  }, [tool, close]);
  const cinematic = mode === "cinematic";
  const anatomyVisible = cinematic && chapter === 1;
  const panelTool = tool ?? (anatomyVisible ? "anatomy" : null);
  const style = {
    ...day.cssVars,
    "--am-dye": colour.color,
  } as React.CSSProperties;
  return (
    <main
      className="am-page"
      style={style}
      data-world-mode={mode}
      data-fallback={reason}
      data-active-chapter={chapter}
      data-sub-rest={story.subRest ?? "none"}
      data-inspect-phase={tool === "anatomy" ? "engaged" : "idle"}
      data-paper-lit={paperLitAt(story, day) > 0.45}
      data-tool={tool ?? "none"}
      onClick={(e) => {
        const a = (e.target as Element).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        if (!a || !cinematic) return;
        const c = WORLD_CHAPTERS.find(
          (c) => `#${c.id}` === a.getAttribute("href"),
        );
        if (c) {
          e.preventDefault();
          close();
          controls.current?.scrollToProgress(c.restProgress);
          history.replaceState(null, "", `#${c.id}`);
        }
      }}
    >
      <SectionBackdrop />
      <header className="am-header">
        <Logo />
        <div className="am-time">
          <button
            type="button"
            aria-label="Set light to dusk"
            onClick={() => setTime(0)}
          >
            Dusk
          </button>
          <label>
            <span>
              Time of day <output>{day.timeLabel}</output>
            </span>
            <input
              aria-label="Time of day"
              type="range"
              min="0"
              max="1"
              step=".01"
              value={time}
              aria-valuetext={`${day.timeLabel} (${Math.round(time * 100)}%)`}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </label>
          <button
            type="button"
            aria-label="Set light to day"
            onClick={() => setTime(1)}
          >
            Day
          </button>
        </div>
        <SoundToggle director={director} />
        <span className="am-header__counter">
          <b data-rib-count>00</b> / 40 ribs open
        </span>
      </header>
      <div className="am-stage">
        {mode !== "static" && (
          <WagasaCanvas
            director={director}
            onPart={select}
            hovered={hovered}
            anatomy={anatomy}
            onActionFinish={(id) => rawDispatch({ type: "finish", id })}
            sun={time * 180 - 90}
            timeOfDay={time}
            dyeOrigin={dyeOrigin}
            rain={rain}
            colour={colour.color}
            motif={colour.motif}
            closed={closed}
            controls={controls}
            inspection={inspection}
            tool={tool}
            onReady={ready}
            onFallback={fallback}
          />
        )}
        {mode === "static" && (
          <div className="am-static-poster" aria-hidden="true">
            <svg className="am-poster" viewBox="0 0 500 400">
              <path
                d="M250 35Q100 70 30 210Q250 300 470 210Q400 70 250 35Z"
                fill="#F4ECDD"
                stroke="#B8923A"
              />
              {Array.from({ length: 21 }, (_, i) => (
                <path
                  key={i}
                  d={`M250 35L${30 + i * 22} ${210 + Math.sin((i / 20) * Math.PI) * 45}`}
                  stroke="#B8923A"
                  fill="none"
                />
              ))}
              <path d="M250 45V380" stroke="#B8923A" strokeWidth="7" />
            </svg>
          </div>
        )}
        <AnatomyControls
          active={cinematic && chapter === 1}
          state={anatomy}
          dispatch={dispatch}
          onHighlight={setHovered}
        />
        <svg className="am-leader" aria-hidden="true">
          <path data-leader />
        </svg>
      </div>
      {mode === "loading" && (
        <div className="am-loading" role="status">
          Preparing paper and light<span>雨音</span>
        </div>
      )}
      {cinematic && <div className="am-world-track" aria-hidden="true" />}
      <Hero />
      <Structure state={anatomy} dispatch={dispatch} enhanced={cinematic} />
      <Light
        angle={time * 180 - 90}
        onAngle={(n) => setTime((n + 90) / 180)}
        rain={rain}
        onRain={setRain}
      />
      <Canopy
        value={colourway}
        onChange={(id, origin) => {
          setColourway(id);
          setDyeOrigin(origin ?? [0.5, 0.5]);
        }}
      />
      <Making />
      <Commission canopy={colour.label} onSuccess={() => setClosed(true)} />
      {cinematic && (
        <>
          <nav className="am-journey-nav" aria-label="Chapter navigation">
            <button
              type="button"
              aria-label="Previous chapter rest"
              disabled={story.progress === 0}
              onClick={() => {
                close();
                controls.current?.stepChapter(-1);
              }}
            >
              ←
            </button>
            <div className="am-chapter-marker" aria-live="polite">
              <span>
                {story.activeChapter.numberLabel} / {story.activeChapter.title}
              </span>
              <small>
                {story.activeChapter.markerLabel}
                {story.subRest === "street" ? " / touch the rain" : ""}
              </small>
            </div>
            <div className="am-jump-list">
              {WORLD_CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Jump to ${c.title}`}
                  aria-current={chapter === c.index ? "step" : undefined}
                  onClick={() => {
                    close();
                    controls.current?.scrollToProgress(c.restProgress);
                  }}
                >
                  {c.numberLabel}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next chapter rest"
              disabled={story.progress === 1}
              onClick={() => {
                close();
                controls.current?.stepChapter(1);
              }}
            >
              →
            </button>
          </nav>
          {story.activeChapter.tool && !tool && !anatomyVisible && (
            <button
              type="button"
              className="am-enter-tool"
              onClick={() => engage(story.activeChapter.tool)}
            >
              {story.activeChapter.toolButtonLabel}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
          {chapter === 4 && (
            <div
              className="am-making-strip"
              role="group"
              aria-label="Making steps"
            >
              {MAKING_STEPS.map((step, i) => (
                <button
                  key={step}
                  type="button"
                  aria-current={
                    Math.min(9, Math.floor(story.benchAssembly * 10)) === i
                      ? "step"
                      : undefined
                  }
                  onClick={() => {
                    engage("making");
                    controls.current?.scrollToProgress(
                      progressForAssembly(i / 9),
                      true,
                    );
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </button>
              ))}
            </div>
          )}
          {panelTool && (
            <aside
              className="am-tool-sheet"
              role={tool ? "dialog" : "region"}
              aria-modal={tool ? false : undefined}
              aria-label={
                panelTool === "anatomy"
                  ? "Inspect the structure"
                  : panelTool === "light"
                    ? "Explore light"
                    : "Follow the making"
              }
            >
              <header>
                <span>
                  {panelTool === "anatomy"
                    ? "Bamboo / paper / thread"
                    : panelTool === "light"
                      ? "Light / weather"
                      : "The making"}
                </span>
                <button
                  className="am-tool-close"
                  type="button"
                  onClick={() => {
                    close();
                    if (!tool)
                      controls.current?.scrollToProgress(
                        WORLD_CHAPTERS[2].restProgress,
                      );
                  }}
                >
                  {tool ? "Return to story" : "Continue to Paper"}{" "}
                  <span aria-hidden="true">{tool ? "×" : "→"}</span>
                </button>
              </header>
              {panelTool === "anatomy" && (
                <>
                  <div className="am-sheet-parts">
                    <PartCallout
                      selected={anatomy.part}
                      onSelect={(part) => dispatch({ type: "select", part })}
                      onHighlight={setHovered}
                    />
                  </div>
                  <AnatomyDetails state={anatomy} dispatch={dispatch} />
                  <button
                    type="button"
                    className="am-focus-stage"
                    onClick={() => engage("anatomy", true)}
                  >
                    Focus umbrella · arrow keys turn the view
                  </button>
                </>
              )}
              {panelTool === "light" && (
                <>
                  <h3>Paper that listens to light.</h3>
                  <p>Move from dusk to day. The fibres answer.</p>
                  <label>
                    Light level
                    <input
                      aria-label="Light level"
                      type="range"
                      min="0"
                      max="1"
                      step=".01"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                    />
                  </label>
                  <label className="am-switch">
                    <input
                      type="checkbox"
                      checked={rain}
                      onChange={(e) => setRain(e.target.checked)}
                    />
                    Rain on the roof
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      controls.current?.scrollToProgress(0.72);
                    }}
                  >
                    Step into the rain ↗
                  </button>
                </>
              )}
              {panelTool === "making" && (
                <>
                  <h3>
                    {
                      MAKING_STEPS[
                        Math.min(9, Math.floor(story.benchAssembly * 10))
                      ]
                    }
                  </h3>
                  <label>
                    Follow the making
                    <input
                      aria-label="Making progress"
                      type="range"
                      min="0"
                      max="1"
                      step=".001"
                      value={story.benchAssembly}
                      onInput={(e) =>
                        controls.current?.scrollToProgress(
                          progressForAssembly(Number(e.currentTarget.value)),
                          true,
                        )
                      }
                    />
                  </label>
                  <p>
                    {Math.min(10, Math.floor(story.benchAssembly * 10) + 1)} /
                    10 — move forward or back
                  </p>
                </>
              )}
            </aside>
          )}
        </>
      )}
      <footer className="am-footer">
        <Logo />
        <span>AMAOTO / Kurokawa, Nagano / 2026</span>
        <Hanko />
        <a href="#top">Back to top ↑</a>
      </footer>
      <ScrollDirector
        directorRef={director}
        onChapter={changeChapter}
        enabled={cinematic}
        controlsRef={controls}
        onState={onState}
      />
      <Motion />
      <noscript>
        <style>
          {
            ".am-line>span{opacity:1!important;transform:none!important}.am-anatomy-fallback{display:block!important}.am-inspector-detail,.am-sound{display:none!important}"
          }
        </style>
      </noscript>
    </main>
  );
}
