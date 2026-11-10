'use client';

import { CSSProperties, useState } from 'react';

export type GlyphAxes = { wght: number; wdth: number; opsz: number; slnt: number };
export const DEFAULT_AXES: GlyphAxes = { wght: 650, wdth: 100, opsz: 80, slnt: 0 };
export const AXIS_RANGES = {
  wght: { min: 100, max: 1000 },
  wdth: { min: 25, max: 151 },
  opsz: { min: 8, max: 144 },
  slnt: { min: -10, max: 0 },
} as const;

export default function GlyphSpecimen() {
  const [text, setText] = useState('GLYPHWORK');
  const [axes, setAxes] = useState<GlyphAxes>(DEFAULT_AXES);
  const [spacing, setSpacing] = useState(-4);
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{text:string; axes:GlyphAxes;spacing:number}>>([]);
  const variation = `'wght' ${axes.wght}, 'wdth' ${axes.wdth}, 'opsz' ${axes.opsz}, 'slnt' ${axes.slnt}`;
  const pushHistory = () => setHistory(h => [...h.slice(-29), { text, axes: { ...axes }, spacing }]);
  const changeAxis=(tag: keyof GlyphAxes,value:number)=>{pushHistory();setAxes(a=>({...a,[tag]:value}));};
  const reset=()=>{pushHistory();setAxes(DEFAULT_AXES);setSpacing(-4);setSelected(null);};
  const undo=()=>{const last=history.at(-1);if(!last)return;setText(last.text);setAxes(last.axes);setSpacing(last.spacing);setHistory(h=>h.slice(0,-1));};
  const style: CSSProperties={fontFamily:'GlyphworkVariable, Arial, sans-serif',fontVariationSettings:variation,letterSpacing:`${spacing}px`,fontSize:'clamp(60px, 13vw, 220px)',lineHeight:.93};
  return <section className="glyphwork-lab" aria-label="Interactive variable font specimen" onKeyDown={e=>{if((e.ctrlKey||e.metaKey)&&e.key==='z'){e.preventDefault();undo();}if(e.key==='Escape')reset();}}>
    <style>{`@font-face{font-family:GlyphworkVariable;src:url('/assets/glyphwork/01-specimen-variable.woff2') format('woff2');font-weight:100 1000;font-stretch:25% 151%;font-style:normal;font-display:swap}.glyphwork-lab{background:#F7F7F0;color:#111111;padding:24px;min-height:660px}.glyphwork-stage{position:relative;min-height:420px;display:flex;align-items:center;justify-content:center;overflow:hidden}.glyphwork-guides{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.8}.glyphwork-live{position:relative;z-index:1;max-width:100%;overflow-wrap:anywhere;text-align:center}.glyphwork-controls{display:flex;flex-wrap:wrap;gap:20px;margin-top:20px}.glyphwork-controls label{display:grid;gap:7px;min-width:140px;flex:1;font:12px ui-monospace,monospace}.glyphwork-controls input{accent-color:#F02F83}.glyphwork-lab button{background:#111;color:#F7F7F0;padding:9px 13px;border:0;cursor:pointer}.glyphwork-lab button:focus-visible,.glyphwork-lab input:focus-visible{outline:3px solid #6E57D5;outline-offset:3px}@media(prefers-reduced-motion:no-preference){.glyphwork-live{transition:font-variation-settings .18s ease,letter-spacing .18s ease}}`}</style>
    <label htmlFor="glyph-input">Editable specimen text</label>
    <input id="glyph-input" value={text} maxLength={24} onChange={e=>{pushHistory();setText(e.target.value);setSelected(null);}} style={{display:'block',width:'100%',padding:'10px',marginTop:8}} />
    <div className="glyphwork-stage">
      <img className="glyphwork-guides" src="/assets/glyphwork/glyph-specimen.svg" alt="" aria-hidden="true" />
      <div className="glyphwork-live" style={style} aria-label={text || 'Empty specimen'}>{Array.from(text).map((ch,i)=><span key={`${i}-${ch}`} role="button" tabIndex={0} aria-label={`Inspect glyph ${ch} at position ${i+1}`} onClick={()=>setSelected(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(i);}}} style={{cursor:'pointer',outline:selected===i?'3px solid #F02F83':undefined,outlineOffset:4}}>{ch}</span>)}</div>
    </div>
    <div className="glyphwork-controls">{(Object.keys(AXIS_RANGES) as Array<keyof GlyphAxes>).map(tag=><label key={tag}>{tag.toUpperCase()}: <output aria-live="polite">{axes[tag]}</output><input type="range" min={AXIS_RANGES[tag].min} max={AXIS_RANGES[tag].max} step="1" value={axes[tag]} onChange={e=>changeAxis(tag,Number(e.target.value))} aria-label={`${tag} axis`} aria-valuetext={`${axes[tag]}`} /></label>)}
      <label>TRACKING: <output aria-live="polite">{spacing}px</output><input type="range" min="-10" max="20" value={spacing} onChange={e=>{pushHistory();setSpacing(Number(e.target.value));}} /></label></div>
    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:20}}><button onClick={reset}>Reset (Esc)</button><button onClick={undo}>Undo (Ctrl/⌘ Z)</button>{['DISPLAY','The quick brown fox','Design is a process.'].map(s=><button key={s} onClick={()=>{pushHistory();setText(s);setSelected(null);}}>{s==='DISPLAY'?'Display':s.length<25?'Headline':'Paragraph'}</button>)}</div>
    {selected!==null&&<p role="status" style={{fontFamily:'ui-monospace, monospace'}}>SELECTED / {Array.from(text)[selected]} / Unicode U+{Array.from(text)[selected]?.codePointAt(0)?.toString(16).toUpperCase().padStart(4,'0')} / {variation}</p>}
  </section>;
}
