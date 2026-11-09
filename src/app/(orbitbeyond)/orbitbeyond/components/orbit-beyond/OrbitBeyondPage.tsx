'use client';

import React, { useRef, useState } from 'react';
import { DEFAULT_MISSION_PLAN, type MissionPlan } from '../../lib/orbit-beyond/mission';
import { OrbitHeader } from './OrbitHeader';
import { LunarHero } from './LunarHero';
import { DepartureJourney } from './DepartureJourney';
import { HabitatExplorer } from './HabitatExplorer';
import { SeventyTwoHours } from './SeventyTwoHours';
import { LunarExperiences } from './LunarExperiences';
import { MissionConfigurator } from './MissionConfigurator';
import { FinalHorizon } from './FinalHorizon';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export function OrbitBeyondPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [missionPlan, setMissionPlan] = useState<MissionPlan>(DEFAULT_MISSION_PLAN);
  const configuratorHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const scrollToSection = (sectionId: string, focusHeading = false) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (focusHeading && sectionId === 'mission-configurator') {
      window.setTimeout(() => {
        configuratorHeadingRef.current?.focus({ preventScroll: true });
      }, prefersReducedMotion ? 50 : 550);
    }
  };

  const handleApplyExperienceToMission = (enableRover: boolean) => {
    setMissionPlan((prev) => ({
      ...prev,
      roverWalk: enableRover,
      style: enableRover ? 'crater' : 'earthrise',
    }));
    scrollToSection('mission-configurator', true);
  };

  return (
    <div className="min-h-[100svh] w-full bg-[#030812] text-[#EDF6FD] selection:bg-[#178CFA]/30">
      <OrbitHeader onNavigate={(id) => scrollToSection(id, id === 'mission-configurator')} />

      <main>
        {/* SCENE 01 — LUNAR ARRIVAL */}
        <LunarHero
          onReserveClick={() => scrollToSection('mission-configurator', true)}
          onExploreJourneyClick={() => scrollToSection('the-journey')}
        />

        {/* SCENE 02 — THE DEPARTURE / LEAVING EARTH */}
        <DepartureJourney />

        {/* SCENE 03 — THE HABITAT / A ROOM WITH AN IMPOSSIBLE VIEW */}
        <HabitatExplorer />

        {/* SCENE 04 — 72 HOURS / THREE DAYS, ONE WORLD AWAY */}
        <SeventyTwoHours />

        {/* SCENE 05 — BEYOND THE DOME / EXPERIENCES */}
        <LunarExperiences onSelectForMission={handleApplyExperienceToMission} />

        {/* SCENE 06 — YOUR MISSION / INTERACTIVE CONCEPT CONFIGURATOR */}
        <MissionConfigurator
          plan={missionPlan}
          onChangePlan={setMissionPlan}
          headingRef={configuratorHeadingRef}
        />
      </main>

      {/* SCENE 07 — THE FINAL HORIZON / CINEMATIC FOOTER */}
      <FinalHorizon onNavigate={(id) => scrollToSection(id, id === 'mission-configurator')} />
    </div>
  );
}
