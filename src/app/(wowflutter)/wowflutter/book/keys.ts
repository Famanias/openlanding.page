export type BookAction = "next" | "prev" | "first" | "last";

const FIELDS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

const KEYS: Record<string, BookAction> = {
  ArrowRight: "next",
  PageDown: "next",
  ArrowLeft: "prev",
  PageUp: "prev",
  Home: "first",
  End: "last",
};

/**
 * Maps a key to a book action. Space and Enter are never claimed, so focused buttons and links keep them,
 * and form fields (including the radio group) keep their arrow keys.
 */
export function keyAction(key: string, target: { tagName?: string; isContentEditable?: boolean } | null): BookAction | null {
  if (target?.isContentEditable) return null;
  if (target?.tagName && FIELDS.has(target.tagName.toUpperCase())) return null;
  return KEYS[key] ?? null;
}
