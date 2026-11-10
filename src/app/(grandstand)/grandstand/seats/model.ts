export type Section = "Left" | "Centre" | "Right";
export type Seat = { id: string; section: Section; row: string; number: number; available: boolean; priceCents: number; x: number; y: number };

export const MAX_SEATS = 6;
export const SECTIONS: Section[] = ["Left", "Centre", "Right"];
export const SEATS: Seat[] = SECTIONS.flatMap((section, sectionIndex) =>
  Array.from({ length: 6 }, (_, rowIndex) =>
    Array.from({ length: 8 }, (_, seatIndex) => {
      const row = String.fromCharCode(65 + rowIndex);
      const number = seatIndex + 1;
      return {
        id: `${section.toLowerCase()}-${row}-${number}`,
        section,
        row,
        number,
        available: (rowIndex * 11 + seatIndex * 7 + sectionIndex * 5) % 13 !== 0,
        priceCents: section === "Centre" ? 4800 : 3800,
        x: 39 + sectionIndex * 192 + seatIndex * 19,
        y: 83 + rowIndex * 32,
      };
    }),
  ).flat(),
);

export function selectSeat(selected: string[], id: string): string[] {
  const seat = SEATS.find((entry) => entry.id === id);
  if (!seat?.available) return selected;
  if (selected.includes(id)) return selected.filter((entry) => entry !== id);
  return selected.length < MAX_SEATS ? [...selected, id] : selected;
}

export function summarizeSeats(selected: string[]) {
  const seats = SEATS.filter((seat) => seat.available && selected.includes(seat.id));
  return { count: seats.length, totalCents: seats.reduce((sum, seat) => sum + seat.priceCents, 0) };
}
