function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 48c17-17 32-14 48-14C41 9 66-5 91 10c9-34 60-33 74-2 29-15 64 4 57 31 31-9 51 5 59 18-71 8-195 12-281-9Z" fill="var(--mh-paper)"/><path d="M19 52c48 6 167 7 231-1-51 18-178 20-231 1Z" fill="var(--mh-cloud)" opacity=".65"/></g>;
}
function House({ x, y, scale = 1, tone = "var(--mh-cloud)" }: { x: number; y: number; scale?: number; tone?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--mh-ink)" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M11 49h93v76H11Z" fill={tone}/><path d="m104 49 33-7v78l-33 5Z" fill="var(--mh-plum)"/>
    <path d="M-4 51 28 9l99-7 26 42-50 12-30-31-30 30Z" fill="var(--mh-plum)"/><path d="m28 9 99-7-24 54-30-31-30 30-47-4" fill="var(--mh-coral)"/>
    <path d="m12 35 98-8M4 46l101-7M22 22l95-7M36 9 12 50M53 8 34 50M72 6 56 36M91 5 77 32" opacity=".4"/>
    <path d="M23 67h27v30H23Zm43-6h25v32H66Z" fill="var(--mh-apricot)"/><path d="M36 68v28m-13-14h27m28-21v32m-12-16h25"/><path d="M61 97h26v28H61Z" fill="var(--mh-ink)"/>
    <path d="M8 107h48v10H8Z" fill="var(--mh-sea)"/><path d="m20 107-3-13 7 7 5-10 5 12 7-5 3 9" fill="var(--mh-ink)"/>
    <path d="M115 64h12v25h-12Z" fill="var(--mh-apricot)"/><path d="M8 125h133M6 129h137"/>
  </g>;
}
export function Harbor() {
  return <svg className="mh-harbor" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="mh-sky" x1="800" y1="0" x2="800" y2="780" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".48" stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-water" x1="0" y1="580" x2="0" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".6" stopColor="var(--mh-sea)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-cliff" x1="1250" y1="650" x2="1200" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-wall" x1="1130" y1="460" x2="1240" y2="740" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-paper)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-roof" x1="1200" y1="380" x2="1200" y2="530" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-coral)"/></linearGradient>
      <radialGradient id="mh-lamp"><stop stopColor="var(--mh-paper)"/><stop offset="1" stopColor="var(--mh-apricot)"/></radialGradient>
      <pattern id="mh-tiles" width="22" height="15" patternUnits="userSpaceOnUse"><path d="M0 14h22M11 0v14" stroke="var(--mh-ink)" strokeWidth=".9" opacity=".28"/></pattern>
      <pattern id="mh-stone" width="61" height="35" patternUnits="userSpaceOnUse"><path d="M0 34h61M27 0v34M0 17h27" stroke="var(--mh-cloud)" strokeWidth="1.1" opacity=".15"/></pattern>
    </defs>
    <path fill="url(#mh-sky)" d="M0 0h1600v1000H0z"/>
    <g className="mh-distant-layer">
      <circle cx="1325" cy="198" r="29" fill="var(--mh-paper)" opacity=".9"/>
      <circle cx="1329" cy="193" r="22" fill="var(--mh-cloud)" opacity=".24"/>
      <g className="mh-clouds mh-ambient"><Cloud x={-90} y={163} scale={1.45}/><Cloud x={610} y={250} scale={.7}/><Cloud x={1170} y={301} scale={1.38}/><Cloud x={283} y={485} scale={1.1}/></g>
      <path d="m0 605 82-21 68 8 101-58 96 31 97-45 117 48 105-37 104 52 104-21 149 24 108-56 112 46 129-18 128 47v76H0Z" fill="var(--mh-hydrangea)"/>
      <path d="M0 644c114-36 132-10 218-39 94-34 117 29 244 15 99-12 109-30 208-9 51 11 123 8 185-3 173-32 148 43 270 15 122-28 196-26 305 8l170-15v87H0Z" fill="var(--mh-sea)" opacity=".5"/>
      <path d="M0 653c101-15 175-5 266 11 128 22 168-16 314-5 134 10 221 24 394 5 136-15 262 30 386-6 78-23 155-8 240 5v337H0Z" fill="url(#mh-water)"/>
      <path d="M0 697c110-4 202 15 304 3m166-2 191 1m35-23 127 2m-658 57 152 2m222 4 212 2m-375 50 131 2m153-26 211 3M58 826l255 3m151-5 221 1m-191 52 187 1m-374 29 237 2m227-90 138 2" stroke="var(--mh-cloud)" strokeWidth="2" opacity=".48" strokeLinecap="round"/>
      <g stroke="var(--mh-paper)" strokeLinecap="round" opacity=".7"><path d="m780 701 52 1m-34 14 73 1m-52 17 49 1m-76 22 128 2m-118 17 47 1m40 0 29 1m-93 20 83 2m-101 20 163 2m-143 20 57 1m24 1 82 1m-134 22 107 2"/></g>
    </g>
    <g className="mh-middle-layer">
      <path d="M1600 555c-162-50-234 63-327 32-122-40-211-29-302 21-70 40-153 36-241 61-88 24-151 26-202 46l-94-1 104 29c159 0 270-10 362-18 169-15 312 40 700 67Z" fill="var(--mh-plum)"/>
      <path d="M1600 578c-154-48-236 65-327 36-105-33-171-30-256 9-85 39-172 42-259 62-65 16-114 23-182 25 191 29 221 14 370 6 152-8 290 59 654 62Z" fill="var(--mh-sea)"/>
      <path d="m489 706 59-16 51-4 34-28 40 4 59-34 60 15 35-38 71 18 60 69-137 24Z" fill="var(--mh-hydrangea)"/>
      <g opacity=".8"><House x={566} y={642} scale={.35}/><House x={620} y={619} scale={.43}/><House x={692} y={594} scale={.49}/><House x={768} y={593} scale={.4}/><House x={829} y={603} scale={.44}/><House x={899} y={580} scale={.43}/></g>
      <path d="M580 704q143-3 257-16t218 6" stroke="var(--mh-ink)" strokeWidth="4"/>
      <path d="M526 715h291l61 14H535Z" fill="var(--mh-ink)"/><path d="m569 711 5 26m44-26 4 28m41-26 4 25m40-25 4 24m39-22 3 22m39-21 2 20" stroke="var(--mh-ink)" strokeWidth="4"/>
      <g transform="translate(365 755)"><path d="M0 0q40 14 83-1L69 18H15Z" fill="var(--mh-plum)"/><path d="M42-55V1m0-51L17-9h25" stroke="var(--mh-paper)" strokeWidth="1.3"/><path d="m45-47 24 33H45Z" fill="var(--mh-paper)" opacity=".8"/><path d="m5 26 66 1m-48 9 39 1" stroke="var(--mh-cloud)" opacity=".4"/></g>
      <g stroke="var(--mh-ink)" strokeLinecap="round" opacity=".55"><path d="M1050 354q9-10 17 0 8-10 17 0m-166 39q7-8 13 0 6-8 13 0m98 37q5-6 11 0 6-6 11 0" strokeWidth="2"/></g>
    </g>
    <g className="mh-near-layer">
      <path d="M1600 701c-118-51-189-22-262-19-153 7-200 12-280 65-60 41-102 62-169 98-71 38-183 24-225 62-23 22 9 54 48 93h888Z" fill="url(#mh-cliff)"/>
      <path d="M1600 701c-118-51-189-22-262-19-153 7-200 12-280 65-60 41-102 62-169 98-71 38-183 24-225 62-23 22 9 54 48 93h888Z" fill="url(#mh-stone)"/>
      <path d="M1600 681c-130-39-201-13-280-9-129 6-198 20-278 77-50 36-89 72-158 98-51 20-116 17-161 40l25 11c87-17 106-1 160-24 103-43 161-113 253-130 139-27 243 10 439 1Z" fill="var(--mh-ink)"/>
      <path d="M1384 729c-62 21-119 19-161 30-90 22-113 95-202 127-86 31-112 75-107 114h149c-67-52-16-63 55-93 85-36 86-90 145-110 50-17 71-14 121-17Z" fill="var(--mh-cloud)" opacity=".65"/>
      <path d="M1384 729c-62 21-119 19-161 30-90 22-113 95-202 127-86 31-112 75-107 114" stroke="var(--mh-paper)" strokeWidth="5" opacity=".5"/>
      <g transform="translate(1005 397)" stroke="var(--mh-ink)" strokeLinejoin="round">
        <path d="M58 123h224v203H58Z" fill="url(#mh-wall)" strokeWidth="2.5"/>
        <path d="m282 123 91 28v175h-91Z" fill="var(--mh-cloud)" strokeWidth="2.5"/>
        <path d="M42 145 146 43l148-9 99 116-114 19-94-91-93 78Z" fill="url(#mh-roof)" strokeWidth="3"/>
        <path d="m146 43 148-9 99 116-114 19-94-91-93 78-50-11Z" fill="url(#mh-tiles)" strokeWidth="2"/>
        <path d="m145 43 40 35 94 91 114-19m-333 5 33 1 91-78m104-44 103 116" strokeWidth="4"/>
        <path d="m116 113 69-66 79 76-15 7-64-58-55 56Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M222 16h27v45l-27 2Z" fill="var(--mh-sea)" strokeWidth="2"/><path d="M218 13h35v9h-35Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M176 112h29v34h-29Z" fill="var(--mh-apricot)" strokeWidth="3"/><path d="M190 112v34m-14-17h29" strokeWidth="2"/>
        <path d="M82 178h80v79H82Zm105 0h65v79h-65Z" fill="var(--mh-ink)" strokeWidth="3"/>
        <path d="M88 184h68v67H88Zm105 0h53v67h-53Z" fill="url(#mh-lamp)" stroke="none"/>
        <path d="M123 184v67m-35-34h68m64-33v67m-27-34h53" strokeWidth="2"/>
        <path d="m88 183 19 1-7 49-12 5m68-55h-17l6 49 11 6m37-55 15 1-5 49-10 4m53-54h-12l4 47 8 6" fill="var(--mh-coral)" strokeWidth=".8"/>
        <path d="M77 258h90v8H77Zm105 0h76v8h-76Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M117 279h49v47h-49Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M122 284h39v42h-39Z" fill="var(--mh-ink)"/>
        <path d="M193 284h51v29h-51Z" fill="var(--mh-apricot)" strokeWidth="2"/><path d="M218 284v29" strokeWidth="2"/>
        <path d="m58 271 224-2 83 21-12 9-73-18-222 3Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M300 179h49v67h-49Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M306 185h36v53h-36Z" fill="var(--mh-apricot)"/><path d="M324 185v53m-18-26h36"/>
        <path d="M286 305h90v21h-90Z" fill="var(--mh-sea)" strokeWidth="2"/>
        <path d="M55 326h325v12H51Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M100 337h86v10H95Zm-5 10h96v9H89Z" fill="var(--mh-cloud)" strokeWidth="2"/>
        <path d="M72 294h22l-3 27H76Z" fill="var(--mh-coral)"/><path d="M82 295v-21m0 9-10-6m11 10 10-10" strokeWidth="2"/><path d="m72 277 4-8 7 10 6-13 5 11-10 10Z" fill="var(--mh-sea)" strokeWidth="1"/>
        <path d="M267 300h13v24h-13Z" fill="var(--mh-plum)"/><path d="m269 300-4-15 8 7 2-12 5 10-2 10" fill="var(--mh-sea)"/>
        <path d="M67 154h204m-200 5h193M61 320h50m64 0h103m2-164v165m76-154v124" strokeWidth="1" opacity=".35"/>
        <path d="M267 273v-45l20-12" strokeWidth="2"/><path d="m281 215 17 5-4 25-20-5Z" fill="var(--mh-apricot)" strokeWidth="1.3"/>
      </g>
      <g className="mh-lantern-scroll"><g className="mh-lantern-sway mh-ambient" transform="translate(1306 588)">
        <path d="M-13-25q13-8 26 0l6 36q-19 10-38 0Z" fill="url(#mh-lamp)" stroke="var(--mh-plum)" strokeWidth="1.3"/>
        <path d="M-13-25q13 6 26 0M-19 11q19-6 38 0M-5-24-7 12m12-36 2 36M-6 20q-6 9 1 18m11-18q7 9 2 18" stroke="var(--mh-plum)" strokeWidth="1.2"/>
      </g></g>
      <g stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M1464 731q-31-172 26-334m-24 216 65-85m-70 34-37-76m55-27 62-53m-76 181-63-35m63 86 77-51" strokeWidth="11"/>
        <path d="M1600 293c-45-17-58-3-78 12-32-31-73-14-78 14-35-12-67 11-62 41-31 17-22 46-3 60-15 25-5 50 28 57 9 32 41 39 68 25 38 16 69-1 82-29 23 3 34-1 43-12Z" fill="var(--mh-sea)" strokeWidth="2"/>
        <path d="M1600 295c-45-17-58-3-78 12-32-31-73-14-78 14-35-12-67 11-62 41 47-11 71-4 96-25 26 8 51 0 68-15l54 5" fill="var(--mh-hydrangea)" stroke="none" opacity=".45"/>
        <path d="M1420 439c23 7 40 1 52-13m20 39c26 10 52-1 61-22m-140-64c20-12 35-7 44 0m43-42c21-8 37-3 46 8" opacity=".3"/>
        <path d="M1538 743q-5-109 45-169m-37 104 38-22m-24-8-19-30" strokeWidth="6"/>
        <path d="M1544 559c-21-19-50-10-49 13-31-7-44 22-29 40-14 26 5 50 35 45 18 22 49 19 66-3 18 4 27-3 33-11V531c-25-12-51 2-56 28Z" fill="var(--mh-plum)" strokeWidth="2"/>
      </g>
      <g className="mh-foreground-grass mh-ambient" stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M0 848q62 37 97 152M0 914q56-3 86 86M23 816q28 67 38 184m-49-39q76-78 109-82m-41 121q5-94 48-147m-14 147q36-74 99-99m-65 99q26-66 37-129m-8 129q54-42 101-42m-42 42q-6-61 25-112M0 813v187h250" fill="var(--mh-ink)"/>
        <path d="M21 823q-32-16-23-30 20-1 23 30Zm31 89q18-29 36-17-1 18-36 17Zm61-25q-27-25-16-40 20 3 16 40Zm32 88q24-27 43-15-6 19-43 15Zm50-29q-15-35 0-43 16 11 0 43Z" fill="var(--mh-ink)"/>
        <path d="M1315 1000q-34-99-11-163m31 163q8-70 56-114m-3 114q25-108 17-175m32 175q-8-67 39-128m-10 128q34-99 107-129m-23 129q-11-68 25-119m-263 119h300V862" fill="var(--mh-ink)"/>
      </g>
      <g fill="var(--mh-coral)"><circle cx="1305" cy="842" r="6"/><circle cx="1297" cy="835" r="5"/><circle cx="1312" cy="832" r="5"/><circle cx="1391" cy="885" r="6"/><circle cx="1398" cy="879" r="5"/><circle cx="1402" cy="890" r="5"/><circle cx="1480" cy="870" r="6"/><circle cx="1472" cy="865" r="5"/><circle cx="1483" cy="861" r="5"/><circle cx="264" cy="890" r="5"/><circle cx="258" cy="884" r="5"/><circle cx="271" cy="884" r="5"/></g>
      <g fill="var(--mh-apricot)"><circle cx="1306" cy="835" r="2"/><circle cx="1397" cy="885" r="2"/><circle cx="1479" cy="866" r="2"/><circle cx="264" cy="885" r="2"/></g>
      <g transform="translate(961 855) rotate(-13)" stroke="var(--mh-ink)" strokeWidth="2"><path d="M0 0h36v29H0Z" fill="var(--mh-cloud)"/><path d="M7 0q10-11 21 0M4 29l-3 32m30-32 3 32M-3 61h41" fill="none"/><path d="M7 10h22m-18 7h14" opacity=".55"/></g>
    </g>
  </svg>;
}
