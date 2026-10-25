function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 48c17-17 32-14 48-14C41 9 66-5 91 10c9-34 60-33 74-2 29-15 64 4 57 31 31-9 51 5 59 18-71 8-195 12-281-9Z" fill="var(--mh-paper)"/><path d="M19 52c48 6 167 7 231-1" stroke="var(--mh-cloud)" strokeWidth="3" opacity=".6"/></g>;
}
function Cottage({ x, y, scale = 1, roof = "var(--mh-coral)" }: { x: number; y: number; scale?: number; roof?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--mh-ink)" strokeWidth="1.3" strokeLinejoin="round">
    <path d="M0-28h44V0H0Z" fill="var(--mh-cloud)"/><path d="M44-28h14V-2L44 0Z" fill="var(--mh-hydrangea)"/>
    <path d="M-7-27 22-52l31 25Z" fill={roof}/><path d="M22-52 53-27h8l-30-27Z" fill="var(--mh-plum)"/>
    <path d="M6-21h11v11H6Zm21 5h10V0H27Z" fill="var(--mh-apricot)"/><path d="M11.5-21v11M6-15.5h11M32-16V0"/>
  </g>;
}
function Lighthouse() {
  return <g stroke="var(--mh-ink)" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M-17 0 -11-92h22L17 0Z" fill="var(--mh-paper)"/>
    <path d="M-13.1-60h26.2l.9 14h-28Zm-.9 30h30l.8 14h-31.6Z" fill="var(--mh-coral)"/>
    <path d="M-14-92h28v9h-28Z" fill="var(--mh-plum)"/>
    <path d="M-9-122h18v30h-18Z" fill="var(--mh-apricot)"/><path d="M-9-107h18M0-122v30"/>
    <path d="M-15-122h30l-15-18Z" fill="var(--mh-plum)"/><path d="M0-146v6" strokeLinecap="round"/>
    <path d="M-6-80h4v9h-4Zm8 0h4v9H2Z" fill="var(--mh-ink)" stroke="none" opacity=".75"/>
  </g>;
}
function Tree({ x, y, scale = 1, canopy = "var(--mh-sea)" }: { x: number; y: number; scale?: number; canopy?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-5 0q2-26-3-48l9-1q1 22 7 49Z" fill="var(--mh-ink)"/><path d="m1-32 18-18m-17 6-17-12" stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round"/>
    <g fill={canopy}><circle cx="0" cy="-92" r="38"/><circle cx="-34" cy="-68" r="29"/><circle cx="36" cy="-70" r="31"/><circle cx="-4" cy="-52" r="33"/></g>
    <g fill="var(--mh-hydrangea)" opacity=".5"><circle cx="-10" cy="-106" r="22"/><circle cx="-40" cy="-76" r="14"/><circle cx="24" cy="-86" r="13"/></g>
    <g fill="var(--mh-ink)" opacity=".28"><circle cx="30" cy="-48" r="26"/><circle cx="-12" cy="-40" r="20"/></g>
    <g fill="var(--mh-apricot)"><circle cx="-18" cy="-80" r="2.8"/><circle cx="14" cy="-100" r="2.8"/><circle cx="34" cy="-72" r="2.8"/><circle cx="-38" cy="-60" r="2.8"/><circle cx="2" cy="-60" r="2.8"/><circle cx="-6" cy="-122" r="2.4"/></g>
  </g>;
}
function Tuft({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 0q-3-18-11-30 10 8 13 28 1-24 8-40-1 24 0 42 8-14 18-22-8 12-9 24Z" fill="var(--mh-ink)"/>;
}
function Flower({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M0 0v-24" stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round"/><g fill="var(--mh-coral)"><circle cx="0" cy="-30" r="4"/><circle cx="-5" cy="-24" r="4"/><circle cx="5" cy="-24" r="4"/></g><circle cx="0" cy="-26" r="2.2" fill="var(--mh-apricot)"/></g>;
}
export function FooterScene() {
  return <svg className="mh-footer-art" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="mh-foot-sky" x1="0" y1="0" x2="0" y2="262" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-paper)"/><stop offset=".5" stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-foot-sea" x1="0" y1="258" x2="0" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".55" stopColor="var(--mh-sea)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-foot-land" x1="0" y1="270" x2="0" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <radialGradient id="mh-foot-glow"><stop stopColor="var(--mh-apricot)" stopOpacity=".85"/><stop offset="1" stopColor="var(--mh-apricot)" stopOpacity="0"/></radialGradient>
    </defs>
    <path fill="url(#mh-foot-sky)" d="M0 0h1600v270H0z"/>
    <circle cx="1210" cy="170" r="26" fill="var(--mh-paper)" opacity=".9"/>
    <g className="mh-clouds mh-ambient"><Cloud x={110} y={92} scale={1.05}/><Cloud x={1040} y={46} scale={.8}/><Cloud x={380} y={170} scale={.6}/></g>
    <path d="M0 262V232q92-34 192-9t198-4q112-46 232-6t212-14q118-32 232 10t250-12q126-30 284 8V262Z" fill="var(--mh-hydrangea)"/>
    <path d="M0 262v-14q130-22 260-6t300-6q150-16 290 4t290-6q150-12 270 8v18Z" fill="var(--mh-sea)" opacity=".45"/>
    <path d="M0 256h1600v144H0Z" fill="url(#mh-foot-sea)"/>
    <g stroke="var(--mh-cloud)" strokeWidth="2" strokeLinecap="round" opacity=".5"><path d="M60 286h150m60 14h110m170-2h130M820 280h120m60 18h160m80-8h130M60 326h170m110 12h120m250-6h140m150 12h110m150-14h130"/></g>
    <g stroke="var(--mh-paper)" strokeWidth="2" strokeLinecap="round" opacity=".6"><path d="M320 290h60m90 16h80m190-10h70m150 26h60m140-18h60"/></g>
    <path d="M300 336c70-40 170-60 262-62 140-4 250-2 380 6 70 6 118 24 166 56l52 64H300Z" fill="url(#mh-foot-land)"/>
    <path d="M300 336c70-40 170-60 262-62 140-4 250-2 380 6 70 6 118 24 166 56" stroke="var(--mh-hydrangea)" strokeWidth="2" opacity=".35"/>
    <g opacity=".95">
      <Cottage x={500} y={300} scale={.95}/><Cottage x={572} y={289} scale={1.1} roof="var(--mh-plum)"/><Cottage x={660} y={283} scale={.9}/><Cottage x={738} y={285} scale={1.05} roof="var(--mh-plum)"/><Cottage x={822} y={292} scale={.85}/>
    </g>
    <circle cx="595" cy="278" r="30" fill="url(#mh-foot-glow)" opacity=".5"/><circle cx="760" cy="274" r="28" fill="url(#mh-foot-glow)" opacity=".5"/>
    <g transform="translate(944 300)"><Lighthouse/></g>
    <path d="M888 304q60-6 132-4l26 14H890Z" fill="var(--mh-ink)"/>
    <path d="M404 300h150l34 12H408Z" fill="var(--mh-ink)"/><path d="m424 302 3 22m36-22 3 22m36-22 3 22" stroke="var(--mh-ink)" strokeWidth="3"/>
    <g transform="translate(1088 318)"><path d="M0 0q36 12 76-2L64 16H12Z" fill="var(--mh-plum)"/><path d="M38-52V0m0-46L14-8h24Z" stroke="var(--mh-paper)" strokeWidth="1.3"/><path d="m41-44 22 32H41Z" fill="var(--mh-paper)" opacity=".85"/><path d="M-4 20q40 7 84 0" stroke="var(--mh-paper)" strokeWidth="2" opacity=".5" strokeLinecap="round"/></g>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round" opacity=".5"><path d="M330 188q8-9 15 0 7-9 15 0m340-34q7-8 13 0 6-8 13 0m500 68q6-7 12 0 6-7 12 0"/></g>
    <g transform="translate(770 112)"><g className="mh-footer-lantern mh-ambient">
      <circle cx="0" cy="26" r="62" fill="url(#mh-foot-glow)" opacity=".55"/>
      <g stroke="var(--mh-ink)" strokeWidth="1.5" strokeLinejoin="round"><path d="M-14 0q14-9 28 0l5 38q-19 11-38 0Z" fill="var(--mh-apricot)"/><path d="M-14 0q14 6 28 0M-19 38q19-6 38 0" fill="none"/><path d="M0 4v32" fill="none" opacity=".6"/><path d="M-12-1q12-8 24 0" fill="none"/></g>
      <path d="M0 46q-6 10 0 20" stroke="var(--mh-coral)" strokeWidth="2" strokeLinecap="round"/>
    </g></g>
    <path d="M0 400V326c52-22 150-30 230-8 62 18 98 44 130 82Z" fill="var(--mh-plum)"/>
    <path d="M1130 400c36-52 114-84 206-88 96-4 178 12 264-12v100Z" fill="var(--mh-plum)"/>
    <path d="M1010 400c70-30 170-48 280-48 126 0 220 6 310-14v62Z" fill="var(--mh-ink)"/>
    <path d="M0 400V356c60-18 150-14 220 10 50 18 84 22 126 34Z" fill="var(--mh-ink)"/>
    <g className="mh-foreground-grass mh-ambient">
      <Tree x={1330} y={318} scale={1.25}/><Tree x={1500} y={322} scale={.88} canopy="var(--mh-plum)"/><Tree x={1262} y={346} scale={.5}/><Tree x={118} y={338} scale={.9}/>
      <Tuft x={30} y={394} scale={1.4}/><Tuft x={92} y={400} scale={1.1}/><Tuft x={250} y={398} scale={1.3}/><Tuft x={1060} y={400} scale={1.2}/><Tuft x={1150} y={392} scale={1.5}/><Tuft x={1420} y={400} scale={1.4}/><Tuft x={1560} y={398} scale={1.2}/>
      <Flower x={52} y={396}/><Flower x={268} y={398}/><Flower x={1108} y={398}/><Flower x={1402} y={396}/><Flower x={1546} y={394}/>
    </g>
  </svg>;
}
