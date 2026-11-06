export const CAPABILITIES=[
  {id:"direction",name:"Creative Direction",part:"outer-glass",point:[2.26,0,.23],socket:null,offset:[-480,-30],description:"A clear creative idea brings identity, space and interaction into focus."},
  {id:"immersive",name:"Immersive Experiences",part:"housing-panel-0",point:[0,0,0],socket:"housing-panel-0-link-panel-0",offset:[132,-92],description:"Connected environments invite people to step beyond the screen."},
  {id:"realtime",name:"Real-Time 3D",part:"front-lens",point:[0,0,.2],socket:null,offset:[-400,330],description:"Physical materials and responsive rendering give digital objects depth and presence."},
  {id:"systems",name:"Interactive Systems",part:"guide-rails",point:[0,0,0],socket:"front-carriage-rail-1",offset:[400,420],description:"Interfaces, motion and engineering work together as one responsive system."},
] as const;
export type ProjectedAnchor={id:string;x:number;y:number;visible:boolean};
export type NarrativeRenderFrame={position:number;progress:number;pose:import("./chapterPoseMap").EngineStoryPose;anchors:ProjectedAnchor[];manual:boolean;inspection:boolean};
