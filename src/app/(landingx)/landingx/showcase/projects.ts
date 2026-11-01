export type Category = "all" | "product" | "culture" | "place";
export type Project = { name: string; kind: Exclude<Category, "all">; industry: string; line: string; href: string; asset: string; monogram: string };
export const projects: Project[] = [
  { name: "Avel", kind: "product", industry: "AI PLATFORM", line: "A little more room for good thinking.", href: "/avel", asset: "work-avel", monogram: "A" },
  { name: "Pello", kind: "product", industry: "PERSONAL FINANCE", line: "Money for the life you want.", href: "/pello", asset: "work-pello", monogram: "P" },
  { name: "Satsuma", kind: "culture", industry: "CREATIVE STUDIO", line: "Reels that land, made by hand.", href: "/satsuma", asset: "work-satsuma", monogram: "S" },
  { name: "Firstday", kind: "culture", industry: "LEARNING", line: "A little experience changes everything.", href: "/firstday", asset: "work-firstday", monogram: "F" },
  { name: "Rill", kind: "place", industry: "LAND & WATER", line: "A better way to hold water.", href: "/rill", asset: "work-rill", monogram: "R" },
  { name: "Hiyas", kind: "place", industry: "EXPEDITIONS", line: "A more considered way to climb.", href: "/hiyas", asset: "work-hiyas", monogram: "H" },
];
export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All work" }, { id: "product", label: "Product" }, { id: "culture", label: "Culture" }, { id: "place", label: "Place" },
];
export function filterProjects(category: Category) { return category === "all" ? projects : projects.filter((project) => project.kind === category); }
