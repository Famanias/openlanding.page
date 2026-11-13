export type NavItem = {
  id: string;
  label: string;
};

export const NAV: readonly NavItem[] = [
  { id: "dissection", label: "Dissection" },
  { id: "budget", label: "Budget Lab" },
  { id: "architecture", label: "Architecture" },
  { id: "access", label: "Access" },
] as const;
