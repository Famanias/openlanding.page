export type LenusPartInfo = { id: string; label: string; material: string; role: string };

export const OPTICAL_PARTS: readonly LenusPartInfo[] = [
  { id:"assembly", label:"OPTICAL ASSEMBLY", material:"19 PARTS / PROCEDURAL OPTICS", role:"Select a part to look a little closer." },
  { id:"front-lens", label:"EMERALD OBJECTIVE CORE", material:"DOPED FLUORITE / N=1.52", role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" },
  ...["outer-glass","inner-glass"].map((id,i)=>({id,label:i===0?"OUTER FLUTED GLASS":"INNER GLASS ANNULUS",material:"OPTICAL GLASS / N=1.52",role:"Fluted transmission surface with chromatic dispersion."})),
  ...["front-shell","collar-outer","collar-middle","collar-inner","rear-frame","rear-hub","rear-seat","rear-fins","rear-bridges","outer-screws","inner-screws"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"BRUSHED TITANIUM",role:id.includes("collar")?"Concentric focus collar, independently addressable.":"Machined support in the optical assembly."})),
  {id:"rear-lens",label:"REAR OPTICAL ELEMENT",material:"COATED OPTICAL GLASS",role:"Rear-facing convex element and violet reflection coating."},
  {id:"gold-contacts",label:"GOLD CONTACT ARRAY",material:"GOLD ELECTRICAL CONTACTS",role:"Thirteen radial contact pads around the rear optical seat."},
  ...["retaining-beads","rear-beads"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"POLISHED METAL",role:"Narrow concentric retaining edges."})),
  {id:"shards",label:"ORBITING GLASS PRISMS",material:"BEVELED OPTICAL GLASS",role:"Twelve independent faceted prisms orbit the objective."},
];
export function getPartTelemetry(id: string | null): LenusPartInfo {
  return OPTICAL_PARTS.find(p=>p.id===id) ?? OPTICAL_PARTS[0];
}
