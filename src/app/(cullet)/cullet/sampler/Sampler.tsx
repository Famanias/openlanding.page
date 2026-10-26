"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { materialById, MATERIALS } from "../content/materials";
import { goto } from "../motion/SmoothScroll";
import { mayHaveWebGL } from "../motion/webgl";
import type { SamplerEngine } from "./engine";
import { abbe, estimateMs, formatParam, GLTF_KEY, PARAMS, rayFan, sameParams, setParam, toGltf, type GlassParams, type ParamKey } from "./params";
import { SamplerPoster } from "./SamplerPoster";

type Glass = "off" | "offer" | "loading" | "on";

const START = materialById("frosted-quartz")!;

/**
 * The live sampler. Five dials, six presets, a glTF readout that flashes the line each dial writes,
 * and a stage that is the drawn poster until the WebGL gem takes over (near the viewport on desktop,
 * on tap on touch screens, never under reduced motion). Materials elsewhere load here via `fc:preset`.
 */
export function Sampler() {
  const [params, setParams] = useState<GlassParams>(START.params);
  const [name, setName] = useState(START.id);
  const [hot, setHot] = useState<{ key: ParamKey | "all"; n: number }>({ key: "all", n: 0 });
  const [glass, setGlass] = useState<Glass>("off");
  const [ms, setMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<SamplerEngine | null>(null);
  const paramsRef = useRef(params);

  const preset = MATERIALS.find((m) => sameParams(m.params, params));

  const start = useCallback(async () => {
    const stage = stageRef.current, canvas = canvasRef.current;
    if (!stage || !canvas || engine.current) return;
    setGlass("loading");
    try {
      const { createSamplerEngine } = await import("./engine");
      if (engine.current) return;
      engine.current = createSamplerEngine(canvas, stage, paramsRef.current, (v) => setMs(v));
      setGlass("on");
    } catch {
      setGlass("off");
    }
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!mayHaveWebGL()) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const id = window.setTimeout(() => setGlass("offer"), 0);
      return () => window.clearTimeout(id);
    }
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      void start();
    }, { rootMargin: "100% 0px" });
    io.observe(stage);
    return () => io.disconnect();
  }, [start]);

  useEffect(() => () => { engine.current?.destroy(); engine.current = null; }, []);
  useEffect(() => { paramsRef.current = params; engine.current?.set(params); }, [params]);

  useEffect(() => {
    const onPreset = (e: Event) => {
      const m = materialById((e as CustomEvent<string>).detail);
      if (!m) return;
      setParams(m.params); setName(m.id); setHot((h) => ({ key: "all", n: h.n + 1 }));
      goto("sampler");
    };
    window.addEventListener("fc:preset", onPreset);
    return () => window.removeEventListener("fc:preset", onPreset);
  }, []);

  const dial = (key: ParamKey, value: number) => {
    setParams((p) => setParam(p, key, value));
    setName("custom-glass");
    setHot((h) => ({ key, n: h.n + 1 }));
  };

  const choose = (id: string) => {
    const m = materialById(id);
    if (!m) return;
    setParams(m.params); setName(m.id); setHot((h) => ({ key: "all", n: h.n + 1 }));
  };

  const json = useMemo(() => JSON.stringify(toGltf(params, name), null, 2), [params, name]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(json); } catch { /* the readout stays selectable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const fan = rayFan(params);
  const look = {
    "--bend": `${fan.bend.toFixed(1)}deg`, "--spread": `${fan.spread.toFixed(1)}deg`, "--blur": `${fan.blur.toFixed(2)}px`,
    "--film": params.iridescence.toFixed(2), "--thick": (0.82 + params.thickness * 0.06).toFixed(3),
  } as CSSProperties;
  const frame = ms ?? estimateMs(params);

  return (
    <div className="fc-sampler__grid">
      <div ref={stageRef} className="fc-sampler__stage" data-glass={glass} style={look}>
        <SamplerPoster />
        <canvas ref={canvasRef} className="fc-sampler__canvas" aria-label="Live glass sample. Drag to turn it." role="img" aria-hidden={glass !== "on"} />
        <div className="fc-sampler__hud">
          <span className="fc-sampler__live" data-on={glass === "on"}>{glass === "on" ? "Live · WebGL" : "Drawn preview"}</span>
          <span className="fc-sampler__ms" data-ambient>
            <span className="fc-sampler__ms-n">{frame.toFixed(1)}</span> ms {glass === "on" ? "frame" : "est."}
          </span>
        </div>
        {glass === "offer" || glass === "loading" ? (
          <button type="button" className="fc-light fc-light--sampler" onClick={() => void start()} disabled={glass === "loading"}>
            <span className="fc-light__dot" aria-hidden="true" />
            {glass === "loading" ? "Cutting the gem…" : "Render it live"}
          </button>
        ) : null}
      </div>

      <div className="fc-sampler__panel">
        <div className="fc-presets" role="group" aria-label="Presets">
          {MATERIALS.map((m) => (
            <button key={m.id} type="button" className="fc-preset" aria-pressed={preset?.id === m.id} onClick={() => choose(m.id)}>
              <span className={`fc-preset__swatch fc-swatch--${m.finish}`} aria-hidden="true" />
              {m.name}
            </button>
          ))}
        </div>

        <div className="fc-dials">
          {PARAMS.map((p) => {
            const pct = ((params[p.key] - p.min) / (p.max - p.min)) * 100;
            return (
              <div key={p.key} className="fc-dial">
                <label htmlFor={`fc-dial-${p.key}`} className="fc-dial__label">{p.label}</label>
                <output htmlFor={`fc-dial-${p.key}`} className="fc-dial__value">{formatParam(p.key, params[p.key])}</output>
                <input
                  id={`fc-dial-${p.key}`} className="fc-dial__input" type="range"
                  min={p.min} max={p.max} step={p.step} value={params[p.key]}
                  style={{ "--fill": `${pct.toFixed(2)}%` } as CSSProperties}
                  onChange={(e) => dial(p.key, Number(e.target.value))}
                />
              </div>
            );
          })}
          <p className="fc-dials__abbe">Abbe number <strong>{Number.isFinite(abbe(params.dispersion)) ? abbe(params.dispersion) : "∞"}</strong> · {preset ? preset.name : "Custom glass"}</p>
        </div>

        <div className="fc-readout">
          <div className="fc-readout__head">
            <span className="fc-mono">{name}.gltf</span>
            <button type="button" className="fc-readout__copy" data-done={copied} onClick={copy}>
              <span className="fc-readout__copy-label">{copied ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>
          <pre className="fc-readout__code" tabIndex={0} aria-label="glTF material JSON">
            <code>
              {json.split("\n").map((ln, i) => {
                const isHot = hot.key === "all" ? hot.n > 0 : ln.includes(GLTF_KEY[hot.key]);
                return <span key={`${i}-${isHot ? hot.n : 0}`} className="fc-readout__ln" data-hot={isHot || undefined}>{ln}{"\n"}</span>;
              })}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
