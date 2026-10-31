'use client';
import React from 'react';
import { CheckCircle2, RotateCcw, Layers } from 'lucide-react';
import { getActionById } from '../../lib/os/actions';
import { CURATED_PROFILES, isProfileModified } from '../../lib/os/presets';
import { DeckSlotConfig, ProfileId } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface ProfileSwitcherAppProps {
  activeProfile: ProfileId;
  allProfiles: Record<ProfileId, DeckSlotConfig[]>;
  onSwitchProfile: (profileId: ProfileId) => void;
  onResetProfile: (profileId: ProfileId) => void;
}

export const ProfileSwitcherApp: React.FC<ProfileSwitcherAppProps> = ({
  activeProfile,
  allProfiles,
  onSwitchProfile,
  onResetProfile,
}) => {
  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58]">
          ONE DEVICE. MANY WAYS TO WORK.
        </div>
        <p className="text-xs text-[#B6D7F7]">
          Swap between three curated 15-key workspaces. Your custom slot edits are preserved per profile in browser memory until you reset them.
        </p>
      </div>

      <div className="space-y-2.5">
        {(['STUDIO', 'LIVE', 'EVERYDAY'] as ProfileId[]).map((profId) => {
          const def = CURATED_PROFILES[profId];
          const slots = allProfiles[profId];
          const isCurrent = activeProfile === profId;
          const isDirty = isProfileModified(profId, slots);

          return (
            <div
              key={profId}
              className={`p-3 border-2 transition-colors ${
                isCurrent
                  ? 'bg-[#17254A] border-[#E4FF58]'
                  : 'bg-[#0C1326] border-[#61728F]/60 hover:border-[#2858FF]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="cr-font-display text-sm font-bold text-[#E8F0FF]">
                      {def.name}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]">
                        ACTIVE
                      </span>
                    )}
                    {isDirty && (
                      <span className="px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#FC5FA9] text-[#111A31]">
                        CUSTOMIZED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#B6D7F7] mt-0.5">{def.tagline}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  {isDirty && (
                    <button
                      type="button"
                      onClick={() => onResetProfile(profId)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[10px] cr-font-mono-code font-bold bg-[#111A31] text-[#B6D7F7] hover:text-[#E8F0FF] border border-[#61728F] whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESTORE DEFAULT</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSwitchProfile(profId)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                      isCurrent
                        ? 'bg-[#E4FF58] text-[#111A31]'
                        : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LOADED</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-3.5 h-3.5" />
                        <span>LOAD {profId}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 5x3 Mini Matrix Preview */}
              <div className="mt-2.5 grid grid-cols-5 gap-1.5 pt-2 border-t border-[#61728F]/30">
                {slots.slice(0, 10).map((slot) => {
                  const action = getActionById(slot.actionId);
                  return (
                    <div
                      key={slot.slotIndex}
                      className="px-1.5 py-1 bg-[#111A31] border border-[#61728F]/40 flex items-center gap-1 min-w-0"
                    >
                      <PixelActionIcon
                        icon={slot.customIcon || action.icon}
                        className="w-3.5 h-3.5 shrink-0"
                        color="#E4FF58"
                      />
                      <span className="text-[9px] cr-font-mono-code text-[#E8F0FF] truncate">
                        {slot.customLabel || action.shortLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
