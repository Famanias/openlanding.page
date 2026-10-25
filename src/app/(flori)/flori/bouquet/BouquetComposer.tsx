"use client";
import { useEffect, useState } from "react";
import { BotanicalArt } from "./BotanicalArt";
import { PRICES, SIZES, SIZE_LABELS, selectionFromSearch, type Feeling, type BunchSize } from "./model";
import { FLOWERS } from "../content/flowers";
import { Flower } from "../brand/Flower";

export function BouquetComposer() {
  const [feeling, setFeeling] = useState<Feeling>("daydream");
  const [size, setSize] = useState<BunchSize>("little");
  useEffect(() => {
    const sync = () => { if (location.hash === "#compose") { const selection = selectionFromSearch(location.search); setFeeling(selection.feeling); setSize(selection.size); } };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const flower = FLOWERS.find((item) => item.id === feeling)!;
  return <div className="fl-composer-layout">
    <div className="fl-composer-stage" data-reveal="scale">
      <span className="fl-script fl-composer-note">a little more you</span>
      <div className="fl-composer-arch" data-size={size}><BotanicalArt feeling={feeling} gather title={`${flower.name} bouquet in a ceramic vase`} /></div>
      <span className="fl-composer-caption"><Flower /> Gathered with feeling, never a formula.</span>
    </div>
    <div className="fl-composer-controls">
      <p className="fl-eyebrow">Your flowers, your feeling</p>
      <h2>A bunch that<br />feels like <em>you.</em></h2>
      <p className="fl-lead">A soft day? A bright day? A let-it-all-grow day?<br />There’s a little bunch for that.</p>
      <div className="fl-enhanced">
        <fieldset className="fl-feelings"><legend>01 &nbsp; Pick a feeling</legend>
          <div className="fl-feeling-options">{FLOWERS.map((item) => <label className="fl-feeling" key={item.id} data-selected={feeling === item.id}>
            <input type="radio" name="flower-feeling" value={item.id} checked={feeling === item.id} onChange={() => setFeeling(item.id)} />
            <span className={`fl-swatch fl-bg-${item.background}`}><Flower /></span><span>{item.name}</span>
          </label>)}</div>
        </fieldset>
        <fieldset className="fl-size-options"><legend>02 &nbsp; Make it your size</legend><div>{SIZES.map((item) => <label key={item} data-selected={size === item}>
          <input type="radio" name="bunch-size" value={item} checked={size === item} onChange={() => setSize(item)} /><span>{SIZE_LABELS[item]}</span>{" "}<span>£{PRICES[item]}</span>
        </label>)}</div></fieldset>
        <div className="fl-composer-summary" aria-live="polite" aria-atomic="true"><span>{flower.name} · {SIZE_LABELS[size].toLowerCase()}</span><span>£{PRICES[size]} <small>/ delivery</small></span></div>
        <a className="fl-button" href={`?feeling=${feeling}&size=${size}#join`}>That’s my bunch <span aria-hidden="true">↗</span></a>
      </div>
      <p className="fl-nojs">Daydream bunches start at £24. <a href="#join">Find your flowers below.</a></p>
      <p className="fl-small">A new gathering every fortnight. Pause whenever.</p>
    </div>
  </div>;
}
