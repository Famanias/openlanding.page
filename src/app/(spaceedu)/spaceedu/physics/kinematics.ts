export const gravitationalRedshift = (r: number) => Math.sqrt(Math.max(1 - 1 / Math.max(r, 1), 0));
export const orbitalSpeed = (r: number) => Math.sqrt(0.5 / Math.max(r - 1, 0.05));
export const dopplerFactor = (r: number, approaching: boolean) => {
  const beta = Math.min(0.92, orbitalSpeed(r));
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  return 1 / (gamma * (1 - (approaching ? beta : -beta)));
};
export const clockRate = gravitationalRedshift;
