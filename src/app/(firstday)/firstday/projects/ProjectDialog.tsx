"use client";
import { useEffect, useRef } from "react";
import { Arrow } from "../brand/Arrow";
import type { Project } from "./model";
import { ProjectArt } from "./ProjectArt";
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (project && !dialog?.open) dialog?.showModal();
    else if (!project && dialog?.open) dialog.close();
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="fd-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
      aria-labelledby="fd-project-title"
    >
      {project && (
        <div className="fd-dialog-inner">
          <button
            autoFocus
            className="fd-close"
            aria-label="Close project"
            onClick={() => ref.current?.close()}
          >
            ×
          </button>
          <div className={`fd-dialog-art fd-tone-${project.color}`}>
            <ProjectArt kind={project.art} />
          </div>
          <span className="fd-label">{project.code} / YOUR FIRST BRIEF</span>
          <h2 id="fd-project-title">{project.title}</h2>
          <p>{project.brief}</p>
          <div className="fd-tags">
            {project.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="fd-dialog-facts">
            {project.duration} · A small team · A real mentor
          </p>
          <a
            className="fd-button"
            href={`?path=${project.id}#begin`}
            onClick={() => ref.current?.close()}
          >
            This feels like me <Arrow diagonal />
          </a>
        </div>
      )}
    </dialog>
  );
}
