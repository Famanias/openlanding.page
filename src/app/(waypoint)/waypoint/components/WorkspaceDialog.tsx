"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { containDialogFocus } from "../lib/dialogFocus";

export function WorkspaceDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState("Start your Waypoint pipeline");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("Anthropic");
  const [role, setRole] = useState("Staff Systems Engineer");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [info, setInfo] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    function restoreScroll() {
      document.body.style.overflow = "";
    }
    const observer = new MutationObserver(() => {
      document.body.style.overflow = element?.open ? "hidden" : "";
    });
    observer.observe(element, { attributes: true, attributeFilter: ["open"] });
    element.addEventListener("close", restoreScroll);
    return () => {
      observer.disconnect();
      element.removeEventListener("close", restoreScroll);
      restoreScroll();
    };
  }, []);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "a[href='#get-started'], a[href='#signin'], [data-dialog-title]",
            )
          : null;
      if (!target) return;
      event.preventDefault();
      setTitle(
        target.dataset.dialogTitle ||
          (target.getAttribute("href") === "#signin"
            ? "Welcome back to Waypoint"
            : "Start your Waypoint pipeline"),
      );
      setInfo(Boolean(target.dataset.dialogInfo));
      setDone(false);
      setError("");
      dialog.current?.showModal();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <dialog
      className="wyp-dialog"
      ref={dialog}
      aria-labelledby="workspace-title"
      onKeyDown={containDialogFocus}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <button
        type="button"
        className="wyp-dialog-close"
        aria-label="Close workspace dialog"
        onClick={() => dialog.current?.close()}
      >
        <X size={22} />
      </button>
      <p className="wyp-kicker">Waypoint / Workspace preview</p>
      <h2 id="workspace-title">{title}</h2>
      {info ? (
        <>
          <p>
            This page is a Waypoint product demonstration. No live accounts,
            email integrations, purchases, encryption service, or published
            legal documents are connected.
          </p>
          <p>
            Explore the working pipeline, interview calendar, reply simulation,
            and privacy controls in the flight deck.
          </p>
          <button
            type="button"
            className="wyp-button wyp-button-dark"
            onClick={() => dialog.current?.close()}
          >
            Back to Waypoint
          </button>
        </>
      ) : done ? (
        <div role="status">
          <h3>Your preview is ready.</h3>
          <p>
            A sample pipeline for <strong>{company}</strong>, pursuing{" "}
            <strong>{role}</strong>. This is a local preview for {email}. No
            account was created and no email was sent.
          </p>
          <button
            type="button"
            className="wyp-button wyp-button-dark"
            onClick={() => {
              dialog.current?.close();
              document.getElementById("pipeline")?.scrollIntoView();
            }}
          >
            Explore the flight deck <ArrowUpRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <p>
            Give your next chapter a starting point. Try the local workspace
            preview.
          </p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
                setError("Enter a valid email address.");
                return;
              }
              setError("");
              setDone(true);
            }}
          >
            <label htmlFor="workspace-email">Your email address</label>
            <input
              id="workspace-email"
              autoComplete="email"
              type="email"
              maxLength={254}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "workspace-error" : undefined}
              placeholder="you@domain.com"
            />
            <label htmlFor="workspace-company">First target company</label>
            <input
              id="workspace-company"
              value={company}
              maxLength={100}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label htmlFor="workspace-role">Target role</label>
            <input
              id="workspace-role"
              value={role}
              maxLength={100}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            {error && (
              <p role="alert" id="workspace-error">
                {error}
              </p>
            )}
            <button type="submit" className="wyp-button wyp-button-dark">
              Preview my workspace <ArrowUpRight size={18} />
            </button>
          </form>
          <small>
            Local browser demo. No data is sent or stored after reload.
          </small>
        </>
      )}
    </dialog>
  );
}
