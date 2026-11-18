import { NOSE_PATH } from "../brand/Logo";

const HEART_NOSE = "M92 250c-7-18-40-15-35 9c3 15 22 23 35 33c13-10 32-18 35-33c5-24-28-27-35-9z";

type FrankProps = {
  /** "full": the whole 2600-unit dachshund. "head": cropped to the head and collar for the hero. */
  crop?: "full" | "head";
  className?: string;
};

const VIEWBOX = { full: "0 0 2600 640", head: "20 70 520 420" };

/**
 * Frank, the clinic dachshund, drawn as flat sticker shapes with a thick ink outline. Each examinable part
 * is its own group so CSS can animate it when the check-up reaches it (`[data-chapter]` on an ancestor):
 * nose twitch, ear flop, heart beat, belly breathe, paw lift, tail wag. Outlines are drawn as a wider
 * ink layer under the fills, so overlapping shapes read as one silhouette.
 */
export function Frank({ crop = "full", className }: FrankProps) {
  return (
    <svg className={`sn-frank ${className ?? ""}`} viewBox={VIEWBOX[crop]} aria-hidden="true" focusable="false">
      <ellipse className="sn-f-ground" cx="1240" cy="608" rx="1080" ry="20" />

      {/* tail, behind the body */}
      <g className="sn-f-tail">
        <path className="sn-f-coat sn-f-line" d="M2070 300C2190 290 2290 230 2372 136C2388 118 2420 128 2410 152C2340 262 2230 336 2080 360Z" />
      </g>

      {/* far legs, in shade */}
      <g className="sn-f-far">
        <rect className="sn-f-dark sn-f-line" x="610" y="400" width="78" height="176" rx="38" />
        <rect className="sn-f-dark sn-f-line" x="1975" y="392" width="78" height="184" rx="38" />
      </g>

      {/* torso: outline layer, then fills */}
      <g className="sn-f-torso">
        <rect className="sn-f-outline" x="360" y="236" width="1770" height="236" rx="118" />
        <ellipse className="sn-f-outline" cx="520" cy="356" rx="168" ry="146" />
        <rect className="sn-f-coat" x="360" y="236" width="1770" height="236" rx="118" />
        <ellipse className="sn-f-coat" cx="520" cy="356" rx="168" ry="146" />
        <ellipse className="sn-f-light" cx="470" cy="394" rx="72" ry="82" />
        <path className="sn-f-fur" d="M1990 288q22 8 34 30M2040 300q18 10 26 30M1500 262q30 -6 56 4M1580 258q30 -6 56 4" />
      </g>

      <g className="sn-f-belly">
        <rect className="sn-f-light" x="640" y="410" width="1200" height="46" rx="23" />
      </g>

      <g className="sn-f-heart">
        <circle className="sn-f-heart-ring" cx="600" cy="340" r="62" />
        <g transform="translate(517 246) scale(2.6)">
          <path className="sn-f-heart-shape" d={NOSE_PATH} />
        </g>
      </g>

      {/* near legs */}
      <g className="sn-f-legs">
        <rect className="sn-f-coat sn-f-line" x="430" y="404" width="86" height="180" rx="42" />
        <ellipse className="sn-f-light sn-f-line" cx="473" cy="586" rx="60" ry="27" />
      </g>
      <g className="sn-f-paw">
        <rect className="sn-f-coat sn-f-line" x="1840" y="396" width="86" height="186" rx="42" />
        <ellipse className="sn-f-light sn-f-line" cx="1883" cy="584" rx="60" ry="27" />
        <path className="sn-f-toes" d="M1858 572v18M1883 570v20M1908 572v18" />
      </g>

      {/* collar and tag */}
      <g className="sn-f-collar">
        <rect className="sn-f-blue sn-f-line" x="420" y="152" width="46" height="262" rx="23" transform="rotate(-16 443 283)" />
        <g className="sn-f-tag">
          <path className="sn-f-ring" d="M462 404q8 8 0 18" />
          <circle className="sn-f-yolk sn-f-line" cx="462" cy="446" r="28" />
          <path className="sn-f-ink" d={NOSE_PATH} transform="translate(447 429) scale(0.47)" />
        </g>
      </g>

      {/* head */}
      <g className="sn-f-head">
        <circle className="sn-f-outline" cx="300" cy="214" r="128" />
        <rect className="sn-f-outline" x="64" y="208" width="290" height="124" rx="62" />
        <circle className="sn-f-coat" cx="300" cy="214" r="128" />
        <rect className="sn-f-coat" x="64" y="208" width="290" height="124" rx="62" />
        <ellipse className="sn-f-light" cx="168" cy="298" rx="98" ry="32" />
        <ellipse className="sn-f-blush" cx="262" cy="268" rx="28" ry="15" />
        <path className="sn-f-mouth" d="M122 310q44 26 98 4" />
        <g className="sn-f-tongue">
          <path className="sn-f-pink sn-f-line-thin" d="M160 320q4 34 24 32q18 -2 16 -30" />
        </g>
        <g className="sn-f-nose">
          <path className="sn-f-ink" d={HEART_NOSE} />
          <ellipse className="sn-f-glint" cx="77" cy="257" rx="7" ry="5" transform="rotate(-24 77 257)" />
        </g>
        <g className="sn-f-eye">
          <ellipse className="sn-f-ink" cx="236" cy="198" rx="21" ry="25" />
          <circle className="sn-f-glint" cx="243" cy="189" r="7" />
        </g>
        <path className="sn-f-brow" d="M208 158q28 -16 56 -2" />
        <g className="sn-f-ear">
          <path className="sn-f-dark sn-f-line" d="M336 104C410 96 452 170 446 270C442 346 396 380 362 352C326 322 304 210 336 104Z" />
        </g>
      </g>
    </svg>
  );
}
