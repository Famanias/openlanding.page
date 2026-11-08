"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DEFAULT_ROLE } from "../content/defaults";
import { ROLES, type Role, type RoleId } from "../content/roles";
import { parseRole, roleHref } from "./routing";

type RoleContextValue = { role: RoleId; data: Role; setRole: (next: RoleId) => void };

const RoleContext = createContext<RoleContextValue | null>(null);

export function useRole(): RoleContextValue {
  const value = useContext(RoleContext);
  if (!value) throw new Error("useRole must be used inside <RoleProvider>");
  return value;
}

const PULSE_MS = 900;

/**
 * Owns the selected role. The role lives in the URL (?role=ai) so a recruiter
 * can be sent straight to one view, and in <html data-role> so CSS can react.
 */
export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<RoleId>(DEFAULT_ROLE);
  const [routeCount, setRouteCount] = useState(0);
  const roleRef = useRef<RoleId>(DEFAULT_ROLE);

  const apply = useCallback((next: RoleId, announce: boolean) => {
    if (roleRef.current === next) return;
    roleRef.current = next;
    setRoleState(next);
    if (announce) setRouteCount((count) => count + 1);
  }, []);

  useEffect(() => {
    apply(parseRole(new URLSearchParams(window.location.search).get("role")), false);
    const onPop = () => apply(parseRole(new URLSearchParams(window.location.search).get("role")), true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [apply]);

  useEffect(() => {
    document.documentElement.dataset.role = role;
    if (routeCount > 0) document.documentElement.dataset.routed = "true";
  }, [role, routeCount]);

  const setRole = useCallback(
    (next: RoleId) => {
      if (roleRef.current === next) return;
      apply(next, true);
      const { pathname, search, hash } = window.location;
      window.history.replaceState(null, "", `${pathname}${roleHref(next, search)}${hash}`);
    },
    [apply],
  );

  const value = useMemo(() => ({ role, data: ROLES[role], setRole }), [role, setRole]);

  return (
    <RoleContext.Provider value={value}>
      {children}
      {routeCount > 0 && <span key={routeCount} className="pby-pulse" aria-hidden="true" style={{ animationDuration: `${PULSE_MS}ms` }} />}
      <p className="pby-sr" role="status">
        {routeCount > 0 ? `Page routed to ${ROLES[role].label}` : ""}
      </p>
    </RoleContext.Provider>
  );
}
