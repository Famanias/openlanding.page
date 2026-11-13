'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GardenIntro from './components/GardenIntro';
import KoiGallery from './components/KoiGallery';
import GardenWalk from './components/GardenWalk';
import Seasons from './components/Seasons';
import PlanYourWalk from './components/PlanYourWalk';
import Questions from './components/Questions';
import Footer from './components/Footer';

export default function MizunowaApp() {
  useEffect(() => {
    document.documentElement.classList.add('mnw-js');
  }, []);

  return (
    <div id="mnw-root">
      <a href="#main" className="mnw-skip-link">
        Skip to garden guide
      </a>
      <Header />
      <main id="main">
        <Hero />
        <GardenIntro />
        <KoiGallery />
        <GardenWalk />
        <Seasons />
        <PlanYourWalk />
        <Questions />
      </main>
      <Footer />
    </div>
  );
}
