import { CommissionForm } from "../forms/CommissionForm";

export function CommissionSection() {
  return (
    <section
      id="commission"
      className="py-24 px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1520px] mx-auto space-y-12 relative"
      aria-label="Commission Studio Intake"
    >
      {/* Background Ambient Warm Caustic Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #FFE600 0%, #FF4D00 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
          Studio Intake &amp; Technical Consultation
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EF]">
          Commission a Kinetic Pavilion
        </h2>
        <p className="font-body text-base text-[#8D93A8] leading-relaxed">
          We collaborate with architects, cultural institutions, and municipal bodies worldwide to fabricate permanent crystal refraction structures.
        </p>
      </div>

      <CommissionForm />
    </section>
  );
}
