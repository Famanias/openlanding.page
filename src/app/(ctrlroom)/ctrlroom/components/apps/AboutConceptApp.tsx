'use client';
import React from 'react';
import { Volume2, VolumeX, ShieldAlert, RotateCcw, ExternalLink } from 'lucide-react';

interface AboutConceptAppProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onResetAllDemoData: () => void;
}

export const AboutConceptApp: React.FC<AboutConceptAppProps> = ({
  audioEnabled,
  onToggleAudio,
  onResetAllDemoData,
}) => {
  return (
    <div className="space-y-3 text-xs">
      <div className="p-3 bg-[#0C1326] border-2 border-[#FC5FA9]">
        <div className="flex items-center gap-2 cr-font-mono-code text-[11px] font-bold text-[#FC5FA9]">
          <ShieldAlert className="w-4 h-4" />
          <span>INDEPENDENCE & HONESTY DISCLOSURE</span>
        </div>
        <p className="mt-1.5 text-[#E8F0FF] leading-relaxed">
          <strong>CTRL/ROOM (C/R OS — Build 01.15)</strong> is an original, independent fictional desktop concept created to showcase what a 15-key programmable control surface can feel like. It is{' '}
          <strong className="text-[#E4FF58]">not affiliated with, sponsored by, or endorsed by Elgato</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#15203D] border border-[#2858FF]">
          <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58] mb-1">
            WHAT THIS WEB SIMULATOR DOES
          </div>
          <ul className="space-y-1 text-[#B6D7F7] list-disc list-inside">
            <li>Lets you configure a 5×3 virtual key matrix in your browser</li>
            <li>Simulates studio actions inside the on-page preview monitor</li>
            <li>Logs mock execution timestamps in the Run Log window</li>
            <li>Optionally saves your demo layout to browser localStorage</li>
          </ul>
        </div>

        <div className="p-3 bg-[#15203D] border border-[#61728F]">
          <div className="cr-font-mono-code text-[11px] font-bold text-[#FC5FA9] mb-1">
            WHAT IT NEVER DOES
          </div>
          <ul className="space-y-1 text-[#B6D7F7] list-disc list-inside">
            <li>Does not pair with USB/HID hardware or physical Stream Decks</li>
            <li>Does not access your microphone, camera, or OS shortcuts</li>
            <li>Does not control OBS, broadcasts, or external desktop apps</li>
            <li>Does not represent Elgato&apos;s official desktop configurator UI</li>
          </ul>
        </div>
      </div>

      {/* Optional Original UI Audio Control & Full Demo Reset */}
      <div className="p-3 bg-[#0C1326] border border-[#61728F] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleAudio}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 cr-font-mono-code text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              audioEnabled
                ? 'bg-[#E4FF58] text-[#111A31]'
                : 'bg-[#172342] text-[#E8F0FF] border border-[#61728F]'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'SYNTH UI AUDIO: ON' : 'SYNTH UI AUDIO: MUTED (DEFAULT)'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onResetAllDemoData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 cr-font-mono-code text-xs font-bold bg-[#FC5FA9] text-[#111A31] hover:bg-[#E4FF58] transition-colors whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET ALL DEMO DATA</span>
        </button>
      </div>

      <div className="pt-1 flex items-center justify-between text-[11px] text-[#B6D7F7]">
        <span>Official Product Documentation:</span>
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 cr-font-mono-code font-bold text-[#E4FF58] hover:underline"
        >
          <span>elgato.com/stream-deck</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
