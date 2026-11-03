'use client';

import React, { useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { StudioDialog } from './components/StudioDialog';
import { ApproachDialog } from './components/ApproachDialog';
import { ProjectDetailDialog } from './components/ProjectDetailDialog';
import { ContactDialog } from './components/ContactDialog';
import { ProjectItem } from './data/projects';

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [approachOpen, setApproachOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen bg-[#111117] text-[#F2F0EB] relative selection:bg-[#A58AFF]/30 selection:text-[#F2F0EB]">
      {/* Sticky Global Header */}
      <SiteHeader
        onOpenStudio={() => setStudioOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Four Continuous Immersive Editorial Sections in a Centered 1920px Stage */}
      <main id="main-content" className="relative w-full max-w-[1920px] mx-auto overflow-x-hidden">
        <HeroSection onOpenStudio={() => setStudioOpen(true)} />
        <ExpertiseSection onOpenApproach={() => setApproachOpen(true)} />
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />
        <ContactSection
          onOpenContact={() => setContactOpen(true)}
          onOpenStudio={() => setStudioOpen(true)}
        />
      </main>

      {/* Accessible Interactive Dialogs & Overlays */}
      <StudioDialog
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        onStartProject={() => setContactOpen(true)}
      />

      <ApproachDialog
        isOpen={approachOpen}
        onClose={() => setApproachOpen(false)}
        onStartProject={() => setContactOpen(true)}
      />

      <ProjectDetailDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        onStartProject={() => setContactOpen(true)}
      />

      <ContactDialog
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
