import { SpectralSynthesizer } from "../spectrum/SpectralSynthesizer";

export function SynthesizerSection() {
  return (
    <section
      className="py-24 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1520px] mx-auto space-y-8 relative"
      aria-label="Gradient Synthesizer Workbench"
    >
      <SpectralSynthesizer />
    </section>
  );
}
