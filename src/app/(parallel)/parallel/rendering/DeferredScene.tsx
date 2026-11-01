'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Build the below-fold scene only when the visitor approaches it. */
export function DeferredScene({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '200px 0px' });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="w-full h-full">{ready ? children : null}</div>;
}
