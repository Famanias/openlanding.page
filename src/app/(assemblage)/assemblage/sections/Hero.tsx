export function Hero() {
  return (
    <section className="as-hero as-container" id="top">
      <div className="as-hero-copy">
        <p className="as-kicker" data-as-reveal="hero-kicker"><span className="as-kicker-dot" /> Material studies for independent brands</p>
        <h1 data-as-reveal="hero-title">Make the idea visible <span>before you make it real.</span></h1>
        <p className="as-lead" data-as-reveal="hero-lead">Assemblage builds a tactile visual direction from the scraps, references and instincts already in the room.</p>
        <div className="as-hero-actions" data-as-reveal="hero-actions">
          <a className="as-button as-button--primary" href="#request">Request a material study <span aria-hidden="true">↗</span></a>
          <a className="as-text-link" href="#materials">See the layers <span aria-hidden="true">↓</span></a>
        </div>
        <p className="as-hero-proof" data-as-reveal="hero-proof"><span className="as-stamp">2 weeks</span> from loose idea to a launch direction your team can use.</p>
      </div>
      <div className="as-hero-art" aria-label="A collage of paper, acetate and ink samples" role="img" data-as-reveal="hero-art">
        <div className="as-art-shadow" />
        <div className="as-art-paper as-art-paper--back" data-as-scroll-layer="back"><span>MAKE ROOM<br />FOR THE<br />UNEXPECTED</span></div>
        <div className="as-art-tape as-art-tape--one" />
        <div className="as-art-photo" data-as-scroll-layer="photo"><div className="as-photo-sun" /><div className="as-photo-line as-photo-line--one" /><div className="as-photo-line as-photo-line--two" /><span>FIELD NOTE 07</span></div>
        <div className="as-art-paper as-art-paper--front" data-as-scroll-layer="front"><span>material<br />is a point<br />of view</span><i>01</i></div>
        <div className="as-art-acetate" data-as-scroll-layer="acetate"><span>ASSEMBLE<br />REPEAT<br />REFINE</span></div>
        <div className="as-art-tape as-art-tape--two" />
        <div className="as-art-scribble" aria-hidden="true"><svg viewBox="0 0 180 100"><path d="M4 65c26-50 46 32 70-10s36 32 72-30c12-20 20-6 30 2" /></svg></div>
        <span className="as-art-caption as-mono">A working surface, not a moodboard</span>
      </div>
      <div className="as-hero-foot" aria-hidden="true"><span>Assemblage / 01</span><span>Scroll to sort the layers</span><span>London · Copenhagen · Remote</span></div>
    </section>
  );
}
