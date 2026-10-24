"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function ProgressRail({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -55%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rl-progress-rail" aria-label="Page chapters">
      {items.map((item) => <a key={item.id} href={`#${item.id}`} data-active={active === item.id ? "true" : undefined}>{item.label}</a>)}
    </nav>
  );
}

