"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ArrowRightIcon } from "./icons";
import type { StopId } from "../journey/story";
import { scrollToStop } from "../journey/storyScroll";
import { ArrivalStatus } from "../journey/JourneyTelemetry";
import { Chapter, ChapterLabel } from "./Chapter";
import {
  CloseoutDemo,
  CommandCenterDemo,
  DriverRecordDemo,
  type DemoRole,
  LoadPaperworkDemo,
  LoadRecordDemo,
  TruckRecordDemo,
} from "./demos";
import styles from "./presentationStyles";
import { useBeat, useStoryPast } from "./useStory";
function useHasSession() { return false; }

/** In-page link that lands on a beat's settled frame (falls back to the anchor). */
function beatLink(stop: StopId) {
  return (event: MouseEvent<HTMLElement>) => {
    if (scrollToStop(stop)) event.preventDefault();
  };
}

function PrimaryCta({ children }: { children: string }) {
  return (
    <Link href="#depart" className={styles.primary}>
      {children}
      <ArrowRightIcon size={16} className={styles.primaryIcon} />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* 01 Departure                                                         */
/* ------------------------------------------------------------------ */

export function DepartChapter() {
  return (
    <Chapter id="depart" stops={["depart"]} length={1} labelledBy="depart-title" className={styles.departStage}>
      <div className={styles.frame}>
        <div className={styles.departCopy}>
          <ChapterLabel n={1} name="Departure" meta="Load 784932 · Chicago → Dallas" />
          <h1 id="depart-title" className={styles.display}>
            Keep every load moving from one clear console.
          </h1>
          <p className={styles.lead}>
            KINETIC connects dispatch, autonomous freight, documents and driver settlements for modern
            distribution operations. Follow one load from the gate to the dock.
          </p>
          <div className={styles.actions}>
            <PrimaryCta>Create your company</PrimaryCta>
            <a href="#prepare" onClick={beatLink("prepare")} className={styles.secondary}>
              Follow the load
            </a>
          </div>
        </div>
      </div>
      <span className={styles.cue} aria-hidden="true">
        Scroll to dispatch
      </span>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 02 Prepare the load                                                  */
/* ------------------------------------------------------------------ */

export function PrepareChapter() {
  // The status flips as the reader moves on and the truck pulls away.
  const dispatched = useStoryPast("prepare", 0.08);
  return (
    <Chapter id="prepare" stops={["prepare"]} length={1} labelledBy="prepare-title" className={styles.prepareStage}>
      <div className={styles.frame}>
        <div className={styles.prepareColumn}>
          <div className={styles.head}>
            <ChapterLabel n={2} name="Prepare the load" />
            <h2 id="prepare-title" className={styles.title}>
              Book it once. Assign it with confidence.
            </h2>
            <p className={styles.lead}>
              Enter the load, attach its rate confirmation and review every field before it saves. Then assign the
              truck and trailer that will run it; the truck&rsquo;s driver comes with it.
            </p>
          </div>
          <LoadRecordDemo dispatched={dispatched} />
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 03 On the road: records by entity                                    */
/* ------------------------------------------------------------------ */

const CONNECTED: readonly StopId[] = ["truck", "driver", "paperwork"];
const CONNECTED_TABS = ["Truck", "Driver", "Load"];

export function ConnectedChapter() {
  const beatFromStory = useBeat(CONNECTED);
  const [tabIndex, setTabIndex] = useState<number | null>(null);
  const beat = tabIndex !== null ? tabIndex : beatFromStory;
  const beats = [
    {
      title: "The truck carries its own file.",
      body: "Equipment status and the truck's registration, inspection and insurance live on Unit 104, not in a shared folder.",
      demo: <TruckRecordDemo />,
      side: "left",
    },
    {
      title: "Credentials surface before they lapse.",
      body: "CDL and medical card dates sit on the driver's profile, so an expiring card shows up weeks ahead instead of at a roadside check.",
      demo: <DriverRecordDemo />,
      side: "right",
    },
    {
      title: "Freight paperwork rides with the load.",
      body: "The rate confirmation and BOL are already on Load 784932. The POD joins them at delivery, ready for the invoice.",
      demo: <LoadPaperworkDemo />,
      side: "left",
    },
  ] as const;
  return (
    <Chapter id="connected" stops={CONNECTED} length={1} labelledBy="connected-title" className={styles.connectedStage}>
      <div className={styles.frame}>
        <div className={styles.connectedHead}>
          <ChapterLabel n={3} name="On the road" />
          <h2 id="connected-title" className={styles.title}>
            Every record stays with what it describes.
          </h2>
          <ol className={styles.tabs} aria-label="Records in this chapter">
            {CONNECTED.map((stop, i) => (
              <li key={stop}>
                <a
                  href="#connected"
                  onClick={(e) => {
                    setTabIndex(i);
                    beatLink(stop)(e);
                  }}
                  className={styles.tab}
                  aria-current={beat === i ? "step" : undefined}
                >
                  <span className={styles.tabNum}>{i + 1}</span>
                  {CONNECTED_TABS[i]}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.connectedBeats}>
          {beats.map((b, i) => (
            <article key={b.title} className={styles.beat} data-active={beat === i} data-side={b.side}>
              <h3 className={styles.beatTitle}>{b.title}</h3>
              <p className={styles.beatBody}>{b.body}</p>
              {b.demo}
            </article>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 04 The connected workspace                                           */
/* ------------------------------------------------------------------ */

const WORKSPACE: readonly StopId[] = ["workspace", "roles"];

export function WorkspaceChapter() {
  const beat = useBeat(WORKSPACE);
  // The beat picks the role (the story's second beat shows the dispatcher),
  // and the reader can flip it by hand until the story moves to another beat.
  const [picked, setPicked] = useState<{ beat: number; role: DemoRole } | null>(null);
  // Forget a manual pick once the story moves on (reset during render, the
  // React pattern for state derived from a changing prop).
  if (picked && picked.beat !== beat) setPicked(null);
  const role: DemoRole = picked && picked.beat === beat ? picked.role : beat === 1 ? "dispatcher" : "admin";
  const dispatcher = role === "dispatcher";
  return (
    <Chapter id="workspace" stops={WORKSPACE} length={1} labelledBy="workspace-title" className={styles.workspaceStage}>
      <div className={styles.frame}>
        <div className={styles.workspaceColumn}>
          <div className={styles.head}>
            <ChapterLabel n={4} name="The connected workspace" />
            <h2 id="workspace-title" className={styles.title}>
              The whole operation, on one screen.
            </h2>
            <div className={styles.beatLines}>
              <p className={styles.beat} data-active={!dispatcher}>
                The load, the truck and the driver you just followed are the same records dispatch works from.
                Nothing is re-keyed between screens.
              </p>
              <p className={styles.beat} data-active={dispatcher}>
                Each company works in its own private workspace, and roles decide who sees what: dispatchers run
                loads without seeing rates or driver pay.
              </p>
            </div>
          </div>
          <CommandCenterDemo role={role} onRoleChange={(next) => setPicked({ beat, role: next })} />
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Arrival and the close                                             */
/* ------------------------------------------------------------------ */

const ARRIVE: readonly StopId[] = ["closeout", "arrive"];

export function ArriveChapter() {
  const beatFromStory = useBeat(ARRIVE);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const beat = activeBeat !== null ? activeBeat : beatFromStory;
  const hasSession = useHasSession();
  return (
    <Chapter id="arrive" stops={ARRIVE} length={1} labelledBy="arrive-title" className={styles.arriveStage}>
      <div className={styles.frame}>
        <div className={styles.arriveBeats}>
          <article className={`${styles.beat} ${styles.closeout}`} data-active={beat === 0}>
            <div className={styles.head}>
              <div className="flex items-center justify-between gap-4">
                <ChapterLabel n={5} name="Arrival" meta="Dallas, TX · Dock 2" />
                <button
                  type="button"
                  onClick={() => setActiveBeat(1)}
                  className="rounded-full bg-[#FFE6D2] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF6B2B] hover:bg-[#FF6B2B] hover:text-[#FAF7F2] transition-colors"
                >
                  View Summary →
                </button>
              </div>
              <h2 id="arrive-title" className={styles.title}>
                Delivered. Now close the loop.
              </h2>
              <p className={styles.lead}>
                The proof of delivery lands on the load, the invoice has its paperwork, and the trip is ready for
                the driver&rsquo;s paystub.
              </p>
            </div>
            <CloseoutDemo />
          </article>
          <article className={`${styles.beat} ${styles.finale}`} data-active={beat === 1}>
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={() => setActiveBeat(0)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#8E8294]/30 bg-[#FAF7F2]/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1B1522] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-colors"
              >
                ← Back to Closeout
              </button>
            </div>
            <ArrivalStatus />
            <h2 className={styles.finaleTitle}>One console for the operational details that keep a carrier moving.</h2>
            <p className={styles.finaleLead}>
              Start a company workspace and bring your loads, trucks, drivers, compliance records and dispatch into
              one connected system.
            </p>
            <div className={`${styles.actions} ${styles.actionsCenter}`}>
              {hasSession ? (
                <Link href="#top" className={styles.primary}>
                  Go to dashboard
                  <ArrowRightIcon size={16} className={styles.primaryIcon} />
                </Link>
              ) : (
                <>
                  <PrimaryCta>Create your company</PrimaryCta>
                  <Link href="#depart" className={styles.secondary}>
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </Chapter>
  );
}
