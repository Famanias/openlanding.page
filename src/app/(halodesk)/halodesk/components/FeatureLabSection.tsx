import React, { useState } from 'react';
import {
  CheckSquare,
  Calendar as CalendarIcon,
  Timer,
  StickyNote,
  Check,
  Play,
  Pause,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { formatTimerSeconds } from '../lib/plannerLogic';

export type LabTabKey = 'Tasks' | 'Calendar' | 'Focus' | 'Notes';

interface FeatureLabSectionProps {
  activeLabTab: LabTabKey;
  setActiveLabTab: (tab: LabTabKey) => void;
}

const LAB_TABS: Array<{
  id: LabTabKey;
  label: string;
  caption: string;
  icon: React.FC<{ className?: string }>;
}> = [
  {
    id: 'Tasks',
    label: 'Tasks',
    caption: 'Energy-grouped horizontal tiles',
    icon: CheckSquare,
  },
  {
    id: 'Calendar',
    label: 'Calendar',
    caption: 'Time-blocked week without clutter',
    icon: CalendarIcon,
  },
  {
    id: 'Focus',
    label: 'Focus',
    caption: 'Single-task ring & distraction shield',
    icon: Timer,
  },
  {
    id: 'Notes',
    label: 'Notes',
    caption: 'Tactile sticky notes & studio briefs',
    icon: StickyNote,
  },
];

export const FeatureLabSection: React.FC<FeatureLabSectionProps> = ({
  activeLabTab,
  setActiveLabTab,
}) => {
  // Interactive state inside the lab
  const [energyFilter, setEnergyFilter] = useState<'All' | 'Deep focus' | 'Collaborative'>('All');
  const [completedLabIds, setCompletedLabIds] = useState<string[]>(['lab-4']);
  const [selectedSlotDay, setSelectedSlotDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu'>('Tue');
  const [labFocusSeconds, setLabFocusSeconds] = useState(1500);
  const [labSoundscape, setLabSoundscape] = useState<'Silence' | 'Soft rain' | 'Warm tape'>('Silence');
  const [labNotes, setLabNotes] = useState([
    {
      id: 'n1',
      title: 'Typography scale notes',
      body: 'Keep display headlines balanced at 1.08 line-height; body prose at 16px on warm ivory.',
      tone: 'bg-[#FFF1AE]',
    },
    {
      id: 'n2',
      title: 'Thursday studio review',
      body: 'Walk through the Weekly Calendar mini-widget transitions and keyboard focus order.',
      tone: 'bg-[#DCD5F6]',
    },
    {
      id: 'n3',
      title: 'Reading list',
      body: 'Calm Technology by Amber Case · Notes on peripheral attention.',
      tone: 'bg-[#D0EFE2]',
    },
  ]);
  const [activeNoteId, setActiveNoteId] = useState('n1');

  const labTasks = [
    {
      id: 'lab-1',
      title: 'Refine onboarding motion curves',
      energy: 'Deep focus',
      time: '90 min',
      bg: 'bg-[#DCD5F6]',
    },
    {
      id: 'lab-2',
      title: 'Review layout spacing across breakpoints',
      energy: 'Deep focus',
      time: '60 min',
      bg: 'bg-[#CFDFEF]',
    },
    {
      id: 'lab-3',
      title: 'Sync with product copywriter on tone',
      energy: 'Collaborative',
      time: '30 min',
      bg: 'bg-[#F7D9CB]',
    },
    {
      id: 'lab-4',
      title: 'Export crisp SVG icon set',
      energy: 'Deep focus',
      time: '25 min',
      bg: 'bg-[#D0EFE2]',
    },
  ];

  const filteredLabTasks = labTasks.filter(
    (t) => energyFilter === 'All' || t.energy === energyFilter
  );

  const toggleLabTask = (id: string) => {
    setCompletedLabIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="lab"
      aria-labelledby="feature-lab-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      <div className="max-w-2xl space-y-3 mb-10">
        <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
          Interactive Feature Lab
        </p>
        <h2
          id="feature-lab-heading"
          className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
        >
          One calm window that reshapes around your mode of work.
        </h2>
        <p className="text-[16px] text-[#556070] leading-[1.6]">
          Switch modes below to see how the same desktop workspace recomposes its layout—fanning task bars into a weekly grid, compressing into a focus ring, or opening tactile margin notes.
        </p>
      </div>

      {/* Feature Selector Tab Strip */}
      <div
        role="tablist"
        aria-label="Workspace modes"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
      >
        {LAB_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeLabTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveLabTab(tab.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E] ${
                active
                  ? 'bg-[#29313E] text-[#FCFBF7] border-[#29313E] shadow-[0_12px_28px_-10px_rgba(41,49,62,0.28)] -translate-y-0.5'
                  : 'bg-[#FCFBF7]/85 hover:bg-[#FCFBF7] text-[#29313E] border-[#3A4453]/12'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[15px] font-semibold">{tab.label}</span>
                <Icon
                  className={`w-4 h-4 ${active ? 'text-[#DCD5F6]' : 'text-[#66717F]'}`}
                />
              </div>
              <p
                className={`text-[12.5px] leading-snug ${
                  active ? 'text-[#FCFBF7]/80' : 'text-[#66717F]'
                }`}
              >
                {tab.caption}
              </p>
            </button>
          );
        })}
      </div>

      {/* Shared Outer Software Window that Recomposes Internally */}
      <div className="halo-app-window rounded-[24px] p-5 sm:p-8 min-h-[420px] flex flex-col justify-between transition-all duration-500">
        {/* Shared Window Top Chrome */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#3A4453]/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B041]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
            </div>
            <span className="text-[13.5px] font-semibold text-[#29313E] pl-2 border-l border-[#3A4453]/15">
              Halo Desk · {activeLabTab} Workspace
            </span>
          </div>

          <div className="text-[12.5px] font-mono-tabular text-[#66717F]">
            {activeLabTab === 'Tasks' &&
              `${labTasks.length - completedLabIds.length} active · ${completedLabIds.length} completed`}
            {activeLabTab === 'Calendar' && `Viewing ${selectedSlotDay} time blocks`}
            {activeLabTab === 'Focus' && `Soundscape: ${labSoundscape}`}
            {activeLabTab === 'Notes' && `${labNotes.length} studio notes pinned`}
          </div>
        </div>

        {/* Dynamic Morphing Interior Stage */}
        <div className="py-6 flex-1 flex flex-col justify-center">
          {activeLabTab === 'Tasks' && (
            <div className="space-y-5 animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[14px] text-[#556070]">
                  Filter tasks by cognitive energy level or click any row to mark complete:
                </p>
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#ECEAF2]">
                  {(['All', 'Deep focus', 'Collaborative'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setEnergyFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                        energyFilter === filter
                          ? 'bg-white text-[#29313E] shadow-xs'
                          : 'text-[#556070] hover:text-[#29313E]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredLabTasks.map((t) => {
                  const isDone = completedLabIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleLabTask(t.id)}
                      className={`text-left p-4 rounded-xl ${t.bg} flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                        isDone ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border border-[#29313E]/30 flex items-center justify-center ${
                            isDone ? 'bg-[#29313E] text-white' : 'bg-white/70'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3" />}
                        </span>
                        <div>
                          <p
                            className={`text-[14px] font-semibold text-[#232A36] ${
                              isDone ? 'line-through' : ''
                            }`}
                          >
                            {t.title}
                          </p>
                          <p className="text-[12px] text-[#4E5A6E] mt-0.5">{t.energy}</p>
                        </div>
                      </div>
                      <span className="text-[12px] font-mono-tabular font-medium text-[#29313E] bg-white/60 px-2.5 py-1 rounded-md">
                        {t.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeLabTab === 'Calendar' && (
            <div className="space-y-5 animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-[#556070]">
                  Select a day column to inspect how tasks map onto calm time blocks:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {(
                  [
                    {
                      day: 'Mon',
                      date: 'Oct 12',
                      blocks: [
                        { title: 'Weekly intention sweep', time: '09:00', bg: 'bg-[#DCD5F6]' },
                        { title: 'Design system review', time: '10:30', bg: 'bg-[#CFDFEF]' },
                      ],
                    },
                    {
                      day: 'Tue',
                      date: 'Oct 13',
                      blocks: [
                        { title: 'Deep work: Main view', time: '09:30', bg: 'bg-[#CFDFEF]' },
                        { title: 'Editorial outline', time: '14:00', bg: 'bg-[#F7D9CB]' },
                      ],
                    },
                    {
                      day: 'Wed',
                      date: 'Oct 14',
                      blocks: [
                        { title: 'Architecture sync', time: '10:00', bg: 'bg-[#D0EFE2]' },
                        { title: 'Quiet research block', time: '13:30', bg: 'bg-[#DCD5F6]' },
                      ],
                    },
                    {
                      day: 'Thu',
                      date: 'Oct 15',
                      blocks: [
                        { title: 'Prototype polish', time: '09:00', bg: 'bg-[#F7D9CB]' },
                        { title: 'Team check-in', time: '15:00', bg: 'bg-[#D0EFE2]' },
                      ],
                    },
                  ] as const
                ).map((col) => {
                  const selected = selectedSlotDay === col.day;
                  return (
                    <div
                      key={col.day}
                      onClick={() => setSelectedSlotDay(col.day)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedSlotDay(col.day);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        selected
                          ? 'bg-white border-[#29313E]/30 shadow-md -translate-y-0.5'
                          : 'bg-white/55 border-[#3A4453]/10 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#3A4453]/10">
                        <span className="text-[13.5px] font-semibold text-[#29313E]">
                          {col.day}
                        </span>
                        <span className="text-[11.5px] font-mono-tabular text-[#66717F]">
                          {col.date}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {col.blocks.map((b, i) => (
                          <div key={i} className={`p-2.5 rounded-xl ${b.bg}`}>
                            <span className="text-[10.5px] font-mono-tabular text-[#4E5A6E]">
                              {b.time}
                            </span>
                            <p className="text-[12.5px] font-medium text-[#232A36] leading-snug mt-0.5">
                              {b.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeLabTab === 'Focus' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 border border-[#3A4453]/10">
                <span className="text-[12px] font-medium text-[#66717F]">
                  Protected Session Timer
                </span>
                <p className="text-[40px] font-semibold font-mono-tabular text-[#29313E] my-2">
                  {formatTimerSeconds(labFocusSeconds)}
                </p>
                <div className="flex items-center gap-2">
                  {[
                    { label: '25m', secs: 1500 },
                    { label: '50m', secs: 3000 },
                    { label: '15m', secs: 900 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setLabFocusSeconds(item.secs)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-mono-tabular font-medium transition-colors cursor-pointer ${
                        labFocusSeconds === item.secs
                          ? 'bg-[#29313E] text-white'
                          : 'bg-[#ECEAF2] text-[#29313E] hover:bg-[#DCD5F6]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <h3 className="text-[20px] font-semibold text-[#29313E]">
                  Distraction shield & ambient acoustic cue
                </h3>
                <p className="text-[14.5px] text-[#556070] leading-relaxed">
                  While Focus Mode is active, Halo Desk collapses your sidebar into a single priority bar and optionally plays a subtle, non-looping acoustic texture.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(['Silence', 'Soft rain', 'Warm tape'] as const).map((sound) => (
                    <button
                      key={sound}
                      type="button"
                      onClick={() => setLabSoundscape(sound)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors cursor-pointer ${
                        labSoundscape === sound
                          ? 'bg-[#CFDFEF] border-[#96BCE8] text-[#29313E]'
                          : 'bg-white/70 border-[#3A4453]/12 text-[#556070] hover:text-[#29313E]'
                      }`}
                    >
                      {sound}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeLabTab === 'Notes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-[taskSlideTrack_0.4s_ease-out]">
              {labNotes.map((note) => {
                const isSelected = activeNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-5 rounded-2xl ${note.tone} border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#29313E]/40 shadow-md -translate-y-1'
                        : 'border-black/5 opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[15px] font-semibold text-[#29313E]">{note.title}</h4>
                      <span className="text-[11px] font-mono-tabular text-[#4E5A6E]">Note</span>
                    </div>
                    <label htmlFor={`lab-note-${note.id}`} className="sr-only">
                      {note.title}
                    </label>
                    <textarea
                      id={`lab-note-${note.id}`}
                      rows={3}
                      value={note.body}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLabNotes((prev) =>
                          prev.map((n) => (n.id === note.id ? { ...n, body: val } : n))
                        );
                      }}
                      className="w-full bg-transparent text-[13.5px] text-[#29313E] leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
