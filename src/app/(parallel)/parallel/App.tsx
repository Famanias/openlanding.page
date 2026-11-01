'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { EditorialInterface } from './components/EditorialInterface';
import { useParallelStore } from './store/useParallelStore';

export function App() {
  const [webglFailed, setWebglFailed] = useState(false);

  const heroState = useParallelStore((s) => s.heroState);
  const heroMode = useParallelStore((s) => s.heroMode);
  const presentationMode = useParallelStore((s) => s.presentationMode);

  const handleWebGLFailure = useCallback(() => {
    setWebglFailed(true);
  }, []);

  useEffect(() => {
    // Support ?autostart=1 to open directly into Simulate mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      useParallelStore.getState().setHeroMode('simulate');
    }

    // Keyboard navigation shortcuts (Escape to exit interactive simulation takeover or object inspection)
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') {
        const st = useParallelStore.getState();
        if (st.selectedEntity) {
          st.setSelectedEntity(null);
          st.setHighlightedRoadId(null);
          if (st.presentationMode === 'exploration') {
            st.setPresentationMode('cinematic');
          }
          return;
        }
        if (st.isStageExpanded) {
          st.setStageExpanded(false);
          return;
        }
        if (st.heroState === 'interactive') {
          st.setHeroState('cinematic');
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main
      data-hero-state={heroState}
      data-hero-mode={heroMode}
      data-presentation-mode={presentationMode}
      className="relative min-h-screen w-full bg-[#101315] text-[#F6F5F1]"
    >
      <EditorialInterface
        webglFailed={webglFailed}
        onWebGLFailure={handleWebGLFailure}
        onScrollToSection={handleScrollToSection}
      />
    </main>
  );
}

export default App;
