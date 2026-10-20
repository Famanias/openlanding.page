"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const chapters = [
  { id: "signal", label: "Signal" },
  { id: "shape", label: "Shape" },
  { id: "system", label: "System" },
  { id: "contact", label: "Contact" },
];

function TraceMark() {
  return (
    <span className="trace-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function TraceExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.6);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const world = new THREE.Group();
    world.rotation.set(0.2, -0.35, 0.08);
    scene.add(world);

    const orb = new THREE.Group();
    world.add(orb);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 3),
      new THREE.MeshBasicMaterial({ color: 0xc9f458, wireframe: true, transparent: true, opacity: 0.52 }),
    );
    orb.add(shell);

    const innerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.28, 2),
      new THREE.MeshBasicMaterial({ color: 0xe7ece7, wireframe: true, transparent: true, opacity: 0.16 }),
    );
    orb.add(innerShell);

    const rings: THREE.Mesh[] = [];
    [1.92, 2.24, 2.56].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.012 : 0.018, 8, 160),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0xc9f458 : 0xe7ece7,
          transparent: true,
          opacity: index === 1 ? 0.58 : 0.18,
        }),
      );
      ring.rotation.set(index * 0.38, index * 0.7, index * 0.21);
      world.add(ring);
      rings.push(ring);
    });

    const satelliteGroup = new THREE.Group();
    world.add(satelliteGroup);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xc9f458 });
    [
      { position: [2.4, 0.58, 0.32] as [number, number, number], scale: 0.105 },
      { position: [-2.2, -0.9, 0.8] as [number, number, number], scale: 0.07 },
      { position: [0.72, -1.95, -0.55] as [number, number, number], scale: 0.055 },
    ].forEach(({ position, scale }) => {
      const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(scale, 1), satelliteMaterial);
      satellite.position.set(...position);
      satelliteGroup.add(satellite);
    });

    const particleCount = 320;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 3.05 + Math.random() * 1.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.cos(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xe7ece7, size: 0.018, transparent: true, opacity: 0.48, sizeAttenuation: true }),
    );
    world.add(particles);

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Keep scroll transforms on decorative layers only. Flow content needs its layout box to stay stable.
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-trace-depth]:not(.trace-reveal)"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollTarget = window.scrollY;
    let scrollPosition = scrollTarget;
    let pointerTarget = { x: 0, y: 0 };
    const pointerPosition = { x: 0, y: 0 };
    let frame = 0;

    const onScroll = () => {
      scrollTarget = window.scrollY;
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget = { x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * 2 };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.18 },
    );
    document.querySelectorAll(".trace-reveal").forEach((node) => revealObserver.observe(node));

    const animate = () => {
      scrollPosition += (scrollTarget - scrollPosition) * (reducedMotion.matches ? 1 : 0.08);
      pointerPosition.x += (pointerTarget.x - pointerPosition.x) * 0.055;
      pointerPosition.y += (pointerTarget.y - pointerPosition.y) * 0.055;
      const progress = Math.min(1, scrollPosition / Math.max(1, document.body.scrollHeight - window.innerHeight));

      world.rotation.y = -0.35 + pointerPosition.x * 0.12 + progress * 1.9;
      world.rotation.x = 0.2 + pointerPosition.y * 0.08 + progress * 0.65;
      world.position.y = (progress - 0.5) * 0.7;
      orb.rotation.z = progress * 1.25;
      shell.rotation.x += reducedMotion.matches ? 0 : 0.0014;
      shell.rotation.y += reducedMotion.matches ? 0 : 0.002;
      innerShell.rotation.y -= reducedMotion.matches ? 0 : 0.001;
      rings.forEach((ring, index) => {
        ring.rotation.z += reducedMotion.matches ? 0 : 0.0005 * (index + 1);
        ring.rotation.x += reducedMotion.matches ? 0 : 0.00025 * (index + 1);
      });
      particles.rotation.y = progress * -0.9;

      parallaxNodes.forEach((node) => {
        const depth = Number(node.dataset.traceDepth ?? 0);
        node.style.setProperty("--trace-parallax", `${scrollPosition * depth}px`);
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      revealObserver.disconnect();
      renderer.dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      innerShell.geometry.dispose();
      (innerShell.material as THREE.Material).dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      satelliteMaterial.dispose();
    };
  }, []);

  return (
    <div className="trace-experience">
      <div className="trace-scene-shell" aria-hidden="true">
        <canvas ref={canvasRef} className="trace-scene" />
        <div className="trace-scene-hud">
          <span>LIVE FIELD</span>
          <span>03.17.26 / 35°41′N</span>
        </div>
      </div>

      <header className="trace-topbar">
        <a className="trace-wordmark" href="#top" aria-label="TRACE home">
          <TraceMark />
          TRACE<span className="trace-wordmark-dot">.</span>
        </a>
        <nav className="trace-nav" aria-label="Primary navigation">
          {chapters.slice(0, 3).map((chapter, index) => (
            <a href={`#${chapter.id}`} key={chapter.id}>
              <span>0{index + 1}</span> {chapter.label}
            </a>
          ))}
        </nav>
        <a className="trace-nav-cta" href="#contact">
          Start a read <span aria-hidden="true">↗</span>
        </a>
      </header>

      <aside className="trace-chapter-rail" aria-label="Page chapters">
        {chapters.map((chapter, index) => (
          <a href={`#${chapter.id === "contact" ? "contact" : chapter.id}`} key={chapter.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{chapter.label}</b>
          </a>
        ))}
      </aside>

      <main id="top">
        <section className="trace-hero" aria-labelledby="trace-title">
          <div className="trace-hero-grid trace-wrap">
            <p className="trace-kicker trace-reveal" data-trace-depth="-0.02">
              Spatial intelligence / Issue 01
            </p>
            <div className="trace-hero-copy trace-reveal" data-trace-depth="-0.06">
              <p className="trace-hero-index">/ 00 — orientation</p>
              <h1 id="trace-title">
                Read what the city is <em>becoming.</em>
              </h1>
              <p className="trace-hero-lead">
                TRACE turns millions of small signals into one clear field of view — so the people shaping a place can move with intent.
              </p>
              <a className="trace-button trace-button-solid" href="#signal">
                Enter the field <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="trace-hero-note trace-reveal" data-trace-depth="-0.12">
              <span className="trace-note-line" />
              <span>Scroll to change the lens</span>
            </div>
          </div>
          <div className="trace-coordinate trace-parallax" data-trace-depth="-0.15" aria-hidden="true">
            35°41′22″N / 139°41′30″E
          </div>
          <div className="trace-hero-type trace-parallax" data-trace-depth="-0.03" aria-hidden="true">
            SIGNAL / SHAPE / SYSTEM
          </div>
        </section>

        <section id="signal" className="trace-section trace-section-dark" aria-labelledby="signal-title">
          <div className="trace-wrap trace-split">
            <div className="trace-section-intro trace-reveal" data-trace-depth="-0.04">
              <p className="trace-kicker">01 — Signal</p>
              <h2 id="signal-title">The invisible becomes <em>legible.</em></h2>
            </div>
            <div className="trace-section-body trace-reveal" data-trace-depth="-0.1">
              <p className="trace-large-number">4.8<span>m</span></p>
              <p className="trace-body-copy">A single block holds thousands of decisions. We map the rhythm underneath them — movement, heat, dwell, drift — and give your team a common signal.</p>
              <div className="trace-readout" aria-label="Signal readout">
                <div><span>OBSERVED</span><strong>12,406</strong></div>
                <div><span>RESOLVED</span><strong>08.3%</strong></div>
                <div><span>LATENCY</span><strong>00:42</strong></div>
              </div>
            </div>
          </div>
          <div className="trace-band trace-parallax" data-trace-depth="-0.08" aria-hidden="true">/ / / / / / / / / / / / / / / / / / / / / / / /</div>
        </section>

        <section id="shape" className="trace-section trace-section-paper" aria-labelledby="shape-title">
          <div className="trace-wrap trace-shape-layout">
            <div className="trace-shape-heading trace-reveal" data-trace-depth="-0.05">
              <p className="trace-kicker">02 — Shape</p>
              <h2 id="shape-title">A map is a choice about <em>attention.</em></h2>
            </div>
            <div className="trace-method-list">
              {[
                ["01", "Find the pulse", "Separate the noise from the moment that changes the whole field."],
                ["02", "Model the friction", "See where a good intention turns into a slow, expensive loop."],
                ["03", "Make the next move", "Turn a shared picture into a sequence your team can actually run."],
              ].map(([number, title, copy]) => (
                <article className="trace-method trace-reveal" data-trace-depth={number === "02" ? "-0.12" : "-0.08"} key={number}>
                  <span className="trace-method-number">{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <span className="trace-method-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
          <div className="trace-contour trace-parallax" data-trace-depth="-0.18" aria-hidden="true">
            <span>CONTOUR / 240</span>
            <span>CONTOUR / 180</span>
            <span>CONTOUR / 120</span>
          </div>
        </section>

        <section id="system" className="trace-section trace-section-system" aria-labelledby="system-title">
          <div className="trace-wrap trace-system-layout">
            <div className="trace-system-copy trace-reveal" data-trace-depth="-0.03">
              <p className="trace-kicker">03 — System</p>
              <h2 id="system-title">The future is a <em>field.</em></h2>
              <p>One living model for the people who make places, products and policy. TRACE keeps the model moving, so the next decision arrives with context.</p>
              <a className="trace-button trace-button-outline" href="#contact">See the field guide <span aria-hidden="true">↗</span></a>
            </div>
            <div className="trace-system-stats trace-reveal" data-trace-depth="-0.14">
              <div><span>01</span><strong>Observe</strong><small>Signals, joined</small></div>
              <div><span>02</span><strong>Simulate</strong><small>Moves, before they land</small></div>
              <div><span>03</span><strong>Align</strong><small>People, in sequence</small></div>
            </div>
          </div>
          <div className="trace-system-stamp trace-parallax" data-trace-depth="-0.22" aria-hidden="true">TRACE / FIELD 01</div>
        </section>

        <section id="contact" className="trace-section trace-section-cta" aria-labelledby="contact-title">
          <div className="trace-wrap trace-cta-layout">
            <p className="trace-kicker">04 — Contact</p>
            <h2 id="contact-title" className="trace-reveal" data-trace-depth="-0.05">Make the next move <em>visible.</em></h2>
            <p className="trace-cta-copy trace-reveal" data-trace-depth="-0.08">Bring us the messy version. We’ll bring a clearer field of view.</p>
            <a className="trace-button trace-button-solid trace-reveal" data-trace-depth="-0.12" href="mailto:hello@trace.field">hello@trace.field <span aria-hidden="true">↗</span></a>
            <footer className="trace-footer"><span>© 2026 TRACE FIELDWORKS</span><span>Tokyo / Rotterdam / Everywhere</span><a href="#top">Back to top ↑</a></footer>
          </div>
        </section>
      </main>
    </div>
  );
}
