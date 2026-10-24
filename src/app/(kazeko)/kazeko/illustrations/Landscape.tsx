import { useId } from "react";

/** Original vector artwork. Matching line/colour geometry makes the process wipe exact. */
export function Landscape({ sketch = false, variant = "village", className = "" }: { sketch?: boolean; variant?: "village" | "river" | "flowers"; className?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`kz-landscape ${className}`} viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" fill="none" role="img" aria-label={sketch ? "Pencil drawing of a quiet Japanese countryside" : "Original illustration of rolling hills, wildflowers and a small countryside house"} data-sketch={sketch}>
    <defs>
      <pattern id={`${id}-field`} width="26" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-13)"><path d="M0 23h26" stroke="var(--color-ink)" strokeOpacity=".10" strokeWidth="1" /></pattern>
      <pattern id={`${id}-grain`} width="37" height="43" patternUnits="userSpaceOnUse"><circle cx="4" cy="6" r=".7" fill="var(--color-ink)" opacity=".12" /><circle cx="22" cy="27" r=".7" fill="var(--color-ink)" opacity=".1" /><path d="m30 10 3 1M10 35l2 1" stroke="var(--color-paper)" strokeOpacity=".35" /></pattern>
      <g id={`${id}-tree`}><path d="M0 20v69m0-38-18-13m18 24 20-16" stroke="var(--color-ink)" strokeWidth="3" /><path d="M-34 30C-48 5-24-11-8-7 3-34 31-15 27 0 55 2 51 36 28 39 8 54-20 47-34 30Z" fill="var(--color-meadow)" /><path d="M-19 17q15 10 35-1" stroke="var(--color-ink)" strokeOpacity=".25" /></g>
      <g id={`${id}-flower`}><path d="M0 1q10 28 2 62m0-18q-16-20-18-8m20-6q10-16 18-12" stroke="var(--color-ink)" strokeWidth="2" /><path d="M-1 0C-23-24-26 9-8 8c-15 22 15 29 14 9 20 15 29-14 9-14C25-17-4-22-1 0" fill="var(--color-butter)" /><circle cx="3" cy="8" r="5" fill="var(--color-clay)" /></g>
    </defs>
    <g className="kz-scene-paint" stroke={sketch ? "var(--color-ink)" : "none"} strokeWidth={sketch ? 1.2 : undefined}>
      <path d="M0 0h1440v640H0Z" fill="var(--color-sky)" />
      <circle cx="1100" cy="119" r="49" fill="var(--color-butter)" />
      <g className="kz-clouds" fill="var(--color-paper)"><path d="M118 107c27-17 42-12 50-6 13-29 54-34 73-7 18-11 37-1 41 12 17-3 29 4 29 13H112c-8-4-6-10 6-12Z" /><path d="M899 68c21-10 31-4 37 2 11-21 35-25 51-4 14-4 27 3 27 11H894Z" /><path d="M1220 180c15-16 32-16 42-3 10-34 49-35 66-6 20-11 43 0 46 13h-161Z" /></g>
      <path d="M-30 312C77 271 145 296 251 239S410 201 518 242s137-88 255-60 131 83 238 48 156-46 255-10 123 26 210 4v416H-30Z" fill="color-mix(in srgb,var(--color-meadow) 36%,var(--color-sky))" />
      <path d="M-30 374c180-80 251-36 364-91s203-13 299 31 180-61 295-41 226 102 550-6v373H-30Z" fill="var(--color-leaf)" />
      <path d="M-30 442C122 341 298 382 419 348s165-9 283 30 254-12 346-47 279-15 430 62v247H-30Z" fill="var(--color-meadow)" />
      <path d="M-30 442C122 341 298 382 419 348s165-9 283 30 254-12 346-47 279-15 430 62v247H-30Z" fill={`url(#${id}-field)`} />
      <path d="M-30 520c158-20 226-106 350-70s146 49 272 11 238-52 397-16 282 15 489-1v196H-30Z" fill="var(--color-leaf)" />
      <path d="M699 355c-59 22-71 55-38 81s-18 49-99 62c-89 14-94 73-59 142h120c-109-76-52-98 14-115 85-22 115-64 70-94s-37-49 20-75Z" fill={variant === "river" ? "var(--color-sky)" : "var(--color-paper)"} opacity=".88" />
      <g transform="translate(941 252)"><path d="M-9 51 69 4l81 50-10 12H-7Z" fill="var(--color-clay)" /><path d="M7 56h122v76H7Z" fill="var(--color-paper)" /><path d="m69 13 73 48-13 5V57L69 21 7 59v-3Z" fill="var(--color-ink)" opacity=".22" /><path d="M82 87h23v45H82Z" fill="var(--color-ink)" /><path d="M24 79h34v29H24Z" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2" /><path d="M41 79v29m-17-15h34" stroke="var(--color-ink)" strokeWidth="2" /><path d="M16 120h55m39-42h9" stroke="var(--color-meadow)" /><path d="M107 13V-9h12v30" fill="var(--color-ink)" /></g>
      <use href={`#${id}-tree`} transform="translate(1138 275) scale(1.13)" /><use href={`#${id}-tree`} transform="translate(1184 308) scale(.8)" />
      <g stroke="var(--color-paper)" strokeWidth="2" opacity=".45"><path d="M53 449q81-18 157-55m-122 67q81-18 157-55m-110 66q81-18 157-55m-110 66q81-18 157-55" /><path d="m1193 421 171 28m-174-10 171 28m-176-9 171 28" /></g>
      <path d="M-30 581c160-70 218-26 354-8s237-12 378-12 167 45 302 11 294-5 474 40v28H-30Z" fill="color-mix(in srgb,var(--color-meadow) 83%,var(--color-ink))" />
      <g className="kz-grasses" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" opacity=".8"><path d="M73 640q27-68 16-111m-13 92q-22-38-45-42m52 18q26-34 49-30M1290 640q-21-67-10-113m9 83q26-31 49-33m-48 47q-13-34-41-43M1381 640q15-53 6-84" /><use href={`#${id}-flower`} transform="translate(194 518) rotate(-8)" /><use href={`#${id}-flower`} transform="translate(230 553) scale(.75)" /><use href={`#${id}-flower`} transform="translate(1237 531) rotate(10)" /><use href={`#${id}-flower`} transform="translate(1199 567) scale(.6)" /></g>
      {variant === "river" && <g stroke="var(--color-ink)" strokeWidth="3"><path d="m478 515 208 3m-200-8v23m45-23v26m44-25v24m44-25v18m44-17v12" /></g>}
      {variant === "flowers" && <g><use href={`#${id}-flower`} transform="translate(580 327) scale(2.7)" /><use href={`#${id}-flower`} transform="translate(740 357) rotate(12) scale(2.3)" /><path d="M551 488h234l-25 113H575Z" fill="var(--color-clay)" /><path d="M541 478h254v23H541Z" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="2" /></g>}
      <g className="kz-paper-bird" transform="translate(759 198)"><path d="m0 5 25 8L54-7 43 19l19-5-14 14-23-9-15 10 6-13Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.4" /><path d="m25 13 18 6" stroke="var(--color-ink)" strokeWidth="1" /></g>
      <path d="M684 223c-51 10-53-17-82-13s-38 25-9 24c26-1 3-28-39-18" stroke="var(--color-ink)" strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 7" />
    </g>
    {!sketch && <path d="M0 0h1440v640H0Z" fill={`url(#${id}-grain)`} pointerEvents="none" />}
  </svg>;
}
