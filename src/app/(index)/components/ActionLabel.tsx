import React from "react";

/** One accessible label; the second line is only the hover treatment. */
export function ActionLabel({ children }: { children: string }) {
  return (
    <span className="action-label">
      <span className="action-label-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
