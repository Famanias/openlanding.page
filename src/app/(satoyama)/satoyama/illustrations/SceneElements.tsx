export function Tree({ x, y, scale = 1, variant = 0 }: { x: number; y: number; scale?: number; variant?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="m-4 0 2-92h7L8 0Z" fill="var(--st-timber)" />
    <path d="M1-45-25-76M2-65l23-29" stroke="var(--st-timber)" strokeWidth="3" fill="none" />
    {variant === 1 ? <><path d="m0-150-28 61 12-3-28 42 24-4-27 38h96L23-56l23 5-28-42 12 5Z" fill="var(--st-forest)" /><path d="m0-147-15 60 13-6-16 41 19-5-13 37h44L17-58l11 4-16-39 9 5Z" fill="var(--st-midgreen)" opacity=".55" /></> : <>
      <path d="M-43-55c-22-11-16-40-3-47-7-26 15-44 32-42 13-30 52-26 59-4 26-2 42 20 31 42 20 20 10 51-14 55-23 20-47 7-59 11-17 5-36-2-46-15Z" fill="var(--st-forest)" />
      <path d="M-43-100c-4-23 17-37 33-35 11-23 45-22 53-3 22 0 32 16 25 35-10-12-22-7-30-3-8-24-35-26-49-8-9-2-22 3-32 14Z" fill="var(--st-midgreen)" />
      <path d="M-42-70c8-10 16-4 23-8m34-42c8-7 19-5 23 1m-29 46c12-9 24-7 30 0m-53-31c4-3 10-5 17-2" stroke="var(--st-leaf)" strokeWidth="4" strokeLinecap="round" opacity=".45" />
    </>}
  </g>;
}

export function House({ x, y, scale = 1, rose = false }: { x: number; y: number; scale?: number; rose?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="m-6 14 153-4 32 8-181 12Z" fill="var(--st-ink)" opacity=".16" />
    <path d="M0-72h124V14H0Z" fill="var(--st-wall)" /><path d="m124-72 38-20V0l-38 14Z" fill="var(--st-wallshade)" />
    <path d="M0-72v86m124-86v86M8-43h112M8 3h112M45-65v79M83-65v79" fill="none" stroke="var(--st-timber)" strokeWidth="4" />
    <path d="m-18-72 40-66h119l39 52-49 19Z" fill={rose ? "var(--st-rose)" : "var(--st-roof)"} />
    <path d="m22-138 109 71 49-19-39-52Z" fill={rose ? "var(--st-roof-rose)" : "var(--st-roofshade)"} />
    <path d="m-18-72 149 5 49-19M22-138l109 71M-11-81l134 5M-3-95l110 5M6-109l84 5M15-124l50 3" stroke="var(--st-ink)" strokeOpacity=".35" strokeWidth="2" fill="none" />
    <path d="M12-33h25V-4H12Zm40 0h24V-4H52Zm39-18h24v51H91Z" fill="var(--st-window)" /><path d="M24-32v27m-12-14h25m27-13v27m-12-14h24m27-30v47" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="m129-34 24-11v28l-24 9Z" fill="var(--st-window)" />
    <path d="M132-44v37m10-42v37" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="M-8 14h135v7H-8Z" fill="var(--st-timber)" />
  </g>;
}

export function Grass({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--st-forest)" fill="none" strokeWidth="1.7" strokeLinecap="round"><path d="M0 0c1-11-4-20-7-24M0 0c0-15 5-24 10-31M0-1C-6-13-12-14-17-16M0 0c3-9 11-11 17-14" /><path d="m9-28 7-4m-23 9-7-2" strokeWidth="3" /></g>;
}

export function Bicycle({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="var(--st-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="0" cy="0" r="17" fill="var(--st-paper)" fillOpacity=".3" /><circle cx="54" cy="0" r="17" fill="var(--st-paper)" fillOpacity=".3" /><path d="m0 0 16-25 15 25H0l27-23h19l8 23m-8-23-4-14h-8M16-25l-3-8m-5 0h13m10 33 6 5m-6-5-3 7" /><path d="M45-23h20l-3-12H43" fill="var(--st-rose)" strokeWidth="1.5" /></g>;
}
