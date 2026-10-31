'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Check, CheckCheck, FileText, Mail, Mic, Play, ShieldCheck, Sparkles, ListChecks } from 'lucide-react';
import { WORKSPACE_SCENARIOS, getStageCaption, type WorkspaceStageId, type ProcessingSubStep } from '../utils/workflowLogic';
import { WorkspacePlaybackController } from '../motion/workspacePlayback';
import { useMotionPreferences } from '../motion/useMotionPreferences';

const icons = { emails: Mail, documents: FileText, tasks: ListChecks, notes: Mic };
const stages = [{ id: 'input', label: '01 Input' }, { id: 'processing', label: '02 AI Processing' }, { id: 'output', label: '03 Output' }] as const;

export function GlassWorkspace({ introConsumedRef }: { introConsumedRef?: RefObject<boolean> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const entrances = useRef<(HTMLDivElement | null)[]>([]);
  const playbackRef = useRef<WorkspacePlaybackController | null>(null);
  if (!playbackRef.current) playbackRef.current = new WorkspacePlaybackController(introConsumedRef);
  const [scenarioId, setScenarioId] = useState('emails');
  const [step, setStep] = useState<ProcessingSubStep>('route');
  const [selected, setSelected] = useState<WorkspaceStageId | null>(null);
  const [playing, setPlaying] = useState(false);
  const prefs = useMotionPreferences();
  const scenario = WORKSPACE_SCENARIOS.find((item) => item.id === scenarioId) ?? WORKSPACE_SCENARIOS[0];
  const SourceIcon = icons[scenarioId as keyof typeof icons] ?? Mail;

  const run = useCallback((id: string) => {
    const playback = playbackRef.current;
    if (!playback) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      playback.consumeIntro(); setStep('route'); setPlaying(false); return;
    }
    setPlaying(true);
    setStep('classify');
    playback.startPlayback(id, setStep, () => { setPlaying(false); setStep('route'); });
  }, []);

  useEffect(() => {
    if (!prefs.ready) return;
    const playback = playbackRef.current!;
    if (prefs.prefersReducedMotion) {
      playback.cancelPlayback('reduced-motion');
      playback.consumeIntro();
      return;
    }
    let context: gsap.Context | undefined;
    let introStarted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || !playback.shouldPlayIntro() || introStarted) return;
      introStarted = true;
      observer.disconnect();
      context = gsap.context(() => {
        gsap.fromTo(entrances.current.filter(Boolean),
          { y: 70, rotationX: -12, scale: 0.88, opacity: 0 },
          { y: 0, rotationX: 0, scale: 1, opacity: 1, stagger: 0.16, duration: 1.05, ease: 'expo.out', clearProps: 'transform,opacity' });
        run('emails');
      }, rootRef);
    }, { threshold: 0.2 });
    if (rootRef.current) observer.observe(rootRef.current);
    const suspend = () => {
      if (document.hidden) {
        playback.cancelPlayback('document-hidden'); playback.consumeIntro();
        setPlaying(false); setStep('route');
      }
    };
    const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => {
      if (!reducedQuery.matches) return;
      playback.cancelPlayback('reduced-motion'); playback.consumeIntro();
      setPlaying(false); setStep('route');
    };
    document.addEventListener('visibilitychange', suspend);
    reducedQuery.addEventListener('change', reduce);
    return () => {
      observer.disconnect(); context?.revert(); playback.dispose(false);
      document.removeEventListener('visibilitychange', suspend);
      reducedQuery.removeEventListener('change', reduce);
    };
  }, [prefs.ready, prefs.prefersReducedMotion, run]);

  const inspect = (id: WorkspaceStageId) => {
    playbackRef.current?.cancelPlayback('user-stage-select');
    playbackRef.current?.consumeIntro();
    setPlaying(false);
    setSelected((old) => old === id ? null : id);
  };
  const selectSource = (id: string) => {
    playbackRef.current?.cancelPlayback('user-scenario-change');
    playbackRef.current?.consumeIntro();
    setScenarioId(id); setStep('classify'); setSelected('input'); setPlaying(false);
  };

  return (
    <div ref={rootRef} className="lm-workspace" data-playing={playing} data-step={step}>
      <div className="lm-workspace-meta">
        <span><span className="lm-live-dot" /> A little structure changes everything.</span>
        <button type="button" onClick={() => { setSelected(null); run(scenarioId); }} className="lm-replay"><Play size={12} aria-hidden="true" />{playing ? 'Restarting Demo' : 'Replay Demo'}</button>
      </div>
      <div className="lm-workspace-stage">
        <div className="lm-orbit lm-orbit--one" aria-hidden="true" />
        <div className="lm-orbit lm-orbit--two" aria-hidden="true" />
        <div className="lm-workspace-plane workspace-tilt-plane">
          <svg className="lm-workspace-connectors" viewBox="0 0 600 600" fill="none" aria-hidden="true">
            <defs><linearGradient id="lm-workflow-ray"><stop stopColor="#8E7CE8" /><stop offset="1" stopColor="#5BA59A" /></linearGradient></defs>
            <path className="lm-connector-base" d="M185 160 C185 220 420 140 420 235 M420 370 C420 430 180 375 180 455" />
            <path className="lm-connector-signal" d="M185 160 C185 220 420 140 420 235 M420 370 C420 430 180 375 180 455" />
          </svg>
          <div className="lm-workspace-float lm-workspace-float--input">
            <div ref={(node) => { entrances.current[0] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--input" data-selected={selected === 'input'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('input')} aria-pressed={selected === 'input'}><span className="lm-panel-number">01</span> Incoming work</button><SourceIcon size={16} aria-hidden="true" /></div>
                <div className="lm-source-tabs" role="group" aria-label="Choose a workflow source">
                  {WORKSPACE_SCENARIOS.map((item) => {
                    const Icon = icons[item.id as keyof typeof icons] ?? Mail;
                    return <button type="button" key={item.id} aria-pressed={scenarioId === item.id} onClick={() => selectSource(item.id)}><Icon size={13} aria-hidden="true" /><span>{item.categoryLabel}</span></button>;
                  })}
                </div>
                <div className="lm-source-content" key={scenarioId}><p>{scenario.title}</p><span>{scenario.sourceMeta}</span></div>
                <div className="lm-source-bottom"><span className="lm-live-dot" /> Unstructured input <ArrowDown size={12} aria-hidden="true" /></div>
              </div>
            </div>
          </div>
          <div className="lm-workspace-float lm-workspace-float--processing">
            <div ref={(node) => { entrances.current[1] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--processing" data-selected={selected === 'processing'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('processing')} aria-pressed={selected === 'processing'}><span className="lm-panel-number">02</span> A clearer process</button><Sparkles size={16} aria-hidden="true" /></div>
                <div className="lm-process-steps">
                  {(['classify', 'summarize', 'route'] as const).map((id, i) => (
                    <button key={id} type="button" data-active={step === id} aria-pressed={step === id} onClick={() => { playbackRef.current?.cancelPlayback('user-stage-select'); playbackRef.current?.consumeIntro(); setStep(id); setPlaying(false); }}>
                      <span className="lm-step-check">{step === id ? <ArrowUpRight size={12} /> : <Check size={11} />}</span>
                      <span><strong>{['Classify', 'Summarize', 'Route'][i]}</strong><small>{id === 'classify' ? scenario.classification.intent : id === 'summarize' ? scenario.summaryBullets[0] : scenario.routeDestination}</small></span>
                    </button>
                  ))}
                </div>
                <div className="lm-processing-footer"><span className="lm-processing-meter"><i /><i /><i /><i /><i /></span><span>AI-assisted. Human-directed.</span></div>
              </div>
            </div>
          </div>
          <div className="lm-workspace-float lm-workspace-float--output">
            <div ref={(node) => { entrances.current[2] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--output" data-selected={selected === 'output'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('output')} aria-pressed={selected === 'output'}><span className="lm-panel-number">03</span> Ready for your judgment</button><CheckCheck size={17} aria-hidden="true" /></div>
                <div className="lm-output-title" key={scenarioId}><span>STRUCTURED OUTPUT</span><p>{scenario.outputDraft.summaryTitle}</p></div>
                <div className="lm-output-review"><ShieldCheck size={16} aria-hidden="true" /><span>{scenario.outputDraft.reviewStatus}</span></div>
              </div>
            </div>
          </div>
          <span className="lm-workspace-coordinate" aria-hidden="true">LUMEN / WORKFLOW 001</span>
        </div>
      </div>
      <div className="lm-workspace-controls" role="group" aria-label="Inspect workflow stage">
        {stages.map((stage) => <button type="button" key={stage.id} onClick={() => inspect(stage.id)} aria-pressed={selected === stage.id}>{stage.label}</button>)}
      </div>
      <p className="lm-workspace-caption" aria-live="polite">{getStageCaption(selected)}</p>
    </div>
  );
}
