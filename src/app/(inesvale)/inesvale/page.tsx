"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { SelectedStoriesSection } from "./components/SelectedStoriesSection";
import { ArchiveSection } from "./components/ArchiveSection";
import { CloserLookSection } from "./components/CloserLookSection";
import { ArtistSection } from "./components/ArtistSection";
import { NotesSection } from "./components/NotesSection";
import { InquireSection } from "./components/InquireSection";
import { LightboxModal } from "./components/LightboxModal";
import { StoryDrawerModal } from "./components/StoryDrawerModal";
import {
  ARCHIVE_PHOTOS,
  type ArchivePhoto,
  type HeroSlide,
  type JournalNote,
  type StoryItem,
} from "./data/portfolioData";

export default function InesValePage() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lightboxState, setLightboxState] = useState<{
    photos: ArchivePhoto[];
    index: number;
  } | null>(null);
  const [activeStory, setActiveStory] = useState<{
    story: StoryItem;
    initialIndex: number;
  } | null>(null);
  const [activeNote, setActiveNote] = useState<JournalNote | null>(null);

  useEffect(() => {
    const sectionIds = ["hero", "stories", "archive", "closer-look", "about", "notes", "inquire"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInspectHeroSlide = (slide: HeroSlide) => {
    const matchingIdx = ARCHIVE_PHOTOS.findIndex((p) => p.src === slide.image);
    setLightboxState({
      photos: ARCHIVE_PHOTOS,
      index: matchingIdx >= 0 ? matchingIdx : 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#F2ECE0] text-[#201C19] paper-grain relative selection:bg-[#A65D46]/20">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content">
        {/* 01 / Hero — The Beauty Between Moments */}
        <HeroSection
          onNavigate={handleNavigate}
          onInspectSlide={handleInspectHeroSlide}
        />

        {/* 02 / Selected Stories — Cinematic Project Strip */}
        <SelectedStoriesSection
          onOpenStory={(story, initialIndex = 0) => {
            setActiveNote(null);
            setActiveStory({ story, initialIndex });
          }}
        />

        {/* 03 / Archive — Filterable Photographic Collection */}
        <ArchiveSection
          onSelectPhoto={(photo, list) => {
            const idx = list.findIndex((item) => item.id === photo.id);
            setLightboxState({
              photos: list,
              index: idx >= 0 ? idx : 0,
            });
          }}
        />

        {/* 04 / A Closer Look — Pinned Editorial Sequence */}
        <CloserLookSection />

        {/* 05 / Artist — About Ines Vale */}
        <ArtistSection onNavigateInquire={() => handleNavigate("inquire")} />

        {/* 06 / Notes — Editorial Field Journal */}
        <NotesSection
          onSelectNote={(note) => {
            setActiveStory(null);
            setActiveNote(note);
          }}
        />
      </main>

      {/* 07 / Inquire — Contact + Footer */}
      <InquireSection onNavigate={handleNavigate} />

      {/* Fullscreen Archival Lightbox */}
      {lightboxState && (
        <LightboxModal
          photos={lightboxState.photos}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
          onChangeIndex={(newIdx) =>
            setLightboxState((prev) => (prev ? { ...prev, index: newIdx } : null))
          }
        />
      )}

      {/* Monograph Story & Field Note Reader Drawer */}
      <StoryDrawerModal
        story={activeStory?.story ?? null}
        initialImageIndex={activeStory?.initialIndex ?? 0}
        note={activeNote}
        onClose={() => {
          setActiveStory(null);
          setActiveNote(null);
        }}
      />
    </div>
  );
}
