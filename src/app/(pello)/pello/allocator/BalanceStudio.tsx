"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowDown, Check, CloudSun, Coffee, SuitcaseRolling } from "@phosphor-icons/react/dist/ssr";
import { BALANCE, PLANS, allocate, getPlan, money, signupHref } from "./model";
import { usePlan, setPlan } from "./usePlan";
import { useReducedMotion } from "../motion/useReducedMotion";
import { Button } from "../motion/Button";
import { durationInMs } from "../motion/math";

const subscribeHydration = () => () => {};

export function BalanceStudio() {
  const { plan, goal } = usePlan();
  const values = allocate(plan, goal);
  const reduce = useReducedMotion();
  const dot = useRef<HTMLSpanElement>(null);
  const flight = useRef<Animation | null>(null);
  const previousPlan = useRef(plan);
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);
  useEffect(() => {
    if (reduce) { flight.current?.cancel(); previousPlan.current = plan; return; }
    if (previousPlan.current === plan || !dot.current) return;
    previousPlan.current = plan;
    const style = getComputedStyle(dot.current);
    const interrupted = flight.current?.playState === "running";
    const from = interrupted ? { transform: style.transform, opacity: style.opacity } : { transform: "translate3d(0,-42px,0) scale(.8)", opacity: "0" };
    flight.current?.cancel();
    flight.current = dot.current.animate([from, { transform: "translate3d(0,0,0) scale(1)", opacity: "1" }], {
      duration: durationInMs(style.getPropertyValue("--pel-duration-transfer")),
      easing: style.getPropertyValue("--pel-ease-out").trim(),
    });
  }, [plan, reduce]);
  useEffect(() => () => flight.current?.cancel(), []);
  const select = (id: typeof plan, contribution: number) => setPlan(id, contribution);
  const destinations = [
    { key: "everyday", label: "Everyday living", note: "For the here and now", icon: Coffee, amount: values.everyday },
    { key: "rainy", label: "A rainy day", note: "A little breathing room", icon: CloudSun, amount: values.rainy },
    { key: "weekend", label: "Weekend away", note: "For the someday soon", icon: SuitcaseRolling, amount: values.weekend },
  ];
  return <div className="pel-studio" data-plan={plan}>
    <div className="pel-plan-options"><fieldset><legend>What feels right for you?</legend>{PLANS.map(item => <label key={item.id} className="pel-plan-option"><input type="radio" name="pello-plan" disabled={!ready} value={item.id} checked={plan === item.id} onChange={() => select(item.id, item.goal)}/><span><strong>{item.label}</strong><small>{item.note}</small></span><span className="pel-radio-check" aria-hidden="true"><Check size={14}/></span></label>)}</fieldset><p className="pel-small">A sample balance. A real feeling of clarity.</p></div>
    <div className="pel-account"><div className="pel-account-top"><span>Your sample balance</span><span className="pel-account-status"><i/> All accounted for</span></div><div className="pel-account-balance">{money(BALANCE)}<span>.00</span></div><div className="pel-studio-flow" aria-hidden="true"><span className="pel-studio-path"/><ArrowDown size={18}/></div>
      <div className="pel-destinations">{destinations.map(({ key, label, note, icon: Icon, amount }) => <div className={"pel-destination pel-destination-" + key} key={key}><span className="pel-destination-icon"><Icon size={23} weight="regular"/></span><span className="pel-destination-label">{label}</span><output aria-live="off" aria-label={label + " allocation"}>{money(amount)}</output><small>{note}</small><div className="pel-allocation-track" aria-hidden="true"><span style={{ transform: "scaleX(" + amount / BALANCE + ")" }}/>{key === "weekend" && <span ref={dot} className="pel-transfer-dot"/>}</div></div>)}</div>
      <div className="pel-goal-control"><label htmlFor="pel-goal">A little more for the weekend?<output htmlFor="pel-goal" aria-live="off">{money(values.weekend)}</output></label><input id="pel-goal" aria-label="Weekend contribution" aria-valuetext={money(values.weekend) + " for the weekend"} type="range" disabled={!ready} min="0" max="1200" step="20" value={goal / 100} onChange={event => select(plan, Number(event.target.value) * 100)}/><div><span>$0</span><span>$1,200</span></div></div>
      <div className="pel-account-bottom"><p role="status" className="pel-plan-status">{getPlan(plan).label}.<br/><span>Every dollar has a little purpose.</span></p><Button href={signupHref(plan, goal)}>Make this my starting point</Button></div>
    </div>
  </div>;
}
