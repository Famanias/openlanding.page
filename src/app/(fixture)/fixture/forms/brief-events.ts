/** Price tags and plan cards add needs to the brief; the form reports its needs back so their buttons stay in sync. */
export const ADD_NEED = "fx:add-need";
export const NEEDS_CHANGED = "fx:needs-changed";

export type AddNeedDetail = { need: string; on: boolean };
export type NeedsChangedDetail = { needs: string[] };

export function sendNeed(need: string, on: boolean) {
  window.dispatchEvent(new CustomEvent<AddNeedDetail>(ADD_NEED, { detail: { need, on } }));
}

export function announceNeeds(needs: string[]) {
  window.dispatchEvent(new CustomEvent<NeedsChangedDetail>(NEEDS_CHANGED, { detail: { needs } }));
}
