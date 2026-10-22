import { Mark } from "../brand/Logo";
import { ROUTE } from "../content/line";

export type TicketProps = {
  departure: string;
  berth: string;
  seat: string;
  guests: string;
  fare: string;
  name: string;
  number: string;
  issued: boolean;
};

/** The ticket: a live preview while the form is filled in, then punched twice and stamped when it's issued. */
export function Ticket({ departure, berth, seat, guests, fare, name, number, issued }: TicketProps) {
  return (
    <div className="au-ticket" data-state={issued ? "issued" : "preview"}>
      <div className="au-ticket__main">
        <div className="au-ticket__band">
          <Mark className="au-ticket__mark" />
          <span>AUBADE · Billet de nuit</span>
          <span className="au-ticket__no">{number}</span>
        </div>
        <div className="au-ticket__route">
          <div>
            <span className="au-ticket__k">Paris-Gare de Lyon</span>
            <span className="au-ticket__time">{ROUTE.departs}</span>
          </div>
          <svg className="au-ticket__arrow" viewBox="0 0 64 16" aria-hidden="true">
            <path d="M0 8h60M54 2l6 6-6 6" />
          </svg>
          <div className="au-ticket__end">
            <span className="au-ticket__k">Venezia S. Lucia</span>
            <span className="au-ticket__time">{ROUTE.arrives}</span>
          </div>
        </div>
        <dl className="au-ticket__grid">
          <div>
            <dt>Date</dt>
            <dd>{departure || "—"}</dd>
          </div>
          <div>
            <dt>Berth</dt>
            <dd>{berth || "—"}</dd>
          </div>
          <div>
            <dt>Voiture · Cabine</dt>
            <dd>{seat}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{guests}</dd>
          </div>
          <div className="au-ticket__wide">
            <dt>Name on the door</dt>
            <dd>{name || "—"}</dd>
          </div>
        </dl>
      </div>
      <div className="au-ticket__stub">
        <span className="au-ticket__k">Fare</span>
        <span className="au-ticket__fare">{fare}</span>
        <span className="au-ticket__incl">dinner &amp; breakfast</span>
        <span className="au-ticket__hole au-ticket__hole--1" aria-hidden="true" />
        <span className="au-ticket__hole au-ticket__hole--2" aria-hidden="true" />
      </div>
      <span className="au-ticket__stamp" aria-hidden={!issued}>
        <span>Validé</span>
        <small>{ROUTE.departs} · Quai 3</small>
      </span>
    </div>
  );
}
