import { ArrowUpRight, Check, Code, Cube, Gauge, GitBranch, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./brand/Logo";
import { DemoForm } from "./forms/DemoForm";
import { Reveal, TaglineReveal } from "./motion/Reveal";
import { AlignmentControl } from "./space/AlignmentControl";
import { ChapterRail, JourneyCanvas, JourneyChapter } from "./space/JourneyCanvas";
import { SpaceCanvas } from "./space/SpaceCanvas";

const benefits = [
  { icon: Code, title: "See every draw call", body: "Learn from a small shader core you can read in one sitting, then bend it to your own model." },
  { icon: Gauge, title: "Keep the frame honest", body: "A tiny runtime leaves room for the details that make a scene feel alive: light, motion and texture." },
  { icon: GitBranch, title: "Own the render path", body: "No scene graph or hidden build step. Your geometry, buffers and uniforms stay close to the surface." },
];

const faqs = [
  ["Is this a Three.js wrapper?", "No. The preview uses a WebGL2 context, a full screen triangle and two GLSL shaders. There is no Three.js dependency."],
  ["Do I need WebGL2 hardware?", "The live scene needs WebGL2. The page keeps the copy and starter download available if your device cannot run the preview."],
  ["Can I use my own models?", "Yes. The starter includes the buffer and uniform seams you need to add indexed geometry, textures or a glTF parser of your choice."],
  ["Is the starter really free?", "Yes. It is a local demo with no account, payment or email list. Enter an email only to unlock the download state in this prototype."],
  ["Will it work on a phone?", "The page is responsive and the canvas remains lightweight. Touch devices get the same scene without pointer tilt effects."],
  ["What does pure WebGL mean here?", "The renderer speaks directly to the browser's WebGL2 API. You create the context, compile shaders and issue the draw call yourself."],
];

export default function StarlightPage() {
  return <div className="stl-page">
    <header className="stl-header"><a href="#main-content" className="stl-brand-link"><Logo /></a><nav className="stl-nav" aria-label="Primary"><a href="#why">Why raw WebGL</a><a href="#process">Process</a><a href="#faq">FAQ</a></nav><a className="stl-header-cta" href="#demo">Launch demo <ArrowUpRight size={16} weight="bold" /></a></header>
    <main id="main-content">
      <section className="stl-hero" aria-labelledby="hero-title">
        <div className="stl-hero-copy">
          <Reveal className="stl-kicker"><span className="stl-kicker-dot" />pure WebGL2 / model studies</Reveal>
          <Reveal delay={80}><h1 id="hero-title">Build worlds<br /><span>from the pixel out.</span></h1></Reveal>
          <Reveal delay={160}><p className="stl-hero-lead">A calm starting point for engineers who want to understand every vertex, uniform and light in a 3D scene.</p></Reveal>
          <Reveal delay={240} className="stl-hero-actions"><a className="stl-button stl-button--solid" href="#demo">Launch the WebGL demo <ArrowUpRight size={18} weight="bold" /></a><a className="stl-text-link" href="#process">Read the method <span aria-hidden="true">↓</span></a></Reveal>
          <Reveal delay={320} className="stl-proof"><span><Check size={15} weight="bold" /> 2.4 KB shader core</span><span><Check size={15} weight="bold" /> no Three.js</span><span><Check size={15} weight="bold" /> WebGL2 ready</span></Reveal>
        </div>
        <Reveal className="stl-hero-art" delay={180}><SpaceCanvas /><div className="stl-orbit-label stl-orbit-label--a">lat 18.04° N</div><div className="stl-orbit-label stl-orbit-label--b">light / 03</div></Reveal>
      </section>

      <section className="stl-tagline" aria-label="Core benefit"><TaglineReveal text="Understand the render path, then make it yours." /><span className="stl-tagline-index">01 / 04</span></section>

      <section className="stl-journey" id="journey" aria-label="Scroll driven model journey">
        <JourneyCanvas />
        <ChapterRail />
        <div className="stl-journey-content">
          <JourneyChapter index={0} eyebrow="00 / Eclipse" title={<>Start with<br /><em>the shadow.</em></>} body="A solid body, one quiet light, and the first question: what does the browser need to know before it can show a world?" />
          <JourneyChapter index={1} eyebrow="01 / Aperture" title={<>Take the model<br /><em>apart.</em></>} body="Scroll through the shell and the instrument opens. Rings separate, the lens catches, and each layer earns its place in the frame." />
          <JourneyChapter index={2} eyebrow="02 / Passage" title={<>Make distance<br /><em>feel close.</em></>} body="The pieces become a corridor. Geometry, uniforms and light move together while the camera carries you through the scene." />
          <JourneyChapter index={3} eyebrow="03 / Alignment" title={<>Keep one<br /><em>small moment.</em></>} body="Finish on a living alignment. Drag the offset, move the light and leave the scene in a position that feels like yours."><AlignmentControl /></JourneyChapter>
        </div>
      </section>

      <section className="stl-section stl-section--why" id="why" aria-labelledby="why-title">
        <Reveal className="stl-section-intro"><span className="stl-kicker">01 / Why raw WebGL</span><h2 id="why-title">The shortest path<br />between idea and image.</h2><p>Abstractions are useful once you know what they hide. Start with a small scene that makes the browser’s pipeline visible.</p></Reveal>
        <div className="stl-benefits">{benefits.map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * 90} className="stl-benefit"><div className="stl-benefit-icon"><Icon size={22} weight="regular" /></div><span className="stl-benefit-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
      </section>

      <section className="stl-section stl-section--process" id="process" aria-labelledby="process-title">
        <Reveal className="stl-section-intro"><span className="stl-kicker">02 / Process</span><h2 id="process-title">A model lab<br />with nothing to hide.</h2></Reveal>
        <div className="stl-process-grid"><Reveal className="stl-process-card"><div className="stl-process-card-top"><span className="stl-process-index">01</span><Cube size={24} /></div><h3>Shape the geometry</h3><p>Start with positions and normals. Keep the data close enough to inspect in your browser devtools.</p><div className="stl-code-line"><span>bufferData</span><b>ARRAY_BUFFER</b></div></Reveal><Reveal delay={100} className="stl-process-card stl-process-card--accent"><div className="stl-process-card-top"><span className="stl-process-index">02</span><Sparkle size={24} /></div><h3>Light the surface</h3><p>Use a fragment shader to turn a mathematical sphere into a place with weather, depth and a point of view.</p><div className="stl-code-line"><span>uniform</span><b>u_light</b></div></Reveal><Reveal delay={200} className="stl-process-card"><div className="stl-process-card-top"><span className="stl-process-index">03</span><Code size={24} /></div><h3>Make it move</h3><p>One requestAnimationFrame loop is enough to animate the scene and keep the frame budget legible.</p><div className="stl-code-line"><span>drawArrays</span><b>TRIANGLES</b></div></Reveal></div>
      </section>

      <section className="stl-stats" aria-label="WebGL starter facts"><div><strong>01</strong><span>context</span></div><div><strong>60</strong><span>frames target</span></div><div><strong>0</strong><span>scene graph deps</span></div><div><strong>100%</strong><span>your render path</span></div></section>

      <section className="stl-section stl-section--faq" id="faq" aria-labelledby="faq-title"><Reveal className="stl-section-intro"><span className="stl-kicker">03 / FAQ</span><h2 id="faq-title">Good questions<br />make better models.</h2></Reveal><div className="stl-faq-list">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 45}><details className="stl-faq"><summary><span>{question}</span><span className="stl-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details></Reveal>)}</div></section>

      <section className="stl-demo" id="demo" aria-labelledby="demo-title"><div className="stl-demo-grid"><Reveal className="stl-demo-copy"><span className="stl-kicker">04 / Start a study</span><h2 id="demo-title">Your next scene<br /><span>starts here.</span></h2><p>Get the tiny starter that powers the preview. Bring your own geometry, then keep the parts that matter.</p><div className="stl-demo-checks"><span><Check size={16} weight="bold" /> local only</span><span><Check size={16} weight="bold" /> MIT licensed</span><span><Check size={16} weight="bold" /> readable GLSL</span></div></Reveal><Reveal delay={120} className="stl-demo-form"><DemoForm /></Reveal></div></section>
    </main>
    <footer className="stl-footer"><Logo compact /><span>© 2026 Starlight Lab</span><div className="stl-footer-nav"><a href="#stl-chapter-0">Eclipse</a><a href="#stl-chapter-1">Aperture</a><a href="#stl-chapter-2">Passage</a><a href="#stl-chapter-3">Alignment</a><a href="#main-content">Back to top ↑</a><a href="#faq">FAQ</a></div></footer>
  </div>;
}
