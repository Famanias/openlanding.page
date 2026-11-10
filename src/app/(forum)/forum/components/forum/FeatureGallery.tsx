'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { scrollToSectionId } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FeaturePlate, FeaturePlateItem } from './FeaturePlate';
import { AccessibleDialog } from './AccessibleDialog';
import { MagneticButton } from './MagneticButton';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export const FEATURE_PLATES: FeaturePlateItem[] = [
  {
    id: 'signal-capture',
    number: '01',
    title: 'SIGNAL CAPTURE',
    description: 'Bring meaningful activity and contact context into focus.',
    asset: FORUM_ASSETS.cardSignalObservatory,
    demoCategory: 'CONTACT',
    architectureNote: 'OBSERVATORY DISH // 4:5',
    capabilities: [
      'Consolidates fragmented contact touchpoints, thread replies, and stakeholder visits into a single timeline.',
      'Filters out automated calendar noise so only substantive relationship shifts register.',
      'Preserves full source provenance across every account interaction record.',
    ],
  },
  {
    id: 'pattern-mapping',
    number: '02',
    title: 'PATTERN MAPPING',
    description: 'See relationships between interactions, opportunities, and momentum.',
    asset: FORUM_ASSETS.cardNetworkField,
    demoCategory: 'PIPELINE',
    architectureNote: 'CONVERGENCE FIELD // 4:5',
    capabilities: [
      'Links multi-threaded stakeholder conversations directly to active pipeline evaluation stages.',
      'Surfaces stalled validation steps when decision owners or mutual timelines are missing.',
      'Visualizes cross-account momentum without manual spreadsheet reconciliation.',
    ],
  },
  {
    id: 'decision-support',
    number: '03',
    title: 'DECISION SUPPORT',
    description: 'Make your next action from a clearer picture, not fragmented notes.',
    asset: FORUM_ASSETS.cardCommandInterface,
    demoCategory: 'FOLLOW-UP',
    architectureNote: 'COMMAND CHAMBER // 4:5',
    capabilities: [
      'Synthesizes recent meeting notes, stage duration, and open action items into a clear next move.',
      'Highlights overdue follow-up windows before high-intent opportunities lose momentum.',
      'Equips account teams with structured context briefs ready for immediate review.',
    ],
  },
];

interface FeatureGalleryProps {
  onSelectDemoCategory: (category: SignalFilterCategory) => void;
}

export const FeatureGallery: React.FC<FeatureGalleryProps> = ({
  onSelectDemoCategory,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [selectedFeature, setSelectedFeature] = useState<FeaturePlateItem | null>(null);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const shells = sectionRef.current!.querySelectorAll('.plate-scene-shell');
        const rules = sectionRef.current!.querySelectorAll('.gallery-arch-rule');

        gsap.fromTo(
          rules,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        shells.forEach((shell, idx) => {
          const offsetX = idx === 0 ? -28 : 28;
          const offsetY = idx === 1 ? 32 : 48;
          const rotY = idx === 0 ? 3.5 : -3.5;

          gsap.fromTo(
            shell,
            {
              opacity: 0,
              x: offsetX,
              y: offsetY,
              rotateY: rotY,
              scale: 0.96,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.85,
              delay: idx * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: shell,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const handleViewInDemo = (category: SignalFilterCategory) => {
    setSelectedFeature(null);
    onSelectDemoCategory(category);
    window.setTimeout(() => {
      scrollToSectionId('demo', '#demo-board-heading');
    }, 60);
  };

  return (
    <section
      id="platform"
      ref={sectionRef}
      aria-labelledby="platform-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] border-b border-[#B9B28A]/38 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
              <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
                002 / PLATFORM
              </span>
            </div>
            <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/70 uppercase hidden sm:inline">
              THREE SIGNAL FUNCTIONS · EDITORIAL PLATES
            </span>
          </div>
          <div
            aria-hidden="true"
            className="gallery-arch-rule h-px w-full bg-[#B9B28A]/35 origin-left mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h2
                id="platform-heading"
                className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2.1rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.02em] text-balance"
              >
                EVERY SIGNAL HAS A PLACE.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="font-prose-support text-lg sm:text-xl text-[#B9B28A] leading-relaxed">
                Capture the context. See the connections. Choose the next move.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetric Three-Plate Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Dominant Left Plate (Feature 01) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <FeaturePlate
              item={FEATURE_PLATES[0]}
              featured
              onExplore={(item) => setSelectedFeature(item)}
            />
          </div>

          {/* Right Offset Vertical Stack (Feature 02 & Feature 03) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12 lg:mt-16">
            <FeaturePlate
              item={FEATURE_PLATES[1]}
              onExplore={(item) => setSelectedFeature(item)}
            />
            <FeaturePlate
              item={FEATURE_PLATES[2]}
              onExplore={(item) => setSelectedFeature(item)}
            />
          </div>
        </div>
      </div>

      {/* Accessible Feature Specification Modal */}
      <AccessibleDialog
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        kicker={
          selectedFeature
            ? `002.${selectedFeature.number} // ${selectedFeature.architectureNote}`
            : 'PLATFORM SPECIFICATION'
        }
        title={selectedFeature ? selectedFeature.title : ''}
      >
        {selectedFeature && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border border-[#B9B28A]/30 bg-[#0E100C] p-4">
              <div className="sm:col-span-5 aspect-[4/4.5] overflow-hidden border border-[#B9B28A]/25">
                <ResilientImage
                  asset={selectedFeature.asset}
                  className="h-full w-full"
                />
              </div>
              <div className="sm:col-span-7 space-y-3">
                <div className="font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                  FUNCTIONAL OVERVIEW
                </div>
                <p className="font-prose-support text-base text-[#F6F3EA] leading-relaxed">
                  {selectedFeature.description}
                </p>
                <div className="font-mono-tech text-[11px] text-[#D7D1B8]/75 uppercase tracking-[0.12em] pt-2 border-t border-[#B9B28A]/20">
                  CONCEPT MODULE · ILLUSTRATIVE ARCHITECTURE
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#B9B28A] mb-3">
                KEY SYSTEM CAPABILITIES
              </h3>
              <ul className="space-y-2.5 border-t border-[#B9B28A]/25 pt-3">
                {selectedFeature.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-prose-support text-sm sm:text-base text-[#D7D1B8]"
                  >
                    <span className="font-mono-tech text-xs text-[#B9B28A] mt-1 shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#B9B28A]/30 pt-5">
              <MagneticButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedFeature(null)}
              >
                CLOSE PANEL
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="md"
                dataTestId="modal-view-in-demo-btn"
                onClick={() => handleViewInDemo(selectedFeature.demoCategory)}
                icon={<span className="text-xs leading-none">▶</span>}
              >
                VIEW IN DEMO ({selectedFeature.demoCategory})
              </MagneticButton>
            </div>
          </div>
        )}
      </AccessibleDialog>
    </section>
  );
};
