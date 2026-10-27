/** The 3D night only runs when motion is welcome and WebGL2 exists; otherwise the tide table is the page. */
export const canMountExperience = (env: { reducedMotion: boolean; webgl2: boolean }) => !env.reducedMotion && env.webgl2;

/** Read the environment without creating a probe context (a probe costs a long task on load). */
export function readEnvironment() {
  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl2: "WebGL2RenderingContext" in window,
  };
}
