"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy, X } from "@phosphor-icons/react/dist/ssr";
import { SITE_URL } from "../../../lib/site";

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
}

export function McpSetupDialog({ open, onClose }: McpSetupDialogProps) {
  const [copied, setCopied] = useState(false);
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
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!open) return null;

  const handleCopyConfig = async () => {
    setCopyError("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(OPENLANDING_MCP_CONFIG_JSON);
      setCopied(true);
    } catch {
      setCopyError("Couldn't copy config. Select and copy the JSON below.");
    }
  };

  return (
    <div
      className="community-dialog-backdrop"
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
              Import templates to Webflow via MCP
            </h2>
            <p className="community-dialog-subtitle">
              Connect the OpenLanding MCP alongside the official Webflow MCP in Claude Desktop, Cursor, Claude Code, or Antigravity.
            </p>
          </div>
          <button
            type="button"
            className="community-dialog-close"
            onClick={onClose}
            aria-label="Close MCP setup dialog"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <pre className="mcp-config-pre">
          <code>{OPENLANDING_MCP_CONFIG_JSON}</code>
        </pre>

        {copyError && (
          <p className="copy-error" role="alert">
            {copyError}
          </p>
        )}

        <div className="community-dialog-actions">
          <button type="button" className="community-secondary-btn" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="primary-action"
            onClick={handleCopyConfig}
            data-copied={copied}
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Copied MCP config" : "Copy MCP config"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
