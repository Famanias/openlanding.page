import { CountUp } from "../motion/CountUp";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";

const TICKER_ITEMS = [
  "WEBGL2 & WEBGPU PARITY",
  "Z-AXIS PASS DISSECTION",
  "ZERO-COPY RING BUFFER",
  "EARLY-Z OCCLUSION TRACE",
  "DUAL KAWASE BLOOM",
  "OCTAHEDRAL G-BUFFER",
] as const;

const WORKFLOW_STEPS = [
  {
    code: "01",
    title: "Capture",
    detail: "Attach a single 4 KB hook around your requestAnimationFrame loop with zero shader recompiles.",
  },
  {
    code: "02",
    title: "Explode",
    detail: "Unstack render targets along Z to inspect intermediate G-buffers, shadow cascades, and mip chains.",
  },
  {
    code: "03",
    title: "Isolate",
    detail: "Pin any bottleneck pass to view pixel-scale sensitivity, overdraw hotspots, and VRAM residency.",
  },
  {
    code: "04",
    title: "Verify",
    detail: "Lock target budgets at 60 Hz or 120 Hz and export a deterministic snapshot for code review.",
  },
] as const;

const PILLARS = [
  {
    code: "ARCH // 01",
    title: "Zero-Overhead Hook",
    metric: "< 0.08 ms",
    body: "Timer queries batch asynchronously through non-blocking GPU timestamp rings so profiling never stalls the main render thread.",
  },
  {
    code: "ARCH // 02",
    title: "Deterministic Snapshots",
    metric: "Bit-Exact",
    body: "Capture serialized pass graphs, uniform buffers, and viewport scales into portable briefs you can diff across commits.",
  },
  {
    code: "ARCH // 03",
    title: "WebGL2 & WebGPU",
    metric: "Unified AST",
    body: "Inspect GLSL 300 es and WGSL render pipelines through one unified optical coordinate system and shader kernel view.",
  },
] as const;

/** Dark Graphite Ink architectural slab with dual-track marquee, 4 workflow steps, and 3 TiltCard pillars. */
export function Architecture() {
  return (
    <section id="architecture" className="dt-arch" aria-labelledby="dt-arch-heading">
      <Marquee items={TICKER_ITEMS} label="Core Engine Capabilities" />

      <div className="dt-arch-inner">
        <div className="dt-section-head">
          <Reveal variant="draw" className="dt-hairline-draw dt-hairline-dark" />
          <Reveal variant="rise">
            <p className="dt-eyebrow dt-eyebrow-dark">04 // ARCHITECTURE & INSTRUMENTATION</p>
          </Reveal>
          <Reveal variant="mask">
            <h2 id="dt-arch-heading" className="dt-display dt-h2">
              <SplitText text="Engineered for graphics teams." />
            </h2>
          </Reveal>
        </div>

        <ol className="dt-workflow">
          {WORKFLOW_STEPS.map((step, i) => (
            <li key={step.code}>
              <Reveal variant="rise" index={i} className="dt-workflow-step">
                <span className="dt-workflow-rule" aria-hidden="true" />
                <span className="dt-mono dt-workflow-code">{step.code}</span>
                <h3 className="dt-display dt-h3">{step.title}</h3>
                <p>{step.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <ul className="dt-pillars">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.code} className="dt-pillar-cell">
              <Reveal variant="scale" index={i}>
                <TiltCard className="dt-pillar-card">
                  <div className="dt-pillar-top">
                    <span className="dt-mono dt-pillar-code">{pillar.code}</span>
                    <span className="dt-mono dt-pillar-metric">{pillar.metric}</span>
                  </div>
                  <h3 className="dt-display dt-h3">{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>

        <dl className="dt-arch-metrics">
          <div>
            <dt>Hook Bundle Weight</dt>
            <dd className="dt-display">
              <CountUp value={4.2} decimals={1} suffix=" KB" />
            </dd>
          </div>
          <div>
            <dt>Max Captured Depth</dt>
            <dd className="dt-display">
              <CountUp value={64} suffix=" passes" />
            </dd>
          </div>
          <div>
            <dt>Query Overhead</dt>
            <dd className="dt-display">
              <CountUp value={0.08} decimals={2} suffix=" ms" />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
