"use client";
import { useRef, useState, type FormEvent } from "react";
import { FAQ, SUGGESTED } from "../content/faq";
import { Mark } from "../brand/Logo";
import { useSheet } from "../dock/useSheet";
import { answer } from "./answer";

type Line = { id: number; who: "you" | "us"; text: string };

/** Ask Understudy: the FAQ is a question you type. Answers come from a local keyword match, after a short typing beat. */
export function AskSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([{ id: 0, who: "us", text: "Hi. Ask me anything about rehearsing a part, your cast or getting cast." }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const next = useRef(1);
  useSheet(open, ref, onClose, inputRef);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    setLines((l) => [...l, { id: next.current++, who: "you", text: q }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setLines((l) => [...l, { id: next.current++, who: "us", text: answer(q) }]);
      requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }));
    }, 750);
    requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }));
  };

  const submit = (e: FormEvent) => { e.preventDefault(); ask(draft); };
  const asked = new Set(lines.filter((l) => l.who === "you").map((l) => l.text));

  return (
    <div ref={ref} id="us-ask-sheet" className="us-sheet us-sheet--ask" role="dialog" aria-modal="true" aria-labelledby="us-ask-t" data-open={open} inert={!open}>
      <div className="us-sheet__head us-ask__head">
        <span className="us-ask__mk"><Mark /></span>
        <p id="us-ask-t" className="us-ask__t">Ask Understudy</p>
        <button type="button" className="us-x" onClick={onClose}><span className="us-sr">Close</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
      </div>
      <div ref={logRef} className="us-ask__log" aria-live="polite" data-lenis-prevent>
        {lines.map((l) => <p key={l.id} className={`us-bubble us-bubble--${l.who}`}>{l.text}</p>)}
        {typing && <p className="us-bubble us-bubble--us us-bubble--typing"><span className="us-sr">Typing</span><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></p>}
      </div>
      <div className="us-ask__chips">
        {SUGGESTED.map((id) => FAQ.find((f) => f.id === id)!).filter((f) => !asked.has(f.question)).map((f) => (
          <button key={f.id} type="button" className="us-chip us-chip--light" onClick={() => ask(f.question)} disabled={typing}>{f.question}</button>
        ))}
      </div>
      <form className="us-ask__form" onSubmit={submit}>
        <label htmlFor="us-ask-in" className="us-sr">Ask anything about Understudy</label>
        <input ref={inputRef} id="us-ask-in" type="text" maxLength={160} placeholder="Ask anything about Understudy" value={draft} onChange={(e) => setDraft(e.target.value)} autoComplete="off" />
        <button type="submit" className="us-ask__send" disabled={!draft.trim() || typing}>
          <span className="us-sr">Send</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
        </button>
      </form>
    </div>
  );
}
