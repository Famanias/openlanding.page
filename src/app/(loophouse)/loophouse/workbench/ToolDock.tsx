"use client";

import React from "react";
import type { ToolItem } from "./workbench-data";
import { workbenchStore } from "./workbench-store";

function SchematicSvg({ type, color }: { type: ToolItem["schematicType"]; color: string }) {
  switch (type) {
    case "router":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* Baseplate */}
          <rect x="15" y="80" width="70" height="8" rx="2" stroke={color} strokeWidth="3" />
          {/* Dual guide pillars */}
          <line x1="28" y1="35" x2="28" y2="80" stroke={color} strokeWidth="4" />
          <line x1="72" y1="35" x2="72" y2="80" stroke={color} strokeWidth="4" />
          {/* Motor barrel */}
          <rect x="34" y="25" width="32" height="48" rx="3" fill="currentColor" opacity="0.12" />
          <rect x="34" y="25" width="32" height="48" rx="3" stroke={color} strokeWidth="3" />
          {/* Handles */}
          <path d="M12 40 C 12 30 26 30 26 44 C 26 55 12 55 12 40 Z" stroke={color} strokeWidth="3" />
          <path d="M88 40 C 88 30 74 30 74 44 C 74 55 88 55 88 40 Z" stroke={color} strokeWidth="3" />
          {/* Top cap / turret dial */}
          <rect x="42" y="14" width="16" height="11" rx="2" stroke={color} strokeWidth="2.5" />
          <circle cx="50" cy="50" r="4" fill="#1E51EB" />
        </svg>
      );
    case "tracksaw":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* Guide shoe base */}
          <rect x="10" y="78" width="80" height="6" rx="1.5" stroke={color} strokeWidth="3" />
          <line x1="10" y1="81" x2="90" y2="81" stroke="#1E51EB" strokeWidth="2" strokeDasharray="4 4" />
          {/* Plunge blade shroud */}
          <circle cx="48" cy="46" r="30" stroke={color} strokeWidth="3" />
          <circle cx="48" cy="46" r="14" fill="currentColor" opacity="0.15" />
          <circle cx="48" cy="46" r="6" fill="#1E51EB" />
          {/* Handle & trigger */}
          <path d="M52 20 L76 18 C84 18 86 28 78 34 L66 40" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          {/* Dust port */}
          <path d="M22 36 L12 30 L16 22 L26 28" stroke={color} strokeWidth="2.5" />
        </svg>
      );
    case "joiner":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* Mortise front fence */}
          <rect x="12" y="32" width="22" height="42" rx="2" stroke={color} strokeWidth="3" />
          <line x1="16" y1="42" x2="30" y2="42" stroke="#1E51EB" strokeWidth="2" />
          <line x1="16" y1="52" x2="30" y2="52" stroke="#1E51EB" strokeWidth="2" />
          <line x1="16" y1="62" x2="30" y2="62" stroke="#1E51EB" strokeWidth="2" />
          {/* Motor body */}
          <rect x="34" y="38" width="54" height="28" rx="4" fill="currentColor" opacity="0.12" />
          <rect x="34" y="38" width="54" height="28" rx="4" stroke={color} strokeWidth="3" />
          {/* Oscillation pin indicator */}
          <circle cx="8" cy="53" r="3" fill="#1E51EB" />
          <line x1="12" y1="53" x2="4" y2="53" stroke="#1E51EB" strokeWidth="2" />
          {/* Depth lock lever */}
          <path d="M24 22 L24 32" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="20" r="3" fill={color} />
        </svg>
      );
    case "rotary":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* SDS Chuck */}
          <rect x="8" y="38" width="18" height="14" rx="2" stroke={color} strokeWidth="3" />
          <circle cx="16" cy="45" r="3" fill="#1E51EB" />
          {/* Barrel & gear casing */}
          <rect x="26" y="32" width="46" height="26" rx="3" fill="currentColor" opacity="0.12" />
          <rect x="26" y="32" width="46" height="26" rx="3" stroke={color} strokeWidth="3" />
          {/* Auxiliary side handle */}
          <path d="M36 32 L36 14 C36 10 44 10 44 14 L44 32" stroke={color} strokeWidth="3" />
          {/* D-handle grip */}
          <path d="M72 36 L86 42 C92 48 90 68 84 74 L70 66" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <rect x="74" y="46" width="6" height="10" rx="1.5" fill="#1E51EB" />
        </svg>
      );
    case "bandsaw":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* Bow body */}
          <path d="M16 28 C16 18 84 18 84 28 L84 72 C84 82 16 82 16 72 Z" stroke={color} strokeWidth="3" />
          {/* Cutting blade window */}
          <rect x="28" y="36" width="44" height="28" rx="2" fill="currentColor" opacity="0.08" />
          <line x1="28" y1="50" x2="72" y2="50" stroke="#1E51EB" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Dual guide pulleys */}
          <circle cx="26" cy="50" r="8" stroke={color} strokeWidth="2.5" />
          <circle cx="74" cy="50" r="8" stroke={color} strokeWidth="2.5" />
          {/* Top handle */}
          <path d="M38 18 L38 10 L62 10 L62 18" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "planer":
      return (
        <svg viewBox="0 0 100 100" fill="none" className="lh-schematic-svg" aria-hidden="true">
          {/* Planer sole plate */}
          <rect x="12" y="74" width="76" height="6" rx="1" stroke={color} strokeWidth="3" />
          <line x1="48" y1="74" x2="52" y2="74" stroke="#1E51EB" strokeWidth="4" />
          {/* Main body */}
          <path d="M16 74 L22 46 L76 46 L82 74 Z" fill="currentColor" opacity="0.1" />
          <path d="M16 74 L22 46 L76 46 L82 74 Z" stroke={color} strokeWidth="3" />
          {/* Depth knob */}
          <circle cx="28" cy="38" r="8" stroke={color} strokeWidth="2.5" />
          <circle cx="28" cy="38" r="3" fill="#1E51EB" />
          {/* Handle */}
          <path d="M64 46 C64 30 76 26 84 32 C90 38 86 52 78 54" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
  }
}

type ToolDockProps = {
  tool: ToolItem;
  isUnlatched: boolean;
  isStaged: boolean;
};

export function ToolDock({ tool, isUnlatched, isStaged }: ToolDockProps) {
  const handleToggle = () => {
    workbenchStore.unlatchTool(tool.id);
  };

  const handleStageToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isStaged) {
      workbenchStore.unstageTool(tool.id);
    } else {
      workbenchStore.stageTool(tool);
    }
  };

  return (
    <div
      className={`lh-tool-dock ${isUnlatched ? "is-unlatched" : ""} ${isStaged ? "is-staged" : ""}`}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-label={`${tool.name} (${tool.model}). Serial: ${tool.serial}. ${isUnlatched ? "Currently unlatched." : "Click to unlatch from pegboard."}`}
    >
      {/* Pegboard Shadow Silhouette Dock behind */}
      <div className="lh-dock-shadow" aria-hidden="true">
        <span className="lh-dock-serial">{tool.serial}</span>
        <div className="lh-dock-silhouette-shape">
          <SchematicSvg type={tool.schematicType} color="#7E8A90" />
        </div>
        <span className="lh-dock-mount-status">
          {isUnlatched ? "DOCK UNLATCHED" : "LOCKED ON PEGBOARD"}
        </span>
      </div>

      {/* The Physical Instrument Plate that lifts */}
      <div className="lh-dock-chassis">
        <div className="lh-dock-chassis-top">
          <span className="lh-dock-badge">{tool.category.toUpperCase()}</span>
          <span className={`lh-dock-status-dot ${isStaged ? "is-staged-dot" : ""}`} />
        </div>

        <div className="lh-dock-illustration">
          <SchematicSvg type={tool.schematicType} color="#111618" />
        </div>

        <div className="lh-dock-info">
          <h4 className="lh-dock-title">{tool.name}</h4>
          <p className="lh-dock-model">{tool.model}</p>
          <p className="lh-dock-spec">{tool.highlightSpec}</p>
        </div>

        <div className="lh-dock-actions">
          <button
            type="button"
            className={`lh-dock-stage-btn ${isStaged ? "is-active" : ""}`}
            onClick={handleStageToggle}
            aria-label={isStaged ? `Remove ${tool.name} from requisition tray` : `Stage ${tool.name} in requisition tray`}
          >
            {isStaged ? "Staged in Tray ✓" : "+ Stage in Tray"}
          </button>
        </div>
      </div>
    </div>
  );
}
