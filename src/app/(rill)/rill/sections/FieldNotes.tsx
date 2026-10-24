import { Picture } from "../assets";
import { Reveal } from "../motion/Reveal";
import { FIELD_NOTES } from "../content/field-data";

export function FieldNotes() {
  return (
    <section className="rl-section rl-notes" id="notes" aria-labelledby="rl-notes-title">
      <div className="rl-container">
        <div className="rl-notes__head"><div><Reveal className="rl-eyebrow">04 / FIELD NOTES</Reveal><h2 id="rl-notes-title" style={{ marginTop: 18, maxWidth: "8ch" }}>Proof in the ground.</h2></div><p>Three fields, three storms, one practice: leave the water where the next day can find it.</p></div>
        <div className="rl-notes__rail">
          {FIELD_NOTES.map((note) => <article className="rl-note" key={note.id}><div className="rl-note__media"><Picture assetKey={note.assetKey} alt={`${note.farm} field note`} /></div><div className="rl-note__body"><div className="rl-note__top"><div><h3 className="rl-note__farm">{note.farm}</h3><p className="rl-note__region rl-mono">{note.region}</p></div><span className="rl-note__stamp">RILL / {String(note.storm).padStart(2, "0")}</span></div><p className="rl-note__copy">{note.note}</p><div className="rl-note__numbers"><div className="rl-note__number"><strong>{note.acres}</strong><span>acres</span></div><div className="rl-note__number"><strong>{note.storm}</strong><span>mm storm</span></div><div className="rl-note__number"><strong>{note.daysHeld}</strong><span>days held</span></div></div></div></article>)}
        </div>
      </div>
    </section>
  );
}

