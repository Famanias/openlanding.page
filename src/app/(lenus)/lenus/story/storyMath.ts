export const CHAPTERS=[
  {id:"hero",label:"Reality"},{id:"manifesto",label:"Manifesto"},{id:"work",label:"Selected Work"},
  {id:"expertise",label:"Expertise"},{id:"technology",label:"Technology"},{id:"studio",label:"Studio"},{id:"contact",label:"Contact"},
] as const;
export type ChapterId=(typeof CHAPTERS)[number]["id"];
export const clamp01=(v:number)=>Number.isFinite(v)?Math.max(0,Math.min(1,v)):0;
export const smooth=(v:number)=>{const t=clamp01(v);return t*t*t*(t*(t*6-15)+10);};
export const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export function mixAngle(a:number,b:number,t:number){return a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;}
export function chapterPosition(distance:number,offsets:readonly number[]){
  if(!offsets.length||distance<=offsets[0])return 0;
  for(let i=0;i<offsets.length-1;i++)if(distance<offsets[i+1])return i+clamp01((distance-offsets[i])/Math.max(1,offsets[i+1]-offsets[i]));
  return offsets.length-1;
}
export function dominantChapter(distance:number,viewport:number,offsets:readonly number[],sizes:readonly number[]){
  let result=0,largest=-1;
  for(let i=0;i<offsets.length;i++){const overlap=Math.max(0,Math.min(distance+viewport,offsets[i]+sizes[i])-Math.max(distance,offsets[i]));if(overlap>largest){largest=overlap;result=i;}}
  return result;
}
export function interactionWeight(position:number,origin:number,entry:number,release:number,dragging=false){
  if(dragging)return 1;
  const spatial=1-smooth((Math.abs(position-origin)-.12)/.7);
  return smooth(entry)*(1-smooth(release))*spatial;
}
export function chapterWeight(position:number,index:number,width=.8){return 1-smooth(Math.abs(position-index)/width);}
