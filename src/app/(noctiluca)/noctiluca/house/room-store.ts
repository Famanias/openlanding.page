/**
 * The current room, as a tiny external store. The camera moves every frame, but
 * React only hears about it when the visitor crosses into another room.
 */

export type RoomStore = {
  get: () => number;
  set: (room: number) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createRoomStore(initial = 0): RoomStore {
  let room = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => room,
    set(next) {
      if (next === room) return;
      room = next;
      for (const l of listeners) l();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const roomStore = createRoomStore();
