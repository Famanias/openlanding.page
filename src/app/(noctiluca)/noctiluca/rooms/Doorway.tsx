/**
 * A doorway in the corridor: a solid wall across the tunnel with one opening,
 * three reveals (the depth of the wall) lit by the next room's light, and the
 * next room's numeral cut into the lintel. Architecture only, so aria-hidden.
 */
export function Doorway({ numeral, name }: { numeral: string; name: string }) {
  return (
    <div className="nl-door" data-plane="door" aria-hidden="true">
      <div className="nl-door-lintel">
        <span className="nl-door-numeral">{numeral || "Exit"}</span>
        <span className="nl-door-name">{numeral ? name : "Rua da Cozinha Económica"}</span>
      </div>
      <div className="nl-door-jamb" data-side="left" />
      <div className="nl-door-jamb" data-side="right" />
      <div className="nl-door-reveal" data-side="left" />
      <div className="nl-door-reveal" data-side="right" />
      <div className="nl-door-reveal" data-side="top" />
      <div className="nl-door-sill" />
    </div>
  );
}
