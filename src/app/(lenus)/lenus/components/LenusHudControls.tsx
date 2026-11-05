import { Layers, Pause, Play, RotateCcw, ScanLine } from "lucide-react";
import type { LenusPartInfo } from "../scene/telemetry";

export type LenusStageState="preview"|"running"|"paused"|"static"|"unavailable"|"lost";
type Props={
  state:LenusStageState; fps:number; exploded:boolean; explodeAmount:number; focusAngle:number; activePart:LenusPartInfo; paused:boolean;
  onToggleExplode:()=>void; onExplodeChange:(value:number)=>void; onFocusChange:(radians:number)=>void;
  onResetView:()=>void; onTogglePause:()=>void;
  cutaway?:boolean;onToggleCutaway?:()=>void;
  transformation?:number;onTransformationChange?:(value:number)=>void;
};
export function LenusHudControls(p:Props){
  const disabled=!["running","paused"].includes(p.state);
  const status=p.state==="running"?`${p.fps || "—"} FPS`:({preview:"PREVIEW",static:"STILL MODE",unavailable:"STATIC PREVIEW",lost:"RECONNECTING",paused:"PAUSED"}[p.state]);
  return <aside className="ln-hud" aria-label="Optical lens controls">
    <div className="ln-hud-top"><span className="ln-micro">OPTICAL ENGINE / 01</span><span className="ln-status" data-live={p.state==="running"}><i aria-hidden="true"/>{status}</span></div>
    <div className="ln-part-readout">
      <p className="ln-part-label">{p.activePart.label}</p>
      <p className="ln-part-material">{p.activePart.material}</p>
      <p className="ln-part-description" title={p.activePart.role}>{p.activePart.role}</p>
    </div>
    <div className="ln-hud-actions">
      <button type="button" className="ln-explode" aria-pressed={p.exploded} onClick={p.onToggleExplode} disabled={disabled}><Layers size={14} aria-hidden="true"/>EXPLODE ASSEMBLY</button>
      <div className="ln-playback"><button type="button" className="ln-icon-button" aria-label={p.cutaway?"Return to automatic hero view":"Inspect lens interior"} title="Inspect interior (C)" aria-pressed={!!p.cutaway} onClick={p.onToggleCutaway}><ScanLine size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label="Reset optical view" title="Reset view (R)" onClick={p.onResetView} disabled={disabled}><RotateCcw size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label={p.paused?"Play animation":"Pause animation"} onClick={p.onTogglePause} disabled={disabled}>{p.paused?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}</button></div>
    </div>
    <div className="ln-hud-sliders">
      <label className="ln-transformation-control"><span>TRANSFORMATION <output>{Math.round((p.transformation??0)*100)}%</output></span><input type="range" min="0" max="100" step="1" value={Math.round((p.transformation??0)*100)} aria-label="Lens transformation" aria-valuetext={`${Math.round((p.transformation??0)*100)}% transformed`} title="0: fully closed. 100: fully transformed. Play resumes the loop." disabled={disabled} onChange={e=>p.onTransformationChange?.(Number(e.target.value)/100)}/></label>
      <label><span>SEPARATION <output>{Math.round(p.explodeAmount*100)}%</output></span><input type="range" min="0" max="1" step=".01" value={p.explodeAmount} aria-label="Explode optical assembly" disabled={disabled} onChange={e=>p.onExplodeChange(Number(e.target.value))}/></label>
      <label><span>FOCUS <output>{Math.round(p.focusAngle*180/Math.PI)}°</output></span><input type="range" min="-1.57" max="1.57" step=".01" value={p.focusAngle} aria-label="Focus ring rotation" disabled={disabled} onChange={e=>p.onFocusChange(Number(e.target.value))}/></label>
    </div>
  </aside>;
}
