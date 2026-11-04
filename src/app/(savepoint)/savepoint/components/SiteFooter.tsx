'use client';
export default function SiteFooter({ onReturn, busy }: { onReturn: () => void; busy: boolean }) {
    return <footer className="site-footer editorial-section" inert={busy}>
        <div className="section-rule utility"><span>05 / ONE MORE DETOUR</span><span>YOUR SAVE IS STILL HERE.</span></div>
        <h2 className="section-title centered">YOUR NEXT WORLD<br /><span>IS WAITING.</span></h2>
        <button className="return-button" onClick={onReturn}>RETURN TO THE CARTRIDGES <span>↑</span></button>
        <div className="footer-bottom"><a className="wordmark" href="#archive">SAVEPOINT<span>.</span></a><span className="utility">10 ARCHIVED WORLDS / REVISION 01</span><nav aria-label="Footer"><a href="#archive">ARCHIVE</a><a href="#the-deck">THE DECK</a><a href="#manifest">MANIFEST</a><a href="#index">INDEX</a></nav></div>
        <div className="footer-legal utility"><span>AN IMAGINARY COLLECTION, BUILT TO BE EXPLORED</span><span>© SAVEPOINT. 2026 / ALL WORLDS ARE FICTIONAL.</span></div>
    </footer>;
}
