'use client';
import React from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface NotesAppProps {
  content: string;
  onChange: (nextContent: string) => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({ content, onChange }) => {
  const appendSnippet = (snippet: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    onChange(`${content}\n[${time}] ${snippet}`);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0C1326] border border-[#2858FF]">
        <div className="flex items-center gap-1.5 cr-font-mono-code text-xs font-bold text-[#E4FF58]">
          <FileText className="w-3.5 h-3.5" />
          <span>INTERNAL STUDIO SCRATCHPAD (DEMO ONLY)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => appendSnippet('Checked camera framing & LUT contrast.')}
            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] whitespace-nowrap shrink-0"
          >
            <Plus className="w-3 h-3" />
            <span>STAMP NOTE</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('CTRL/ROOM STUDIO SCRATCHPAD\n---------------------------\n')}
            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] whitespace-nowrap shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      <label htmlFor="ctrl-room-notes-textarea" className="sr-only">
        Studio Scratchpad Notes
      </label>
      <textarea
        id="ctrl-room-notes-textarea"
        rows={9}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 cr-font-mono-code text-xs bg-[#0A1020] text-[#E8F0FF] border-2 border-[#61728F] focus:border-[#E4FF58] focus:outline-none leading-relaxed"
      />
      <p className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
        Triggered by <strong className="text-[#E8F0FF]">OPEN NOTES</strong>,{' '}
        <strong className="text-[#E8F0FF]">DAILY STAMP</strong>, and{' '}
        <strong className="text-[#E8F0FF]">CLIP 30S</strong> actions in the 15-key simulator.
      </p>
    </div>
  );
};
