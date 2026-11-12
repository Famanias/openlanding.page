'use client';

/**
 * MesaMarketLandscape.tsx
 * Reusable illustrated countryside background with entrance, ambient, wind and scroll motion.
 * No raster image, remote asset, Three.js, or GSAP dependency.
 * Requires React 18+ and ./MesaMarketLandscape.css.
 * Use behind interactive hero content; pointer events are deliberately NOT intercepted.
 */
import { useEffect, useId, useMemo, useRef } from "react";
import "./MesaMarketLandscape.css";

export type MesaMarketLandscapeProps = {
  className?: string;
  /** 0–2 multiplier for gentle parallax and cursor wind; default 1. */
  intensity?: number;
  /** Turn off live pointer/scroll parallax, leaving CSS ambient motion intact. */
  interactive?: boolean;
  /** Stops all ambient animation and JS motion. */
  paused?: boolean;
};

/**
 * Source-authored inline SVG, intentionally not an <img> or external artwork.
 * The only dynamic substitution is an internally generated unique ID prefix.
 * Do not interpolate user-provided HTML into this constant.
 */
const svgTemplate = String.raw`<svg class="mm-landscape-svg" viewBox="0 0 1376 768" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false">
<defs>
 <linearGradient id="__MM__-sky" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#FBF8ED"/><stop offset=".63" stop-color="#F9F1DF"/><stop offset="1" stop-color="#F4E5C6"/></linearGradient>
 <linearGradient id="__MM__-hill" x1="0" x2=".78" y1="0" y2="1"><stop stop-color="#ECE6D0" stop-opacity=".38"/><stop offset="1" stop-color="#DCD1AE" stop-opacity=".56"/></linearGradient>
 <linearGradient id="__MM__-mist" x1="0" x2="1" y1="0" y2="0"><stop stop-color="#FBF8ED" stop-opacity="1"/><stop offset=".56" stop-color="#FBF8ED" stop-opacity=".64"/><stop offset="1" stop-color="#FBF8ED" stop-opacity="0"/></linearGradient>
 <radialGradient id="__MM__-sun-glow"><stop stop-color="#F7DF9D" stop-opacity=".50"/><stop offset="1" stop-color="#F7DF9D" stop-opacity="0"/></radialGradient>
 <filter id="__MM__-paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".59" numOctaves="2" seed="17" stitchTiles="stitch"/></filter>
 <clipPath id="__MM__-scene-clip"><rect width="1376" height="768"/></clipPath>
</defs>
<rect x="0" y="0" width="1376" height="768" fill="url(#__MM__-sky)"/>
<g clip-path="url(#__MM__-scene-clip)">
<!-- FAR SKY: sun, hand-drawn clouds, bird silhouettes. -->
<g class="mm-depth" data-depth=".09">
 <circle cx="292" cy="96" r="133" fill="url(#__MM__-sun-glow)" class="mm-sun-glow"/>
 <circle cx="292" cy="96" r="47" fill="#F7E0AB" opacity=".72" class="mm-sun-disc"/>
 <g class="mm-cloud mm-cloud-a" stroke="#C0AF8F" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".72">
  <path d="M66 133 Q76 119 107 122 Q114 101 143 100 Q153 81 178 77 Q209 71 218 99 Q239 78 264 98 Q287 95 297 116 Q314 106 326 121 Q339 117 359 127"/><path d="M64 137 Q131 137 188 136 M194 137 Q258 134 349 134" stroke-opacity=".38"/>
 </g>
 <g class="mm-cloud mm-cloud-b" stroke="#C1AF91" stroke-width="1.05" fill="none" stroke-linecap="round" opacity=".65">
  <path d="M408 85 Q432 78 458 81 Q470 65 494 68 Q512 53 529 64 Q541 43 568 46 Q592 44 600 67 Q619 55 631 76 L658 80"/><path d="M409 89 Q506 93 655 84" stroke-opacity=".32"/>
 </g>
 <g class="mm-cloud mm-cloud-c" stroke="#C1AF91" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".62">
  <path d="M350 155 Q373 144 395 149 Q407 131 425 140 Q435 126 453 136 Q465 128 471 150 Q482 147 495 157"/><path d="M348 162 Q421 166 493 161" stroke-opacity=".3"/>
 </g>
 <g class="mm-birds" stroke="#8F8066" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".92">
   <g class="mm-bird mm-bird-a"><path d="M989 157q9 -13 17 -2 q9 -13 17 -6"/></g><g class="mm-bird mm-bird-b"><path d="M1067 133q7 -9 14 -1 q8 -11 17 -7"/></g>
   <g class="mm-bird mm-bird-c"><path d="M1112 104q7 -8 12 0 q7 -9 15 -7"/></g>
   <g class="mm-bird mm-bird-d"><path d="M1183 114q7 -8 12 -1 q6 -8 12 -7"/></g>
   <g class="mm-bird mm-bird-e"><path d="M1020 121q7 -8 12 -1 q6 -9 13 -7"/></g>
 </g>
</g>
<!-- DISTANCE: quiet rolling hills, orchard rows, and paper-soft landscape. -->
<g class="mm-depth" data-depth=".15">
 <path class="mm-hill mm-hill-far" d="M-40 253 C87 209 111 222 194 233 C285 236 376 259 459 258 C602 245 664 215 776 203 C882 187 979 225 1096 217 C1209 201 1258 167 1410 160 L1410 505 L-40 505Z" fill="#E8DDC2" fill-opacity=".45" stroke="#C2B295" stroke-opacity=".55" stroke-width="1.25"/>
 <path class="mm-hill" d="M-40 319 C91 287 141 280 242 301 C363 316 453 304 548 276 C672 246 770 254 864 255 C955 256 1035 259 1120 225 C1213 189 1304 167 1416 171 L1416 531 L-40 531 Z" fill="url(#__MM__-hill)"/>
 <path d="M-20 323 Q85 305 190 330 Q235 357 310 342 Q388 328 457 333" stroke="#E2D6B9" stroke-width="2" fill="none" opacity=".6"/>
 <path d="M417 287 Q510 262 582 266 Q651 249 720 250" stroke="#C6B79A" stroke-width="1.1" stroke-opacity=".40" fill="none"/>
 <path class="mm-hill" d="M-20 358 Q156 335 270 345 Q385 330 465 314 Q583 297 656 291 Q807 273 904 280 Q1030 279 1168 262 L1388 217 L1393 583 L-20 584Z" fill="#F0E7CF" fill-opacity=".50"/>
 <path d="M-10 358Q90 340 161 351 M360 351 Q458 341 549 356 M549 356 Q640 363 746 356" fill="none" stroke="#CFC09F" stroke-opacity=".39" stroke-width="1"/>
 <g class="mm-field-lines" fill="none" stroke="#B7A787" stroke-width="1.2" stroke-opacity=".52" stroke-linecap="round">
 <path d="M720 258 Q635 298 531 351"/><path d="M754 257 Q696 308 612 353"/><path d="M792 259 Q753 305 684 354"/><path d="M830 267 Q800 303 763 354"/><path d="M867 272 Q844 304 817 354"/><path d="M905 278 Q882 315 862 353"/><path d="M945 283 Q927 308 919 354"/>
 <path d="M1187 294 Q1205 310 1226 334 M1232 279 Q1254 294 1300 325 M1280 263 Q1324 287 1365 310"/>
 </g>
 <path d="M-20 357 Q200 364 355 358 M358 361 Q482 364 534 363" stroke="#FFF9EB" stroke-width="2.5" fill="none" opacity=".72"/>
</g>
<!-- DISTANT ORCHARD - generated rows, each tiny crown is a real vector tree. -->
<g class="mm-depth" data-depth=".24" opacity=".62">

<g transform="translate(600 330) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(634 323) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(668 316) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(702 309) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(736 302) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(770 295) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(804 288) scale(0.180)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(662 310) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(696 303) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(730 296) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(764 289) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(798 282) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(832 275) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(866 268) scale(0.198)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(724 290) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(758 283) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(792 276) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(826 269) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(860 262) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(894 255) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
<g transform="translate(928 248) scale(0.216)" class="mm-orchard-tree mm-tree"><g class="mm-tree-sway"><path d="M0 0 L0 -58" fill="none" stroke="#9C8F71" stroke-width="4"/><path d="M-29 -62 Q-43 -80 -28 -103 Q-17 -111 0 -104 Q27 -116 36 -96 Q44 -69 25 -61 Q7 -50 -12 -61 Z" fill="#D7C9AA" stroke="#AA9D81" stroke-width="2"/></g></g>
</g>
<g class="mm-depth" data-depth=".34">
 <path class="mm-hill" d="M-30 397 C191 362 334 372 530 358 C640 355 759 358 829 355 C965 334 1085 308 1179 302 C1284 285 1330 253 1407 252 L1414 790 L-30 790Z" fill="#F8F1E0" fill-opacity=".91"/>
 <path d="M742 368 Q935 360 1076 333 Q1180 317 1395 293" fill="none" stroke="#C8B999" stroke-opacity=".55" stroke-width="1.3"/>
 <g class="mm-field-lines" stroke="#A89778" stroke-opacity=".64" stroke-width="1.5" fill="none"><path d="M1118 318 Q1129 331 1142 346"/><path d="M1156 310 Q1176 325 1199 349"/><path d="M1201 302 Q1231 321 1264 353"/><path d="M1243 295 Q1287 324 1315 359"/><path d="M1287 287 Q1320 316 1355 357"/><path d="M1339 278 Q1360 313 1398 344"/></g>
 <g transform="translate(1125 247)"><g class="mm-farm-stand" stroke="#887760" stroke-linecap="round" stroke-linejoin="round">
   <path d="M-2 54V23 L49 3 L91 25V53" fill="#DAD0B7" stroke-width="2"/><path d="M-4 28L45 1L91 24" fill="none" stroke-width="3"/><path d="M3 24L8 39L17 37L22 16 M25 12L27 36L39 33L44 3 M49 5L50 34L64 37L68 11 M74 17L75 40L87 38L90 26" fill="#F7EED9" stroke-width="1.6"/><path d="M4 39H90 M10 39V55 M81 38V55" fill="none" stroke-width="2.8"/><path d="M30 41L32 53 M67 42V53" stroke-width="1.2"/>
 </g></g>
 <g stroke="#8D8667" stroke-width="1.3" fill="#B8B89A" opacity=".76"><path d="M1308 301q-10 -19 11 -31q17 -29 40 -5q17 -11 29 10q14 -5 20 13v28h-100Z"/></g>
</g>
<g class="mm-depth" data-depth=".52">
<g transform="translate(824 455) scale(0.82)" class="mm-tree" style="--mm-delay:-0.0s;--mm-duration:5.0s"><g class="mm-wind-group" data-wind="0.60"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#D6D5A9" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#A9A87C" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#A9A87C" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
<g transform="translate(899 405) scale(0.8)" class="mm-tree" style="--mm-delay:-2.2s;--mm-duration:6.8s"><g class="mm-wind-group" data-wind="0.94"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#D2C99D" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#9DA679" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#9DA679" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
<g transform="translate(976 466) scale(0.77)" class="mm-tree" style="--mm-delay:-1.1s;--mm-duration:5.9s"><g class="mm-wind-group" data-wind="0.77"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#C8CAA0" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#9B9F72" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#9B9F72" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
<g transform="translate(1261 405) scale(0.94)" class="mm-tree" style="--mm-delay:-3.3s;--mm-duration:5.0s"><g class="mm-wind-group" data-wind="0.60"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#C0C99E" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#9B9770" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#9B9770" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
<g transform="translate(1332 412) scale(1.09)" class="mm-tree" style="--mm-delay:-0.0s;--mm-duration:5.0s"><g class="mm-wind-group" data-wind="0.60"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#D6D5A9" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#A9A87C" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#A9A87C" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
<g transform="translate(1409 422) scale(0.95)" class="mm-tree" style="--mm-delay:-2.2s;--mm-duration:6.8s"><g class="mm-wind-group" data-wind="0.94"><g class="mm-tree-sway">
        <path d="M0 0 Q-7 -34 3 -75 Q14 -99 10 -118 M2 -49 Q-29 -73 -35 -88 M7 -72 Q27 -91 39 -97 M-4 -25 Q-17 -44 -22 -55" stroke="#7D674D" stroke-width="4.3" fill="none" stroke-linecap="round"/>
        <path d="M-5 -125 C-29 -142 -54 -130 -56 -110 C-82 -103 -78 -80 -56 -72 C-63 -45 -30 -44 -20 -55 C-4 -37 20 -44 26 -54 C52 -51 66 -76 51 -92 C65 -114 38 -135 17 -127 C7 -145 -11 -144 -5 -125 Z" fill="#D2C99D" stroke="#7D674D" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M-57 -102 Q-46 -115 -38 -106 M-23 -126 Q-12 -134 -3 -126 M19 -125 Q36 -124 38 -111 M47 -92 Q57 -81 47 -71 M-35 -65 Q-29 -58 -21 -63 M4 -60 Q12 -55 20 -67" stroke="#9DA679" stroke-width="1.9" fill="none" stroke-linecap="round"/>
        <path d="M-22 -115l3 -4 M-44 -92l4 1 M16 -109l-3 4 M27 -72l-5 -3 M-2 -83l3 -5 M-29 -78l-5 1" stroke="#9DA679" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-36" cy="-103" r="4" fill="#C87E5A" stroke="#7D674D" stroke-width="1"/><circle cx="18" cy="-91" r="4.2" fill="#C47655" stroke="#7D674D" stroke-width="1"/><circle cx="-8" cy="-74" r="3.3" fill="#CB8A64" stroke="#7D674D" stroke-width=".8"/><circle cx="29" cy="-111" r="3" fill="#BC6B50" stroke="#7D674D" stroke-width=".7"/>
        <path d="M-61 1 Q-9 -9 50 0" fill="none" stroke="#B3A17C" stroke-width="2" stroke-opacity=".55"/>
    </g></g></g>
</g>
<g class="mm-depth" data-depth=".57" fill="#857C5C" opacity=".70">
<ellipse cx="1266.0" cy="639.3" rx="2.2" ry="3.3" transform="rotate(0 1266.0 639.3)"/>
<ellipse cx="995.8" cy="433.5" rx="1.3" ry="0.9" transform="rotate(9 995.8 433.5)"/>
<ellipse cx="844.1" cy="606.8" rx="1.2" ry="0.8" transform="rotate(18 844.1 606.8)"/>
<ellipse cx="813.2" cy="420.5" rx="2.0" ry="3.0" transform="rotate(27 813.2 420.5)"/>
<ellipse cx="997.7" cy="601.9" rx="2.1" ry="1.4" transform="rotate(36 997.7 601.9)"/>
<ellipse cx="1329.1" cy="464.9" rx="2.1" ry="1.4" transform="rotate(45 1329.1 464.9)"/>
<ellipse cx="1158.3" cy="615.2" rx="1.7" ry="2.5" transform="rotate(54 1158.3 615.2)"/>
<ellipse cx="1161.5" cy="568.5" rx="1.1" ry="0.7" transform="rotate(63 1161.5 568.5)"/>
<ellipse cx="742.0" cy="557.9" rx="2.0" ry="1.4" transform="rotate(0 742.0 557.9)"/>
<ellipse cx="1386.5" cy="494.0" rx="1.3" ry="2.0" transform="rotate(9 1386.5 494.0)"/>
<ellipse cx="1154.7" cy="534.4" rx="1.9" ry="1.3" transform="rotate(18 1154.7 534.4)"/>
<ellipse cx="1106.6" cy="398.1" rx="1.8" ry="1.2" transform="rotate(27 1106.6 398.1)"/>
<ellipse cx="1293.8" cy="623.3" rx="2.0" ry="3.0" transform="rotate(36 1293.8 623.3)"/>
<ellipse cx="883.8" cy="492.3" rx="0.9" ry="0.6" transform="rotate(45 883.8 492.3)"/>
<ellipse cx="843.9" cy="613.2" rx="1.5" ry="1.0" transform="rotate(54 843.9 613.2)"/>
<ellipse cx="1288.1" cy="584.9" rx="2.1" ry="3.1" transform="rotate(63 1288.1 584.9)"/>
<ellipse cx="1325.7" cy="426.1" rx="0.9" ry="0.6" transform="rotate(0 1325.7 426.1)"/>
<ellipse cx="1377.0" cy="549.6" rx="1.6" ry="1.1" transform="rotate(9 1377.0 549.6)"/>
<ellipse cx="962.9" cy="563.0" rx="1.5" ry="2.2" transform="rotate(18 962.9 563.0)"/>
<ellipse cx="768.8" cy="592.5" rx="0.8" ry="0.5" transform="rotate(27 768.8 592.5)"/>
<ellipse cx="1062.4" cy="386.9" rx="2.2" ry="1.5" transform="rotate(36 1062.4 386.9)"/>
<ellipse cx="1069.0" cy="577.1" rx="1.8" ry="2.7" transform="rotate(45 1069.0 577.1)"/>
<ellipse cx="1196.6" cy="520.0" rx="1.8" ry="1.2" transform="rotate(54 1196.6 520.0)"/>
<ellipse cx="1367.9" cy="530.2" rx="0.7" ry="1.1" transform="rotate(0 1367.9 530.2)"/>
<ellipse cx="1243.5" cy="508.1" rx="1.3" ry="0.9" transform="rotate(9 1243.5 508.1)"/>
<ellipse cx="797.0" cy="515.1" rx="2.2" ry="1.5" transform="rotate(18 797.0 515.1)"/>
<ellipse cx="1223.9" cy="516.0" rx="2.2" ry="3.2" transform="rotate(27 1223.9 516.0)"/>
<ellipse cx="980.8" cy="461.7" rx="1.7" ry="1.2" transform="rotate(36 980.8 461.7)"/>
<ellipse cx="1291.5" cy="600.5" rx="1.6" ry="1.1" transform="rotate(45 1291.5 600.5)"/>
<ellipse cx="838.0" cy="456.5" rx="1.8" ry="2.6" transform="rotate(54 838.0 456.5)"/>
<ellipse cx="1003.8" cy="490.8" rx="1.6" ry="1.1" transform="rotate(0 1003.8 490.8)"/>
<ellipse cx="852.1" cy="499.7" rx="1.7" ry="2.5" transform="rotate(9 852.1 499.7)"/>
<ellipse cx="912.7" cy="552.9" rx="1.6" ry="1.1" transform="rotate(18 912.7 552.9)"/>
<ellipse cx="855.4" cy="444.8" rx="1.6" ry="1.1" transform="rotate(27 855.4 444.8)"/>
<ellipse cx="971.1" cy="489.3" rx="1.9" ry="2.9" transform="rotate(36 971.1 489.3)"/>
<ellipse cx="1114.0" cy="557.0" rx="0.8" ry="0.6" transform="rotate(45 1114.0 557.0)"/>
<ellipse cx="1011.1" cy="385.5" rx="2.2" ry="1.5" transform="rotate(54 1011.1 385.5)"/>
<ellipse cx="902.4" cy="588.8" rx="1.7" ry="2.6" transform="rotate(63 902.4 588.8)"/>
<ellipse cx="1227.9" cy="448.1" rx="1.1" ry="0.8" transform="rotate(0 1227.9 448.1)"/>
<ellipse cx="1151.5" cy="517.2" rx="2.0" ry="1.4" transform="rotate(9 1151.5 517.2)"/>
<ellipse cx="991.8" cy="463.6" rx="1.1" ry="1.6" transform="rotate(18 991.8 463.6)"/>
<ellipse cx="734.3" cy="547.8" rx="1.6" ry="1.1" transform="rotate(27 734.3 547.8)"/>
<ellipse cx="968.2" cy="547.7" rx="0.8" ry="0.5" transform="rotate(36 968.2 547.7)"/>
<ellipse cx="904.1" cy="622.7" rx="1.6" ry="2.4" transform="rotate(45 904.1 622.7)"/>
<ellipse cx="1267.5" cy="491.3" rx="1.1" ry="0.7" transform="rotate(54 1267.5 491.3)"/>
<ellipse cx="1334.4" cy="529.2" rx="1.4" ry="1.0" transform="rotate(63 1334.4 529.2)"/>
<ellipse cx="1111.8" cy="625.7" rx="1.8" ry="2.7" transform="rotate(0 1111.8 625.7)"/>
<ellipse cx="1351.8" cy="482.1" rx="1.1" ry="0.7" transform="rotate(9 1351.8 482.1)"/>
<ellipse cx="1267.1" cy="623.6" rx="0.7" ry="0.5" transform="rotate(18 1267.1 623.6)"/>
<ellipse cx="1245.7" cy="534.1" rx="0.8" ry="1.2" transform="rotate(27 1245.7 534.1)"/>
<ellipse cx="1222.8" cy="437.2" rx="2.0" ry="1.4" transform="rotate(36 1222.8 437.2)"/>
<ellipse cx="1159.7" cy="632.6" rx="0.9" ry="0.6" transform="rotate(45 1159.7 632.6)"/>
<ellipse cx="872.4" cy="404.9" rx="2.0" ry="3.1" transform="rotate(54 872.4 404.9)"/>
<ellipse cx="975.2" cy="557.4" rx="1.1" ry="0.8" transform="rotate(63 975.2 557.4)"/>
<ellipse cx="1068.3" cy="558.1" rx="1.3" ry="0.9" transform="rotate(0 1068.3 558.1)"/>
<ellipse cx="864.7" cy="568.0" rx="1.2" ry="1.8" transform="rotate(9 864.7 568.0)"/>
<ellipse cx="956.4" cy="522.9" rx="1.1" ry="0.7" transform="rotate(18 956.4 522.9)"/>
<ellipse cx="838.2" cy="572.7" rx="2.1" ry="1.4" transform="rotate(27 838.2 572.7)"/>
<ellipse cx="1170.4" cy="584.2" rx="0.9" ry="1.3" transform="rotate(36 1170.4 584.2)"/>
<ellipse cx="1323.5" cy="478.5" rx="1.0" ry="0.7" transform="rotate(45 1323.5 478.5)"/>
<ellipse cx="812.9" cy="433.0" rx="1.1" ry="0.8" transform="rotate(54 812.9 433.0)"/>
<ellipse cx="1081.7" cy="582.4" rx="1.9" ry="2.8" transform="rotate(63 1081.7 582.4)"/>
<ellipse cx="1032.6" cy="397.7" rx="1.3" ry="0.9" transform="rotate(0 1032.6 397.7)"/>
<ellipse cx="1121.6" cy="546.0" rx="1.7" ry="1.1" transform="rotate(9 1121.6 546.0)"/>
<ellipse cx="1052.7" cy="426.6" rx="1.3" ry="2.0" transform="rotate(18 1052.7 426.6)"/>
<ellipse cx="1024.1" cy="620.7" rx="2.2" ry="1.5" transform="rotate(27 1024.1 620.7)"/>
<ellipse cx="983.9" cy="393.9" rx="1.7" ry="1.2" transform="rotate(36 983.9 393.9)"/>
<ellipse cx="971.5" cy="623.3" rx="2.1" ry="3.1" transform="rotate(45 971.5 623.3)"/>
<ellipse cx="944.5" cy="430.5" rx="2.1" ry="1.4" transform="rotate(54 944.5 430.5)"/>
<ellipse cx="976.3" cy="443.8" rx="0.9" ry="0.6" transform="rotate(63 976.3 443.8)"/>
<ellipse cx="1013.7" cy="449.4" rx="1.2" ry="1.9" transform="rotate(0 1013.7 449.4)"/>
<ellipse cx="806.3" cy="641.7" rx="1.3" ry="0.9" transform="rotate(18 806.3 641.7)"/>
<ellipse cx="1325.6" cy="612.4" rx="0.8" ry="1.3" transform="rotate(27 1325.6 612.4)"/>
<ellipse cx="1096.4" cy="415.4" rx="1.4" ry="0.9" transform="rotate(36 1096.4 415.4)"/>
<ellipse cx="807.1" cy="542.2" rx="0.7" ry="0.5" transform="rotate(45 807.1 542.2)"/>
<ellipse cx="869.8" cy="409.2" rx="1.2" ry="1.9" transform="rotate(54 869.8 409.2)"/>
<ellipse cx="796.3" cy="494.5" rx="2.0" ry="1.3" transform="rotate(63 796.3 494.5)"/>
<ellipse cx="861.3" cy="628.8" rx="1.8" ry="1.2" transform="rotate(0 861.3 628.8)"/>
<ellipse cx="852.0" cy="551.3" rx="1.1" ry="1.6" transform="rotate(9 852.0 551.3)"/>
<ellipse cx="1378.1" cy="423.5" rx="2.0" ry="1.4" transform="rotate(18 1378.1 423.5)"/>
<ellipse cx="1306.2" cy="416.1" rx="1.5" ry="1.0" transform="rotate(27 1306.2 416.1)"/>
<ellipse cx="1137.7" cy="502.2" rx="2.2" ry="3.3" transform="rotate(36 1137.7 502.2)"/>
</g>
<g class="mm-depth" data-depth=".69">
 <path d="M-30 558 Q160 530 335 561 Q505 587 664 581 Q775 560 860 571 Q955 560 1105 532 Q1224 511 1389 488 L1398 791 L-30 790Z" fill="#F6EAD1" fill-opacity=".59"/>
 <path d="M-20 600 Q190 586 318 622 Q460 655 591 650 Q765 636 850 621 L853 800 L-20 800Z" fill="#F0E0BC" fill-opacity=".46"/>
 <!-- Winding road: the soft geometry and ink outline use the same geometry. -->
 <path class="mm-road" d="M1379 477 C1288 482 1180 519 1160 568 C1149 612 1170 646 1103 685 C1041 720 958 741 887 792 L1379 795Z" fill="#EBDAB6" fill-opacity=".78" stroke="#BBAB88" stroke-opacity=".65" stroke-width="1.2"/>
 <path d="M1377 491 Q1201 516 1177 582 Q1151 636 1109 663 Q1042 710 926 771" fill="none" stroke="#988D76" stroke-opacity=".7" stroke-width="1.5" stroke-dasharray="11 15"/>
 <path d="M1383 535 Q1245 556 1224 617 Q1194 676 1137 716" fill="none" stroke="#B1A082" stroke-opacity=".35" stroke-width="1"/>
</g>
<g class="mm-depth mm-fence" data-depth=".81">
 <path d="M796 725 C869 706 942 685 1018 663 C1116 633 1142 563 1208 540 C1252 523 1314 499 1383 485" fill="none" stroke="#72563C" stroke-width="6" stroke-linecap="round"/>
 <path class="mm-fence-line" d="M796 725 C869 706 942 685 1018 663 C1116 633 1142 563 1208 540 C1252 523 1314 499 1383 485" fill="none" stroke="#C6A886" stroke-width="3" stroke-linecap="round"/>
 <path d="M801 756 C876 738 951 713 1028 689 C1127 658 1151 593 1219 570 C1262 551 1324 531 1392 513" fill="none" stroke="#765A40" stroke-width="5" stroke-linecap="round"/>
 <path class="mm-fence-line" d="M801 756 C876 738 951 713 1028 689 C1127 658 1151 593 1219 570 C1262 551 1324 531 1392 513" fill="none" stroke="#C5AA87" stroke-width="2.5" stroke-linecap="round"/>

<g class="mm-fence-post" style="--mm-delay:0.00s" transform="translate(810 739) rotate(-6)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.10s" transform="translate(904 715) rotate(-5)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.20s" transform="translate(1000 689) rotate(-3)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.30s" transform="translate(1092 644) rotate(6)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.40s" transform="translate(1139 587) rotate(9)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.50s" transform="translate(1196 551) rotate(5)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.60s" transform="translate(1266 532) rotate(0)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.70s" transform="translate(1331 511) rotate(-4)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
<g class="mm-fence-post" style="--mm-delay:0.80s" transform="translate(1392 497) rotate(-6)"><path d="M-5 -38L4 -42 L7 34L-4 37Z" fill="#9E7654" stroke="#5C4736" stroke-width="1.5"/><path d="M-3 -35 L1 -37 L4 33 L-2 34Z" fill="#CCAB84" opacity=".65"/></g>
</g>
<g class="mm-depth" data-depth=".76">
<g transform="translate(775 448) scale(0.85)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1030 551) scale(0.72)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#898267" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1049 545) scale(0.63)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#6F7563" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1093 560) scale(0.75)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#898267" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1184 386) scale(0.64)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1150 390) scale(0.6)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#6F7563" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1018 539) scale(0.7)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1290 610) scale(0.65)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#898267" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(716 377) scale(0.58)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(751 396) scale(0.54)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#6F7563" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1076 377) scale(0.67)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#898267" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1187 576) scale(0.56)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(872 516) scale(0.45)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1023 489) scale(0.35)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#6F7563" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(906 604) scale(0.55)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#77745A" stroke-width="1.65" stroke-linecap="round"/></g>
<g transform="translate(1282 580) scale(0.6)" class="mm-tuft mm-wind-group" data-wind="1.3"><path d="M0 0q-7 -7 -10 -18 M0 0q-2 -12 0 -23 M0 0q10 -11 11 -18 M0 0q7 -2 13 -4" fill="none" stroke="#898267" stroke-width="1.65" stroke-linecap="round"/></g>
</g>
<g class="mm-depth" data-depth=".82">
<path d="M967.0 536.0q-2.1 -12.6 9.5 -13.7q5.2 -14.7 14.7 -8.4q12.6 -16.8 23.1 -3.2q21.0 -3.2 22.1 13.7Z" fill="#B8B38C" stroke="#817A57" stroke-width="1.2"/>
<path d="M1027.6 561.0q-1.6 -9.8 7.4 -10.7q4.1 -11.5 11.5 -6.6q9.8 -13.1 18.0 -2.5q16.4 -2.5 17.2 10.7Z" fill="#B8B38C" stroke="#817A57" stroke-width="1.2"/>
<path d="M1265.0 625.0q-1.3 -7.8 5.9 -8.5q3.2 -9.1 9.1 -5.2q7.8 -10.4 14.3 -2.0q13.0 -2.0 13.7 8.5Z" fill="#B8B38C" stroke="#817A57" stroke-width="1.2"/>
<g fill="none" stroke="#6E664C" stroke-width="1.5" stroke-linecap="round">
<path d="M810 493 q-6 -7 -6 -15 M810 493 q2 -9 8 -13"/>
<path d="M942 466 q-6 -7 -6 -15 M942 466 q2 -9 8 -13"/>
<path d="M1037 474 q-6 -7 -6 -15 M1037 474 q2 -9 8 -13"/>
<path d="M1087 469 q-6 -7 -6 -15 M1087 469 q2 -9 8 -13"/>
<path d="M1128 459 q-6 -7 -6 -15 M1128 459 q2 -9 8 -13"/>
<path d="M1311 548 q-6 -7 -6 -15 M1311 548 q2 -9 8 -13"/>
</g></g>
<g class="mm-depth" data-depth="1">
<g transform="translate(3 813) rotate(-18) scale(1.4)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#9E9F6D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#9E9F6D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#9E9F6D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#9E9F6D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#9E9F6D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#9E9F6D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#9E9F6D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#9E9F6D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#9E9F6D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#9E9F6D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(39 800) rotate(22) scale(0.85)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -89" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#D09D80" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#D09D80" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#D09D80" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#D09D80" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#D09D80" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#D09D80" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#D09D80" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#D09D80" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(111 814) rotate(-8) scale(0.6)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#C78565" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#C78565" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#C78565" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#C78565" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#C78565" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#C78565" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#C78565" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#C78565" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#C78565" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#C78565" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(505 826) rotate(-3) scale(1.08)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#8F9A6F" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#8F9A6F" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#8F9A6F" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#8F9A6F" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#8F9A6F" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#8F9A6F" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#8F9A6F" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#8F9A6F" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#8F9A6F" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#8F9A6F" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(594 828) rotate(15) scale(1.4)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -121" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -85 Q-19 -95 -13 -107 Q3 -111 0 -85 Z" fill="#A7AA77" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -92 Q18 -100 14 -115 Q-4 -109 0 -92 Z" fill="#A7AA77" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(685 833) rotate(-18) scale(0.95)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#798A5E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#798A5E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#798A5E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#798A5E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#798A5E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#798A5E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#798A5E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#798A5E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#798A5E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#798A5E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(802 850) rotate(-21) scale(1.75)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#8B956D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#8B956D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#8B956D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#8B956D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#8B956D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#8B956D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#8B956D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#8B956D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#8B956D" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#8B956D" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(1256 850) rotate(-10) scale(1.15)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#A6A779" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#A6A779" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#A6A779" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#A6A779" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#A6A779" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#A6A779" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#A6A779" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#A6A779" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#A6A779" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#A6A779" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(1313 852) rotate(12) scale(1.35)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -121" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -85 Q-19 -95 -13 -107 Q3 -111 0 -85 Z" fill="#BE9A4E" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -92 Q18 -100 14 -115 Q-4 -109 0 -92 Z" fill="#BE9A4E" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(1377 813) rotate(8) scale(1.72)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -121" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -85 Q-19 -95 -13 -107 Q3 -111 0 -85 Z" fill="#7E8A68" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -92 Q18 -100 14 -115 Q-4 -109 0 -92 Z" fill="#7E8A68" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(1367 276) rotate(-20) scale(1.1)" class="mm-sprig"><g class="mm-wind-group" data-wind="1"><g class="mm-grass-sway"><path d="M0 2 Q-5 -51 0 -105" fill="none" stroke="#716D4D" stroke-width="2"/><path d="M0 -5 Q-17 -15 -11 -27 Q3 -31 0 -5 Z" fill="#93865C" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -12 Q16 -20 12 -35 Q-4 -29 0 -12 Z" fill="#93865C" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -21 Q-19 -31 -13 -43 Q3 -47 0 -21 Z" fill="#93865C" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -28 Q18 -36 14 -51 Q-4 -45 0 -28 Z" fill="#93865C" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -37 Q-17 -47 -11 -59 Q3 -63 0 -37 Z" fill="#93865C" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -44 Q16 -52 12 -67 Q-4 -61 0 -44 Z" fill="#93865C" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -53 Q-19 -63 -13 -75 Q3 -79 0 -53 Z" fill="#93865C" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -60 Q18 -68 14 -83 Q-4 -77 0 -60 Z" fill="#93865C" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -69 Q-17 -79 -11 -91 Q3 -95 0 -69 Z" fill="#93865C" fill-opacity=".64" stroke="#6A674A" stroke-width="1.6"/><path d="M0 -76 Q16 -84 12 -99 Q-4 -93 0 -76 Z" fill="#93865C" fill-opacity=".55" stroke="#6A674A" stroke-width="1.6"/></g></g></g>
<g transform="translate(1293 666)" class="mm-grass-sway"><path d="M0 0Q-3 -22 4 -39" fill="none" stroke="#7F8063" stroke-width="1.8"/><path d="M4 -38Q-8 -50 -11 -38 Q-9 -25 4 -31 Q14 -46 19 -38 Q19 -26 5 -29Z" fill="#C78564" stroke="#966B50" stroke-width="1.1"/></g>
<g transform="translate(1338 704)" class="mm-grass-sway"><path d="M0 0Q-3 -22 4 -39" fill="none" stroke="#7F8063" stroke-width="1.8"/><path d="M4 -38Q-8 -50 -11 -38 Q-9 -25 4 -31 Q14 -46 19 -38 Q19 -26 5 -29Z" fill="#C78564" stroke="#966B50" stroke-width="1.1"/></g>
<g transform="translate(1198 729)" class="mm-grass-sway"><path d="M0 0Q-3 -22 4 -39" fill="none" stroke="#7F8063" stroke-width="1.8"/><path d="M4 -38Q-8 -50 -11 -38 Q-9 -25 4 -31 Q14 -46 19 -38 Q19 -26 5 -29Z" fill="#C78564" stroke="#966B50" stroke-width="1.1"/></g>
</g>
<rect x="0" y="0" width="1376" height="768" fill="#A08F6C" filter="url(#__MM__-paper)" opacity=".045" class="mm-paper-grain" pointer-events="none"/>
<rect x="0" y="0" width="1376" height="768" fill="url(#__MM__-mist)" opacity=".48" pointer-events="none"/>
</g></svg>`;

const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));

export default function MesaMarketLandscape({
  className = "",
  intensity = 1,
  interactive = true,
  paused = false,
}: MesaMarketLandscapeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const svgMarkup = useMemo(() => svgTemplate.replaceAll("__MM__", `mm${uid}`), [uid]);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const layers = Array.from(root.querySelectorAll<SVGGElement>(".mm-depth"));
    const windGroups = Array.from(root.querySelectorAll<SVGGElement>(".mm-wind-group"));

    let active = true;
    let raf = 0;
    let lastFrame = 0;
    let prevPointerTs = 0;
    let prevPointerX = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let windTarget = 0;
    let windCurrent = 0;
    let scrollY = 0;

    const canMove = () => interactive && !paused && !reducedMotion.matches;
    const updateScroll = () => {
      const rect = host.getBoundingClientRect();
      scrollY = clamp(-rect.top / Math.max(1, rect.height), 0, 1);
    };
    const onPointerMove = (ev: PointerEvent) => {
      if (!canMove() || !finePointer.matches) return;
      const rect = host.getBoundingClientRect();
      targetX = clamp(((ev.clientX - rect.left) / rect.width - .5) * 2, -1, 1);
      targetY = clamp(((ev.clientY - rect.top) / rect.height - .5) * 2, -1, 1);
      const elapsed = Math.max(16, ev.timeStamp - prevPointerTs);
      const speedX = prevPointerTs > 0 ? (ev.clientX - prevPointerX) / elapsed : 0;
      windTarget = clamp(speedX * 8, -5, 5);
      prevPointerTs = ev.timeStamp;
      prevPointerX = ev.clientX;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      windTarget = 0;
      prevPointerTs = 0;
    };

    const tick = (now: number) => {
      if (!active || !canMove()) return;
      const dt = Math.min(64, now - (lastFrame || now));
      lastFrame = now;
      const easePointer = 1 - Math.exp(-dt / 190);
      const easeWind = 1 - Math.exp(-dt / 280);
      currentX += (targetX - currentX) * easePointer;
      currentY += (targetY - currentY) * easePointer;
      // Wind continues briefly after a fast cursor movement, then settles.
      windTarget *= Math.exp(-dt / 700);
      windCurrent += (windTarget - windCurrent) * easeWind;
      const power = clamp(intensity, 0, 2);

      for (const el of layers) {
        const depth = Number(el.dataset.depth || 0);
        const dx = currentX * 16 * depth * power;
        const dy = currentY * 11 * depth * power - scrollY * 13 * depth * power;
        el.style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0)`;
      }
      for (const el of windGroups) {
        const weight = Number(el.dataset.wind || 1);
        el.style.transform = `rotate(${(windCurrent * weight * power).toFixed(2)}deg)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (!active || !canMove()) return;
      window.cancelAnimationFrame(raf);
      lastFrame = 0;
      raf = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
    };
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0]?.isIntersecting ?? false;
      root.dataset.visible = String(isVisible);
      if (isVisible) { active = true; start(); }
      else { active = false; stop(); }
    }, { threshold: 0.01 });

    root.dataset.visible = "true";
    updateScroll();
    observer.observe(root);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    const onMotionChange = () => {
      stop();
      if (!reducedMotion.matches && active) start();
    };
    reducedMotion.addEventListener("change", onMotionChange);
    if (canMove()) start();
    return () => {
      active = false;
      observer.disconnect();
      stop();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [intensity, interactive, paused]);

  return (
    <div
      ref={rootRef}
      className={`mm-landscape ${className}`.trim()}
      aria-hidden="true"
      data-paused={paused ? "true" : "false"}
      // Safe: this is a fixed, code-authored SVG. No user or external content is inserted.
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
