import spec from "../model/lens-spec.json";
import { INTERIOR_IDS, OPTICAL_ORDER } from "../model/interiorLayout";

export type LenusPartInfo = { id: string; label: string; material: string; role: string };

const legacyParts: readonly LenusPartInfo[] = [
  { id:"front-lens", label:"EMERALD OBJECTIVE CORE", material:"DOPED FLUORITE / N=1.52", role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" },
  ...["outer-glass","inner-glass"].map((id,i)=>({id,label:i===0?"OUTER FLUTED GLASS":"INNER GLASS ANNULUS",material:"OPTICAL GLASS / N=1.52",role:"Fluted transmission surface with chromatic dispersion."})),
  ...["front-shell","collar-outer","collar-middle","collar-inner","rear-frame","rear-hub","rear-seat","rear-fins","rear-bridges","outer-screws","inner-screws"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"BRUSHED TITANIUM",role:id.includes("collar")?"Concentric focus collar, independently addressable.":"Machined support in the optical assembly."})),
  {id:"rear-lens",label:"REAR OPTICAL ELEMENT",material:"COATED OPTICAL GLASS",role:"Rear-facing convex element and violet reflection coating."},
  {id:"gold-contacts",label:"GOLD CONTACT ARRAY",material:"GOLD ELECTRICAL CONTACTS",role:"Thirteen radial contact pads around the rear optical seat."},
  ...["retaining-beads","rear-beads"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"POLISHED METAL",role:"Narrow concentric retaining edges."})),
  {id:"shards",label:"ORBITING GLASS PRISMS",material:"BEVELED OPTICAL GLASS",role:"Twelve independent faceted prisms orbit the objective."},
];
export function getSemanticPartCount(){return spec.components.length;}
const interior=new Set<string>([...INTERIOR_IDS,...OPTICAL_ORDER,"collar-inner"]);
const rearView=new Set(["rear-frame","rear-hub","rear-seat","rear-lens","rear-fins","rear-bridges","outer-screws","inner-screws","gold-contacts","rear-beads"]);
export function isInteriorPart(id:string){return interior.has(id);}
export function prefersRearView(id:string){return rearView.has(id);}
const roles:Record<string,string>={
  "core-carrier":"Recessed support around the emerald objective.",
  "spacer-stack":"Annular seats keep the optical groups separated.",
  "rear-baffles":"Rear stops keep the optical path clear.",
  "carrier-fasteners":"Radial fasteners secure the core carrier.",
  "core-retaining-beads":"Polished retaining edges around the recessed core.",
  "guide-rails":"Telescoping guides keep the optical carriages aligned.",
  "panel-linkages":"Paired support arms connect each housing panel to the rear frame.",
};
export const OPTICAL_PARTS:readonly LenusPartInfo[]=[
  {id:"assembly",label:"OPTICAL ASSEMBLY",material:`${getSemanticPartCount()} PARTS / PROCEDURAL OPTICS`,role:"Select a part to look a little closer."},
  ...spec.components.map(c=>legacyParts.find(p=>p.id===c.id)??{
    id:c.id,label:c.id.replaceAll("-"," ").toUpperCase(),
    material:c.material==="glass"?"OPTICAL GLASS / N=1.52":"BRUSHED TITANIUM",
    role:c.geometry.kind==="optical-element"?"Curved optical glass seated in its own retaining cell.":c.id.endsWith("-cell")?"Four titanium retainers hold the element on its guide carriage.":c.id.startsWith("housing-panel-")?"Articulated housing panel that opens to reveal the optical train.":roles[c.id]??"Machined support in the optical assembly.",
  }),
];
export function getPartTelemetry(id: string | null): LenusPartInfo {
  return OPTICAL_PARTS.find(p=>p.id===id) ?? OPTICAL_PARTS[0];
}
