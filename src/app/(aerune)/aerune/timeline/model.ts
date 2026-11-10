import { clamp } from "../motion/math";

export type AirMoment = {
  label: string;
  time: string;
  co2: number;
  people: number;
  airflow: number;
  description: string;
  action: string;
  chart: readonly number[];
};

export const AIR_MOMENTS: readonly AirMoment[] = [
  {
    label: "Arrival", time: "08:30", co2: 620, people: 38, airflow: 61,
    description: "The building wakes up. Fresh air moves in as the first teams arrive.",
    action: "Maintain the morning schedule",
    chart: [22, 26, 30, 38, 44, 51, 49, 57, 61, 55, 49, 45],
  },
  {
    label: "Meeting peak", time: "13:15", co2: 980, people: 86, airflow: 89,
    description: "A busy afternoon brings more people into the same rooms.",
    action: "Increase fresh air in meeting rooms",
    chart: [24, 28, 39, 45, 54, 62, 75, 86, 93, 88, 78, 68],
  },
  {
    label: "Evening", time: "18:40", co2: 530, people: 12, airflow: 34,
    description: "The day winds down and the building settles into a lighter rhythm.",
    action: "Return to the evening schedule",
    chart: [76, 72, 65, 59, 51, 44, 38, 34, 30, 27, 24, 21],
  },
];

export function nextMomentIndex(current: number, delta: number): number {
  return Math.round(clamp(current + delta, 0, AIR_MOMENTS.length - 1));
}

export function getMoment(index: number): AirMoment {
  return AIR_MOMENTS[nextMomentIndex(index, 0)];
}
