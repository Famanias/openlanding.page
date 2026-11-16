/** Page copy that is not service or job data. Everything about the company here is invented. */

export const NAV = [
  { id: "work", label: "The work" },
  { id: "log", label: "Job log" },
  { id: "yard", label: "The yard" },
  { id: "about", label: "About" },
  { id: "crew", label: "Crew" },
] as const;

export const COMPANY = {
  name: "Tolvar Earthworks",
  legal: "Tolvar Earthworks LLC",
  owner: "Dale Tolvar",
  founded: 2002,
  street: "4410 Tamarack Pit Road",
  city: "Aitkin, MN 56431",
  cell: { label: "(218) 555-0142", href: "tel:+12185550142" },
  office: { label: "(218) 555-0187", href: "tel:+12185550187" },
  email: { label: "office@tolvarearthworks.com", href: "mailto:office@tolvarearthworks.com" },
  jobs: { label: "jobs@tolvarearthworks.com", href: "mailto:jobs@tolvarearthworks.com?subject=Crew%20application" },
  hours: "Monday to Friday, 7 to 5. Saturdays when the ground says so.",
  area: ["Aitkin County", "Crow Wing County", "Mille Lacs County"],
} as const;

export const STATS = [
  { value: 25, suffix: "", label: "years Dale has been in the seat" },
  { value: 20, suffix: "", label: "kinds of work, all in-house" },
  { value: 10, suffix: "", label: "machines and trucks, none rented" },
  { value: 3, suffix: "", label: "counties we work in" },
] as const;

export type FleetRow = { count: number; name: string; spec: string; job: string };

export const FLEET: FleetRow[] = [
  { count: 2, name: "Excavators", spec: "12 and 20 ton", job: "Basements, ponds, trench" },
  { count: 1, name: "Track loader", spec: "2.4 yd bucket", job: "Stripping, loading, pads" },
  { count: 1, name: "Dozer", spec: "Six-way blade", job: "Rough and finish grade" },
  { count: 3, name: "Tandem dump trucks", spec: "14 yd each", job: "Spoil out, rock and dirt in" },
  { count: 1, name: "Lowboy and tractor", spec: "35 ton", job: "Gets the iron to your job" },
  { count: 2, name: "Skid steer and mini", spec: "Tight-access pair", job: "Back yards, inside fences" },
];

export function fleetTotal(rows: readonly FleetRow[] = FLEET): number {
  return rows.reduce((total, row) => total + row.count, 0);
}

export type Position = { id: string; title: string; summary: string; needs: string[] };

export const POSITIONS: Position[] = [
  {
    id: "laborer",
    title: "Laborer",
    summary: "On the ground with the pipe crew. We train.",
    needs: ["Water line, storm drain or concrete experience helps but is not required", "Comfortable in a trench box and around running iron", "Clean driver's license"],
  },
  {
    id: "operator",
    title: "Operator",
    summary: "Excavator, dozer or loader, and a shovel when the job needs one.",
    needs: ["Two years in the seat, minimum", "Willing to get out and labor when a project calls for it", "Can dig to a stake without being told twice"],
  },
  {
    id: "foreman",
    title: "Foreman",
    summary: "Runs a crew and a job from the first stake to the last load.",
    needs: ["Five years leading a crew", "Two years operating", "Reads plans and sets grade with a laser or a rod"],
  },
];

export const CREW_TERMS = [
  "Paid weekly by direct deposit",
  "Wage review at six months",
  "Overtime when the weather gives us a window",
  "Monday to Friday, some Saturdays",
] as const;
