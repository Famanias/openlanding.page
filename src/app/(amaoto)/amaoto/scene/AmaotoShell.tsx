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
import { ThreadLine } from "../ui/ThreadLine";
import { SectionBackdrop } from "../bg/SectionBackdrop";
import { SoundToggle } from "../audio/SoundToggle";
import { Motion } from "../motion/Motion";
import { WagasaCanvas } from "./WagasaCanvas";
import { ScrollDirector } from "./ScrollDirector";
import { initialDirector } from "./director";
import { AnatomyControls } from "./AnatomyControls";
import { anatomyReducer, createAnatomy, isPart, type PartId } from "./anatomy";
export function AmaotoShell() {
  const director = useRef(initialDirector());
  const [dyeOrigin, setDyeOrigin] = useState<[number, number]>([0.5, 0.5]);
  const [chapter, setChapter] = useState(0);
  const [anatomy, dispatchAnatomy] = useReducer(
    anatomyReducer,
    undefined,
    createAnatomy,
  );
  const [hovered, setHovered] = useState<PartId>();
  const changeChapter = useCallback((next: number) => {
    setChapter(next);
    setHovered(undefined);
    dispatchAnatomy({ type: "overview" });
  }, []);
  const [angle, setAngle] = useState(18),
    [rain, setRain] = useState(false),
    [colourway, setColourway] = useState("cream"),
    [closed, setClosed] = useState(false);
  const colour = useMemo(
    () => COLOURWAYS.find((x) => x.id === colourway) ?? COLOURWAYS[0],
    [colourway],
  );
  const select = useCallback((id: string, index?: number) => {
    if (isPart(id))
      dispatchAnatomy({ type: "select", part: id, ribIndex: index });
  }, []);
  const finishAction = useCallback(
    (id: number) => dispatchAnatomy({ type: "finish", id }),
    [],
  );
  useEffect(() => {
    const highlight = (event: Event) => {
      const id = (event as CustomEvent<unknown>).detail;
      setHovered(isPart(id) ? id : undefined);
    };
    const pull = (event: Event) => {
      const value = (event as CustomEvent<unknown>).detail;
      if (typeof value === "number" && Number.isFinite(value))
        dispatchAnatomy({ type: "open", value });
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && director.current.chapter === 1) {
        dispatchAnatomy({ type: "overview" });
        setHovered(undefined);
      }
    };
    document.addEventListener("amaoto-highlight", highlight);
    document.addEventListener("amaoto-runner", pull);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("amaoto-highlight", highlight);
      document.removeEventListener("amaoto-runner", pull);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <main
      className="am-page"
      style={{ "--am-dye": colour.color } as React.CSSProperties}
    >
      <SectionBackdrop />
      <header className="am-header">
        <Logo />
        <nav aria-label="Chapters">
          {[
            { id: "structure", label: "Structure", n: 1 },
            { id: "light", label: "Light", n: 2 },
            { id: "making", label: "Making", n: 4 },
            { id: "commission", label: "Commission", n: 5 },
          ].map((link) => (
            <a
              href={`#${link.id}`}
              key={link.id}
              aria-current={chapter === link.n ? "step" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <SoundToggle director={director} />
        <span className="am-header__counter">
          <b data-rib-count>00</b> / 40 ribs open
        </span>
      </header>
      <div className="am-stage">
        <div className="am-mobile-band" />
        <WagasaCanvas
          director={director}
          onPart={select}
          hovered={hovered}
          anatomy={anatomy}
          onActionFinish={finishAction}
          sun={angle}
          dyeOrigin={dyeOrigin}
          rain={rain}
          colour={colour.color}
          motif={colour.motif}
          closed={closed}
        />
        <AnatomyControls
          active={chapter === 1}
          state={anatomy}
          dispatch={dispatchAnatomy}
          onHighlight={setHovered}
        />
        <svg className="am-leader" aria-hidden="true">
          <path data-leader />
        </svg>
      </div>
      <ThreadLine />
      <Hero />
      <Structure state={anatomy} dispatch={dispatchAnatomy} />
      <Light angle={angle} onAngle={setAngle} rain={rain} onRain={setRain} />
      <Canopy
        value={colourway}
        onChange={(id, origin) => {
          setColourway(id);
          setDyeOrigin(origin ?? [0.5, 0.5]);
        }}
      />
      <Making />
      <Commission canopy={colour.label} onSuccess={() => setClosed(true)} />
      <footer className="am-footer">
        <Logo />
        <span>AMAOTO / Kurokawa, Nagano / 2026</span>
        <Hanko />
        <a href="#top">Back to top ↑</a>
        <span className="am-footer__drip" aria-hidden="true" />
      </footer>
      <ScrollDirector directorRef={director} onChapter={changeChapter} />
      <Motion />
      <noscript>
        <style>
          {
            "[data-reveal],.am-line>span{opacity:1!important;transform:none!important}.am-sound,.am-runner-control,.am-inspector-detail{display:none}.am-poster{display:block!important}"
          }
        </style>
      </noscript>
    </main>
  );
}
