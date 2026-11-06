"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ManifestoSection } from "./components/ManifestoSection";
import { NightsSection } from "./components/NightsSection";
import { SoundStageSection } from "./components/SoundStageSection";
import { SpaceSection } from "./components/SpaceSection";
import { MovementSection } from "./components/MovementSection";
import { GuestlistSection } from "./components/GuestlistSection";
import { SiteFooter } from "./components/SiteFooter";
import { EventModal } from "./components/EventModal";

export default function StarRiotApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEventId, setModalEventId] = useState("friday-frequency");
  const [selectedNight, setSelectedNight] = useState<string>("friday-frequency");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.indexOf("autostart=1") !== -1) {
      document.body.classList.add("sr-autostart", "autostart");
    }
  }, []);

  const handleOpenModal = (eventId: string) => {
    setModalEventId(eventId);
    setModalOpen(true);
  };

  const handleRsvp = (eventId: string) => {
    setSelectedNight(eventId);
    const guestSection = document.getElementById("guestlist");
    if (guestSection) {
      guestSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="sr-root">
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <NightsSection onOpenModal={handleOpenModal} />
        <SoundStageSection />
        <SpaceSection />
        <MovementSection />
        <GuestlistSection nightPreference={selectedNight} />
      </main>
      <SiteFooter />
      <EventModal
        isOpen={modalOpen}
        eventId={modalEventId}
        onClose={() => setModalOpen(false)}
        onRsvp={handleRsvp}
      />
    </div>
  );
}
