'use client';

import type { ReactNode } from "react";
import { Effects } from "@animate-ui/react/primitives/effects/effect";
import { spring, useTempoTransition } from "@animate-ui/react/utils/motion";

type SectionIntroProps = {
  title: ReactNode;
  description: ReactNode;
  eyebrow?: string;
};

export function SectionIntro({ title, description, eyebrow }: SectionIntroProps) {
  const transition = useTempoTransition(spring.dialog);

  return (
    <Effects
      asChild
      inView
      inViewMargin="0px 0px -30% 0px"
      holdDelay={110}
      slide={{ direction: "up", offset: 24 }}
      fade={{ initialOpacity: 0.9, opacity: 1 }}
      transition={transition}
    >
      {eyebrow ? (
        <div className="kf-scroll-copy"><p className="kf-eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      ) : (
        <h2 className="kf-scroll-copy">{title}</h2>
      )}
      <p className="kf-scroll-copy">{description}</p>
    </Effects>
  );
}
