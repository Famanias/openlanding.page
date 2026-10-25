export type FrameId = "arc" | "fold" | "halo";

export type Frame = {
  id: FrameId;
  index: string;
  name: string;
  descriptor: string;
  fit: string;
  note: string;
  accent: "lilac" | "peach" | "mint";
};

export const FRAMES: readonly Frame[] = [
  { id: "arc", index: "01", name: "Arc", descriptor: "soft rectangle", fit: "medium / 138 mm", note: "for long screens", accent: "lilac" },
  { id: "fold", index: "02", name: "Fold", descriptor: "hinge oval", fit: "narrow / 132 mm", note: "for moving days", accent: "peach" },
  { id: "halo", index: "03", name: "Halo", descriptor: "round lens", fit: "wide / 142 mm", note: "for low light", accent: "mint" },
];

export function frameById(id: string): Frame | undefined {
  return FRAMES.find((frame) => frame.id === id);
}
