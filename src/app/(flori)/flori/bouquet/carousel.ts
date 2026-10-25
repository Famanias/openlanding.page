export function postcardPose(index: number, offset: number, pitch: number, count: number) {
  const span = pitch * count;
  const raw = (index - 2) * pitch - offset;
  const x = ((raw + span / 2) % span + span) % span - span / 2;
  const distance = x / pitch;
  return { x, y: Math.abs(distance) * 23, rotation: Math.max(-24, Math.min(24, distance * 7)) };
}
