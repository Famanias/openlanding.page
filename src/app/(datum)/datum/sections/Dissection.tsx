"use client";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { PipelineCanvas } from "../pipeline/PipelineCanvas";
import { RENDER_PASSES } from "../pipeline/passes";
import { usePipeline } from "../pipeline/PipelineProvider";

/**
 * Signature 220svh scroll-pinned Z-axis dissection stage paired with 5 inspectable render-pass cards.
 */
export function Dissection() {
  const { state, dispatch } = usePipeline();

  return (
    <section id="dissection" className="dt-dissection" aria-labelledby="dt-dissection-heading">
      <div className="dt-dissection-grid">
        <div className="dt-dissection-stage">
          <PipelineCanvas />

          <nav aria-label="Render pass rail">
            <ol className="dt-step-rail">
              {RENDER_PASSES.map((pass) => {
                const isCurrent = pass.id === state.activePassId;
                return (
                  <li key={pass.id}>
                    <button
                      type="button"
                      className="dt-rail-btn"
                      aria-current={isCurrent ? "step" : undefined}
                      onClick={() => dispatch({ type: "selectPass", passId: pass.id })}
                    >
                      <span className="dt-mono">{pass.code}</span>
                      <span>{pass.shortName}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="dt-dissection-panel">
          <div className="dt-dissection-intro">
            <Reveal variant="draw" className="dt-hairline-draw" />
            <Reveal variant="rise">
              <p className="dt-eyebrow">02 // Z-AXIS PIPELINE DISSECTION</p>
            </Reveal>
            <Reveal variant="mask">
              <h2 id="dt-dissection-heading" className="dt-display dt-h2">
                <SplitText text="Five passes, separated in depth." />
              </h2>
            </Reveal>
            <Reveal variant="rise" delay={100}>
              <p className="dt-lede">
                As you scroll, the composite frame unstacks along Z into its five constituent GPU passes. Drag to orbit the stack or select any slab to isolate its cost.
              </p>
            </Reveal>
          </div>

          <ol className="dt-pass-cards">
            {RENDER_PASSES.map((pass, idx) => {
              const selected = pass.id === state.activePassId;
              const enabled = state.enabledPassIds.includes(pass.id);
              return (
                <li key={pass.id} id={`dt-pass-${pass.id}`}>
                  <Reveal variant="rise" index={idx}>
                    <article
                      className="dt-pass-card"
                      data-selected={selected}
                      data-enabled={enabled}
                    >
                      <div className="dt-pass-card-top">
                        <span className="dt-mono dt-pass-code">
                          PASS {pass.code} {"//"} {pass.shaderEntry}
                        </span>
                        <span className="dt-mono dt-pass-ms">{pass.baseMs.toFixed(1)} ms</span>
                      </div>
                      <h3 className="dt-display dt-h3">{pass.name}</h3>
                      <p className="dt-pass-role">{pass.stageRole}</p>
                      <p className="dt-body-copy">{pass.description}</p>
                      <div className="dt-pass-meta">
                        <span className="dt-mono">{pass.drawCalls} draws</span>
                        <span className="dt-mono">{pass.vramMb} MB VRAM</span>
                        <button
                          type="button"
                          className="dt-btn dt-btn-small dt-btn-ghost"
                          aria-pressed={selected}
                          onClick={() => dispatch({ type: "selectPass", passId: pass.id })}
                        >
                          <span
                            className="dt-btn-label"
                            data-label={selected ? "Pass Isolated" : "Isolate in 3D"}
                          >
                            {selected ? "Pass Isolated" : "Isolate in 3D"}
                          </span>
                        </button>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
