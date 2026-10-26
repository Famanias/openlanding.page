# 004 — Give form success a tactile handoff

- **Status**: DONE
- **Commit**: 55784e5
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Interruptibility
- **Estimated scope**: 2 files, 30 lines

## Problem

Submitting a valid request replaces the entire form tree synchronously. In `src/app/(assemblage)/assemblage/forms/RequestForm.tsx:13-20`, `setSent(true)` immediately switches from `<form>` to the success `<div>`:

```tsx
function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const next = validateRequest(values);
  setErrors(next);
  if (Object.keys(next).length === 0) setSent(true);
}

if (sent) return <div className="as-form as-form--success" role="status" aria-live="polite">…</div>;
```

There is no transition or state class for this rare, high emotion moment. The success copy teleports in while the user is still focused on the submit button. The existing CSS only styles the finished state at `assemblage.css:99`:

```css
.as-form--success { min-height: 440px; align-content: center; }
```

## Target

Keep the form shell mounted and transition between an idle form panel and a success panel using opacity and transform only. Add a `submitted` state class to the shell, render the success panel alongside the form, and mark the inactive panel `aria-hidden` while preserving the live region on the success panel. Use a 420ms ease-out handoff:

```css
.as-form-shell { position: relative; min-height: 440px; }
.as-form-shell > .as-form-fields,
.as-form-shell > .as-form-success {
  transition: opacity 420ms var(--ease-as), transform 420ms var(--ease-as);
}
.as-form-shell > .as-form-success { opacity: 0; transform: translateY(24px); pointer-events: none; }
.as-form-shell[data-state="success"] > .as-form-fields { opacity: 0; transform: translateY(-16px); pointer-events: none; }
.as-form-shell[data-state="success"] > .as-form-success { opacity: 1; transform: none; pointer-events: auto; }
```

The submit handler may still set the existing `sent` state, but the render must preserve the shell and switch `data-state="success"`. Move focus to the success container after the state changes, or give it `tabIndex={-1}` and call `.focus()` in a `useEffect`; the announcement must remain a single meaningful `role="status"` update.

Under reduced motion, the CSS must disable the transform while retaining the opacity transition or instant state completion:

```css
@media (prefers-reduced-motion: reduce) {
  .as-form-shell > .as-form-fields,
  .as-form-shell > .as-form-success { transform: none; transition-duration: 200ms; }
}
```

## Repo conventions to follow

- The form already owns local state and client validation in `src/app/(assemblage)/assemblage/forms/RequestForm.tsx` and must remain network free.
- Motion tokens live in `assemblage.css:3-15`; use `--ease-as` and do not add a library.
- Existing success copy and `role="status" aria-live="polite"` are the source of truth for the message.

## Steps

1. In `RequestForm.tsx`, introduce a shell element with `data-state={sent ? "success" : "idle"}` and keep both the form fields and success panel mounted.
2. Add stable class names for the fields panel and success panel. Keep existing labels, error messages, values and submit behaviour unchanged.
3. Add a focusable success panel and focus it after `sent` becomes true, without moving focus on validation errors.
4. In `assemblage.css`, add the shell and panel transition rules above near the existing form styles. Replace the current one state `.as-form--success` assumption with the shell layout while preserving the 440px minimum height.
5. Add the reduced motion override and keep pointer hover rules unchanged.

## Boundaries

- Do not change validation rules, form copy, network behaviour or success message.
- Do not animate height, width, padding, top or left.
- Do not use an exit timeout that unmounts the success message before assistive technology can announce it.
- If the form markup has changed from the cited conditional render, stop and report the drift.

## Verification

- **Mechanical**: run `npx tsc --noEmit`, `npm test`, and `npm run check`.
- **Feel check**: submit an invalid form and confirm errors remain immediate. Submit a valid form and confirm the fields lift out over 420ms while the success panel settles in from 24px below. Press Tab after success and verify focus is inside the success panel.
- Set animation playback to 10% and confirm the success message never flashes before the field panel begins its exit.
- Toggle reduced motion and confirm the success state completes without spatial movement while the live region still announces once.
- **Done when**: a valid submission has a readable tactile handoff, keyboard focus lands on the result, and reduced motion removes movement without losing state feedback.
