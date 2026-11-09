import { Picture } from "../assets";

export function DirectorNotes() {
  return <section className="fo-notes fo-section" id="notes">
    <div className="fo-section-top fo-mono"><span>03 / DIRECTOR’S NOTES</span><span>ON LOOKING CLOSER</span></div>
    <div className="fo-notes__layout"><div className="fo-notes__intro" data-reveal="mask"><p className="fo-kicker">A NOTE FROM THE DIRECTOR</p><h2>Stay a little<br /><em>longer.</em></h2><p>Sometimes the most honest part of a story is the moment just before it begins.</p></div>
      <div className="fo-notes__script" data-reveal="rise"><p className="fo-script-line fo-mono">INT. A QUIET ROOM — LATE AFTERNOON</p><p>The light moves across the wall. Someone is about to speak, but doesn’t.</p><p>That is where I like to begin. With room for a gesture, a place, or a pause to tell us something we couldn’t have planned.</p><p>Working across nonfiction, fiction and imagined commissions, I make pictures that feel lived in. Small crews. Open eyes. Space for the unexpected.</p><p className="fo-script-end fo-mono">CUT TO: THE NEXT FRAME _</p></div>
      <figure className="fo-notes__portrait" data-reveal="scale"><Picture assetKey="11-director-portrait" alt="Fictional director portrait" /><figcaption className="fo-mono">THE DIRECTOR / A FICTIONAL PORTRAIT</figcaption></figure>
    </div>
  </section>;
}
