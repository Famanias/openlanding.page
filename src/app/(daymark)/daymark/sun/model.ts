export function sunPosition(minutes: number, elevation: number) {
  const t = Math.max(0, Math.min(1, (minutes - 360) / 720));
  return { x: 10 + 80 * t, y: 70 - 52 * elevation * Math.sin(Math.PI * t) };
}
export function formatTime(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
