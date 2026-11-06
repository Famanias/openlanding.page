/** A trackpad stroke includes its momentum tail, regardless of slide duration. */
export class ChapterWheelGesture{
  private last=-Infinity;
  private total=0;
  private direction=0;
  private consumed=false;
  active(now:number){return now-this.last<240;}
  reset(){this.last=-Infinity;this.total=0;this.direction=0;this.consumed=false;}
  push(delta:number,now:number):number{
    if(!Number.isFinite(delta)||!Number.isFinite(now)||delta===0)return 0;
    if(!this.active(now)){this.total=0;this.direction=0;this.consumed=false;}
    this.last=now;
    if(this.consumed)return 0;
    const direction=Math.sign(delta);
    if(this.direction!==direction)this.total=0;
    this.direction=direction;this.total+=Math.abs(delta);
    if(this.total<24)return 0;
    this.consumed=true;return direction;
  }
}

/** From a partial transition, reverse to its source rather than skipping it. */
export function adjacentChapter(position:number,direction:number){
  return direction>0?Math.min(7,Math.floor(position+.001)+1):Math.max(0,Math.ceil(position-.001)-1);
}

export function ownsChapterKeys(target:EventTarget|null){
  return target instanceof Element&&!!target.closest('input,textarea,select,button,a,summary,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="textbox"],dialog,[role="dialog"],.ln-work-gallery,[data-testid="lenus-canvas-container"]');
}

export function nestedWheelScroll(target:EventTarget|null,delta:number){
  if(!(target instanceof Element))return false;
  for(let el:Element|null=target;el&&el!==document.body;el=el.parentElement){
    if(el.scrollHeight<=el.clientHeight+1)continue;
    if(!/^(auto|scroll)$/.test(getComputedStyle(el).overflowY))continue;
    if(delta<0?el.scrollTop>0:el.scrollTop+el.clientHeight<el.scrollHeight-1)return true;
  }
  return false;
}
