/** Evenly distribute marks around one revolution, beginning at twelve o'clock. */
export function orbitAngle(index: number, count: number): number {
  return count > 0 ? (index * 360) / count : 0;
}
