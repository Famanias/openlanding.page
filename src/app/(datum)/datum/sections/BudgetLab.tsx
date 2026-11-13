"use client";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import {
  MAX_RESOLUTION_SCALE,
  MIN_RESOLUTION_SCALE,
  passById,
  RENDER_PASSES,
} from "../pipeline/passes";
import { usePipeline } from "../pipeline/PipelineProvider";

/**
 * Interactive GPU frame-budget and bottleneck simulator linked to the shared pipeline state.
 */
export function BudgetLab() {
  const { state, dispatch, budget } = usePipeline();
  const activePass = passById(state.activePassId);

  return (
    <section id="budget" className="dt-budget" aria-labelledby="dt-budget-heading">
      <div className="dt-section-head">
        <Reveal variant="draw" className="dt-hairline-draw" />
        <Reveal variant="rise">
          <p className="dt-eyebrow">03 // FRAME BUDGET & BOTTLENECK LAB</p>
        </Reveal>
        <Reveal variant="mask">
          <h2 id="dt-budget-heading" className="dt-display dt-h2">
            <SplitText text="Measure every millisecond before release." />
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={90}>
          <p className="dt-lede">
            Toggle individual render stages, sweep render-target resolution scale, and inspect the exact GLSL kernel driving frame-time pressure.
          </p>
        </Reveal>
      </div>

      <Reveal variant="wipe" className="dt-budget-bench">
        <div className="dt-budget-controls">
          <div className="dt-control-block">
            <div className="dt-control-head">
              <span className="dt-mono">PASS TOGGLES</span>
              <span className="dt-mono">{state.enabledPassIds.length} / 5 ACTIVE</span>
            </div>
            <ul className="dt-toggle-list">
              {RENDER_PASSES.map((pass) => {
                const enabled = state.enabledPassIds.includes(pass.id);
                const costRow = budget.passes.find((p) => p.id === pass.id);
                return (
                  <li key={pass.id}>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      className="dt-toggle-row"
                      data-enabled={enabled}
                      onClick={() => dispatch({ type: "togglePassEnabled", passId: pass.id })}
                    >
                      <span className="dt-toggle-left">
                        <span className="dt-mono dt-toggle-code">{pass.code}</span>
                        <span className="dt-toggle-name">{pass.shortName}</span>
                      </span>
                      <span className="dt-toggle-right">
                        <span className="dt-mono">
                          {costRow && costRow.enabled ? `${costRow.ms.toFixed(1)} ms` : "OFF"}
                        </span>
                        <span className="dt-switch-track" aria-hidden="true">
                          <span className="dt-switch-thumb" />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="dt-control-block">
            <label htmlFor="dt-res-slider" className="dt-control-head">
              <span className="dt-mono">RESOLUTION SCALE</span>
              <span className="dt-mono">{state.resolutionScale.toFixed(2)}x</span>
            </label>
            <input
              id="dt-res-slider"
              type="range"
              className="dt-slider"
              min={MIN_RESOLUTION_SCALE}
              max={MAX_RESOLUTION_SCALE}
              step={0.05}
              value={state.resolutionScale}
              aria-label="Resolution scale"
              onChange={(e) =>
                dispatch({ type: "setResolutionScale", scale: Number.parseFloat(e.target.value) })
              }
            />
            <div className="dt-fps-group" role="group" aria-label="Target refresh rate">
              {([60, 120] as const).map((fps) => {
                const selected = state.targetFps === fps;
                return (
                  <button
                    key={fps}
                    type="button"
                    className="dt-chip"
                    aria-pressed={selected}
                    data-selected={selected}
                    onClick={() => dispatch({ type: "setTargetFps", fps })}
                  >
                    {fps} Hz ({fps === 60 ? "16.6 ms" : "8.3 ms"})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dt-budget-readout">
          <div className="dt-meter-card" data-over={budget.overBudget}>
            <div className="dt-meter-top">
              <div>
                <span className="dt-mono dt-meter-label">ESTIMATED GPU TIME</span>
                <p className="dt-display dt-meter-value">
                  {budget.totalMs.toFixed(1)} <span className="dt-mono">ms</span>
                </p>
              </div>
              <span className="dt-mono dt-status-pill" data-over={budget.overBudget}>
                {budget.overBudget
                  ? `OVER BUDGET (+${Math.abs(budget.headroomMs).toFixed(1)} ms)`
                  : `WITHIN ${budget.targetMs.toFixed(1)} ms (${budget.headroomMs.toFixed(1)} ms spare)`}
              </span>
            </div>

            <div className="dt-meter-track" aria-hidden="true">
              <div
                className="dt-meter-fill"
                style={{
                  transform: `scaleX(${Math.min(1, budget.totalMs / budget.targetMs).toFixed(4)})`,
                }}
              />
            </div>

            <dl className="dt-meter-kpis">
              <div>
                <dt>Draw Calls</dt>
                <dd className="dt-mono">{budget.totalDrawCalls}</dd>
              </div>
              <div>
                <dt>VRAM Target</dt>
                <dd className="dt-mono">{budget.totalVramMb} MB</dd>
              </div>
              <div>
                <dt>Bottleneck</dt>
                <dd className="dt-mono">
                  {budget.bottleneckId ? passById(budget.bottleneckId).shortName : "None"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="dt-kernel-card">
            <div className="dt-kernel-tabs" role="tablist" aria-label="Shader Kernel Disassembly">
              {RENDER_PASSES.map((pass) => {
                const active = pass.id === state.activePassId;
                return (
                  <button
                    key={pass.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className="dt-kernel-tab"
                    data-active={active}
                    onClick={() => dispatch({ type: "selectPass", passId: pass.id })}
                  >
                    {pass.code}
                  </button>
                );
              })}
            </div>
            <div className="dt-kernel-meta">
              <span className="dt-mono">{activePass.shaderEntry}()</span>
              <span className="dt-mono">{activePass.name}</span>
            </div>
            <pre className="dt-kernel-code">
              <code>{activePass.glslLines.join("\n")}</code>
            </pre>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
