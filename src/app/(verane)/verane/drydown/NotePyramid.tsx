import { calculateNoteState, type Note } from "./evaporation";
import { formatHour } from "./clock";

interface NotePyramidProps {
  notes: Note[];
  hour: number;
  className?: string;
}

export function NotePyramid({ notes, hour, className = "" }: NotePyramidProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="vr-mono text-xs opacity-85 text-[var(--color-calcaire)] pb-1 border-b border-[color-mix(in_srgb,var(--color-ash)_35%,transparent)]">
        Olfactory Pyramid &amp; Evaporation Status
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(["top", "heart", "base"] as const).map((tier) => {
          const tierNotes = notes.filter((n) => n.tier === tier);
          return (
            <div
              key={tier}
              className="p-3.5 border border-[color-mix(in_srgb,var(--color-ash)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-calcaire)_4%,transparent)] flex flex-col justify-between rounded-xl"
            >
              <div className="vr-mono text-[11px] font-semibold text-[var(--color-gilt)] uppercase mb-2">
                {tier} Tier
              </div>

              <div className="flex flex-col gap-2.5">
                {tierNotes.map((note) => {
                  const calculated = calculateNoteState(note, hour);
                  const timingText = `${formatHour(note.onset).replace("H ", "")} → ${formatHour(note.gone).replace("H ", "")}`;

                  return (
                    <div
                      key={note.name}
                      data-state={calculated.state}
                      className="vr-note-item flex flex-col"
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="font-medium text-sm text-[var(--color-calcaire)]">
                          {note.name}
                        </span>
                        <span className="vr-mono text-[10px] opacity-85 text-[var(--color-calcaire)]">
                          {timingText}
                        </span>
                      </div>
                      <p className="text-xs opacity-85 text-[var(--color-calcaire)] m-0 leading-relaxed font-light">
                        {note.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
