import React, { useEffect, useRef } from 'react';

export function ScenicFooter() {
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!scene || !canvas || !ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let last = 0;
    const drops = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), speed: 0.35 + Math.random() * 0.45, length: 12 + Math.random() * 20, cyan: Math.random() > 0.3 }));
    const resize = () => {
      width = scene.clientWidth;
      height = scene.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    const draw = (time: number) => {
      const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      drops.forEach((drop) => {
        drop.y += drop.speed * delta;
        drop.x += drop.speed * delta * 0.15 * height / width;
        if (drop.y > 1.05 || drop.x > 1.05) { drop.y = -0.05; drop.x = Math.random(); }
        const x = drop.x * width;
        const y = drop.y * height;
        ctx.strokeStyle = drop.cyan ? 'rgba(0, 240, 255, 0.28)' : 'rgba(255, 0, 127, 0.18)';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + drop.length * 0.26, y + drop.length);
        ctx.stroke();
      });
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      last = 0;
      ctx.clearRect(0, 0, width, height);
      if (visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    const sizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(scene);
    sizeObserver.observe(scene);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <section ref={sceneRef} aria-label="Kinetix archive closing scene" className="scenic-footer relative overflow-hidden bg-[#090B0E] text-[#F8FAFC]">
      <div className="scenic-footer-image absolute inset-0" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 min-h-[650px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between flex-wrap gap-3 border-b border-white/30 px-4 lg:px-8 py-4 font-mono-tech text-[10px] tracking-widest"><span>KINETIX // ARCHIVE</span><span>FIELD SYSTEMS / TOKYO 09</span></div>
          <div className="px-4 lg:px-8 py-10 flex flex-wrap justify-between gap-10">
            <div><p className="font-mono-tech text-xs text-[#00F0FF] tracking-wider mb-4">ENGINEERED FOR THE ELEMENTS</p><p className="max-w-xs text-sm leading-relaxed text-[#E2E8F0]">Technical equipment for movement through the city and beyond.</p></div>
            <div className="flex gap-12 sm:gap-20 font-mono-tech text-xs">
              <nav aria-label="Explore archive" className="flex flex-col gap-3"><span className="text-[#94A3B8] mb-2">EXPLORE</span><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#shells-grid">Shop equipment ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#fabric-lab">Fabric lab ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#loadout-builder">Build a loadout ↗</a></nav>
              <nav aria-label="Footer support" className="flex flex-col gap-3"><span className="text-[#94A3B8] mb-2">SUPPORT</span><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-care">Garment care ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-care">Shipping ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-verifier">Verify garment ↗</a></nav>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-8 pb-10 flex flex-wrap items-end justify-between gap-8"><div><p className="font-mono-tech text-xs text-[#CBD5E1] mb-4 tracking-wider">THE URBAN ENVIRONMENT / 001</p><h2 className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">BEYOND<br />THE FORECAST<span className="text-[#00F0FF]">.</span></h2></div><div className="max-w-xs"><p className="text-sm text-[#E2E8F0] leading-relaxed">Made to move through whatever comes next.</p><a className="inline-block mt-5 font-mono-tech text-xs font-bold text-[#00F0FF] hover:underline focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#shells-grid">EXPLORE THE ARCHIVE ↗</a></div></div>
      </div>
    </section>
  );
}
