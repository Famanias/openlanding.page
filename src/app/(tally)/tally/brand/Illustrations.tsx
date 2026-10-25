import React from "react";
import type { ArchetypeId } from "../counter/ticket";

export function CounterBellSvg({ ringing = false }: { ringing?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 110"
      className="tl-bell-svg"
      data-ringing={ringing ? "true" : "false"}
      role="img"
      aria-label="Shop counter service bell and date stamp"
    >
      {/* Pastel counter mat pad */}
      <rect x="8" y="88" width="164" height="12" rx="4" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
      {/* Acoustic ring waves */}
      <g className="tl-bell-waves">
        <path
          d="M36 38C28 30 28 18 36 10"
          stroke="#231F2B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26 42C15 31 15 15 26 4"
          stroke="#231F2B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="3 3"
          fill="none"
        />
        <path
          d="M112 38C120 30 120 18 112 10"
          stroke="#231F2B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Plunger pin */}
      <g className="tl-bell-plunger">
        <rect x="68" y="20" width="12" height="6" rx="2" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <line x1="74" y1="26" x2="74" y2="36" stroke="#231F2B" strokeWidth="2.5" />
      </g>

      {/* Dome of counter bell */}
      <path
        d="M36 78C36 53 52 36 74 36C96 36 112 53 112 78H36Z"
        fill="#FAF4E8"
        stroke="#231F2B"
        strokeWidth="2.2"
      />
      <path
        d="M46 72C48 56 58 45 72 43"
        stroke="#231F2B"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bell base */}
      <rect x="30" y="78" width="88" height="10" rx="3" fill="#231F2B" />

      {/* Rotary wooden rubber stamp beside bell */}
      <g className="tl-mini-stamp">
        <rect x="134" y="34" width="18" height="24" rx="9" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <rect x="139" y="58" width="8" height="14" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <rect x="126" y="72" width="34" height="10" rx="2" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <rect x="128" y="82" width="30" height="6" fill="#231F2B" />
      </g>
    </svg>
  );
}

export function ArchetypeIllustration({ archetype }: { archetype: ArchetypeId }) {
  if (archetype === "tailor") {
    return (
      <svg
        viewBox="0 0 280 150"
        className="tl-archetype-svg"
        role="img"
        aria-label="Denim tailoring bench with chain-stitch spool, shears, and measuring tape"
      >
        <rect x="6" y="6" width="268" height="138" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Folded selvedge denim cuff */}
        <rect x="22" y="36" width="110" height="82" rx="4" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <rect x="22" y="92" width="110" height="26" rx="2" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Selvedge ID ticker */}
        <line x1="56" y1="92" x2="56" y2="118" stroke="#F7C8B6" strokeWidth="4" />
        <line x1="52" y1="92" x2="52" y2="118" stroke="#231F2B" strokeWidth="1.5" />
        <line x1="60" y1="92" x2="60" y2="118" stroke="#231F2B" strokeWidth="1.5" />
        {/* Gold/blush chain-stitch hem line */}
        <line
          x1="28"
          y1="84"
          x2="126"
          y2="84"
          stroke="#231F2B"
          strokeWidth="2"
          strokeDasharray="5 3"
        />
        {/* Thread cone */}
        <polygon points="164,116 174,48 194,48 204,116" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <rect x="176" y="38" width="16" height="10" rx="2" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <rect x="158" y="116" width="52" height="8" rx="2" fill="#231F2B" />
        {/* Tailor chalk & pins */}
        <circle cx="236" cy="64" r="18" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
        <line x1="224" y1="42" x2="232" y2="56" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="223" cy="40" r="3.5" fill="#F7C8B6" stroke="#231F2B" strokeWidth="1.5" />
        <line x1="248" y1="44" x2="241" y2="57" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="249" cy="42" r="3.5" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.5" />
        <rect x="218" y="96" width="40" height="22" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <line x1="226" y1="96" x2="226" y2="104" stroke="#231F2B" strokeWidth="1.5" />
        <line x1="234" y1="96" x2="234" y2="108" stroke="#231F2B" strokeWidth="1.5" />
        <line x1="242" y1="96" x2="242" y2="104" stroke="#231F2B" strokeWidth="1.5" />
        <line x1="250" y1="96" x2="250" y2="108" stroke="#231F2B" strokeWidth="1.5" />
      </svg>
    );
  }

  if (archetype === "cycle") {
    return (
      <svg
        viewBox="0 0 280 150"
        className="tl-archetype-svg"
        role="img"
        aria-label="Bicycle repair bay with alloy wheel hub, cassette cogs, and service tag"
      >
        <rect x="6" y="6" width="268" height="138" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Cassette rings */}
        <circle cx="88" cy="75" r="46" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" strokeDasharray="6 3" />
        <circle cx="88" cy="75" r="32" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <circle cx="88" cy="75" r="18" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <circle cx="88" cy="75" r="7" fill="#231F2B" />
        {/* Spokes */}
        <line x1="88" y1="29" x2="88" y2="57" stroke="#231F2B" strokeWidth="1.6" />
        <line x1="88" y1="93" x2="88" y2="121" stroke="#231F2B" strokeWidth="1.6" />
        <line x1="42" y1="75" x2="70" y2="75" stroke="#231F2B" strokeWidth="1.6" />
        <line x1="106" y1="75" x2="134" y2="75" stroke="#231F2B" strokeWidth="1.6" />
        {/* Park tool wrench & chain link */}
        <rect x="162" y="36" width="90" height="22" rx="11" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <circle cx="174" cy="47" r="5" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        <circle cx="240" cy="47" r="5" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        {/* Ultrasonic bath tray */}
        <rect x="162" y="74" width="92" height="46" rx="6" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <rect x="172" y="84" width="72" height="26" rx="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        <line x1="182" y1="97" x2="234" y2="97" stroke="#231F2B" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    );
  }

  if (archetype === "kiln") {
    return (
      <svg
        viewBox="0 0 280 150"
        className="tl-archetype-svg"
        role="img"
        aria-label="Ceramic kiln shelf with stoneware vessels and glaze test tiles"
      >
        <rect x="6" y="6" width="268" height="138" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Kiln shelf plank */}
        <rect x="22" y="106" width="236" height="12" rx="3" fill="#231F2B" />
        <rect x="34" y="118" width="14" height="14" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <rect x="232" y="118" width="14" height="14" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        {/* Thrown stoneware vase */}
        <path
          d="M52 106C44 86 46 60 58 46H82C94 60 96 86 88 106H52Z"
          fill="#F7C8B6"
          stroke="#231F2B"
          strokeWidth="2"
        />
        <path
          d="M53 74C64 80 76 72 87 78L89 60C85 50 82 46 82 46H58C58 46 54 52 53 74Z"
          fill="#FAF4E8"
          stroke="#231F2B"
          strokeWidth="1.8"
        />
        {/* Footed bowl */}
        <path
          d="M112 72H172C170 94 158 106 142 106C126 106 114 94 112 72Z"
          fill="#C8E6D0"
          stroke="#231F2B"
          strokeWidth="2"
        />
        {/* Glaze test tiles */}
        <rect x="192" y="54" width="24" height="52" rx="4" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <circle cx="204" cy="64" r="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.5" />
        <rect x="224" y="54" width="24" height="52" rx="4" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
        <circle cx="236" cy="64" r="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 150"
      className="tl-archetype-svg"
      role="img"
      aria-label="Horology watch bench with mechanical movement caliber and timing tape"
    >
      <rect x="6" y="6" width="268" height="138" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
      {/* Watch case & lugs */}
      <rect x="62" y="20" width="36" height="110" rx="6" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
      <circle cx="80" cy="75" r="42" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2.2" />
      <circle cx="80" cy="75" r="33" fill="#F7C8B6" stroke="#231F2B" strokeWidth="1.8" />
      <circle cx="80" cy="75" r="14" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
      <line x1="80" y1="75" x2="80" y2="50" stroke="#231F2B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="80" y1="75" x2="100" y2="75" stroke="#231F2B" strokeWidth="2.2" strokeLinecap="round" />
      {/* Crown */}
      <rect x="122" y="68" width="8" height="14" rx="2" fill="#231F2B" />
      {/* Witschi timing readout tape */}
      <rect x="152" y="34" width="102" height="82" rx="6" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
      <rect x="162" y="46" width="82" height="36" rx="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
      <polyline
        points="168,68 182,64 196,65 210,60 224,61 238,56"
        fill="none"
        stroke="#231F2B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="166" y1="98" x2="216" y2="98" stroke="#231F2B" strokeWidth="2" />
    </svg>
  );
}

export function MerchantDossierArt({ type }: { type: "tailor" | "cycle" | "kiln" }) {
  if (type === "tailor") {
    return (
      <svg
        viewBox="0 0 360 210"
        className="tl-dossier-svg"
        role="img"
        aria-label="Hem & Haw Denim Atelier sewing table and tagged garments"
      >
        <rect width="360" height="210" fill="#FAF4E8" />
        {/* Hanging garment rail */}
        <line x1="24" y1="34" x2="336" y2="34" stroke="#231F2B" strokeWidth="3" strokeLinecap="round" />
        {/* Hung selvedge trousers with claim tags */}
        <g>
          <rect x="52" y="34" width="54" height="122" rx="4" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
          <line x1="79" y1="68" x2="79" y2="156" stroke="#231F2B" strokeWidth="2" />
          <rect x="52" y="142" width="54" height="14" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
          <rect x="88" y="48" width="28" height="40" rx="3" fill="#F7C8B6" stroke="#231F2B" strokeWidth="1.8" />
        </g>
        <g>
          <rect x="134" y="34" width="56" height="114" rx="4" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
          <line x1="162" y1="64" x2="162" y2="148" stroke="#231F2B" strokeWidth="2" />
          <rect x="172" y="48" width="28" height="40" rx="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        </g>
        {/* Vintage chain-stitch machine silhouette */}
        <path
          d="M236 164H328V146H258V104H300V124H320V84C320 76 314 70 306 70H246C240 70 236 75 236 82V164Z"
          fill="#F7C8B6"
          stroke="#231F2B"
          strokeWidth="2.2"
        />
        <circle cx="324" cy="98" r="14" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <rect x="20" y="164" width="320" height="18" rx="4" fill="#231F2B" />
      </svg>
    );
  }

  if (type === "cycle") {
    return (
      <svg
        viewBox="0 0 360 210"
        className="tl-dossier-svg"
        role="img"
        aria-label="Spoke & Pawl Cycleworks repair stand and pegboard"
      >
        <rect width="360" height="210" fill="#FAF4E8" />
        {/* Tool pegboard background */}
        <rect x="24" y="22" width="144" height="110" rx="6" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
        <line x1="42" y1="42" x2="150" y2="42" stroke="#231F2B" strokeWidth="2" strokeDasharray="4 8" />
        <line x1="42" y1="66" x2="150" y2="66" stroke="#231F2B" strokeWidth="2" strokeDasharray="4 8" />
        <rect x="44" y="84" width="54" height="32" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        <rect x="108" y="84" width="44" height="32" rx="4" fill="#F7C8B6" stroke="#231F2B" strokeWidth="1.8" />
        {/* Bicycle on repair stand */}
        <line x1="254" y1="22" x2="254" y2="184" stroke="#231F2B" strokeWidth="4" />
        <circle cx="204" cy="132" r="34" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2.2" />
        <circle cx="204" cy="132" r="24" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.6" />
        <circle cx="306" cy="132" r="34" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2.2" />
        <circle cx="306" cy="132" r="24" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.6" />
        {/* Frame diamond */}
        <polygon
          points="204,132 238,82 288,82 252,132"
          fill="none"
          stroke="#231F2B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="288" y1="82" x2="306" y2="132" stroke="#231F2B" strokeWidth="3" />
        {/* Handlebar service stub */}
        <rect x="286" y="48" width="32" height="42" rx="4" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
        <rect x="20" y="182" width="320" height="10" rx="3" fill="#231F2B" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 210"
      className="tl-dossier-svg"
      role="img"
      aria-label="Kiln & Glaze Studio pottery shelves and electric kiln"
    >
      <rect width="360" height="210" fill="#FAF4E8" />
      {/* Drying shelves with tagged bisqueware */}
      <rect x="26" y="34" width="184" height="8" rx="2" fill="#231F2B" />
      <rect x="26" y="96" width="184" height="8" rx="2" fill="#231F2B" />
      <rect x="26" y="158" width="184" height="8" rx="2" fill="#231F2B" />
      <line x1="38" y1="22" x2="38" y2="186" stroke="#231F2B" strokeWidth="3" />
      <line x1="198" y1="22" x2="198" y2="186" stroke="#231F2B" strokeWidth="3" />
      {/* Top row pots */}
      <path d="M56 34C56 18 82 18 82 34H56Z" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
      <rect x="98" y="14" width="28" height="20" rx="4" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
      <rect x="142" y="12" width="36" height="22" rx="6" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
      {/* Middle row vases */}
      <path d="M54 96L62 56H86L94 96H54Z" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
      <path d="M112 96C108 72 118 58 134 58C150 58 160 72 156 96H112Z" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
      {/* Bottom row bowls */}
      <rect x="58" y="124" width="48" height="34" rx="8" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
      <rect x="122" y="118" width="54" height="40" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
      {/* Octagonal Skutt kiln */}
      <rect x="232" y="44" width="102" height="134" rx="10" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2.2" />
      <rect x="244" y="64" width="78" height="24" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
      <circle cx="283" cy="126" r="22" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
      <circle cx="283" cy="126" r="10" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
    </svg>
  );
}

export function FooterShopfrontScene() {
  return (
    <svg
      viewBox="0 0 1200 240"
      className="tl-footer-scene-svg"
      role="img"
      aria-label="Illustrated pastel street of neighborhood service storefronts: tailor atelier, cycle repair bay, and ceramic studio"
    >
      {/* Sidewalk ground line */}
      <rect x="0" y="212" width="1200" height="28" fill="#231F2B" />
      <line x1="0" y1="212" x2="1200" y2="212" stroke="#231F2B" strokeWidth="3" />

      {/* Left Shop: Hem & Haw Atelier */}
      <g>
        <rect x="64" y="36" width="310" height="176" rx="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2.5" />
        {/* Scalloped awning */}
        <path
          d="M54 74H384L372 44H66L54 74Z"
          fill="#F7C8B6"
          stroke="#231F2B"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <rect x="86" y="92" width="176" height="86" rx="4" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        {/* Door with OPEN ticket stub */}
        <rect x="282" y="92" width="68" height="120" rx="4" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2" />
        <rect x="298" y="110" width="36" height="44" rx="3" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        <circle cx="338" cy="158" r="4" fill="#231F2B" />
      </g>

      {/* Hanging swaying Tally sign between buildings */}
      <g className="tl-ambient-sign">
        <line x1="428" y1="42" x2="428" y2="76" stroke="#231F2B" strokeWidth="2.5" />
        <line x1="484" y1="42" x2="484" y2="76" stroke="#231F2B" strokeWidth="2.5" />
        <rect x="404" y="72" width="104" height="50" rx="8" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2.2" />
        <circle cx="420" cy="97" r="6" fill="#FAF4E8" stroke="#231F2B" strokeWidth="1.8" />
        <line x1="436" y1="90" x2="490" y2="90" stroke="#231F2B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="436" y1="104" x2="478" y2="104" stroke="#231F2B" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Center Shop: Spoke & Pawl Cycleworks */}
      <g>
        <rect x="540" y="24" width="320" height="188" rx="6" fill="#C8E6D0" stroke="#231F2B" strokeWidth="2.5" />
        <rect x="564" y="46" width="272" height="28" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        <rect x="564" y="90" width="184" height="92" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Bicycle silhouette inside window */}
        <circle cx="622" cy="150" r="20" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <circle cx="690" cy="150" r="20" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2" />
        <polyline
          points="622,150 648,118 680,118 656,150 622,150"
          fill="none"
          stroke="#231F2B"
          strokeWidth="2.2"
        />
        <rect x="768" y="90" width="68" height="122" rx="4" fill="#F7C8B6" stroke="#231F2B" strokeWidth="2" />
      </g>

      {/* Right Shop: Kiln & Glaze Studio */}
      <g>
        <rect x="896" y="48" width="240" height="164" rx="6" fill="#CFD6F6" stroke="#231F2B" strokeWidth="2.5" />
        <path
          d="M886 82H1146L1134 54H900L886 82Z"
          fill="#FAF4E8"
          stroke="#231F2B"
          strokeWidth="2.2"
        />
        <rect x="920" y="102" width="124" height="78" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
        {/* Pottery vessels in window */}
        <path d="M944 180L950 144H970L976 180H944Z" fill="#F7C8B6" stroke="#231F2B" strokeWidth="1.8" />
        <circle cx="1006" cy="162" r="16" fill="#C8E6D0" stroke="#231F2B" strokeWidth="1.8" />
        <rect x="1060" y="102" width="56" height="110" rx="4" fill="#FAF4E8" stroke="#231F2B" strokeWidth="2" />
      </g>
    </svg>
  );
}
