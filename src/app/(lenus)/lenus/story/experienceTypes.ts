import type {StoryInput} from "./chapterPoseMap";
export type EngineExperienceApi={
  setNarrativeFrame:(input:StoryInput)=>void;
  focusPart:(id:string|null)=>void;
  inspectPart:(id:string)=>void;
  releaseInteraction:()=>void;
  activate:()=>void;
  openControls:()=>void;
  setWorkProgress:(progress:number|null)=>void;
};
export type StoryNavigation={
  chapter:(id:import("./storyMath").ChapterId,history?:boolean)=>void;
  footer:()=>void;
  suspend:(value:boolean)=>void;
};
