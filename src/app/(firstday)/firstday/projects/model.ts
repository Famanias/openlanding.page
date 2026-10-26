export const CATEGORIES = [
  "All",
  "Product",
  "Design",
  "Data",
  "Technology",
  "Business",
] as const;
export type Category = (typeof CATEGORIES)[number];
export type Project = {
  id: string;
  title: string;
  category: Category;
  code: string;
  description: string;
  brief: string;
  duration: string;
  color: "sage" | "blue" | "peach";
  art: "blocks" | "rings" | "bars" | "nodes" | "target" | "book";
  skills: string[];
};
export const PROJECTS: Project[] = [
  {
    id: "product-sprint",
    title: "Product thinking",
    category: "Product",
    code: "FD—001",
    description: "Turn a little ‘what if’ into something people need.",
    brief:
      "A neighborhood café wants to make ordering ahead feel more human. Interview three sample customers, find one useful insight, and sketch a better first order.",
    duration: "4 weeks",
    color: "sage",
    art: "blocks",
    skills: ["Research", "Strategy", "Prototyping"],
  },
  {
    id: "design-studio",
    title: "Digital design",
    category: "Design",
    code: "FD—002",
    description: "Make things that look good. And work even better.",
    brief:
      "Help an independent bookshop bring its quiet charm online. Design a welcoming homepage and a thoughtful way to discover a new favorite book.",
    duration: "4 weeks",
    color: "blue",
    art: "rings",
    skills: ["Figma", "Visual design", "Interaction"],
  },
  {
    id: "data-story",
    title: "Data storytelling",
    category: "Data",
    code: "FD—003",
    description: "Find the story hiding between the numbers.",
    brief:
      "A city cycling collective has a year of journey data. Find where riders get stuck, build a clear dashboard, and recommend one change the city can make.",
    duration: "3 weeks",
    color: "peach",
    art: "bars",
    skills: ["Analysis", "Visualization", "SQL"],
  },
  {
    id: "build-web",
    title: "Creative technology",
    category: "Technology",
    code: "FD—004",
    description: "Build the little tools that make a big difference.",
    brief:
      "Create a small, accessible web tool that helps neighbors share surplus garden produce. Start with a working prototype, then make it useful on a phone.",
    duration: "6 weeks",
    color: "blue",
    art: "nodes",
    skills: ["Frontend", "Accessibility", "Problem solving"],
  },
  {
    id: "growth-lab",
    title: "Growth & strategy",
    category: "Business",
    code: "FD—005",
    description: "Help a good idea find its kind of people.",
    brief:
      "A refill store is opening in a new neighborhood. Build a launch plan that connects with local people, then choose three ways to measure what worked.",
    duration: "3 weeks",
    color: "sage",
    art: "target",
    skills: ["Positioning", "Marketing", "Experimentation"],
  },
  {
    id: "brand-words",
    title: "Words & content",
    category: "Design",
    code: "FD—006",
    description: "Find the right words for something worth saying.",
    brief:
      "Give a community ceramics studio a warm, recognizable voice. Write a short brand story, a welcome email, and three useful social posts.",
    duration: "3 weeks",
    color: "peach",
    art: "book",
    skills: ["Writing", "Brand voice", "Storytelling"],
  },
];
export function filterProjects(category: Category) {
  return category === "All"
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === category);
}
export function projectById(id: string | null) {
  return PROJECTS.find((project) => project.id === id);
}
