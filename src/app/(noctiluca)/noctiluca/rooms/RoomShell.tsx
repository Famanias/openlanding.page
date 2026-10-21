import type { CSSProperties, ReactNode } from "react";
import { roomStops } from "../light/stops";
import { Doorway } from "./Doorway";
import { ROOMS, anchorId } from "./rooms";

type RoomShellProps = {
  index: number;
  children: ReactNode;
  /** Something hung on the opposite wall: a museum label, a readout. */
  aside?: ReactNode;
  /** Plaque width preset. */
  width?: "narrow" | "wide" | "hero";
  /** Render a heading-less shell (the foyer supplies its own h1). */
  labelledBy?: string;
};

/**
 * One station of the walk. In corridor mode, CSS places each child in 3D from
 * `--i`: the plaque at 1:1 reading distance, the aside a little deeper on the
 * opposite wall, and the doorway into the next room behind them both.
 */
export function RoomShell({ index, children, aside, width = "narrow", labelledBy }: RoomShellProps) {
  const room = ROOMS[index];
  const next = ROOMS[index + 1];
  const id = anchorId(room.id);
  const style = { "--i": index, ...roomStops(index), ...(next ? roomStops(index + 1, "--nl-next") : {}) } as CSSProperties;

  return (
    <section
      id={id}
      className="nl-room"
      data-station={index}
      data-room={room.id}
      data-side={room.side}
      aria-labelledby={labelledBy ?? `${id}-title`}
      style={style}
    >
      <div className="nl-portal" aria-hidden="true">
        <span className="nl-portal-numeral">{room.numeral || "·"}</span>
      </div>
      <div className="nl-plaque" data-plane="plaque" data-width={width}>
        {children}
      </div>
      {aside ? (
        <div className="nl-aside" data-plane="label" data-reveal={width === "wide" ? "after" : undefined}>
          {aside}
        </div>
      ) : null}
      {next && next.id !== "exit" ? <Doorway numeral={next.numeral} name={next.name} /> : null}
      {next?.id === "exit" ? <Doorway numeral="" name="Exit" /> : null}
      {!next ? <div className="nl-endwall" data-plane="end" aria-hidden="true" /> : null}
    </section>
  );
}

export function RoomEyebrow({ index }: { index: number }) {
  const room = ROOMS[index];
  return (
    <p className="nl-eyebrow">
      {room.numeral ? <span className="nl-eyebrow-num">Room {room.numeral}</span> : null}
      <span>{room.name}</span>
    </p>
  );
}
