"use client";

import { useEffect, useRef } from "react";
import type { WorkProject } from "../model/agencyLogic";

export interface ModalProjectData extends WorkProject {
  modalKicker: string;
  modalMetric?: string;
}

interface ProjectModalProps {
  project: ModalProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lastProjectRef = useRef<ModalProjectData | null>(null);
  if (project) {
    lastProjectRef.current = project;
  }
  const current = project || lastProjectRef.current;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  const isOpen = Boolean(project);

  return (
    <div
      className={`nx-modal-backdrop ${isOpen ? "is-open" : ""}`}
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="nx-modal-card">
        <button
          type="button"
          className="nx-modal-close"
          id="modal-close-btn"
          aria-label="Close case study"
          onClick={onClose}
        >
          Close
        </button>
        <span className="nx-kicker" id="modal-project-kicker">
          {current?.modalKicker ?? ""}
        </span>
        <h3
          className="nx-section-title"
          id="modal-project-title"
          style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}
        >
          {current?.title ?? ""}
        </h3>
        <div
          id="modal-project-metric"
          style={{ fontWeight: 700, color: "var(--terracotta)", marginBottom: "1.25rem" }}
        >
          {current?.modalMetric ?? current?.metric ?? ""}
        </div>
        <p
          id="modal-project-challenge"
          style={{ fontSize: "1.05rem", color: "var(--ink)", marginBottom: "1rem" }}
        >
          {current?.challenge ?? ""}
        </p>
        <p
          id="modal-project-outcome"
          style={{ fontSize: "1.05rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}
        >
          {current?.outcome ?? ""}
        </p>
        <div style={{ borderTop: "1px dashed var(--stroke)", paddingTop: "1rem" }}>
          <strong style={{ display: "block", marginBottom: "0.4rem" }}>
            Crafted Deliverables:
          </strong>
          <div
            id="modal-project-deliverables"
            style={{ color: "var(--olive)", fontWeight: 600 }}
          >
            {current?.deliverables.join(" · ") ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}
