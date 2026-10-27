"use client";

export function SoundToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="lt-sound" aria-pressed={on} onClick={onToggle}>
      <span className="lt-sound__bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="lt-sound__text">Sound</span>
    </button>
  );
}
