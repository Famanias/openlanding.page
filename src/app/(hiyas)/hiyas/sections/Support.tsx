import { Picture } from "../assets";
import { SUPPORT_ROLES } from "../content/expedition-data";

export function Support() {
  return <section className="hy-section hy-support" id="support" aria-labelledby="hy-support-title"><div className="hy-container hy-support__grid"><div><h2 id="hy-support-title">The route is shared.</h2><p style={{ marginTop: 20, maxWidth: "38ch", color: "color-mix(in srgb,var(--hy-white) 72%,transparent)" }}>Local leadership is part of the route design, not a service layer added after the plan is made.</p><div className="hy-support__roles">{SUPPORT_ROLES.map((role) => <article className="hy-support__role" key={role.title}><h3>{role.title}</h3><p>{role.copy}</p></article>)}</div></div><div><Picture assetKey="support-rope" alt="Rope team crossing a snow slope" /></div></div></section>;
}

