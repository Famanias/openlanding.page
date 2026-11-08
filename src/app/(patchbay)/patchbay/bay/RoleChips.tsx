"use client";

import { ROLE_LIST } from "../content/roles";
import { useRole } from "./RoleProvider";

/** Compact role switcher for the sticky header, so the page can be re-routed from anywhere. */
export function RoleChips({ className }: { className?: string }) {
  const { role, setRole } = useRole();
  return (
    <div className={`pby-chips ${className ?? ""}`} role="group" aria-label="Route the page to a discipline">
      {ROLE_LIST.map((item) => (
        <button key={item.id} type="button" className="pby-chip pby-mono" aria-pressed={item.id === role} onClick={() => setRole(item.id)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
