"use client";

import React from "react";
import { TOOLS, filterToolsByCategory, type ToolCategory } from "./workbench-data";
import { useWorkbench, workbenchStore } from "./workbench-store";
import { ToolDock } from "./ToolDock";
import { RequisitionTray } from "./RequisitionTray";

const CATEGORIES: { id: ToolCategory; label: string }[] = [
  { id: "all", label: "00 // All Bays" },
  { id: "woodworking", label: "01 // Woodworking" },
  { id: "metal", label: "02 // Metal & Machinery" },
  { id: "masonry", label: "03 // Masonry & Rigging" },
  { id: "cordless", label: "04 // Field Cordless" },
];

export function PegboardStation() {
  const { activeCategory, unlatchedToolId, stagedTools } = useWorkbench();
  const visibleTools = filterToolsByCategory(TOOLS, activeCategory);
  const unlatchedTool = TOOLS.find((t) => t.id === unlatchedToolId) || TOOLS[0];

  return (
    <section id="pegboard" className="lh-section lh-pegboard-section" aria-label="Pegboard Tool Wall Station">
      <div className="lh-wrap">
        <div className="lh-section-head">
          <div className="lh-kicker">SIGNATURE MECHANIC // DOCK &amp; UNLATCH</div>
          <h2 className="lh-section-title">The Modular Pegboard Tool Wall</h2>
          <p className="lh-section-desc">
            Every instrument in the library has a measured shadow, calibrated collet tolerances, and a certified
            safety log. Click any tool to unlatch its physical chassis, inspect tolerances, and stage it into your tray.
          </p>
        </div>

        {/* Trade Discipline Filter Tabs */}
        <div className="lh-pegboard-tabs" role="tablist" aria-label="Filter tool disciplines">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`lh-pegboard-tab ${activeCategory === cat.id ? "is-active" : ""}`}
              onClick={() => workbenchStore.setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unlatched Caliper Spec Inspection Panel (Signature Detail) */}
        {unlatchedTool && (
          <div className="lh-caliper-panel" aria-live="polite">
            <div className="lh-caliper-ruler" aria-hidden="true">
              <span className="lh-caliper-mark">0 mm</span>
              <span className="lh-caliper-mark">100 mm</span>
              <span className="lh-caliper-mark">200 mm</span>
              <span className="lh-caliper-mark">300 mm</span>
              <span className="lh-caliper-mark">400 mm</span>
              <span className="lh-caliper-mark">500 mm</span>
            </div>

            <div className="lh-caliper-body">
              <div className="lh-caliper-meta">
                <span className="lh-caliper-serial">CALIBRATION DOSSIER: {unlatchedTool.serial}</span>
                <h3 className="lh-caliper-name">{unlatchedTool.name}</h3>
                <p className="lh-caliper-model">{unlatchedTool.model}</p>
              </div>

              <div className="lh-caliper-specs-grid">
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Power &amp; Input</span>
                  <strong className="lh-spec-val">{unlatchedTool.power}</strong>
                </div>
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Spindle / Surface Velocity</span>
                  <strong className="lh-spec-val">{unlatchedTool.speed}</strong>
                </div>
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Calibrated Runout Tolerance</span>
                  <strong className="lh-spec-val">{unlatchedTool.tolerance}</strong>
                </div>
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Chassis Weight</span>
                  <strong className="lh-spec-val">{unlatchedTool.weight}</strong>
                </div>
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Service Tier</span>
                  <strong className="lh-spec-val">{unlatchedTool.condition}</strong>
                </div>
                <div className="lh-spec-cell">
                  <span className="lh-spec-label">Day Rate (Non-Member)</span>
                  <strong className="lh-spec-val">${unlatchedTool.standardDailyFee}.00 / day</strong>
                </div>
              </div>

              <div className="lh-caliper-actions">
                <button
                  type="button"
                  className={`lh-caliper-stage-btn ${
                    stagedTools.some((t) => t.id === unlatchedTool.id) ? "is-staged" : ""
                  }`}
                  onClick={() => workbenchStore.stageTool(unlatchedTool)}
                >
                  {stagedTools.some((t) => t.id === unlatchedTool.id)
                    ? "✓ Tool Staged in Tray"
                    : "+ Stage into Requisition Tray"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dual Workbench Grid: Pegboard Wall + Requisition Tray */}
        <div className="lh-pegboard-layout">
          <div className="lh-pegboard-canvas">
            <div className="lh-pegboard-header-tag">
              <span>PEGBOARD WALL // BAY SECTION A–D</span>
              <span>{visibleTools.length} DOCKS ACTIVE</span>
            </div>

            <div className="lh-docks-grid">
              {visibleTools.map((tool) => (
                <ToolDock
                  key={tool.id}
                  tool={tool}
                  isUnlatched={unlatchedToolId === tool.id}
                  isStaged={stagedTools.some((t) => t.id === tool.id)}
                />
              ))}
            </div>
          </div>

          <div className="lh-pegboard-sidebar">
            <RequisitionTray />
          </div>
        </div>
      </div>
    </section>
  );
}
