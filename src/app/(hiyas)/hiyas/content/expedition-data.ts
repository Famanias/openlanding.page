export const STAGES = [
  { number: "01", title: "Prepare", copy: "Read the route, build the base, and arrive with a plan that can change without losing its shape." },
  { number: "02", title: "Approach", copy: "Move through the valley at a pace that leaves attention for weather, people, and the line above." },
  { number: "03", title: "Acclimatize", copy: "Climb high, sleep lower, and let the body become part of the route before the summit window." },
  { number: "04", title: "Summit window", copy: "When the route, weather, and team agree, the line becomes a decision rather than a wish." },
  { number: "05", title: "Return", copy: "A successful expedition includes the way back. The plan keeps that visible from the first call." },
];

export const SUPPORT_ROLES = [
  { title: "Local leadership", copy: "Sherpa leadership shapes the route, the camp rhythm, and the decisions that only the mountain can teach." },
  { title: "Route discipline", copy: "Every load, camp move, weather note, and turnaround decision is part of the same working plan." },
  { title: "A planned return", copy: "The summit is one point in the route. The plan makes space for retreat, recovery, and the people waiting below." },
];

export const LOGISTICS = [
  ["Permits", "Documents and route access are mapped before departure."],
  ["Weather", "Forecast windows are reviewed with the route and the team's pace in view."],
  ["Communications", "Each camp has a clear check-in rhythm and an agreed escalation path."],
  ["Oxygen", "Support planning records where supplemental oxygen enters the selected plan."],
  ["Base systems", "Food, shelter, power, medical preparation, and waste return stay visible."],
  ["Contingency", "Every route includes a decision point for turning, waiting, or returning."],
] as const;

export const FIELD_NOTES = [
  { id: "north-ridge", title: "The route starts before the trailhead", meta: "Approach note / Khumbu", copy: "A good plan begins with the first transport, the first weather read, and the first honest conversation about pace.", asset: "field-note-01" },
  { id: "camp-rhythm", title: "Camp rhythm is a skill", meta: "Acclimatization note / Karakoram", copy: "The line is never only upward. Rest, carry, return, and repeat until the mountain is familiar enough to read.", asset: "field-note-02" },
  { id: "window", title: "A window is a shared decision", meta: "Summit note / 8,000 m", copy: "A summit call belongs to the whole team. The strongest plan is the one everyone can act on together.", asset: "field-note-03" },
] as const;

