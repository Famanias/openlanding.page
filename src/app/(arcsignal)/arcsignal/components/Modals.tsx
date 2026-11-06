'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Shield, BookOpen, Layers, Info } from 'lucide-react';
import {
  DemoRequestInput,
  validateDemoRequest,
} from '../utils/signalLogic';

export interface DemoRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestDialog: React.FC<DemoRequestDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState<DemoRequestInput>({
    name: '',
    email: '',
    company: '',
    objective: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequestInput, string>>>({});
  const [preparedDraft, setPreparedDraft] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDemoRequest(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedDraft(false);
      return;
    }
    setErrors({});
    setPreparedDraft(true);
  };

  const formattedRequestText = `Arc & Signal — Architecture Walkthrough Request (Demo Mode)
Name: ${form.name.trim()}
Work Email: ${form.email.trim()}
Team / Company: ${form.company.trim()}
Orchestration Objective: ${form.objective.trim()}`;

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedRequestText).catch(() => {});
    }
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const mailtoHref = `mailto:hello@arcandsignal.example?subject=${encodeURIComponent(
    `Arc & Signal Demo Inquiry — ${form.company.trim()}`
  )}&body=${encodeURIComponent(formattedRequestText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060811]/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#A58AFF]/45 bg-[#11172A] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(151,127,255,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#A58AFF]">
              INTERACTIVE TEMPLATE // DEMO MODE
            </span>
            <h2
              id="demo-dialog-title"
              className="font-display text-2xl font-bold uppercase tracking-tight text-[#F3F4FA] mt-1"
            >
              BOOK AN ARCHITECTURE DEMO
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo request dialog"
            className="rounded-lg border border-[#9DA7C7]/25 bg-[#171D32] p-2 text-[#9DA7C7] hover:text-[#F3F4FA] hover:border-[#A58AFF] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#9DA7C7] mb-6 leading-relaxed">
          Configure your inquiry below. Because Arc &amp; Signal is a concept platform template
          with no external booking backend connected, preparing your request generates a formatted
          brief you can copy or open as an email draft.
        </p>

        {!preparedDraft ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="demo-name"
                className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
              >
                Your Name
              </label>
              <input
                id="demo-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Elena Vance"
                className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-300" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="demo-email"
                  className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
                >
                  Work Email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="elena@company.example"
                  className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-300" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="demo-company"
                  className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
                >
                  Team / Company
                </label>
                <input
                  id="demo-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Meridian Systems"
                  className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-rose-300" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="demo-objective"
                className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
              >
                What would you like to build or orchestrate?
              </label>
              <textarea
                id="demo-objective"
                rows={3}
                value={form.objective}
                onChange={(e) => setForm({ ...form, objective: e.target.value })}
                placeholder="Multi-agent customer resolution pipeline with human review checkpoints..."
                className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
              />
              {errors.objective && (
                <p className="mt-1 text-xs text-rose-300" role="alert">
                  {errors.objective}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary cursor-pointer"
              >
                Prepare Demo Request
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#0C0F1B] border border-[#A58AFF]/40 p-4">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#D4C9FF] mb-2">
                DEMO MODE — REQUEST BRIEF PREPARED (NOT SENT TO EXTERNAL SERVER)
              </div>
              <pre className="font-mono-tech text-xs text-[#F3F4FA] whitespace-pre-wrap leading-relaxed">
                {formattedRequestText}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreparedDraft(false)}
                className="font-mono-tech text-xs text-[#9DA7C7] hover:text-[#F3F4FA] underline cursor-pointer"
              >
                Edit Details
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-outline cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#A58AFF]" />
                      <span>Copied Request</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#A58AFF]" />
                      <span>Copy Request</span>
                    </>
                  )}
                </button>

                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Create Email Draft</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export interface InfoModalProps {
  topic: 'resources' | 'documentation' | 'about' | 'privacy' | 'social' | null;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  topic,
  onClose,
  onOpenDemo,
}) => {
  useEffect(() => {
    if (!topic) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [topic, onClose]);

  if (!topic) return null;

  const contentMap = {
    resources: {
      icon: Layers,
      kicker: 'ARCHITECTURE & RESOURCES',
      title: 'Orchestration Topology Brief',
      paragraphs: [
        'Arc & Signal models intelligence workflows as deterministic, observable execution graphs rather than opaque prompt chains.',
        'Every incoming request passes through four coordinated layers: (01) Multi-Agent Orchestration, (02) Policy-Driven Model Routing, (03) Full-Trace Observability, and (04) Human-in-the-Loop Governance gates.',
      ],
      bullets: [
        'Reference Pipeline: 6-stage Customer Resolution Pipeline with staged CRM dry-run.',
        'Model Routing: Dynamic switching across Fast, Balanced, and Deep Reasoning endpoints.',
        'Zero-Trust Governance: Explicit operator approval before high-impact external mutations.',
      ],
    },
    documentation: {
      icon: BookOpen,
      kicker: 'CONCEPT DOCUMENTATION',
      title: 'Control Plane Specification',
      paragraphs: [
        'This interactive template demonstrates how enterprise AI platforms expose model routing, tool permissions, and execution traces in a unified control plane.',
        'Use the interactive controls in Section 02 (Capabilities) and Section 03 (Inside the Platform) to step through stage executions, test human approval checkpoints, and inspect sample payloads.',
      ],
      bullets: [
        'Interactive Workflow Builder: Click any stage (01–06) to inspect inputs, tools, and policies.',
        'Deterministic Simulation: Click "Run Demo" to step through trigger, retrieval, planning, and human review.',
        'Continuous Signal Architecture: Real-time 2.5D Three.js core linked to a document-spanning SVG signal path.',
      ],
    },
    about: {
      icon: Info,
      kicker: 'ABOUT ARC & SIGNAL',
      title: 'The Intelligence Orchestration Layer',
      paragraphs: [
        'Arc & Signal is a concept enterprise AI orchestration platform designed to bring models, autonomous agents, enterprise tools, and tenant data into synchronization.',
        'All metrics, execution traces, latency figures, and pipeline stages shown in this interface are deterministic client-side demonstrations built for architectural exploration.',
      ],
      bullets: [
        'Visual System: Dark obsidian canvas with engineered violet-to-cobalt routing indicators.',
        '3D Engine: Procedural 2.5D Three.js segmented core with physical materials and studio lighting.',
        'Transparent Demo Policy: No external API calls or hidden background telemetry.',
      ],
    },
    privacy: {
      icon: Shield,
      kicker: 'PRIVACY & DATA NOTICE',
      title: 'Client-Side Concept Environment',
      paragraphs: [
        'This application runs entirely in your browser as a self-contained interactive demonstration.',
        'Information entered into the Demo Request dialog is validated locally in your browser to generate a copyable request summary or mailto draft—it is never transmitted to or stored on an external database.',
      ],
      bullets: [
        'Zero external form transmission or third-party tracking scripts.',
        'All workflow traces and payloads are illustrative local fixtures.',
      ],
    },
    social: {
      icon: Info,
      kicker: 'CONCEPT TEMPLATE LINK',
      title: 'External Profile Placeholder',
      paragraphs: [
        'Arc & Signal is a fictional enterprise product template. External social links (LinkedIn / GitHub) are configured as safe local placeholders rather than linking to unrelated third-party organizations.',
        'You can connect these links to your organization’s repositories or social profiles in FinalCTASection.tsx.',
      ],
      bullets: [
        'Contact placeholder: hello@arcandsignal.example',
        'Ready for custom domain and social profile configuration.',
      ],
    },
  };

  const item = contentMap[topic];
  const Icon = item.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060811]/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#9DA7C7]/35 bg-[#11172A] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#171D32] border border-[#A58AFF]/40 flex items-center justify-center text-[#D4C9FF]">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A58AFF]">
                {item.kicker}
              </div>
              <h2
                id="info-modal-title"
                className="font-display text-xl font-bold text-[#F3F4FA]"
              >
                {item.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg border border-[#9DA7C7]/25 bg-[#171D32] p-2 text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 text-sm text-[#9DA7C7] leading-relaxed mb-5">
          {item.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <ul className="rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/20 p-4 space-y-2 text-xs text-[#F3F4FA] mb-6">
          {item.bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#A58AFF] font-mono-tech">»</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-primary cursor-pointer"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
};
