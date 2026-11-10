'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  CaseMode,
  DEFAULT_SNAPSHOT,
  LabSnapshot,
  SPECIMEN_PRESETS,
  SpecimenMode,
  VariableAxesState,
  formatTrackingCss,
  popHistory,
  pushHistory,
} from '../../utils/typographyLogic';
import { ApplicationsShowcase } from './ApplicationsShowcase';
import { FoundryInfo } from './FoundryInfo';
import { GlyphInspector } from './GlyphInspector';
import { HeroTypeLab } from './HeroTypeLab';
import { NavSectionId, RightRailNav } from './RightRailNav';
import { SpecimenModes } from './SpecimenModes';
import { TerminalFooter } from './TerminalFooter';

export const GlyphworkPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<LabSnapshot>(() => ({
    ...DEFAULT_SNAPSHOT,
    axes: { ...DEFAULT_SNAPSHOT.axes },
  }));
  const [history, setHistory] = useState<LabSnapshot[]>([]);
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero-lab');
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  // Sync CSS custom properties on root element
  useEffect(() => {
    const root = document.documentElement;
    const { weight, width, slant, opticalSize, tracking } = snapshot.axes;
    const slntMapped = -Number(Math.min(10, Math.max(0, (slant / 15) * 10)).toFixed(2));
    root.style.setProperty('--gw-wght', String(Math.round(weight)));
    root.style.setProperty('--gw-wdth', String(Math.round(width)));
    root.style.setProperty('--gw-slnt', String(slntMapped));
    root.style.setProperty('--gw-opsz', String(Math.round(opticalSize)));
    root.style.setProperty('--gw-tracking', formatTrackingCss(tracking));
  }, [snapshot.axes]);

  // Verify variable font loading with graceful fallback
  useEffect(() => {
    let mounted = true;
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts
        .load("720 16px 'GlyphworkVariable'")
        .then((loadedFaces) => {
          if (mounted) {
            setFontLoaded(loadedFaces.length > 0 || document.fonts.check("16px 'GlyphworkVariable'"));
          }
        })
        .catch(() => {
          if (mounted) setFontLoaded(false);
        });
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Track active section in RightRailNav via IntersectionObserver
  useEffect(() => {
    const sectionIds: NavSectionId[] = [
      'hero-lab',
      'specimen-modes',
      'glyph-inspector',
      'applications',
      'foundry-licensing',
      'terminal-footer',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as NavSectionId);
          }
        });
      },
      { threshold: 0.28 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const updateWithHistory = useCallback(
    (updater: (prev: LabSnapshot) => LabSnapshot) => {
      setSnapshot((prev) => {
        const next = updater(prev);
        setHistory((h) => pushHistory(h, prev));
        return next;
      });
    },
    []
  );

  const handleUndo = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const { restored, nextHistory } = popHistory(prevHistory, snapshot);
      setSnapshot(restored);
      return nextHistory;
    });
  }, [snapshot]);

  const handleReset = useCallback(() => {
    updateWithHistory(() => ({
      ...DEFAULT_SNAPSHOT,
      axes: { ...DEFAULT_SNAPSHOT.axes },
    }));
  }, [updateWithHistory]);

  // Keyboard shortcuts for Undo (Ctrl/Cmd+Z) and Reset (Alt+R)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          handleUndo();
        }
      } else if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo, handleReset]);

  const handleAxisChange = useCallback(
    (axis: keyof VariableAxesState, value: number) => {
      updateWithHistory((prev) => ({
        ...prev,
        axes: {
          ...prev.axes,
          [axis]: value,
        },
      }));
    },
    [updateWithHistory]
  );

  const handleModeChange = useCallback(
    (mode: SpecimenMode) => {
      updateWithHistory((prev) => ({
        ...prev,
        mode,
      }));
    },
    [updateWithHistory]
  );

  const handleCaseModeChange = useCallback(
    (caseMode: CaseMode) => {
      updateWithHistory((prev) => ({
        ...prev,
        caseMode,
      }));
    },
    [updateWithHistory]
  );

  const handleTextChange = useCallback(
    (newText: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        text: newText,
      }));
    },
    [updateWithHistory]
  );

  const handleHeadlineChange = useCallback(
    (newHeadline: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        headlineText: newHeadline,
      }));
    },
    [updateWithHistory]
  );

  const handleParagraphChange = useCallback(
    (newParagraph: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        paragraphText: newParagraph,
      }));
    },
    [updateWithHistory]
  );

  const scrollToSection = useCallback((sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectGlyph = useCallback(
    (glyph: string, scrollToInspector = false) => {
      updateWithHistory((prev) => ({
        ...prev,
        selectedGlyph: glyph,
      }));
      if (scrollToInspector) {
        scrollToSection('glyph-inspector');
      }
    },
    [updateWithHistory, scrollToSection]
  );

  const handleApplyPreset = useCallback(
    (presetId: string) => {
      const preset = SPECIMEN_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      updateWithHistory((prev) => ({
        ...prev,
        mode: preset.mode,
        text: preset.word,
        headlineText: preset.headline,
        paragraphText: preset.paragraph,
        axes: {
          ...prev.axes,
          ...preset.axesPartial,
        },
      }));
    },
    [updateWithHistory]
  );

  const handleApplyApplicationAxes = useCallback(
    (axesPartial: Partial<VariableAxesState>, sampleWord?: string) => {
      updateWithHistory((prev) => ({
        ...prev,
        text: sampleWord || prev.text,
        axes: {
          ...prev.axes,
          ...axesPartial,
        },
      }));
      scrollToSection('hero-lab');
    },
    [updateWithHistory, scrollToSection]
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F7F0] text-[#111111] relative">
      {/* Right Fixed Vertical Instrument Rail */}
      <RightRailNav
        activeSection={activeSection}
        selectedGlyph={snapshot.selectedGlyph}
        onSelectSection={scrollToSection}
        onSelectGlyphChip={(glyph) => handleSelectGlyph(glyph, true)}
      />

      {/* Main Sequential Typographic Instrument Canvas */}
      <main>
        {/* SECTION 1 — HERO / LIVE SPECIMEN LAB */}
        <HeroTypeLab
          text={snapshot.text}
          headlineText={snapshot.headlineText}
          paragraphText={snapshot.paragraphText}
          mode={snapshot.mode}
          caseMode={snapshot.caseMode}
          axes={snapshot.axes}
          selectedGlyph={snapshot.selectedGlyph}
          canUndo={history.length > 0}
          fontLoaded={fontLoaded}
          onTextChange={handleTextChange}
          onHeadlineChange={handleHeadlineChange}
          onParagraphChange={handleParagraphChange}
          onAxisChange={handleAxisChange}
          onModeChange={handleModeChange}
          onSelectGlyph={handleSelectGlyph}
          onUndo={handleUndo}
          onReset={handleReset}
          onNavigateLicensing={() => scrollToSection('foundry-licensing')}
        />

        {/* SECTION 2 — SPECIMEN MODES / TYPE TEST AREA */}
        <SpecimenModes
          text={snapshot.text}
          headlineText={snapshot.headlineText}
          paragraphText={snapshot.paragraphText}
          mode={snapshot.mode}
          caseMode={snapshot.caseMode}
          axes={snapshot.axes}
          onModeChange={handleModeChange}
          onCaseModeChange={handleCaseModeChange}
          onTextChange={handleTextChange}
          onHeadlineChange={handleHeadlineChange}
          onParagraphChange={handleParagraphChange}
          onAxisChange={handleAxisChange}
          onApplyPreset={handleApplyPreset}
          onSelectGlyph={handleSelectGlyph}
        />

        {/* SECTION 3 — GLYPH INSPECTOR */}
        <GlyphInspector
          selectedGlyph={snapshot.selectedGlyph}
          axes={snapshot.axes}
          onSelectGlyph={(glyph) => handleSelectGlyph(glyph, false)}
          onAxisChange={handleAxisChange}
        />

        {/* SECTION 4 — APPLICATIONS / POSTER + PACKAGING */}
        <ApplicationsShowcase
          specimenText={snapshot.text}
          axes={snapshot.axes}
          onApplyApplicationAxes={handleApplyApplicationAxes}
        />

        {/* SECTION 5 — FOUNDRY / LICENSING / ABOUT */}
        <FoundryInfo
          axes={snapshot.axes}
          onJumpToHeroLab={() => scrollToSection('hero-lab')}
        />
      </main>

      {/* SECTION 6 — FOOTER / TERMINAL SPECIMEN */}
      <TerminalFooter
        axes={snapshot.axes}
        onJumpToHeroLab={() => scrollToSection('hero-lab')}
        onSelectGlyph={handleSelectGlyph}
      />
    </div>
  );
};
