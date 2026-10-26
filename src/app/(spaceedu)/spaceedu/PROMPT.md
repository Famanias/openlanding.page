build a new landing page template: a full-viewport space-themed hero section
for a site called "SpaceEdu". No build step, no frameworks, no external JS libraries
(use raw, native WebGL — no Three.js). All CSS in one <style> block in <head>, all JS
(including GLSL shaders) in one <script> block before </body>. It must be pixel-faithful
to the spec below and fully mobile responsive.

════════════════════════════════════════════════════════════════════════
1. CONCEPT
════════════════════════════════════════════════════════════════════════
A cinematic astrophysics hero centered on the nearest known black hole to Earth: GAIA BH1.
A real-time, interactive 3D WebGL scene of a black hole with gravitational lensing, a
relativistic photon ring, and a dynamic 3D accretion disk fills the whole viewport as
the background. Centred over it: eyebrow "SINGULARITY", a huge serif singularity name,
a short cyan rule, a paragraph, and a glossy white pill button. Flanking the button,
cropped by the left and right screen edges, sit two transparent WebGL 3D black hole
sphere canvases with serif labels.

Three black holes exist: GAIA BH1 (nearest dormant stellar-mass binary black hole in
Ophiuchus, ~1,560 light-years away), CYGNUS X-1 (high-mass X-ray binary with an intense
blue-white accretion disk), and SGR A* (Sagittarius A*, the supermassive golden-orange
singularity at the Milky Way's galactic center).

Exactly one is "featured" (its 3D WebGL environment fills the background, its name is
the headline). The other two occupy the left and right 3D WebGL slots. Clicking a side
singularity makes it featured; the two slots then re-fill with the other two. GAIA BH1
is featured on load. The rotation is fully reversible.

════════════════════════════════════════════════════════════════════════
2. 3D WEBGL ARCHITECTURE — NO EXTERNAL ASSETS OR IMAGES
════════════════════════════════════════════════════════════════════════
Do NOT use <video> or <img> tags. Every visual asset is rendered via procedural 3D
WebGL (WebGL2 preferred, graceful fallback to WebGL1).

1. Main Background Canvas (<canvas id="sky-gl">):
   - Renders a 3D raymarched / gravitationally lensed black hole and starfield.
   - Features a 3D event horizon sphere (pure black shadow), a bright relativistic photon
     ring, and a tilted 3D volumetric accretion disk using procedural 3D simplex/fbm noise
     and Doppler beaming (one side brighter/blueshifted, receding side dimmer/redshifted).
   - Uniforms smoothly interpolate over 450ms (`u_mix` / `u_state`) when switching between
     singularities:
     · GAIA BH1 (`gaia`): Dormant binary system. Deep space starfield, dramatic Schwarzschild
       gravitational lensing warping background stars, crisp cyan-white photon ring,
       subtle/tenuous relativistic dust halo, and an orbiting G-type companion star glow in
       the distance.Camera tilt: 14 deg.
     · CYGNUS X-1 (`cygnus`): High-energy X-ray binary. Turbulent, fast-rotating electric
       cyan and ultraviolet-blue 3D accretion disk with vertical relativistic jets.
       Camera tilt: 22 deg.
     · SGR A* (`sgra`): Supermassive galactic core. Dense, blindingly bright golden-amber
       and crimson-orange thick torus accretion disk with intense gravitational bending.
       Camera tilt: 8 deg.
   - Subtle mouse/pointer parallax tilts the 3D camera orbit smoothly.

2. Flanking Side 3D Canvases (<canvas class="planet-gl"> inside each side button):
   - 256x256 internal resolution (scaled cleanly via CSS) with `alpha: true` and
     premultipliedAlpha disabled so the background is 100% transparent.
   - Each renders an isolated, rotating 3D black hole sphere + miniature tilted accretion
     ring filling ~97% of the square canvas bounds (matching the 139u sphere geometry).
   - Driven by a single shared `requestAnimationFrame` loop that renders the main canvas
     and both side canvases in synchronization.
   - Switching active singularities updates the integer uniform `u_type` (0 = gaia,
     1 = cygnus, 2 = sgra) on the side canvases, swapping the 3D representation in the
     EXACT SAME FRAME (<1ms) with zero network latency or texture pop-in.

3. Favicon:
   - Dynamically generate a 64x64 data URL from an offscreen canvas drawing a dark event
     horizon circle with a glowing cyan photon ring, assigned to <link rel="icon">.

════════════════════════════════════════════════════════════════════════
3. FONTS — load from Google Fonts
════════════════════════════════════════════════════════════════════════
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
Load: Prata 400; Hanken Grotesk 400,500,600,700; Poppins 500,600.
Stacks:
  --font-serif : 'Prata', Georgia, serif
  --font-body  : 'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif
  --font-logo  : 'Poppins', sans-serif
Body text uses --font-body. Headline and the two side labels use --font-serif.
The wordmark uses --font-logo.

════════════════════════════════════════════════════════════════════════
4. DESIGN SYSTEM — the single most important rule
════════════════════════════════════════════════════════════════════════
The layout is NOT built from rem/%/flex guesswork. It is a fixed composition measured
from a 1353 x 1163 reference, expressed in ONE custom property --u = one design pixel.
EVERY length in the file is calc(N * var(--u)). Do not substitute px values.

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }

:root{
  --dw:1353; --dh:1163; --gutter:25;
  --u:max(min(.72px, calc(100vh / 700)), min(calc(100vw / 1353), calc(100vh / 1163)));
  --dh-px:calc(1163 * var(--u));
  --vshift:calc(max(0px, (100vh - var(--dh-px))) * .42);
  --ink:#ffffff; --cyan:#79dce8; --cyan-logo:#5fd0e1;
  --rule:rgba(255,255,255,.23); --btn-ink:#071227;
}
@supports (height:100dvh){
  :root{
    --u:max(min(.72px, calc(100dvh / 700)), min(calc(100vw / 1353), calc(100dvh / 1163)));
    --vshift:calc(max(0px, (100dvh - var(--dh-px))) * .42);
  }
}
html,body{height:100%}
body{background:#04101f; color:var(--ink); font-family:var(--font-body);
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision; overflow:hidden}

--vshift pushes everything below the nav down on taller-than-design viewports so the
composition stays balanced. --gutter offsets the content column left by half its value
so the optical centre sits at x=664, not 676.

════════════════════════════════════════════════════════════════════════
5. MARKUP
════════════════════════════════════════════════════════════════════════
<div class="stage">                     position:fixed; inset:0; overflow:hidden;
                                        isolation:isolate
  <div class="sky">                     absolute; inset:0; z-index:0;
                                        background:radial-gradient(circle at 50% 45%, #0b2239 0%, #04101f 70%);
    <canvas id="sky-gl" aria-hidden="true"></canvas>
  </div>
  <div class="ui">                      absolute; inset:0; z-index:3
    <header class="navbar">
      <div class="navrow">
        <a class="logo" href="#">space<i>edu</i></a>
        <nav class="links" id="site-nav">
          <a href="#" aria-current="page">Objects</a>
          <a href="#">Tution</a>            (keep this spelling)
          <a href="#">Tutorials</a>
          <a href="#">Blog</a>
          <a class="enroll" href="#">Enroll</a>
        </nav>
        <button class="burger" type="button" aria-label="Open navigation"
                aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="copy">
      <div class="col eyebrow"><span class="ent-mask"><span class="ent-line">SINGULARITY</span></span></div>
      <h1 class="col title"><span class="ent-mask"><span class="ent-line">GAIA BH1</span></span></h1>
      <div class="col rule"><span></span></div>
      <p class="col lede">Discover the nearest known black hole to Earth, a dormant
         ten-solar-mass singularity<br>just 1,560 light-years away in Ophiuchus. Course
         enrollment starts today, don&rsquo;t miss out!</p>
      <div class="col cta">
        <button class="planet planet-l" type="button" data-slot="l">
          <canvas class="planet-gl" width="256" height="256" aria-hidden="true"></canvas>
        </button>
        <button class="planet planet-r" type="button" data-slot="r">
          <canvas class="planet-gl" width="256" height="256" aria-hidden="true"></canvas>
        </button>
        <a href="#">GET STARTED</a>
        <span class="label label-l"></span>     (empty — filled by script)
        <span class="label label-r"></span>
      </div>
    </div>
  </div>
  <button class="scroll" type="button" aria-label="Scroll to next section">
    <svg viewBox="0 0 26 33" fill="none" aria-hidden="true">
      <path d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4" stroke="#ffffff"
            stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>
    </svg>
  </button>
</div>

CRITICAL: Each side slot uses an immediate-mode WebGL <canvas class="planet-gl"> with
pre-compiled shaders. Switching updates its uniform state and renders immediately in the
same synchronous frame — zero network fetches, zero blank frames.

════════════════════════════════════════════════════════════════════════
6. CSS — exact values
════════════════════════════════════════════════════════════════════════
BACKDROP
.sky canvas{position:absolute; inset:0; width:100%; height:100%; display:block}

SIDE SINGULARITY SLOTS (two slots, retaining .planet class names for spec parity)
.planet{position:absolute; z-index:-1; padding:0; border:0; background:none;
  -webkit-appearance:none; appearance:none; line-height:0; cursor:pointer;
  pointer-events:auto;                      /* .copy disables pointers wholesale */
  transition:transform .45s cubic-bezier(.22,1,.36,1)}
.planet canvas{display:block; width:100%; height:auto; aspect-ratio:1/1}
.planet:hover{transform:scale(1.045)}
.planet:active{transform:scale(.99)}
.planet-l{width:calc(143 * var(--u)); left:calc(-69.5 * var(--u)); top:calc(-38.3 * var(--u))}
.planet-r{width:calc(143 * var(--u)); right:calc(-64.7 * var(--u)); top:calc(-40.6 * var(--u))}
@media (prefers-reduced-motion:reduce){
  .planet{transition:none} .planet:hover,.planet:active{transform:none} }
(The 3D WebGL sphere + ring fills ~97% of its square canvas; these box sizes make the
 rendered 3D model 139u across with its centre 2u from the left edge / 6.8u from the right.)

LAYOUT
.copy{position:absolute; inset:0; transform:translateY(var(--vshift)); pointer-events:none}
.copy a{pointer-events:auto}
.col{position:absolute; left:0; right:calc(var(--gutter) * var(--u)); text-align:center}

NAV
.navbar{position:absolute; top:0; left:0; right:0; z-index:6; height:calc(88 * var(--u))}
.navbar::after{content:""; position:absolute; left:calc(25 * var(--u));
  right:calc(49 * var(--u)); top:calc(86 * var(--u)); height:calc(2 * var(--u));
  background:var(--rule)}
.navrow{position:absolute; left:calc(25 * var(--u)); right:calc(49 * var(--u)); top:0;
  height:calc(86 * var(--u)); display:flex; align-items:center; justify-content:space-between}
.logo{font-family:var(--font-logo); font-weight:600; font-size:calc(18.4 * var(--u));
  letter-spacing:calc(-0.15 * var(--u)); line-height:1; color:#fff; text-decoration:none;
  white-space:nowrap; position:relative; top:calc(-1 * var(--u))}
.logo i{font-style:normal; color:var(--cyan-logo)}
.burger{display:none; position:relative; width:calc(46 * var(--u)); height:calc(46 * var(--u));
  padding:0; border:0; background:none; cursor:pointer; flex-direction:column;
  align-items:center; justify-content:center; gap:calc(6 * var(--u)); flex:none}
.burger span{display:block; width:calc(24 * var(--u)); height:calc(2 * var(--u));
  border-radius:calc(2 * var(--u)); background:#fff;
  transition:transform .28s cubic-bezier(.4,0,.2,1), opacity .18s linear}
.navrow[data-open="true"] .burger span:nth-child(1){transform:translateY(calc(8 * var(--u))) rotate(45deg)}
.navrow[data-open="true"] .burger span:nth-child(2){opacity:0}
.navrow[data-open="true"] .burger span:nth-child(3){transform:translateY(calc(-8 * var(--u))) rotate(-45deg)}
.links{display:flex; align-items:center}
.links a{position:relative; display:flex; align-items:center; height:calc(86 * var(--u));
  font-size:calc(18.4 * var(--u)); font-weight:400; line-height:1; color:#fff;
  text-decoration:none; padding:0 calc(17.5 * var(--u));
  letter-spacing:calc(-1 * var(--u)); white-space:nowrap}
.links a[aria-current="page"]::after{content:""; position:absolute; left:0; right:0;
  top:calc(83.5 * var(--u)); height:calc(4 * var(--u)); background:var(--cyan);
  border-radius:calc(1 * var(--u))}
.links a:nth-child(3){letter-spacing:calc(-1.75 * var(--u))}
.links a:nth-child(2){margin-left:calc(24 * var(--u))}
.links a:nth-child(3){margin-left:calc(26 * var(--u))}
.links a:nth-child(4){margin-left:calc(27 * var(--u))}
.links a.enroll{margin-left:calc(28.5 * var(--u)); width:calc(107 * var(--u));
  height:calc(38 * var(--u)); border-radius:calc(19 * var(--u)); display:flex;
  align-items:center; justify-content:center; font-size:calc(17 * var(--u));
  font-weight:600; letter-spacing:calc(-0.75 * var(--u)); line-height:1;
  color:var(--btn-ink); text-decoration:none; padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d8ecfe 9%,#dceefe 72%,#f4f9ff 100%);
  box-shadow:0 calc(3 * var(--u)) calc(14 * var(--u)) rgba(255,255,255,.22),
              inset 0 0 0 calc(1.5 * var(--u)) rgba(255,255,255,.92);
  flex:none}

HERO COPY
.eyebrow{top:calc(188.8 * var(--u)); font-size:calc(30.45 * var(--u)); font-weight:500;
  line-height:1; letter-spacing:calc(4 * var(--u)); text-indent:calc(4 * var(--u)); color:#fff}
h1.title{top:calc(268 * var(--u)); font-family:var(--font-serif); font-weight:400;
  font-size:calc(112.4 * var(--u)); line-height:1; letter-spacing:calc(2 * var(--u));
  text-indent:calc(2 * var(--u)); color:#fff}
.rule{top:calc(405.5 * var(--u)); height:calc(5 * var(--u)); font-size:0; line-height:0;
  padding-right:calc(2 * var(--u))}
.rule span{display:inline-block; vertical-align:top; width:calc(100 * var(--u));
  height:100%; border-radius:calc(2.5 * var(--u)); background:var(--cyan)}
p.lede{top:calc(433.2 * var(--u)); font-size:calc(18.36 * var(--u)); font-weight:400;
  line-height:calc(30 * var(--u)); color:rgba(255,255,255,.95)}

CTA ROW
.cta{top:calc(597 * var(--u)); height:calc(66 * var(--u)); isolation:isolate}
.cta a{display:inline-flex; align-items:center; justify-content:center;
  width:calc(216 * var(--u)); height:calc(66 * var(--u)); border-radius:calc(33 * var(--u));
  font-size:calc(17 * var(--u)); font-weight:700; letter-spacing:0; text-indent:0;
  line-height:1; color:var(--btn-ink); text-decoration:none; padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d6e8f8 4%,#d9ecfe 72%,#ffffff 100%);
  box-shadow:0 calc(10 * var(--u)) calc(18 * var(--u)) calc(-8 * var(--u)) rgba(255,255,255,.50),
              0 0 calc(26 * var(--u)) rgba(255,255,255,.18),
              inset 0 0 0 calc(2 * var(--u)) rgba(255,255,255,.9)}
.label{position:absolute; top:calc(33 * var(--u)); font-family:var(--font-serif);
  font-weight:400; font-size:calc(17.8 * var(--u)); letter-spacing:calc(4.6 * var(--u));
  line-height:1; color:#fff; white-space:nowrap}
.label.label-l{left:calc(111 * var(--u))}
.label.label-r{right:calc(104 * var(--u))}

SCROLL CONTROL
.scroll{position:absolute; z-index:4; left:50%;
  margin-left:calc((-48 - (var(--gutter) / 2)) * var(--u)); bottom:calc(68 * var(--u));
  width:calc(96 * var(--u)); height:calc(96 * var(--u)); border-radius:50%;
  background:rgba(24,30,42,.70); -webkit-backdrop-filter:blur(calc(6 * var(--u)));
  backdrop-filter:blur(calc(6 * var(--u))); border:0; display:flex; align-items:center;
  justify-content:center; cursor:pointer}
.scroll svg{width:calc(20 * var(--u)); height:calc(25 * var(--u)); display:block}

FOCUS
.scroll:focus-visible,.links a:focus-visible,.enroll:focus-visible,
.cta a:focus-visible,.logo:focus-visible{
  outline:calc(2 * var(--u)) solid var(--cyan); outline-offset:calc(3 * var(--u))}
.planet:focus-visible{outline:calc(2 * var(--u)) solid var(--cyan);
  outline-offset:calc(6 * var(--u)); border-radius:50%}

════════════════════════════════════════════════════════════════════════
7. RESPONSIVE — six tiers, in this exact source order
════════════════════════════════════════════════════════════════════════
A) NAV COLLAPSE  @media (max-width:1030px), (max-height:620px)
  .navrow{left:calc(25 * var(--u)); right:calc(25 * var(--u))}
  .burger{display:flex}
  .links{position:absolute; top:calc(96 * var(--u)); right:0; z-index:5;
    width:min(calc(324 * var(--u)), calc(100vw - 50 * var(--u)));
    flex-direction:column; align-items:stretch; padding:calc(12 * var(--u));
    border-radius:calc(20 * var(--u)); background:rgba(9,21,42,.84);
    backdrop-filter:blur(calc(18 * var(--u)));
    border:calc(1 * var(--u)) solid rgba(255,255,255,.14);
    box-shadow:0 calc(18 * var(--u)) calc(44 * var(--u)) rgba(2,8,20,.55);
    opacity:0; visibility:hidden; transform:translateY(calc(-10 * var(--u)));
    transition:opacity .24s ease, transform .28s cubic-bezier(.4,0,.2,1), visibility .28s}
  .navrow[data-open="true"] .links{opacity:1; visibility:visible; transform:none}
  .links a:nth-child(n){margin-left:0; height:auto; justify-content:flex-start;
    padding:calc(14 * var(--u)) calc(16 * var(--u)); font-size:calc(19 * var(--u));
    letter-spacing:calc(-.6 * var(--u))}
  .links a + a{border-top:calc(1 * var(--u)) solid rgba(255,255,255,.08)}
  .links a[aria-current="page"]::after{top:auto; bottom:calc(9 * var(--u));
    left:calc(16 * var(--u)); right:auto; width:calc(26 * var(--u)); height:calc(3 * var(--u))}
  .links a.enroll{margin:calc(14 * var(--u)) 0 calc(2 * var(--u)); width:100%;
    height:calc(46 * var(--u)); border-radius:calc(23 * var(--u)); justify-content:center;
    padding-top:calc(2 * var(--u)); font-size:calc(18 * var(--u));
    letter-spacing:calc(-.4 * var(--u)); border-top:0}
  .links a.enroll::after{content:none}

B) TABLET  @media (min-width:580px) and (max-width:1030px) and (min-height:621px)
  :root{--gutter:0;
    --u:min(max(min(.85px, calc(100vh / 780)), min(calc(100vw / 900), calc(100vh / 1163))), 1.15px);
    --dh-px:calc(1120 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .38)}
  (repeat inside @supports (height:100dvh) with 100dvh)
  .navbar::after{left:calc(25 * var(--u)); right:calc(25 * var(--u))}
  p.lede br{display:none}
  p.lede{max-width:calc(620 * var(--u)); margin-left:auto; margin-right:auto; text-wrap:pretty}
  .label.label-r{right:calc(116 * var(--u))}

C) PHONE  @media (max-width:579px), (max-height:620px)
  :root{--gutter:0;
    --u:max(min(.92px, calc(100vh / 620)), min(calc(100vw / 430), calc(100vh / 880)));
    --dh-px:calc(880 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .34)}
  (repeat inside @supports (height:100dvh))
  .navbar{height:calc(76 * var(--u))}
  .navbar::after{left:calc(24 * var(--u)); right:calc(24 * var(--u)); top:calc(74 * var(--u))}
  .navrow{left:calc(24 * var(--u)); right:calc(24 * var(--u)); height:calc(74 * var(--u))}
  .links{top:calc(84 * var(--u))}
  .copy{top:calc(76 * var(--u)); display:flex; flex-direction:column; align-items:center;
    padding:calc(56 * var(--u)) calc(26 * var(--u)) 0}
  .col{position:static; width:100%; right:auto}
  .eyebrow{font-size:calc(20 * var(--u)); letter-spacing:calc(5 * var(--u)); text-indent:calc(5 * var(--u))}
  h1.title{font-size:calc(86 * var(--u)); margin-top:calc(15 * var(--u))}
  .rule{margin-top:calc(20 * var(--u)); height:calc(5 * var(--u)); padding-right:0}
  .rule span{width:calc(84 * var(--u))}
  p.lede{margin-top:calc(19 * var(--u)); font-size:calc(15.5 * var(--u));
    line-height:calc(26 * var(--u)); max-width:calc(400 * var(--u)); text-wrap:balance}
  p.lede br{display:none}
  .cta{top:auto; margin-top:calc(32 * var(--u)); height:calc(60 * var(--u)); position:relative}
  .cta a{width:calc(190 * var(--u)); height:calc(60 * var(--u)); border-radius:calc(30 * var(--u))}
  .label{top:50%; transform:translateY(-50%); font-size:calc(16 * var(--u));
    letter-spacing:calc(4 * var(--u))}
  .label.label-l{left:calc(56 * var(--u))}
  .label.label-r{right:calc(60 * var(--u))}
  .planet-l{width:calc(89 * var(--u)); left:calc(-44.5 * var(--u)); top:calc(-17 * var(--u))}
  .planet-r{width:calc(89 * var(--u)); right:calc(-44.5 * var(--u)); top:calc(-18.3 * var(--u))}
  .scroll{width:calc(74 * var(--u)); height:calc(74 * var(--u));
    margin-left:calc(-37 * var(--u)); bottom:calc(49 * var(--u))}
  .scroll svg{width:calc(15.5 * var(--u)); height:calc(19.5 * var(--u))}

D) @media (max-height:660px){ .scroll{display:none} }

E) SHORT  @media (max-height:620px)
  :root{--u:max(min(.85px, calc(100vh / 470)), min(calc(100vw / 640), calc(100vh / 560)));
    --dh-px:calc(560 * var(--u)); --vshift:0px}
  .copy{padding-top:calc(26 * var(--u))}
  h1.title{font-size:calc(64 * var(--u)); margin-top:calc(8 * var(--u))}
  .rule{margin-top:calc(12 * var(--u))}
  p.lede{margin-top:calc(12 * var(--u))}
  .cta{margin-top:calc(20 * var(--u))}
  .label{top:50%; transform:translateY(-50%); font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(58 * var(--u))}
  .label.label-r{right:calc(58 * var(--u))}
@media (min-width:821px) and (max-height:660px){ .copy{transform:none} }

F) NARROW PHONE  @media (max-width:500px)   — declared LAST so it wins inside tier E
  .label{top:calc(100% + 34 * var(--u)); transform:none; font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(6 * var(--u))}
  .label.label-r{right:calc(6 * var(--u))}

@media (prefers-reduced-motion:reduce){ .links,.burger span{transition:none} }

════════════════════════════════════════════════════════════════════════
8. ENTRANCE ANIMATION — runs once, then deletes itself
════════════════════════════════════════════════════════════════════════
In <head>, BEFORE the stylesheet, a blocking inline script so the opening frame is
composed rather than flashing the finished page:
  (function(){try{
    if(!window.matchMedia||!matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.documentElement.classList.add('anim');
    }
  }catch(e){}})();

@keyframes ent-reveal{from{transform:translateY(115%)}to{transform:translateY(0)}}
@keyframes ent-rise{from{opacity:0;transform:translateY(var(--rise,10px))}to{opacity:1;transform:none}}
@keyframes ent-settle{from{opacity:0;transform:translateY(var(--rise,8px)) scale(.965)}to{opacity:1;transform:none}}
@keyframes ent-draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes ent-fade{from{opacity:0}to{opacity:1}}

.anim{--e-expo:cubic-bezier(.16,1,.3,1); --e-quint:cubic-bezier(.22,1,.36,1);
      --e-slow:cubic-bezier(.4,0,.2,1)}
.ent-mask,.ent-line{display:block}
.anim .ent-mask{overflow:hidden; padding-top:.18em; margin-top:-.18em}
.anim .ent-line{transform:translateY(115%); will-change:transform}
.anim .navbar::after,.anim .links a[aria-current="page"]::after,.anim .rule span{transform:scaleX(0)}
.anim .logo,.anim .links a,.anim .burger,.anim p.lede,.anim .label,.anim .cta a,
.anim .scroll,.anim .sky{opacity:0}
.anim .sky{will-change:opacity}

Sequence (all `both` fill):
  .anim.play .sky                                ent-fade   1.6s  --e-slow   .25s
  .anim.play .navbar::after                      ent-draw    .9s  --e-expo   .12s
  .anim.play .logo              --rise 8u        ent-rise    .6s  --e-quint  .20s
  .anim.play .links a           --rise 8u        ent-rise   .55s  --e-quint
    nth-child(1) .26s · (2) .31s · (3) .36s · (4) .41s
  .anim.play .links a.enroll, .burger  --rise 8u ent-settle  .6s  --e-quint  .46s
  .anim.play .links a[aria-current]::after       ent-draw   .55s  --e-expo   .60s
  .anim.play .eyebrow .ent-line                  ent-reveal .75s  --e-expo   .30s
  .anim.play h1.title .ent-line                  ent-reveal .95s  --e-expo   .44s
  .anim.play .rule span                          ent-draw   .65s  --e-expo   .78s
  .anim.play p.lede             --rise 12u       ent-rise    .7s  --e-quint  .86s
  .anim.play .label.label-l     --rise 8u        ent-rise    .6s  --e-quint 1.04s
  .anim.play .label.label-r     --rise 8u        ent-rise    .6s  --e-quint 1.10s
  .anim.play .cta a             --rise 8u        ent-settle  .7s  --e-quint 1.14s
  .anim.play .scroll                             ent-settle  .6s  --e-quint 1.42s

Driver script: if <html> lacks .anim, return. Otherwise wait for document.fonts.ready
(with a 500ms guard timeout), then two nested requestAnimationFrame calls, then add
.play. After 2150ms remove BOTH .anim and .play.

════════════════════════════════════════════════════════════════════════
9. SINGULARITY SWITCHER & WEBGL ENGINE — JS behaviour
════════════════════════════════════════════════════════════════════════
const ORDER = ['gaia','cygnus','sgra'];
Per object store: name (uppercase), shader preset parameters (accretion color primary,
secondary, disk density, relativistic jet intensity, camera tilt, companion star glow),
and lede HTML:
  gaia:   name: "GAIA BH1"
          lede: "Discover the nearest known black hole to Earth, a dormant ten-solar-mass
                 singularity<br>just 1,560 light-years away in Ophiuchus. Course enrollment
                 starts today, don&rsquo;t miss out!"
  cygnus: name: "CYGNUS X-1"
          lede: "Explore a fierce stellar-mass X-ray binary stripping superheated plasma
                 from a blue<br>supergiant companion star. Course enrollment starts today,
                 don&rsquo;t miss out!"
  sgra:   name: "SGR A*"
          lede: "Journey to the supermassive four-million-solar-mass gravitational anchor
                 at the heart<br>of our Milky Way galaxy. Course enrollment starts today,
                 don&rsquo;t miss out!"

show(next):
  1. bail if unknown or already featured
  2. update the WebGL target state uniforms to interpolate the background 3D black hole
     toward `next`'s physical parameters over 450ms (smooth cubic ease).
  3. set the h1's .ent-line textContent to the object's name
  4. set p.lede innerHTML to that object's lede
  5. rest = ORDER minus `next`; slot L gets rest[0], slot R gets rest[1]. For each slot:
     immediately update the side WebGL canvas uniform `u_type` and trigger an immediate
     synchronous draw call so the 3D side sphere swaps in <1ms; set the button's
     data-planet, set aria-label "Show <NAME>", set the label text.

Bind click on both buttons -> show(this.dataset.planet). Call show('gaia') once at the
end of setup to establish the initial state.

════════════════════════════════════════════════════════════════════════
10. BURGER MENU — JS behaviour
════════════════════════════════════════════════════════════════════════
set(open) writes navrow.dataset.open, the button's aria-expanded, and its aria-label
("Open navigation" / "Close navigation"). Initialise with set(false). Toggle on button
click (stopPropagation). Close on: a document click outside the menu and button, Escape
(then return focus to the button), and any click on a link inside the menu.

════════════════════════════════════════════════════════════════════════
11. ACCESSIBILITY
════════════════════════════════════════════════════════════════════════
· Side singularities are real <button type="button"> with a dynamic aria-label — keyboard
  operable, focus-visible ringed in --cyan.
· All <canvas> elements carry aria-hidden="true" — the labels and headings carry the
  semantic meaning.
· prefers-reduced-motion: no entrance sequence (.anim is never added); WebGL shaders
  render a single high-detail static frame on load and on state change rather than
  running a continuous time loop; no hover/press transforms; no nav transitions.
· .copy spans the whole frame with pointer-events:none so it can never swallow nav
  clicks; only .copy a and .planet re-enable pointers.

════════════════════════════════════════════════════════════════════════
12. ACCEPTANCE CHECKS
════════════════════════════════════════════════════════════════════════
· Loads with GAIA BH1 featured in the 3D WebGL background, CYGNUS X-1 left, SGR A* right.
· Clicking a side singularity swaps the 3D side model in the SAME FRAME (<1ms) and
  smoothly morphs the 3D background black hole shader, headline, lede, and labels.
· Gaia BH1 -> Cygnus X-1 -> Sgr A* -> Gaia BH1 returns to the exact initial state.
· Zero external image or video network requests — 100% procedural WebGL 3D rendering.
· body never scrolls horizontally at any width from 320px to 2560px.
· Entrance runs once; afterwards <html> carries neither .anim nor .play.