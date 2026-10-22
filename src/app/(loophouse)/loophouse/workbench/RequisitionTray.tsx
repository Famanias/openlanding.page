"use client";

import React from "react";
import { useWorkbench, workbenchStore } from "./workbench-store";
import { calculateRequisitionTotals } from "./workbench-data";

export function RequisitionTray() {
  const { stagedTools, loanDays, isMember } = useWorkbench();
  const totals = calculateRequisitionTotals(stagedTools, loanDays, isMember);

  const handleScrollToForm = () => {
    const el = document.getElementById("requisition");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="lh-req-tray" aria-label="Active Requisition Tray">
      <div className="lh-req-tray-head">
        <div className="lh-req-tray-title-wrap">
          <span className="lh-req-icon" aria-hidden="true">
            ⊞
          </span>
          <div>
            <h3 className="lh-req-tray-title">REQUISITION TRAY</h3>
            <span className="lh-req-tray-subtitle">
              {stagedTools.length} {stagedTools.length === 1 ? "TOOL" : "TOOLS"} STAGED
            </span>
          </div>
        </div>
        {stagedTools.length > 0 && (
          <button
            type="button"
            className="lh-req-clear-btn"
            onClick={() => workbenchStore.clearTray()}
            aria-label="Clear all tools from tray"
          >
            Clear Tray
          </button>
        )}
      </div>

      {stagedTools.length === 0 ? (
        <div className="lh-req-empty">
          <p className="lh-req-empty-text">No tools currently staged.</p>
          <p className="lh-req-empty-sub">
            Click <strong>“+ Stage in Tray”</strong> on any tool dock above to assemble your project kit.
          </p>
        </div>
      ) : (
        <ul className="lh-req-list">
          {stagedTools.map((tool) => (
            <li key={tool.id} className="lh-req-item">
              <div className="lh-req-item-info">
                <span className="lh-req-item-serial">{tool.serial}</span>
                <span className="lh-req-item-name">{tool.name}</span>
                <span className="lh-req-item-model">{tool.model}</span>
              </div>
              <button
                type="button"
                className="lh-req-remove-btn"
                onClick={() => workbenchStore.unstageTool(tool.id)}
                aria-label={`Remove ${tool.name} from tray`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Loan Configuration Controls */}
      <div className="lh-req-controls">
        <div className="lh-req-slider-wrap">
          <div className="lh-req-slider-labels">
            <label htmlFor="lh-req-days-input" className="lh-req-control-label">
              Loan Duration:
            </label>
            <span className="lh-req-days-badge">{loanDays} {loanDays === 1 ? "Day" : "Days"}</span>
          </div>
          <input
            id="lh-req-days-input"
            type="range"
            min={1}
            max={14}
            value={loanDays}
            onChange={(e) => workbenchStore.setLoanDays(Number(e.target.value))}
            className="lh-req-slider"
          />
          <div className="lh-req-slider-scale" aria-hidden="true">
            <span>1 day</span>
            <span>7 days</span>
            <span>14 days</span>
          </div>
        </div>

        {/* Member Tier Toggle */}
        <div className="lh-req-member-toggle">
          <span className="lh-req-control-label">Community Guild Membership:</span>
          <div className="lh-toggle-group" role="group" aria-label="Membership status">
            <button
              type="button"
              className={`lh-toggle-btn ${isMember ? "is-active" : ""}`}
              onClick={() => {
                if (!isMember) workbenchStore.toggleMembership();
              }}
            >
              Member ($0.00)
            </button>
            <button
              type="button"
              className={`lh-toggle-btn ${!isMember ? "is-active" : ""}`}
              onClick={() => {
                if (isMember) workbenchStore.toggleMembership();
              }}
            >
              Standard Rate
            </button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="lh-req-summary">
          <div className="lh-req-summary-row">
            <span>Total Loan Fee:</span>
            <strong className="lh-req-fee-total">
              {totals.fee === 0 ? "$0.00" : `$${totals.fee.toFixed(2)}`}
            </strong>
          </div>
          <span className="lh-req-policy-note">
            {isMember
              ? "Included in Annual Guild Membership ($60/yr)"
              : "Standard pay-as-you-borrow day rate"}
          </span>
        </div>

        <button
          type="button"
          className="lh-req-submit-btn"
          onClick={handleScrollToForm}
          disabled={stagedTools.length === 0}
        >
          {stagedTools.length === 0 ? "Stage Tools to Hold" : "Proceed to Requisition Hold →"}
        </button>
      </div>
    </aside>
  );
}
