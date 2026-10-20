"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const chapters = [
  { id: "system", label: "System" },
  { id: "runtime", label: "Runtime" },
  { id: "signal", label: "Signal" },
  { id: "contact", label: "Contact" },
];

function VectorMark() { return <span className="vector-mark" aria-hidden="true"><span /><span /><span /></span>; }

export function VectorExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x030706, 7, 22);
    scene.add(new THREE.AmbientLight(0x51f6d3, 0.35));
    const fill = new THREE.DirectionalLight(0xb8ff57, 1.2);
    fill.position.set(3, 5, 4);
    scene.add(fill);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
    camera.position.set(0, 2.8, 8.5);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030706, 1);
    const world = new THREE.Group();
    world.position.y = -0.6;
    scene.add(world);

    const grid = new THREE.GridHelper(70, 70, 0x51f6d3, 0x123b38);
    grid.position.set(0, -1.75, -10);
    grid.scale.z = 1.8;
    world.add(grid);
    const horizon = new THREE.Group();
    for (let i = -8; i <= 8; i += 1) {
      horizon.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i * 1.6, -1.73, -1), new THREE.Vector3(i * 2.8, -1.73, -24)]),
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? 0x51f6d3 : 0xb8ff57, transparent: true, opacity: 0.32 }),
      ));
    }
    world.add(horizon);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x23534e, flatShading: true, transparent: true, opacity: 0.28 });
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1.62, 2), bodyMaterial);
    body.position.set(0, 0.55, -4.7);
    world.add(body);
    const wireMaterial = new THREE.MeshBasicMaterial({ color: 0x51f6d3, wireframe: true, transparent: true, opacity: 0.86 });
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.68, 2), wireMaterial);
    wire.position.copy(body.position);
    world.add(wire);
    const rings: THREE.Mesh[] = [];
    [2.25, 2.7].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 5, 96), new THREE.MeshBasicMaterial({ color: index === 0 ? 0xb8ff57 : 0x51f6d3, transparent: true, opacity: 0.68 }));
      ring.position.copy(body.position);
      ring.rotation.set(index * 0.75, index * 0.45, index * 0.25);
      world.add(ring);
      rings.push(ring);
    });
    const points = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i += 1) { points[i * 3] = (Math.random() - 0.5) * 15; points[i * 3 + 1] = Math.random() * 7 - 1; points[i * 3 + 2] = -Math.random() * 24 - 1; }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x51f6d3, size: 0.018, transparent: true, opacity: 0.56 }));
    world.add(particles);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xb8ff57 });
    const satellite = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), satelliteMaterial);
    satellite.position.set(2.35, 1.75, -4.5);
    world.add(satellite);

    const resize = () => { const width = canvas.clientWidth || window.innerWidth; const height = canvas.clientHeight || window.innerHeight; renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    resize();
    window.addEventListener("resize", resize);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-vector-depth]"));
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let frame = 0;
    const onScroll = () => { targetScroll = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.14 });
    document.querySelectorAll(".vector-reveal").forEach((node) => observer.observe(node));
    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * (reducedMotion.matches ? 1 : 0.08);
      const progress = Math.min(1, currentScroll / Math.max(1, document.body.scrollHeight - window.innerHeight));
      const time = performance.now() * 0.001;
      body.rotation.y = reducedMotion.matches ? 0.22 : time * 0.18 + progress * 1.5;
      wire.rotation.y = body.rotation.y;
      body.rotation.x = 0.2 + progress * 0.5;
      wire.rotation.x = body.rotation.x;
      rings.forEach((ring, index) => { ring.rotation.z += reducedMotion.matches ? 0 : 0.001 * (index + 1); ring.rotation.x += reducedMotion.matches ? 0 : 0.0006 * (index + 1); });
      satellite.position.y = 1.75 + (reducedMotion.matches ? 0 : Math.sin(time * 1.2) * 0.16);
      world.position.y = -0.6 + progress * 0.85;
      camera.position.z = 8.5 - progress * 1.7;
      camera.position.y = 2.8 + progress * 0.3;
      camera.lookAt(0, 0, -4.2);
      parallaxNodes.forEach((node) => node.style.setProperty("--vector-offset", `${currentScroll * Number(node.dataset.vectorDepth ?? 0)}px`));
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); observer.disconnect(); renderer.dispose(); body.geometry.dispose(); bodyMaterial.dispose(); wire.geometry.dispose(); wireMaterial.dispose(); rings.forEach((ring) => { ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); }); particleGeometry.dispose(); (particles.material as THREE.Material).dispose(); satellite.geometry.dispose(); satelliteMaterial.dispose(); };
  }, []);

  return (
    <div className="vector-site">
      <div className="vector-background" aria-hidden="true"><canvas ref={canvasRef} className="vector-canvas" /><div className="vector-scanlines" /><div className="vector-hud"><span>VECTOR/90</span><span>PORT 04 / ONLINE</span></div></div>
      <header className="vector-topbar"><a className="vector-wordmark" href="#top" aria-label="VECTOR 90 home"><VectorMark /><span>VECTOR<span className="vector-slash">/</span>90</span></a><nav aria-label="Primary navigation" className="vector-nav">{chapters.slice(0, 3).map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id}><span>0{index + 1}</span>{chapter.label}</a>)}</nav><a className="vector-top-cta" href="#contact">Open console <span aria-hidden="true">↗</span></a></header>
      <aside className="vector-rail" aria-label="Page chapters">{chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id}><span>0{index + 1}</span><b>{chapter.label}</b></a>)}</aside>
      <main id="top">
        <section className="vector-hero" aria-labelledby="vector-title"><div className="vector-wrap vector-hero-grid"><div className="vector-hero-copy vector-reveal"><p className="vector-kicker">Runtime intelligence / Build 0.9.4</p><h1 id="vector-title">Make the invisible stack <em>visible.</em></h1><p className="vector-hero-lead">VECTOR/90 is a live runtime map for teams that need to see every layer of a system before it breaks.</p><div className="vector-actions"><a className="vector-button vector-button-primary" href="#system">Initialize view <span aria-hidden="true">↘</span></a><span className="vector-status"><i /> All systems nominal</span></div></div><div className="vector-readout vector-reveal" data-vector-depth="-0.05"><span>FIELD READOUT</span><strong>06.42</strong><small>latency / ms</small><div className="vector-readout-rule" /><span>PACKETS OBSERVED</span><strong>18,432</strong><small>last 60 seconds</small></div></div><div className="vector-coordinates" aria-hidden="true">X 003.14 / Y 090.00 / Z 001.20</div><div className="vector-hero-footer" aria-hidden="true">SCROLL TO MOVE THROUGH THE MODEL <span>↓</span></div></section>
        <section id="system" className="vector-section vector-section-terminal" aria-labelledby="system-title"><div className="vector-wrap vector-split-grid"><div className="vector-section-intro vector-reveal"><p className="vector-kicker">01 — System</p><h2 id="system-title">Every service leaves a shape.</h2><p>Trace dependencies, isolate the noisy edge, and see how a single request moves across the stack.</p></div><div className="vector-terminal vector-reveal"><div className="vector-terminal-bar"><span /><span /><span /><b>vector://runtime/trace</b></div><pre><code>{`$ vector trace --service api-gateway

[ ok ] edge-router       12ms
[ ok ] auth-service      08ms
[warn] cache-layer       61ms
[ ok ] billing-worker    14ms

&gt; path resolved / 04 hops
&gt; anomaly isolated / cache-layer`}</code></pre></div></div></section>
        <section id="runtime" className="vector-section vector-section-runtime" aria-labelledby="runtime-title"><div className="vector-wrap vector-runtime-grid"><div className="vector-runtime-aside vector-reveal"><p className="vector-kicker">02 — Runtime</p><span className="vector-big-index">02</span><span>MODEL THE<br />MOTION</span></div><div className="vector-runtime-copy vector-reveal"><h2 id="runtime-title">Observe the system while it is still <em>moving.</em></h2><p>Static dashboards explain the past. VECTOR/90 gives your team a shared model of what is changing now, from request path to resource pressure.</p><div className="vector-runtime-list"><div><span>01</span><strong>Map</strong><small>every dependency</small></div><div><span>02</span><strong>Replay</strong><small>every incident</small></div><div><span>03</span><strong>Resolve</strong><small>before impact</small></div></div></div></div></section>
        <section id="signal" className="vector-section vector-section-signal" aria-labelledby="signal-title"><div className="vector-wrap vector-signal-grid"><div className="vector-signal-copy vector-reveal"><p className="vector-kicker">03 — Signal</p><h2 id="signal-title">The signal is in the <em>edges.</em></h2><p>Bring the whole system into the room. Searchable traces, replayable incidents, and a map that makes a complex handoff legible.</p><a className="vector-button" href="#contact">Read the protocol <span aria-hidden="true">↗</span></a></div><div className="vector-signal-stats vector-reveal"><div><strong>99.98<span>%</span></strong><small>requests resolved</small></div><div><strong>04<span>×</span></strong><small>faster incident review</small></div><div><strong>00<span>°</span></strong><small>blind spots</small></div></div></div></section>
        <section id="contact" className="vector-contact" aria-labelledby="contact-title"><div className="vector-wrap vector-contact-grid"><div className="vector-contact-copy vector-reveal"><p className="vector-kicker">04 — Access</p><h2 id="contact-title">Enter the <em>system.</em></h2><p>Give your team the map. Request access to the VECTOR/90 private beta.</p><a className="vector-button vector-button-primary" href="mailto:hello@vector90.dev">hello@vector90.dev <span aria-hidden="true">↗</span></a></div><div className="vector-contact-panel vector-reveal"><span>VECTOR/90</span><strong>READY</strong><small>private beta / 2026</small><div className="vector-progress"><i /><i /><i /><i /><i /><i /><i /></div></div><footer className="vector-footer"><span>© 1996—2026 VECTOR SYSTEMS</span><span>BUILD 0.9.4 / ALL SIGNALS CLEAR</span><a href="#top">Back to top ↑</a></footer></div></section>
      </main>
    </div>
  );
}
