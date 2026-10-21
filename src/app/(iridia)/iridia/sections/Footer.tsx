import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#8D93A8]/20 bg-[#0A0B10]/95 pt-16 pb-12 px-6 sm:px-10 lg:px-16 xl:px-20 relative overflow-hidden" aria-label="Colophon">
      {/* Background Horizon Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

      <div className="max-w-[1520px] mx-auto space-y-12">
        {/* Top: Statement & Brand */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[#8D93A8]/15">
          <div className="space-y-4 max-w-lg">
            <Logo size={36} />
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#F5F3EF]">
              Light held in tension.
            </p>
            <p className="font-body text-sm text-[#8D93A8] leading-relaxed">
              Spatial chromatology and kinetic optical pavilions. Engineering the physical boundaries of light and space.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 font-mono text-xs text-[#8D93A8]">
            <div className="space-y-1">
              <span className="block font-bold text-[#F5F3EF]">ZURICH ATELIER</span>
              <p>Limmatstrasse 214</p>
              <p>8005 Zürich, Switzerland</p>
              <p className="text-[#00F0FF]">zurich@iridia-optics.ch</p>
            </div>
            <div className="space-y-1">
              <span className="block font-bold text-[#F5F3EF]">KYOTO FOUNDRY</span>
              <p>Gion-Higashiyama 12</p>
              <p>Kyoto 605-0862, Japan</p>
              <p className="text-[#00F0FF]">kyoto@iridia-optics.jp</p>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8D93A8]">
          <div className="flex items-center gap-4">
            <span>© 2026 IRIDIA Optical Foundry</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">UID CHE-492.108.924</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="text-[#00F0FF] hover:underline">
              Top of Pavilion ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
