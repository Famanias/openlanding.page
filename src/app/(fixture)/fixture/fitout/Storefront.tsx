import type { CSSProperties } from "react";
import { Vessel, type VesselKind } from "./Stoneware";

const PRODUCTS: { name: string; price: string; kind: VesselKind; tone: "ink" | "graphite" | "white"; rating: string; sub?: boolean }[] = [
  { name: "Tide mug", price: "€34", kind: "mug", tone: "ink", rating: "4.9 · 212" },
  { name: "Low bowl", price: "€42", kind: "bowl", tone: "graphite", rating: "4.8 · 96", sub: true },
  { name: "Dune vase", price: "€78", kind: "vase", tone: "white", rating: "5.0 · 41" },
  { name: "Pour jug", price: "€56", kind: "jug", tone: "graphite", rating: "4.9 · 73" },
];

const APPS = [
  { id: "reviews", label: "Reviews", glyph: "★", depth: 1 },
  { id: "subscribe", label: "Subscribe & save", glyph: "↻", depth: 2 },
  { id: "bookings", label: "Bookings", glyph: "◷", depth: 3 },
  { id: "email", label: "Email flows", glyph: "✉", depth: 2 },
];

const ORDERS = [
  { no: "1042", item: "Tide mug ×2", total: "€68.00", city: "Utrecht" },
  { no: "1043", item: "Dune vase", total: "€78.00", city: "Antwerp" },
  { no: "1044", item: "Low bowl ×4 · subscribe", total: "€151.20", city: "Leeds" },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * The demo merchant's store, drawn in DOM. Every part carries data-fit="n" (the stage that fits it) and
 * most have a dashed data-slot="n" twin that shows while the part is missing. Fitted is the default look;
 * fixture.css only hides parts inside the live scene, before their stage is reached.
 */
export function Storefront() {
  return (
    <div className="fx-shop">
      <svg className="fx-shop__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M3 30 C 10 30, 12 44, 22 46" pathLength={1} data-wire style={i(0)} />
        <path d="M3 62 C 10 62, 14 70, 30 70" pathLength={1} data-wire style={i(1)} />
        <path d="M97 44 C 90 44, 88 52, 78 54" pathLength={1} data-wire style={i(2)} />
        <path d="M97 78 C 90 78, 86 84, 74 86" pathLength={1} data-wire style={i(3)} />
      </svg>

      <ul className="fx-shop__apps" aria-label="Apps wired into the store">
        {APPS.map((app, index) => (
          <li key={app.id} className={`fx-app fx-app--${app.id}`} data-fit="3" data-depth={app.depth} style={i(index)}>
            <span className="fx-app__glyph" aria-hidden="true">{app.glyph}</span>
            <span>{app.label}</span>
            <span className="fx-app__ok" aria-hidden="true" />
          </li>
        ))}
      </ul>

      <div className="fx-window" role="img" aria-label="A demo storefront for Fennel & Clay, a stoneware studio, assembled stage by stage">
        <div className="fx-window__bar">
          <span className="fx-window__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="fx-window__url">
            <span className="fx-window__url-temp" data-slot="1">untitled-store-8842.myshopify.com</span>
            <span className="fx-window__url-live" data-fit="1">
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.5 5h7v5h-7Z" /></svg>
              fennelandclay.com
            </span>
          </span>
          <span className="fx-window__pay" data-fit="1" style={i(2)}>Payments live</span>
        </div>

        <div className="fx-window__ship" data-fit="4">Free shipping over €60 · Kiln drop Friday</div>

        <div className="fx-window__body">
          <div className="fx-store-nav">
            <span className="fx-slot fx-slot--nav" data-slot="2"><span>nav</span></span>
            <span className="fx-store-nav__brand" data-fit="2" style={i(0)}>Fennel &amp; Clay</span>
            <span className="fx-store-nav__links" data-fit="2" style={i(1)}><span>Shop</span><span>Kiln drops</span><span>Studio</span></span>
            <span className="fx-store-nav__cart" data-fit="2" style={i(2)}>
              Cart
              <span className="fx-store-nav__count" data-fit="5" style={i(3)}>3</span>
            </span>
          </div>

          <div className="fx-store-banner">
            <span className="fx-slot fx-slot--banner" data-slot="2"><span>banner slot · 1440 × 560</span></span>
            <div className="fx-store-banner__fitted" data-fit="2" style={i(1)}>
              <p className="fx-store-banner__head">
                <span className="fx-store-banner__generic" data-slot="4">Welcome to our store</span>
                <span className="fx-store-banner__real" data-fit="4">Hand-thrown stoneware, fired in small batches.</span>
              </p>
              <span className="fx-store-banner__cta">Shop the kiln drop</span>
              <span className="fx-store-banner__art" aria-hidden="true">
                <Vessel kind="vase" tone="white" />
                <Vessel kind="jug" tone="graphite" />
              </span>
            </div>
          </div>

          <ul className="fx-store-grid">
            {PRODUCTS.map((product, index) => (
              <li key={product.name} className="fx-tile">
                <span className="fx-slot fx-slot--tile" data-slot="2"><span>product {String(index + 1).padStart(2, "0")}</span></span>
                <span className="fx-tile__fitted" data-fit="2" style={i(index + 2)}>
                  <span className="fx-tile__art">
                    <Vessel kind={product.kind} tone={product.tone} />
                    {product.sub ? <span className="fx-tile__sub" data-fit="3" style={i(4)}>Subscribe −10%</span> : null}
                  </span>
                  <span className="fx-tile__meta">
                    <span className="fx-tile__name">{product.name}</span>
                    <span className="fx-tile__price">{product.price}</span>
                  </span>
                  <span className="fx-tile__stars" data-fit="3" style={i(index)}>★ {product.rating}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="fx-orders" data-fit="5" aria-hidden="true">
          {ORDERS.map((order, index) => (
            <li key={order.no} className="fx-order" style={i(index)}>
              <span className="fx-order__dot" />
              <span className="fx-order__no">No. {order.no}</span>
              <span className="fx-order__item">{order.item}</span>
              <span className="fx-order__total">{order.total}</span>
              <span className="fx-order__city">{order.city}</span>
            </li>
          ))}
        </ol>

        <div className="fx-sign" aria-hidden="true">
          <span className="fx-sign__string" />
          <span className="fx-sign__card" data-flip="5">
            <span className="fx-sign__face fx-sign__face--open">Open</span>
            <span className="fx-sign__face fx-sign__face--closed">Closed</span>
          </span>
        </div>
      </div>
    </div>
  );
}
