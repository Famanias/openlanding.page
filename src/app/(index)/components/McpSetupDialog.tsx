"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, X } from "@phosphor-icons/react/dist/ssr";
import { SITE_URL } from "../../../lib/site";
import type { ManifestTemplateInput } from "../../../lib/webflow/manifest";
import { fetchOrBuildWebflowPrompt } from "./detail/CopyWebflowPromptButton";

export const OPENLANDING_MCP_CONFIG_JSON = JSON.stringify(
  {
    mcpServers: {
      openlanding: {
        url: `${SITE_URL}/api/mcp`,
      },
      webflow: {
        url: "https://mcp.webflow.com/mcp",
      },
    },
  },
  null,
  2
);

export interface McpSetupDialogProps {
  open: boolean;
  onClose: () => void;
  template?: ManifestTemplateInput;
  onCopied?: (kind: "prompt" | "webflow" | "mcp") => void;
}

export function McpSetupDialog({ open, onClose, template, onCopied }: McpSetupDialogProps) {
  const [copiedKind, setCopiedKind] = useState<"prompt" | "webflow" | "mcp" | null>(null);
  const [copyError, setCopyError] = useState("");

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!copiedKind) return;
    const timer = setTimeout(() => setCopiedKind(null), 2000);
    return () => clearTimeout(timer);
  }, [copiedKind]);

  if (!open) return null;

  const copyText = async (text: string, kind: "prompt" | "webflow" | "mcp") => {
    setCopyError("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopiedKind(kind);
      onCopied?.(kind);
    } catch {
      setCopyError("Couldn't copy to clipboard. Please try again.");
    }
  };

  const handleCopyCodePrompt = async () => {
    if (!template) return;
    await copyText(template.promptMarkdown, "prompt");
  };

  const handleCopyWebflowPrompt = async () => {
    if (!template) return;
    setCopyError("");
    try {
      const webflowPrompt = await fetchOrBuildWebflowPrompt(template);
      await copyText(webflowPrompt, "webflow");
    } catch {
      setCopyError("Couldn't copy Webflow prompt. Please try again.");
    }
  };

  const handleCopyConfig = async () => {
    await copyText(OPENLANDING_MCP_CONFIG_JSON, "mcp");
  };

  const dialogNode = (
    <div
      className="community-dialog-backdrop"
      style={{ alignItems: "center" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="community-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mcp-setup-title"
      >
        <div className="community-dialog-header">
          <div>
            <h2 id="mcp-setup-title" className="community-dialog-title">
              {template ? `Copy ${template.title} prompt` : "Import templates to Webflow via MCP"}
            </h2>
            <p className="community-dialog-subtitle">
              {template
                ? "Choose a prompt for your AI coding agent, or connect the OpenLanding + Webflow MCP servers below."
                : "Connect the OpenLanding MCP alongside the official Webflow MCP in Claude Desktop, Cursor, Claude Code, or Antigravity."}
            </p>
          </div>
          <button
            type="button"
            className="community-dialog-close"
            onClick={onClose}
            aria-label="Close prompt dialog"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {template && (
          <div className="request-options-grid prompt-modal-options">
            <button
              type="button"
              className="community-consent-item prompt-modal-option"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                padding: "14px",
                textAlign: "left",
                borderColor: copiedKind === "prompt" ? "var(--color-success)" : undefined,
              }}
              onClick={handleCopyCodePrompt}
              data-copied={copiedKind === "prompt"}
            >
              <div
                className="prompt-modal-option-head"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <strong style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", whiteSpace: "nowrap" }}>
                  {copiedKind === "prompt" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span>{copiedKind === "prompt" ? "Copied code prompt" : "Copy code prompt"}</span>
                </strong>
                <span className="nav-github-stars prompt-modal-badge">Next.js</span>
              </div>
              <p className="community-field-hint prompt-modal-option-desc">
                Full implementation brief for rebuilding {template.title} in Next.js 16, React 19, and Tailwind CSS.
              </p>
            </button>

            <button
              type="button"
              className="community-consent-item prompt-modal-option"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                padding: "14px",
                textAlign: "left",
                borderColor: copiedKind === "webflow" ? "var(--color-success)" : undefined,
              }}
              onClick={handleCopyWebflowPrompt}
              data-copied={copiedKind === "webflow"}
            >
              <div
                className="prompt-modal-option-head"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <strong style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", whiteSpace: "nowrap" }}>
                  {copiedKind === "webflow" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span>{copiedKind === "webflow" ? "Copied Webflow prompt" : "Copy Webflow prompt"}</span>
                </strong>
                <span className="nav-github-stars prompt-modal-badge">Webflow MCP</span>
              </div>
              <p className="community-field-hint prompt-modal-option-desc">
                Step-by-step Webflow MCP playbook mapping {template.title}&apos;s variables, fonts, assets, and sections.
              </p>
            </button>
          </div>
        )}

        <div className="community-field-group prompt-modal-mcp-section">
          <div
            className="prompt-modal-mcp-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span className="community-field-label">OpenLanding + Webflow MCP config</span>
            <button
              type="button"
              className="community-secondary-btn prompt-modal-mcp-copy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                minHeight: "32px",
                padding: "4px 10px",
                fontSize: "12px",
              }}
              onClick={handleCopyConfig}
              data-copied={copiedKind === "mcp"}
            >
              {copiedKind === "mcp" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copiedKind === "mcp" ? "Copied MCP config" : "Copy MCP config"}</span>
            </button>
          </div>
          <pre className="mcp-config-pre">
            <code>{OPENLANDING_MCP_CONFIG_JSON}</code>
          </pre>
        </div>

        {copyError && (
          <p className="copy-error" role="alert">
            {copyError}
          </p>
        )}

        <div className="community-dialog-actions">
          <button type="button" className="community-secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(dialogNode, document.body);
  }
  return dialogNode;
}
