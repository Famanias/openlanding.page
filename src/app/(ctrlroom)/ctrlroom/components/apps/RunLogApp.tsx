'use client';
import React from 'react';
import { Trash2, Zap, Terminal } from 'lucide-react';
import { RunLogEntry } from '../../lib/os/types';

interface RunLogAppProps {
  logs: RunLogEntry[];
  onClearLogs: () => void;
  onTriggerDemoKey: () => void;
}

export const RunLogApp: React.FC<RunLogAppProps> = ({
  logs,
  onClearLogs,
  onTriggerDemoKey,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#E4FF58]" />
          <div>
            <div className="cr-font-mono-code text-xs font-bold text-[#E8F0FF]">
              SIMULATION EVENT STREAM ({logs.length} EVENTS)
            </div>
            <div className="text-[10px] text-[#B6D7F7]">
              Every key press executes deterministic local browser state—no external OS commands.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onTriggerDemoKey}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] transition-colors whitespace-nowrap shrink-0"
          >
            <Zap className="w-3 h-3" />
            <span>FIRE TEST KEY</span>
          </button>
          <button
            type="button"
            onClick={onClearLogs}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#172342] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] transition-colors whitespace-nowrap shrink-0"
          >
            <Trash2 className="w-3 h-3" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="p-6 text-center bg-[#0C1326] border border-[#61728F]/50 space-y-2">
          <p className="cr-font-mono-code text-xs text-[#B6D7F7]">
            NO KEYS TRIGGERED YET IN THIS SESSION.
          </p>
          <p className="text-xs text-[#E8F0FF]">
            Click any key inside <strong className="text-[#E4FF58]">DECK LAB</strong> or click{' '}
            <strong>FIRE TEST KEY</strong> above to watch a simulated macro run.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 cr-font-mono-code">
          {logs.map((entry) => (
            <div
              key={entry.id}
              className="cr-log-entry p-2.5 bg-[#0C1326] border-l-2 border-[#E4FF58] border-y border-r border-[#61728F]/40 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#B6D7F7] text-[10px]">{entry.timestamp}</span>
                  <span className="px-1.5 py-0.5 bg-[#2858FF] text-[#E8F0FF] text-[10px] font-bold">
                    SLOT {String(entry.slotIndex + 1).padStart(2, '0')} (R{entry.row}·C{entry.col})
                  </span>
                  <span className="font-bold text-[#E4FF58]">{entry.label}</span>
                </div>
                <span className="text-[10px] font-bold text-[#FC5FA9]">{entry.statusText}</span>
              </div>
              <p className="mt-1 text-[11px] font-sans text-[#E8F0FF]">{entry.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
