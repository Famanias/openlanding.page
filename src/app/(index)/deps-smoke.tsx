"use client";

// Temporary (removed in Task 18): proves the heavy client dependencies bundle and load in production.
import { useEffect, useState } from "react";

export function DepsSmoke() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    Promise.all([
      import("three/webgpu"),
      import("three/tsl"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/Observer"),
      import("lenis"),
      import("motion/react"),
    ]).then(
      () => setStatus("ok"),
      () => setStatus("error"),
    );
  }, []);

  return <span hidden data-deps={status} />;
}
