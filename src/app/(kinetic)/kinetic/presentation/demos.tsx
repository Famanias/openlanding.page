"use client";

import type { ReactNode } from "react";
import {
  CheckCircleIcon,
  DocsIcon,
  DownloadIcon,
  EyeOffIcon,
  FileIcon,
  PersonIcon,
  ReceiptIcon,
  RouteIcon,
  TrailerIcon,
  TruckIcon,
  WalletIcon,
} from "./icons";
import styles from "./presentationStyles";

/*
 * Focused product demonstrations for the landing presentation. Each one is
 * a small, readable slice of a real HighwayTMS screen, filled with clearly
 * illustrative data for the single load the page follows (Load 784932 on
 * Truck 104). None of it is live or interactive product state.
 */

type Tone = "ok" | "warn" | "info" | "muted";

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={styles.pill} data-tone={tone}>
      {children}
    </span>
  );
}

function Illustrative() {
  return <span className={styles.illustrative}>Illustrative data</span>;
}

/* ------------------------------------------------------------------ */
/* 02 Prepare: the load record                                          */
/* ------------------------------------------------------------------ */

export function LoadRecordDemo({ dispatched }: { dispatched: boolean }) {
  return (
    <figure className={`${styles.card} ${styles.loadCard}`} aria-label="Load record demonstration">
      <header className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>Load</span>
          <strong className={styles.cardTitle}>784932</strong>
        </div>
        <span className={styles.statusSwap} aria-live="off">
          <Pill tone={dispatched ? "info" : "muted"}>{dispatched ? "Dispatched" : "Booked"}</Pill>
        </span>
      </header>

      <div className={styles.lane}>
        <div>
          <span className={styles.kicker}>Pickup · Mon 9/8 06:00</span>
          <strong>Chicago, IL</strong>
        </div>
        <span className={styles.laneLine} aria-hidden="true">
          <RouteIcon size={16} />
        </span>
        <div className={styles.alignEnd}>
          <span className={styles.kicker}>Delivery · Tue 9/9 14:00</span>
          <strong>Dallas, TX</strong>
        </div>
      </div>

      <dl className={styles.assign}>
        <div data-highlight="true">
          <dt>
            <TruckIcon size={16} /> Truck
          </dt>
          <dd>
            <span className={styles.unit}>104</span>
          </dd>
        </div>
        <div>
          <dt>
            <TrailerIcon size={16} /> Trailer
          </dt>
          <dd>5307</dd>
        </div>
        <div>
          <dt>
            <PersonIcon size={16} /> Driver
          </dt>
          <dd>
            D. Alvarez <span className={styles.via}>via Truck 104</span>
          </dd>
        </div>
      </dl>

      <footer className={styles.cardFoot}>
        <span className={styles.footItem}>
          <FileIcon size={15} /> Rate confirmation attached · fields reviewed before saving
        </span>
        <Illustrative />
      </footer>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 03 Connected: one record per entity                                  */
/* ------------------------------------------------------------------ */

type DocRow = { name: string; state: string; tone: Tone };

function RecordCard({
  icon,
  kicker,
  title,
  status,
  rows,
  owner,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  status?: ReactNode;
  rows: DocRow[];
  owner: string;
}) {
  return (
    <figure className={`${styles.card} ${styles.recordCard}`} aria-label={`${kicker} ${title} record demonstration`}>
      <header className={styles.cardHead}>
        <div className={styles.recordId}>
          <span className={styles.recordIcon} aria-hidden="true">
            {icon}
          </span>
          <div>
            <span className={styles.kicker}>{kicker}</span>
            <strong className={styles.cardTitle}>{title}</strong>
          </div>
        </div>
        {status}
      </header>
      <p className={styles.owner}>{owner}</p>
      <ul className={styles.docList}>
        {rows.map((row) => (
          <li key={row.name}>
            <span className={styles.docName}>
              <DocsIcon size={15} /> {row.name}
            </span>
            <Pill tone={row.tone}>{row.state}</Pill>
          </li>
        ))}
      </ul>
      <footer className={styles.cardFoot}>
        <Illustrative />
      </footer>
    </figure>
  );
}

export function TruckRecordDemo() {
  return (
    <RecordCard
      icon={<TruckIcon size={20} />}
      kicker="Truck"
      title="Unit 104"
      status={<Pill tone="info">Dispatched</Pill>}
      owner="Filed on the truck"
      rows={[
        { name: "Registration", state: "On file", tone: "ok" },
        { name: "Annual inspection", state: "On file", tone: "ok" },
        { name: "Insurance", state: "On file", tone: "ok" },
      ]}
    />
  );
}

export function DriverRecordDemo() {
  return (
    <RecordCard
      icon={<PersonIcon size={20} />}
      kicker="Driver"
      title="D. Alvarez"
      status={<Pill tone="ok">Active</Pill>}
      owner="Filed on the driver"
      rows={[
        { name: "CDL", state: "Valid · 04/2028", tone: "ok" },
        { name: "Medical card", state: "Expires in 24 days", tone: "warn" },
        { name: "MVR · Drug test", state: "On file", tone: "ok" },
      ]}
    />
  );
}

export function LoadPaperworkDemo() {
  return (
    <RecordCard
      icon={<DocsIcon size={20} />}
      kicker="Load"
      title="784932"
      status={<Pill tone="info">In transit</Pill>}
      owner="Filed on the load"
      rows={[
        { name: "Rate confirmation", state: "Attached", tone: "ok" },
        { name: "Bill of lading", state: "Attached", tone: "ok" },
        { name: "Proof of delivery", state: "At delivery", tone: "muted" },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 04 Workspace: command center, admin vs. dispatcher                   */
/* ------------------------------------------------------------------ */

const ROWS = [
  { load: "784932", lane: "Chicago → Dallas", truck: "104", driver: "D. Alvarez", status: "In transit", tone: "info" as Tone, rate: "$2,450", focus: true },
  { load: "784918", lane: "Atlanta → Cincinnati", truck: "118", driver: "R. Okafor", status: "Picked up", tone: "info" as Tone, rate: "$1,850" },
  { load: "784901", lane: "Phoenix → Denver", truck: "205", driver: "M. Chen", status: "Booked", tone: "muted" as Tone, rate: "$2,100" },
  { load: "784877", lane: "Memphis → Charlotte", truck: "231", driver: "J. Brooks", status: "Delivered", tone: "ok" as Tone, rate: "$2,600" },
];

export type DemoRole = "admin" | "dispatcher";

export function CommandCenterDemo({ role, onRoleChange }: { role: DemoRole; onRoleChange: (role: DemoRole) => void }) {
  const admin = role === "admin";
  const locked = (label: string) => (
    <span className={styles.locked}>
      <EyeOffIcon size={14} /> {label}
    </span>
  );
  return (
    <figure className={`${styles.card} ${styles.console}`} data-role={role} aria-label="Command center demonstration">
      <header className={styles.consoleBar}>
        <div>
          <strong className={styles.consoleTitle}>Command Center</strong>
          <span className={styles.kicker}>Dispatch · Fleet tracking</span>
        </div>
        <div className={styles.roleSwitch} role="group" aria-label="View the command center as">
          <button type="button" data-on={admin} aria-pressed={admin} onClick={() => onRoleChange("admin")}>
            Admin
          </button>
          <button type="button" data-on={!admin} aria-pressed={!admin} onClick={() => onRoleChange("dispatcher")}>
            Dispatcher
          </button>
        </div>
      </header>

      <div className={styles.stats}>
        <div>
          <span className={styles.kicker}>Loads on file</span>
          <strong>24</strong>
        </div>
        <div>
          <span className={styles.kicker}>Trucks active</span>
          <strong>8</strong>
        </div>
        <div>
          <span className={styles.kicker}>Pickups this week</span>
          <strong>6</strong>
        </div>
        <div>
          <span className={styles.kicker}>Total booked</span>
          <strong>{admin ? "$42.8K" : locked("Hidden for this role")}</strong>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Load</th>
            <th scope="col">Lane</th>
            <th scope="col">Truck</th>
            <th scope="col" className={styles.hideNarrow}>
              Driver
            </th>
            <th scope="col">Status</th>
            <th scope="col" className={styles.num}>
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.load} data-focus={row.focus ? "true" : undefined} data-connect={row.focus ? "unit-104" : undefined}>
              <td className={styles.mono}>{row.load}</td>
              <td>{row.lane}</td>
              <td>{row.focus ? <span className={styles.unit}>{row.truck}</span> : <span className={styles.mono}>{row.truck}</span>}</td>
              <td className={styles.hideNarrow}>{row.driver}</td>
              <td>
                <Pill tone={row.tone}>{row.status}</Pill>
              </td>
              <td className={styles.num}>{admin ? row.rate : locked("Hidden")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className={styles.cardFoot}>
        <span className={styles.footItem}>
          {admin ? "Signed in as an admin: rates, pay and settlements visible." : "Signed in as a dispatcher: loads, fleet and drivers — no rates or pay."}
        </span>
        <Illustrative />
      </footer>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Arrive: close the loop                                            */
/* ------------------------------------------------------------------ */

export function CloseoutDemo() {
  const steps = [
    { icon: <CheckCircleIcon size={18} />, title: "Proof of delivery received", detail: "Attached to Load 784932", tone: "ok" as Tone, state: "Done" },
    { icon: <ReceiptIcon size={18} />, title: "Invoice ready", detail: "Rate con, BOL and POD on the same load", tone: "info" as Tone, state: "Ready" },
    { icon: <WalletIcon size={18} />, title: "Driver pay", detail: "Delivered load available for D. Alvarez's paystub", tone: "info" as Tone, state: "Ready" },
    { icon: <DownloadIcon size={18} />, title: "Records", detail: "Export loads to CSV or Excel", tone: "muted" as Tone, state: "Anytime" },
  ];
  return (
    <figure className={`${styles.card} ${styles.closeCard}`} aria-label="Load closeout demonstration">
      <header className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>Load 784932 · Dallas, TX</span>
          <strong className={styles.cardTitle}>Delivered</strong>
        </div>
        <Pill tone="ok">Delivered</Pill>
      </header>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.title}>
            <span className={styles.stepIcon} data-tone={step.tone} aria-hidden="true">
              {step.icon}
            </span>
            <span className={styles.stepText}>
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </span>
            <Pill tone={step.tone}>{step.state}</Pill>
          </li>
        ))}
      </ol>
      <footer className={styles.cardFoot}>
        <Illustrative />
      </footer>
    </figure>
  );
}
