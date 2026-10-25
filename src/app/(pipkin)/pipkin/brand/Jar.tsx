import { useId, type CSSProperties } from "react";
import type { FlavorTone } from "../data/shop";

const TONE_VAR: Record<FlavorTone, string> = {
  bubblegum: "var(--color-bubblegum)",
  butter: "var(--color-butter)",
  mint: "var(--color-mint)",
  sky: "var(--color-sky)",
  lilac: "var(--color-lilac)",
  blush: "var(--color-blush)",
};

export const toneVar = (tone: FlavorTone) => TONE_VAR[tone];

type ArtProps = {
  tone: FlavorTone;
  lid?: boolean;
  label?: string;
  /** Outline-only jar for the order that has not been cooked yet. */
  ghost?: boolean;
};

/**
 * The jar drawn in a 120x150 box, as an SVG group so it can sit inside another SVG.
 * The jam level comes from the CSS custom property --jar-lvl (0..1) on any ancestor.
 */
export function JarArt({ tone, lid = true, label, ghost = false }: ArtProps) {
  const uid = `pk${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-body`}>
          <rect x="16" y="36" width="88" height="106" rx="32" />
        </clipPath>
      </defs>
      {ghost ? null : <rect x="16" y="36" width="88" height="106" rx="32" fill="var(--color-cream)" />}
      {ghost ? null : (
        <g clipPath={`url(#${uid}-body)`}>
          <rect className="pk-jar-fill" x="10" y="36" width="100" height="112" fill={TONE_VAR[tone]} />
          <rect className="pk-jar-skin" x="16" y="36" width="88" height="10" rx="5" fill="var(--color-cream)" opacity=".55" />
        </g>
      )}
      <rect x="16" y="36" width="88" height="106" rx="32" fill="none" stroke="var(--color-plum)" strokeWidth="3.2" strokeDasharray={ghost ? "8 8" : undefined} strokeLinecap="round" />
      {ghost ? null : <rect x="27" y="52" width="9" height="36" rx="4.5" fill="var(--color-cream)" opacity=".75" />}
      {label && !ghost ? (
        <g>
          <rect x="32" y="84" width="56" height="34" rx="17" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <text x="60" y="105" textAnchor="middle" className="pk-jar-label">{label}</text>
        </g>
      ) : null}
      {lid && !ghost ? (
        <g className="pk-jar-lid">
          <rect x="24" y="12" width="72" height="30" rx="15" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <rect x="34" y="20" width="22" height="5" rx="2.5" fill="var(--color-cream)" opacity=".85" />
        </g>
      ) : null}
    </g>
  );
}

type JarProps = ArtProps & {
  /** 0..1 how full of jam. */
  level?: number;
  className?: string;
  title?: string;
};

/** A standalone jar illustration. */
export function Jar({ level = 1, className, title, ...art }: JarProps) {
  const style = { "--jar-lvl": level } as CSSProperties;
  return (
    <svg className={`pk-jar ${className ?? ""}`} viewBox="0 0 120 150" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" style={style}>
      <JarArt {...art} />
    </svg>
  );
}
