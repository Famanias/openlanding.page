export type ProtocolStep = { number: string; title: string; detail: string; metric: string };

export const PROTOCOL: readonly ProtocolStep[] = [
  { number: "01", title: "Read the day", detail: "Choose the light you spend the most time inside.", metric: "3 modes" },
  { number: "02", title: "Tune the lens", detail: "We set a prescription carrier and a glare profile together.", metric: "12 min" },
  { number: "03", title: "Settle the fit", detail: "A human checks the bridge, temple, and the movement around both.", metric: "48 h" },
];
