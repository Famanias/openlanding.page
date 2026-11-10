"use client";

import { useFilm } from "./FilmProvider";

export function OpenProject({ index, children, className = "" }: { index: number; children: React.ReactNode; className?: string }) {
  const { openProject } = useFilm();
  return <button className={className} data-pointer type="button" onClick={(event) => openProject(index, event.currentTarget)}>{children}</button>;
}
