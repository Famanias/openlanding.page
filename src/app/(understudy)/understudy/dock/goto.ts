/** Scroll to a scene once a sheet has let go of the page (Lenis ignores scrollTo while stopped). */
export const goto = (id: string) =>
  requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("us:goto", { detail: id }))));
