import { ReservationForm } from "../forms/ReservationForm";

export function Reservation() {
  return (
    <section className="kj-slab kj-slab--beton kj-reserve" id="reserve" aria-labelledby="kj-reserve-title">
      <header className="kj-section-head">
        <p className="kj-mono">05 · 予約 · Reserve</p>
        <h2 id="kj-reserve-title" className="kj-h2">
          Twelve seats. Two seatings.
        </h2>
        <p className="kj-lead">
          Bookings open thirty days ahead, for parties of one to four. We hold seats for fifteen minutes past your
          time.
        </p>
      </header>
      <ReservationForm />
    </section>
  );
}
