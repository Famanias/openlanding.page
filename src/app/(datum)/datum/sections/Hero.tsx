"use client";
import { CountUp } from "../motion/CountUp";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
import { passById, RENDER_PASSES } from "../pipeline/passes";
import { usePipeline } from "../pipeline/PipelineProvider";
import { PipelineSvg } from "../pipeline/PipelineSvg";

/** Choreographed opening section with split-line headline, live telemetry, and interactive hero schematic. */
export function Hero() {
  const { state, dispatch, budget } = usePipeline();
  const activePass = passById(state.activePassId);

  return (
    <section id="top" className="dt-hero" aria-labelledby="dt-hero-heading">
      <div className="dt-hero-grid-bg" aria-hidden="true" />
      <div className="dt-hero-wash" aria-hidden="true" />

      <div className="dt-hero-inner">
        <div className="dt-hero-copy">
          <p className="dt-eyebrow" data-load="eyebrow">
            SPATIAL GPU PROFILER · WEBGL2 / WEBGPU
          </p>
          <h1 id="dt-hero-heading" className="dt-display dt-hero-title" data-load="title">
            <span className="dt-line">
              <SplitText text="Every frame," />
            </span>
            <span className="dt-line dt-line-accent">
              <SplitText text="dissected." startIndex={2} />
            </span>
          </h1>
          <p className="dt-lede" data-load="lede">
            Inspect draw calls, G-buffer packing, cascaded shadows, and post-FX passes along the optical Z-axis in real time before a frame leaves your GPU.
          </p>

          <div className="dt-hero-actions" data-load="actions">
            <Magnetic>
              <a href="#dissection" className="dt-btn dt-btn-primary">
                <span className="dt-btn-label" data-label="Dissect 3D Stack">
                  Dissect 3D Stack
                </span>
                <span className="dt-btn-arrow" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#budget" className="dt-btn dt-btn-ghost">
              <span className="dt-btn-label" data-label="Open Budget Lab">
                Open Budget Lab
              </span>
            </a>
          </div>

          <dl className="dt-hero-stats" data-load="stats">
            <div>
              <dt>Z-Separated Passes</dt>
              <dd className="dt-display">
                <CountUp value={5} />
              </dd>
            </div>
            <div>
              <dt>Draw Batches</dt>
              <dd className="dt-display">
                <CountUp value={444} />
              </dd>
            </div>
            <div>
              <dt>Frame Lock Target</dt>
              <dd className="dt-display">
                <CountUp value={16.6} decimals={1} suffix=" ms" />
              </dd>
            </div>
          </dl>
        </div>

        <div className="dt-hero-visual" data-load="visual">
          <div className="dt-hero-plate">
            <div className="dt-plate-head">
              <span className="dt-mono">Z-STACK PREVIEW // {activePass.code}</span>
              <span className="dt-readout" data-over={budget.overBudget}>
                <i className="dt-readout-dot" aria-hidden="true" />
                <span className="dt-mono">
                  {budget.totalMs.toFixed(1)} / {budget.targetMs.toFixed(1)} ms
                </span>
              </span>
            </div>

            <div className="dt-hero-svg-frame">
              <PipelineSvg
                compact
                activePassId={state.activePassId}
                enabledPassIds={state.enabledPassIds}
                wireframe={state.wireframe}
                label="Interactive isometric preview of the five render passes"
                onSelectPass={(passId) => dispatch({ type: "selectPass", passId })}
              />
            </div>

            <div className="dt-hero-pass-pills" role="group" aria-label="Quick pass preview">
              {RENDER_PASSES.map((pass) => {
                const selected = pass.id === state.activePassId;
                return (
                  <button
                    key={pass.id}
                    type="button"
                    className="dt-pass-pill"
                    data-selected={selected}
                    aria-pressed={selected}
                    onClick={() => dispatch({ type: "selectPass", passId: pass.id })}
                  >
                    <span className="dt-mono">{pass.code}</span>
                    <span>{pass.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="dt-scroll-cue" data-load="cue" aria-hidden="true">
        <span className="dt-mono">SCROLL TO EXPLODE Z-AXIS</span>
        <i />
      </div>
    </section>
  );
}
