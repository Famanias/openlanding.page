import { Frank } from "../checkup/Frank";
import type { SpeciesId } from "./species";

/** Flat sticker pets in the same outline language as Frank. Each has a part that breathes or sways. */

function Cat() {
  return (
    <svg className="sn-pet" viewBox="0 0 400 400" aria-hidden="true">
      <path className="sn-pet-sway sn-f-coat-cat sn-f-line" d="M282 330c60-10 86-60 60-104c-14-24-40-24-44-6c-3 14 20 18 18 36c-2 22-26 36-50 40z" />
      <path className="sn-f-coat-cat sn-f-line" d="M120 340c-10-80 20-150 80-150s92 70 82 150z" />
      <ellipse className="sn-f-light-cat" cx="200" cy="300" rx="44" ry="40" />
      <g className="sn-pet-head">
        <path className="sn-f-coat-cat sn-f-line" d="M128 120l-6-74 58 40M272 120l6-74-58 40" />
        <circle className="sn-f-coat-cat sn-f-line" cx="200" cy="146" r="80" />
        <path className="sn-f-pink" d="M136 92l-4-30 30 22zM264 92l4-30-30 22z" />
        <g className="sn-pet-blink">
          <ellipse className="sn-f-ink" cx="170" cy="140" rx="11" ry="15" />
          <ellipse className="sn-f-ink" cx="230" cy="140" rx="11" ry="15" />
        </g>
        <path className="sn-f-pink" d="M190 168h20l-10 12z" />
        <path className="sn-f-mouth" d="M186 186q14 12 28 0M120 166l-40-6M120 178l-38 8M280 166l40-6M280 178l38 8" />
      </g>
    </svg>
  );
}

function Rabbit() {
  return (
    <svg className="sn-pet" viewBox="0 0 400 400" aria-hidden="true">
      <circle className="sn-f-milk sn-f-line" cx="296" cy="300" r="30" />
      <path className="sn-f-coat-rabbit sn-f-line" d="M100 340c0-80 60-130 130-130s110 60 100 130z" />
      <g className="sn-pet-head">
        <path className="sn-pet-sway sn-f-coat-rabbit sn-f-line" d="M150 150c-60 10-90 90-70 150c10 26 40 20 44-6c6-50 20-90 50-120z" />
        <circle className="sn-f-coat-rabbit sn-f-line" cx="200" cy="170" r="76" />
        <path className="sn-f-coat-rabbit sn-f-line" d="M250 150c60 10 90 90 70 150c-10 26-40 20-44-6c-6-50-20-90-50-120z" />
        <g className="sn-pet-blink">
          <ellipse className="sn-f-ink" cx="172" cy="166" rx="10" ry="14" />
          <ellipse className="sn-f-ink" cx="228" cy="166" rx="10" ry="14" />
        </g>
        <path className="sn-f-pink" d="M192 190h16l-8 10z" />
        <path className="sn-f-mouth" d="M200 200v12M188 216q12 8 24 0" />
      </g>
    </svg>
  );
}

function Tortoise() {
  return (
    <svg className="sn-pet" viewBox="0 0 400 400" aria-hidden="true">
      <g className="sn-pet-head">
        <path className="sn-f-mint sn-f-line" d="M300 260c30-30 70-30 76 0c4 24-20 40-50 36z" />
        <circle className="sn-f-ink" cx="350" cy="262" r="7" />
        <path className="sn-f-mouth" d="M356 282q-10 6-20 2" />
      </g>
      <rect className="sn-f-mint sn-f-line" x="100" y="290" width="44" height="54" rx="20" />
      <rect className="sn-f-mint sn-f-line" x="250" y="290" width="44" height="54" rx="20" />
      <path className="sn-pet-sway sn-f-yolk sn-f-line" d="M60 300c0-100 60-160 140-160s140 60 140 160z" />
      <path className="sn-f-shell" d="M140 300l20-70 40-30 40 30 20 70M100 260l60-30M300 260l-60-30M200 200v-56" />
    </svg>
  );
}

export function Pet({ id }: { id: SpeciesId }) {
  if (id === "cat") return <Cat />;
  if (id === "rabbit") return <Rabbit />;
  if (id === "small") return <Tortoise />;
  return (
    <div className="sn-pet sn-pet-dog">
      <Frank crop="head" />
    </div>
  );
}
