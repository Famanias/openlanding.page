import { Logo } from "./brand/Logo";
import { BookReader } from "./book/BookReader";
import { NAV } from "./content/contents";
import { ROSTER } from "./content/roster";
import { BackCover } from "./pages/BackCover";
import { CataloguePage } from "./pages/CataloguePage";
import { ContentsPage } from "./pages/ContentsPage";
import { Cover } from "./pages/Cover";
import { EditorsLetter } from "./pages/EditorsLetter";
import { FeatureOpener, FeatureQuote, FeatureText } from "./pages/FeaturePages";
import { PressingPlant } from "./pages/PressingPlant";
import { RosterPage } from "./pages/RosterPage";
import { SubscribePage } from "./pages/SubscribePage";

/** Issue 07, in page order: index 0 is page 1. */
const PAGES = [
  <Cover key="p1" />,
  <EditorsLetter key="p2" />,
  <ContentsPage key="p3" />,
  <FeatureOpener key="p4" />,
  <FeatureText key="p5" />,
  <FeatureQuote key="p6" />,
  <RosterPage key="p7" artist={ROSTER[0]} n={7} of={1} />,
  <RosterPage key="p8" artist={ROSTER[1]} n={8} of={2} />,
  <RosterPage key="p9" artist={ROSTER[2]} n={9} of={3} />,
  <CataloguePage key="p10" side="a" n={10} />,
  <CataloguePage key="p11" side="b" n={11} />,
  <PressingPlant key="p12" />,
  <SubscribePage key="p13" />,
  <BackCover key="p14" />,
];

export default function WowflutterPage() {
  return (
    <>
      <header className="wf-topbar">
        <Logo />
        <nav className="wf-nav" aria-label="Pages">
          {NAV.map((n) => (
            <a key={n.page} href={`#p${n.page}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="wf-btn wf-btn--riso" href="#p13">
          Get the next issue
        </a>
      </header>

      <main id="top" className="wf-main">
        <BookReader pages={PAGES} />
      </main>
    </>
  );
}
