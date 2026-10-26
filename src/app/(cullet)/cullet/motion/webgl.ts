/** A cheap WebGL check. Creating a probe context costs a long task on phones, and the engines fail safely anyway. */
export const mayHaveWebGL = () => "WebGL2RenderingContext" in window || "WebGLRenderingContext" in window;
