import React, { useState, useEffect, useRef } from 'react';
import {
  Inbox,
  Calendar as CalendarIcon,
  Folder,
  FileText,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Check,
  Undo2,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  PlannerTask,
  SidebarTab,
  TaskCategory,
  WeekdayKey,
  createQuickTask,
  toggleTaskCompletion,
  formatTimerSeconds,
  computeTimerProgress,
  INITIAL_TASKS,
} from '../lib/plannerLogic';

interface HeroDesktopAppProps {
  tasks: PlannerTask[];
  setTasks: React.Dispatch<React.SetStateAction<PlannerTask[]>>;
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: (tab: SidebarTab) => void;
  highlightedFeature?: 'Tasks' | 'Calendar' | 'Focus Mode' | 'Notes' | null;
}

const SIDEBAR_ITEMS: Array<{ id: SidebarTab; label: string; icon: React.FC<{ className?: string }> }> = [
  { id: 'Inbox', label: 'Inbox', icon: Inbox },
  { id: 'Today', label: 'Today', icon: CalendarIcon },
  { id: 'Projects', label: 'Projects', icon: Folder },
  { id: 'Calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'Notes', label: 'Notes', icon: FileText },
];

const WEEKDAYS: WeekdayKey[] = ['Mon', 'Ton', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MINI_WEEK_DAYS = [
  { short: 'M', key: 'Mon' as WeekdayKey, fillClass: 'bg-[#DCD5F6]/70', topDot: true },
  { short: 'T', key: 'Ton' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'W', key: 'Tue' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'T', key: 'Wed' as WeekdayKey, fillClass: 'bg-[#4E5A6E]', topDot: true, isFocusDay: true },
  { short: 'F', key: 'Thu' as WeekdayKey, fillClass: 'bg-[#AEE4CE]', topDot: true },
  { short: 'S', key: 'Fri' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'S', key: 'Sat' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
];

const CATEGORY_STYLES: Record<
  TaskCategory,
  {
    cardBg: string;
    dotBg: string;
    dotBorder: string;
    badgeBg: string;
    label: string;
  }
> = {
  lavender: {
    cardBg: 'bg-[#DFD5FA] hover:bg-[#D7CBF8]',
    dotBg: 'bg-[#DFD5FA]',
    dotBorder: 'border-[#B9A9E8]',
    badgeBg: 'bg-[#C9BBF2]/60 text-[#29313E]',
    label: 'Design & Review',
  },
  powder: {
    cardBg: 'bg-[#C3DCF9] hover:bg-[#B8D4F6]',
    dotBg: 'bg-[#C3DCF9]',
    dotBorder: 'border-[#96BCE8]',
    badgeBg: 'bg-[#A8CBF2]/60 text-[#29313E]',
    label: 'Deep Work',
  },
  peach: {
    cardBg: 'bg-[#F8D6C5] hover:bg-[#F5CCBA]',
    dotBg: 'bg-[#F8D6C5]',
    dotBorder: 'border-[#E2B29B]',
    badgeBg: 'bg-[#F0C1AA]/60 text-[#29313E]',
    label: 'Writing & Editorial',
  },
  mint: {
    cardBg: 'bg-[#C7EFE1] hover:bg-[#BBEAD9]',
    dotBg: 'bg-[#C7EFE1]',
    dotBorder: 'border-[#95D3BD]',
    badgeBg: 'bg-[#AEE4CE]/60 text-[#29313E]',
    label: 'Team Sync',
  },
};

export const HeroDesktopApp: React.FC<HeroDesktopAppProps> = ({
  tasks,
  setTasks,
  activeSidebarTab,
  setActiveSidebarTab,
  highlightedFeature,
}) => {
  const [selectedWeekday, setSelectedWeekday] = useState<WeekdayKey>('Ton');
  const [selectedMiniDayIndex, setSelectedMiniDayIndex] = useState<number>(3);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [lastCompletedTask, setLastCompletedTask] = useState<PlannerTask | null>(null);

  // Search and Window Menu
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Quick Task Creator state
  const [quickTaskOpen, setQuickTaskOpen] = useState(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskCategory, setQuickTaskCategory] = useState<TaskCategory>('lavender');
  const [quickTaskError, setQuickTaskError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Focus Timer state (25:00 = 1500 seconds)
  const [timerDuration, setTimerDuration] = useState(1500);
  const [remainingSeconds, setRemainingSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMenuOpen, setTimerMenuOpen] = useState(false);

  // Sticky Note state
  const [stickyText, setStickyText] = useState('To-do: Review\nproject draft');
  const [stickyEditing, setStickyEditing] = useState(false);
  const [stickyFolded, setStickyFolded] = useState(false);

  // Subtle pointer depth response
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          setLiveAnnouncement('Focus session complete. Take a calm breath.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({
      x: Number((normX * 6).toFixed(2)),
      y: Number((normY * 5).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // Filter tasks based on sidebar tab, weekday, and search
  const visibleTasks = tasks.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q);
    }
    if (activeSidebarTab === 'Today') {
      return t.tab === 'Today';
    }
    return t.tab === activeSidebarTab;
  });

  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createQuickTask(
      tasks,
      quickTaskTitle,
      quickTaskCategory,
      selectedWeekday,
      activeSidebarTab === 'Notes' ? 'Today' : activeSidebarTab
    );
    if (result.error) {
      setQuickTaskError(result.error);
      return;
    }
    setTasks(result.tasks);
    setQuickTaskTitle('');
    setQuickTaskError(null);
    setQuickTaskOpen(false);
    if (result.created) {
      setLiveAnnouncement(`Added task "${result.created.title}" to ${activeSidebarTab}.`);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    const result = toggleTaskCompletion(tasks, taskId);
    setTasks(result.tasks);
    if (result.changedTask) {
      if (result.changedTask.completed) {
        setLastCompletedTask(result.changedTask);
        setLiveAnnouncement(`Completed "${result.changedTask.title}". Undo available.`);
      } else {
        setLastCompletedTask(null);
        setLiveAnnouncement(`Restored "${result.changedTask.title}" to active tasks.`);
      }
    }
  };

  const progress = computeTimerProgress(remainingSeconds, timerDuration);
  const circleRadius = 56;
  const circleCircumference = 2 * Math.PI * circleRadius;
  // When timer hasn't elapsed yet (25:00), show the signature ~32% top-right arc from reference; as it runs, progress around full circle
  const displayedRatio =
    remainingSeconds === timerDuration && !timerRunning ? 0.32 : Math.max(0.12, 1 - progress * 0.88);
  const strokeDashoffset = circleCircumference * (1 - displayedRatio);

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative w-full select-none"
      aria-label="Halo Desk interactive desktop workspace preview"
    >
      {/* Screen-reader polite announcer for task & timer changes */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Main Desktop Window Container */}
      <div
        style={{
          transform: `translate3d(${pointerOffset.x * 0.35}px, ${pointerOffset.y * 0.35}px, 0)`,
        }}
        className="halo-app-window animate-window-unfold relative rounded-[20px] w-full min-h-[455px] transition-transform duration-300 ease-out overflow-visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[455px] rounded-[20px] overflow-hidden">
          {/* Left Navigation Rail */}
          <aside
            aria-label="Workspace sections"
            className="sm:col-span-3 bg-[#F4F2F7]/90 border-b sm:border-b-0 sm:border-r border-[#3A4453]/10 p-4 flex flex-col justify-between"
          >
            <div>
              {/* Traffic Light Window Dots */}
              <div className="flex items-center gap-2 px-1.5 pt-0.5 pb-5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5B041]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
              </div>

              {/* Sidebar Nav Buttons */}
              <nav aria-label="Planner views" className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {SIDEBAR_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarTab === item.id;
                  const isHighlighted =
                    (highlightedFeature === 'Tasks' && item.id === 'Today') ||
                    (highlightedFeature === 'Calendar' && item.id === 'Calendar') ||
                    (highlightedFeature === 'Notes' && item.id === 'Notes');

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSidebarTab(item.id);
                        setExpandedTaskId(null);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex items-center justify-between gap-2 px-2.5 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#E2DFEC] text-[#29313E] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
                          : 'text-[#596475] hover:bg-[#EAE7F2]/60 hover:text-[#29313E]'
                      } ${isHighlighted ? 'ring-2 ring-[#6C798F]/50' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#66717F] group-hover:text-[#29313E] shrink-0" />
                        <span>{item.label}</span>
                      </span>
                      {item.id === 'Today' && (
                        <span className="text-[11px] font-mono-tabular text-[#66717F]">
                          {tasks.filter((t) => t.tab === 'Today' && !t.completed).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden sm:block h-12" aria-hidden="true" />
          </aside>

          {/* Center Main Planner Column */}
          <div className="sm:col-span-6 bg-[#FAF9FC]/95 p-5 sm:px-5 sm:py-5 flex flex-col justify-between relative">
            {/* Subtle scrollbar thumb on right edge of center pane matching reference */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute right-1 top-16 h-24 w-[3px] rounded-full bg-[#3A4453]/15"
            />
            <div>
              {/* Planner Header Row */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h2 className="text-[16.5px] font-semibold tracking-[-0.015em] text-[#29313E]">
                  {activeSidebarTab === 'Today'
                    ? 'My Daily Planner'
                    : activeSidebarTab === 'Notes'
                    ? 'Studio Notes & Drafts'
                    : `${activeSidebarTab} View`}
                </h2>

                <div className="flex items-center gap-1 relative">
                  <button
                    type="button"
                    aria-label="Filter planner tasks"
                    aria-expanded={searchOpen}
                    onClick={() => setSearchOpen((prev) => !prev)}
                    className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Planner options"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-8 z-30 w-44 rounded-xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-lg p-1.5 text-[12.5px]">
                      <button
                        type="button"
                        onClick={() => {
                          setTasks(INITIAL_TASKS);
                          setLastCompletedTask(null);
                          setMenuOpen(false);
                          setLiveAnnouncement('Reset planner tasks to default demo state.');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#DCD5F6]/40 text-[#29313E] cursor-pointer"
                      >
                        Reset demo tasks
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickTaskOpen(true);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#DCD5F6]/40 text-[#29313E] cursor-pointer"
                      >
                        New task…
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional live search bar */}
              {searchOpen && (
                <div className="mb-3 flex items-center gap-2 bg-white/90 border border-[#3A4453]/15 rounded-lg px-2.5 py-1.5">
                  <Search className="w-3.5 h-3.5 text-[#66717F] shrink-0" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter tasks by title..."
                    aria-label="Filter tasks by title"
                    className="w-full text-[12.5px] bg-transparent text-[#29313E] placeholder:text-[#66717F] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery('')}
                      className="text-[#66717F] hover:text-[#29313E]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Weekday Strip matching reference: Mon Ton Tue Wed Thu Fri Sat */}
              <div
                role="tablist"
                aria-label="Select day of week"
                className="flex items-center justify-between gap-0.5 mb-4"
              >
                {WEEKDAYS.map((day) => {
                  const active = selectedWeekday === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedWeekday(day)}
                      className={`px-2 py-0.5 rounded-full text-[11.5px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#E5E2EE] text-[#29313E] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                          : 'text-[#66717F] hover:text-[#29313E]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Notes Tab View vs Task Timeline View */}
              {activeSidebarTab === 'Notes' ? (
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#FFF6C7]/80 border border-[#E5D68A]/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12.5px] font-semibold text-[#29313E]">
                        Synced Sticky Note
                      </span>
                      <span className="text-[11px] text-[#66717F]">Updated just now</span>
                    </div>
                    <label htmlFor="notes-tab-textarea" className="sr-only">
                      Studio note content
                    </label>
                    <textarea
                      id="notes-tab-textarea"
                      rows={4}
                      value={stickyText}
                      onChange={(e) => setStickyText(e.target.value)}
                      className="w-full bg-transparent text-[13px] text-[#29313E] leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#DFD5FA]/45 border border-[#B9A9E8]/30">
                    <p className="text-[12.5px] font-medium text-[#29313E]">
                      Design principle note
                    </p>
                    <p className="text-[12px] text-[#596475] mt-1 leading-relaxed">
                      Keep morning blocks free of status meetings so deep work happens before context switching begins.
                    </p>
                  </div>
                </div>
              ) : (
                /* Timeline & Horizontally Stretched Pastel Task Tiles */
                <div className="relative pl-5 space-y-2.5">
                  {/* Subtle vertical timeline line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[6px] top-3 bottom-3 w-[1px] bg-[#3A4453]/12"
                  />

                  {visibleTasks.map((task, idx) => {
                    const style = CATEGORY_STYLES[task.category];
                    const isExpanded = expandedTaskId === task.id;
                    const rowAnimClass =
                      idx === 0
                        ? 'animate-task-row-1'
                        : idx === 1
                        ? 'animate-task-row-2'
                        : idx === 2
                        ? 'animate-task-row-3'
                        : 'animate-task-row-4';

                    return (
                      <div key={task.id} className={`relative ${rowAnimClass}`}>
                        {/* Timeline circular node */}
                        <button
                          type="button"
                          aria-label={
                            task.completed
                              ? `Mark "${task.title}" as incomplete`
                              : `Complete "${task.title}"`
                          }
                          onClick={() => handleToggleComplete(task.id)}
                          className={`absolute -left-5 top-3.5 w-3.5 h-3.5 rounded-full border ${style.dotBorder} ${style.dotBg} flex items-center justify-center transition-transform duration-150 hover:scale-125 cursor-pointer`}
                        >
                          {task.completed && <Check className="w-2.5 h-2.5 text-[#29313E]" />}
                        </button>

                        {/* Pastel Task Tile */}
                        <div
                          className={`rounded-[11px] transition-all duration-200 ${style.cardBg} ${
                            task.completed ? 'opacity-60' : ''
                          } shadow-[0_2px_6px_rgba(41,49,62,0.04)] hover:-translate-y-[1px] hover:shadow-[0_6px_14px_rgba(41,49,62,0.08)]`}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedTaskId((prev) => (prev === task.id ? null : task.id))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setExpandedTaskId((prev) => (prev === task.id ? null : task.id));
                              }
                            }}
                            className="w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer rounded-[11px] focus-visible:outline-2 focus-visible:outline-[#29313E]"
                          >
                            <div className="min-w-0">
                              <p
                                className={`text-[13.5px] font-medium text-[#232A36] leading-snug truncate ${
                                  task.completed ? 'line-through' : ''
                                }`}
                              >
                                {task.title}
                              </p>
                              <p className="text-[11.5px] text-[#556070] mt-0.5 truncate">
                                {selectedWeekday !== 'Ton' && task.subtitle === 'Today'
                                  ? `${selectedWeekday} · ${task.duration}`
                                  : task.subtitle}
                              </p>
                            </div>

                            {/* Avatars cluster on first task matching screenshot */}
                            {task.hasAvatars && (
                              <div className="flex items-center -space-x-1.5 shrink-0 self-end">
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#F5D0C5] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  M
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#C7EFE1] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  L
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#FFF1AE] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  A
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Inline Expanded Task Details Drawer */}
                          {isExpanded && (
                            <div className="px-3.5 pb-3 pt-1 border-t border-[#29313E]/10 text-[12px] text-[#3A4453] space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-[#556070]">
                                <span>
                                  {task.energy} · {task.duration}
                                </span>
                                <span>{style.label}</span>
                              </div>
                              <p className="leading-relaxed text-[#29313E]/90">{task.notes}</p>
                              <div className="flex items-center justify-between pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleToggleComplete(task.id)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/80 hover:bg-white text-[#29313E] font-medium text-[11.5px] transition-colors cursor-pointer"
                                >
                                  <Check className="w-3 h-3" />
                                  {task.completed ? 'Mark active' : 'Complete task'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTimerDuration(25 * 60);
                                    setRemainingSeconds(25 * 60);
                                    setTimerRunning(true);
                                    setLiveAnnouncement(`Started 25-minute focus timer for ${task.title}`);
                                  }}
                                  className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#29313E] hover:underline cursor-pointer"
                                >
                                  <Clock className="w-3 h-3" />
                                  Focus 25m
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {visibleTasks.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-[13px] text-[#66717F]">No tasks match your filter.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveSidebarTab('Today');
                        }}
                        className="mt-2 text-[12px] font-medium text-[#29313E] underline cursor-pointer"
                      >
                        Show Today’s tasks
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Undo Banner when a task is completed */}
            {lastCompletedTask && (
              <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#29313E] text-[#FCFBF7] text-[11.5px] flex items-center justify-between">
                <span className="truncate">Completed “{lastCompletedTask.title}”</span>
                <button
                  type="button"
                  onClick={() => handleToggleComplete(lastCompletedTask.id)}
                  className="inline-flex items-center gap-1 font-medium text-[#FFF1AE] hover:underline ml-2 shrink-0 cursor-pointer"
                >
                  <Undo2 className="w-3 h-3" />
                  Undo
                </button>
              </div>
            )}
          </div>

          {/* Right Widget Dock Column (inside window on mobile, overlapped by floating widgets on desktop) */}
          <div className="sm:col-span-3 bg-[#F4F2F7]/65 border-t sm:border-t-0 sm:border-l border-[#3A4453]/10 p-3.5 flex flex-col gap-3">
            {/* Weekly Calendar Mini-Window */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x * -0.45}px, ${pointerOffset.y * -0.35}px, 0)`,
              }}
              className={`halo-widget-surface animate-widget-calendar rounded-[15px] p-3.5 transition-transform duration-300 ${
                highlightedFeature === 'Calendar' ? 'ring-2 ring-[#6C798F]' : ''
              }`}
            >
              <p className="text-[12px] font-semibold text-[#29313E] mb-2">Weekly Calendar</p>

              {/* M T W T F S S header + vertical pill bars */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {MINI_WEEK_DAYS.map((d, idx) => {
                  const isSelected = selectedMiniDayIndex === idx;
                  return (
                    <button
                      key={`${d.short}-${idx}`}
                      type="button"
                      aria-label={`Select ${d.key} in weekly calendar`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedMiniDayIndex(idx);
                        setSelectedWeekday(d.key);
                      }}
                      className="flex flex-col items-center gap-1 group cursor-pointer focus-visible:outline-1 focus-visible:outline-[#29313E] rounded"
                    >
                      <span className="text-[10px] font-medium text-[#66717F] group-hover:text-[#29313E]">
                        {d.short}
                      </span>
                      <span
                        className={`w-full h-6 rounded-[5px] transition-all flex items-start justify-center pt-1 ${
                          isSelected
                            ? 'bg-[#4E5A6E] shadow-sm scale-105'
                            : idx === 4
                            ? 'bg-[#AEE4CE]'
                            : idx === 0
                            ? 'bg-[#DCD5F6]'
                            : 'bg-[#E6E8F0] group-hover:bg-[#D8DCE8]'
                        }`}
                      >
                        {d.topDot && (
                          <span
                            className={`w-1.5 h-0.5 rounded-full ${
                              isSelected ? 'bg-white/80' : 'bg-[#66717F]/50'
                            }`}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dark pill badge: Focus active */}
              <div className="mt-2.5 flex justify-center">
                <div className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3A4352] text-[#FCFBF7] text-[10.5px] font-medium shadow-sm">
                  <span
                    aria-hidden="true"
                    className=" -top-1 left-1/2 -translate-x-1/2 absolute w-2 h-2 rotate-45 bg-[#3A4352]"
                  />
                  <Sparkles className="w-2.5 h-2.5 text-[#D0EFE2] relative z-10" />
                  <span className="relative z-10">
                    {timerRunning ? 'Timer running' : 'Focus active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Focus Timer Ring Mini-Window */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x * -0.5}px, ${pointerOffset.y * -0.4}px, 0)`,
              }}
              className={`halo-widget-surface rounded-[16px] p-3.5 relative flex flex-col items-center justify-center transition-transform duration-300 ${
                highlightedFeature === 'Focus Mode' ? 'ring-2 ring-[#6C798F]' : ''
              }`}
            >
              {/* Top-right 3-dots timer preset button */}
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  aria-label="Focus timer presets"
                  aria-expanded={timerMenuOpen}
                  onClick={() => setTimerMenuOpen((prev) => !prev)}
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 cursor-pointer"
                >
                  <MoreHorizontal className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>

              {timerMenuOpen && (
                <div className="absolute right-2 top-8 z-30 w-32 rounded-xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-lg p-1 text-[11.5px]">
                  {[
                    { label: '25:00 Focus', secs: 1500 },
                    { label: '15:00 Sprint', secs: 900 },
                    { label: '05:00 Breather', secs: 300 },
                  ].map((preset) => (
                    <button
                      key={preset.secs}
                      type="button"
                      onClick={() => {
                        setTimerDuration(preset.secs);
                        setRemainingSeconds(preset.secs);
                        setTimerRunning(false);
                        setTimerMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-md hover:bg-[#CFDFEF]/50 text-[#29313E] cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setRemainingSeconds(timerDuration);
                      setTimerRunning(false);
                      setTimerMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1 rounded-md hover:bg-[#F7D9CB]/50 text-[#29313E] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              )}

              {/* Circular SVG Timer Ring */}
              <div className="relative w-32 h-32 flex items-center justify-center -mt-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    stroke="#DCE0E9"
                    strokeWidth="6.5"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    stroke="#6F7D95"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10.5px] font-medium text-[#66717F]">Focus Timer</span>
                  <span className="text-[22px] font-semibold font-mono-tabular tracking-tight text-[#29313E] leading-tight my-0.5">
                    {formatTimerSeconds(remainingSeconds)}
                  </span>

                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      type="button"
                      aria-label={timerRunning ? 'Pause focus timer' : 'Start focus timer'}
                      aria-pressed={timerRunning}
                      onClick={() => setTimerRunning((prev) => !prev)}
                      className="w-7 h-7 rounded-full bg-[#6C798F] hover:bg-[#566276] active:scale-95 text-white inline-flex items-center justify-center shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
                    >
                      {timerRunning ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 translate-x-[0.5px]" />
                      )}
                    </button>

                    {remainingSeconds !== timerDuration && (
                      <button
                        type="button"
                        aria-label="Reset focus timer"
                        onClick={() => {
                          setTimerRunning(false);
                          setRemainingSeconds(timerDuration);
                        }}
                        className="w-6 h-6 rounded-full bg-[#E5E8F0] hover:bg-[#D5DAE6] text-[#29313E] inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bottom-Left Stacked "+ Quick Task" Chip */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * -0.6}px, ${pointerOffset.y * 0.4}px, 0)`,
          }}
          className="animate-widget-quicktask sm:absolute sm:-left-5 sm:bottom-5 z-20 mt-3 sm:mt-0 px-3 sm:px-0"
        >
          {!quickTaskOpen ? (
            <div className="relative inline-block">
              {/* Stacked paper layers underneath matching reference */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-2.5 left-2 right-2 h-8 rounded-[11px] bg-[#ECEAEF]/85 border border-white/70 shadow-sm"
              />
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-1.5 left-1 right-1 h-8 rounded-[11px] bg-[#F4F3F7]/90 border border-white/80 shadow-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setQuickTaskOpen(true);
                  setQuickTaskError(null);
                }}
                className="relative flex items-center gap-2 px-4 py-2.5 min-w-[144px] rounded-[11px] bg-[#FAF9FC] hover:bg-white text-[#29313E] text-[13px] font-medium border border-white shadow-[0_10px_24px_-6px_rgba(41,49,62,0.16)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E]"
              >
                <Plus className="w-3.5 h-3.5 text-[#596475]" />
                <span>Quick Task</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleAddQuickTask}
              className="w-full sm:w-64 p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-[0_18px_38px_-10px_rgba(41,49,62,0.22)] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <label
                  htmlFor="hero-quick-task-input"
                  className="text-[12px] font-semibold text-[#29313E]"
                >
                  New Quick Task
                </label>
                <button
                  type="button"
                  aria-label="Cancel quick task"
                  onClick={() => {
                    setQuickTaskOpen(false);
                    setQuickTaskError(null);
                  }}
                  className="text-[#66717F] hover:text-[#29313E] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                id="hero-quick-task-input"
                type="text"
                value={quickTaskTitle}
                onChange={(e) => {
                  setQuickTaskTitle(e.target.value);
                  if (quickTaskError) setQuickTaskError(null);
                }}
                placeholder="e.g. Draft quarterly roadmap"
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#3A4453]/20 text-[12.5px] text-[#29313E] placeholder:text-[#66717F]/70 focus:outline-2 focus:outline-[#6C798F]"
              />

              {quickTaskError && (
                <p role="alert" className="text-[11px] text-[#B84A39] leading-tight">
                  {quickTaskError}
                </p>
              )}

              {/* Category selector pills */}
              <div className="flex items-center justify-between gap-1 pt-0.5">
                {(['lavender', 'powder', 'peach', 'mint'] as TaskCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-label={`Color category ${cat}`}
                    aria-pressed={quickTaskCategory === cat}
                    onClick={() => setQuickTaskCategory(cat)}
                    className={`h-5 flex-1 rounded-md border transition-transform cursor-pointer ${
                      CATEGORY_STYLES[cat].dotBg
                    } ${
                      quickTaskCategory === cat
                        ? 'border-[#29313E] scale-105'
                        : 'border-transparent opacity-75'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#29313E] hover:bg-[#3A4556] text-white text-[12px] font-medium transition-colors cursor-pointer"
                >
                  Add to Planner
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Floating Bottom-Right Pale-Yellow Sticky Note */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * -0.7}px, ${pointerOffset.y * -0.5}px, 0) rotate(2deg)`,
          }}
          className={`animate-widget-sticky sm:absolute sm:right-3 sm:-bottom-6 z-20 mt-3 sm:mt-0 mx-3 sm:mx-0 sm:w-[154px] rounded-[4px] sticky-note-paper p-3.5 relative ${
            highlightedFeature === 'Notes' ? 'ring-2 ring-[#29313E]' : ''
          }`}
        >
          {/* Subtle top adhesive strip */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-2.5 bg-[#F2DF8D]/55 rounded-t-[4px]"
          />

          {stickyEditing ? (
            <div className="pt-1">
              <label htmlFor="sticky-note-editor" className="sr-only">
                Edit sticky note
              </label>
              <textarea
                id="sticky-note-editor"
                rows={3}
                value={stickyText}
                onChange={(e) => setStickyText(e.target.value)}
                onBlur={() => setStickyEditing(false)}
                autoFocus
                className="w-full bg-transparent text-[13px] font-medium text-[#2E3440] leading-snug resize-none focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStickyEditing(false)}
                  className="text-[10.5px] font-semibold text-[#29313E] underline cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setStickyEditing(true)}
                aria-label="Edit sticky note text"
                className="w-full text-left text-[13.5px] font-normal text-[#2E3440] leading-[1.35] whitespace-pre-line cursor-pointer focus-visible:outline-1 focus-visible:outline-[#29313E]"
              >
                {stickyText}
              </button>
              <div className="mt-4 flex items-center justify-between text-[10px] text-[#6B633B]">
                <span>Click to edit</span>
                <button
                  type="button"
                  aria-label="Toggle sticky note corner fold"
                  aria-pressed={stickyFolded}
                  onClick={() => setStickyFolded((prev) => !prev)}
                  className="hover:underline cursor-pointer"
                >
                  {stickyFolded ? 'Unfold' : 'Pin'}
                </button>
              </div>
            </div>
          )}

          {/* Realistic folded bottom-right corner */}
          <div
            aria-hidden="true"
            className={`absolute bottom-0 right-0 transition-all duration-200 ${
              stickyFolded
                ? 'w-5 h-5 bg-gradient-to-tl from-[#E0CA72] via-[#EBD888] to-transparent rounded-tl-md shadow-sm'
                : 'w-2.5 h-2.5 bg-gradient-to-tl from-[#E5D07E] to-transparent'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
