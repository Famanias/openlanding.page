import Image from "next/image";
import { InterestForm, TerrainSimulation } from "./ExperienceControls";

const fitQuestions = [
  {
    number: "01",
    question: "How do I find a comfortable fit?",
    answer: "Start with a position that lets you reach the bars and brakes comfortably. A local bicycle professional can help you explore sizing and make adjustments in person.",
  },
  {
    number: "02",
    question: "What should I check before a ride?",
    answer: "Check your tires, brakes, lights and fasteners before setting out. Make sure you can operate the controls comfortably, and use the guidance for your own equipment.",
  },
  {
    number: "03",
    question: "Where should I go for service?",
    answer: "A qualified bicycle mechanic can help with adjustments, wear and repairs. For electrical components, follow the guidance supplied with the equipment and consult a qualified service professional.",
  },
];

function PartsIllustration() {
  return (
    <svg viewBox="0 0 760 250" aria-hidden="true" className="rd-parts-illustration">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="130" cy="125" r="91" /><circle cx="130" cy="125" r="75" /><circle cx="130" cy="125" r="10" />
        <path d="M130 34v182M39 125h182M66 61l128 128M194 61 66 189" />
        <path d="M298 33 406 118 298 204 250 118z M298 33v171M250 118h156 M260 101h-30 M397 104l35-29 M427 75h33" />
        <circle cx="298" cy="117" r="13" /><path d="m305 127 25 25m-5-3h18" />
        <path d="M510 62h90l35 45-38 24h-88z M510 62l-20 24v45h19M596 131v51m-30 0h61" />
        <circle cx="687" cy="125" r="35" /><circle cx="687" cy="125" r="24" /><path d="M687 79v-19m0 130v-19m-46-46h-19m130 0h-19" />
      </g>
    </svg>
  );
}

function InterestIllustration() {
  return (
    <svg viewBox="0 0 600 390" aria-hidden="true" className="rd-interest__illustration" data-reveal="scale">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="173" cy="197" r="136" /><circle cx="173" cy="197" r="113" /><circle cx="173" cy="197" r="18" />
        <path d="M173 61v272M37 197h272M77 101l192 192M269 101 77 293" />
        <path d="M173 197 327 79 414 197H173l88-119 66 1-66-1-18-23m83 24 19-25h37" />
        <circle cx="414" cy="197" r="93" /><circle cx="414" cy="197" r="75" />
        <path d="M414 104v186M321 197h186M348 131l132 132M480 131 348 263" />
        <path d="M42 350h497M522 338l17 12-17 12 M54 34h82 M54 28v12 M136 28v12" />
      </g>
      <circle cx="327" cy="79" r="8" fill="currentColor" />
    </svg>
  );
}

export function ExperienceSections() {
  return (
    <div className="rd-experience">
      <section className="rd-ride-section" id="ride" aria-labelledby="rd-ride-heading">
        <div className="rd-exp-shell">
          <div className="rd-exp-rule"><span>04 / THE RIDE</span><span>STREET PLAN / INTERACTIVE</span></div>
          <div className="rd-ride-intro">
            <h2 id="rd-ride-heading" data-reveal="rise">PICK YOUR<br /><em>LINE.</em></h2>
            <div data-reveal="rise">
              <span className="rd-exp-label">A CITY OF POSSIBILITIES</span>
              <p>From the familiar grid to the unexpected turn. Explore an illustrated route and see the surface change.</p>
              <span className="rd-ride-intro__note">ILLUSTRATION ONLY / NOT A PERFORMANCE TEST</span>
            </div>
          </div>
          <TerrainSimulation />
        </div>
      </section>

      <section className="rd-story-section" id="story" aria-labelledby="rd-story-heading">
        <div className="rd-exp-shell">
          <div className="rd-exp-rule"><span>05 / THE STORY</span><span>TAKE THE LONG WAY HOME ↗</span></div>
          <div className="rd-story-heading">
            <h2 id="rd-story-heading" data-reveal="rise">THE LONG WAY<br /><em>IS THE WAY.</em></h2>
            <p data-reveal="rise">For the streets you know, and the ones you take just to see where they go.</p>
          </div>
          <figure className="rd-story-main" data-reveal="wipe">
            <Image src="/templates/radius/08-street-rider-1600.webp" alt="A helmeted rider crossing a city street on an electric bicycle" width={1600} height={893} sizes="(max-width: 700px) 100vw, 90vw" loading="lazy" />
            <figcaption><span>FIELD NOTES / 01</span><span>THE CITY, IN MOTION</span></figcaption>
          </figure>
          <div className="rd-story-details">
            <div className="rd-story-copy" data-reveal="rise">
              <span className="rd-exp-label">LOOK A LITTLE CLOSER / 02</span>
              <h3>BUILT AROUND<br /><em>THE DETAILS.</em></h3>
              <p>A clean line through the frame. Texture where the tire meets the street. The little things become part of the everyday ride.</p>
              <a href="#fit">Explore fit &amp; care <span aria-hidden="true">↗</span></a>
            </div>
            <figure className="rd-story-frame" data-reveal="wipe">
              <Image src="/templates/radius/09-frame-macro-800.webp" alt="Close detail of a graphite bicycle frame with tangerine accents" width={800} height={1072} sizes="(max-width: 700px) 52vw, 26vw" loading="lazy" />
              <figcaption>01 / FRAME DETAIL</figcaption>
            </figure>
            <figure className="rd-story-tire" data-reveal="wipe">
              <Image src="/templates/radius/10-tire-detail-800.webp" alt="Close detail of the tread on a bicycle tire" width={800} height={800} sizes="(max-width: 700px) 48vw, 20vw" loading="lazy" />
              <figcaption>02 / TIRE DETAIL</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="rd-fit-section" id="fit" aria-labelledby="rd-fit-heading">
        <div className="rd-exp-shell">
          <div className="rd-exp-rule"><span>06 / FIT &amp; CARE</span><span>THE PRACTICAL STUFF</span></div>
          <div className="rd-fit-layout">
            <div className="rd-fit-intro" data-reveal="rise">
              <span className="rd-exp-label">GOOD TO KNOW</span>
              <h2 id="rd-fit-heading">MAKE IT<br /><em>YOURS.</em></h2>
              <p>A comfortable ride starts with a thoughtful setup. Here are a few places to begin.</p>
              <div className="rd-fit-stamp" aria-hidden="true">FIT /<br />RIDE /<br />REPEAT ↗</div>
            </div>
            <div className="rd-fit-questions" data-reveal="rise">
              {fitQuestions.map((item) => (
                <details className="rd-fit-question" key={item.number} open>
                  <summary><span>{item.number}</span><strong>{item.question}</strong><b aria-hidden="true">+</b></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rd-interest-section" id="interest" aria-labelledby="rd-interest-heading">
        <div className="rd-exp-shell">
          <div className="rd-exp-rule"><span>07 / YOUR NEXT MOVE</span><span>INTEREST / LOCAL DEMO</span></div>
          <div className="rd-interest-layout">
            <div className="rd-interest-story">
              <span className="rd-exp-label">THE OPEN ROAD STARTS HERE</span>
              <h2 id="rd-interest-heading" data-reveal="rise">READY<br />WHEN<br /><em>YOU ARE.</em></h2>
              <p data-reveal="rise">Picture your next ride. Try the interest form to see how this concept could continue.</p>
              <InterestIllustration />
              <span className="rd-interest-story__caption">A RIDE OF YOUR OWN / R—01</span>
            </div>
            <InterestForm />
          </div>
        </div>
      </section>

      <footer className="rd-exp-footer">
        <div className="rd-exp-shell">
          <div className="rd-exp-rule"><span>08 / END OF THE LINE</span><span>KEEP MOVING ↗</span></div>
          <div className="rd-exp-footer__top">
            <div><span className="rd-exp-label">A DIFFERENT WAY THROUGH THE CITY</span><p>Every street is yours.</p></div>
            <nav aria-label="Footer navigation">
              <a href="#build">Build your ride</a>
              <a href="#ride">The ride</a>
              <a href="#story">The story</a>
              <a href="#fit">Fit &amp; care</a>
              <a href="#interest">Interest demo</a>
            </nav>
          </div>
          <div data-reveal="draw"><PartsIllustration /></div>
          <div className="rd-exp-footer__bottom"><strong>RADIUS<span>.</span></strong><span>AN OPENLANDING CONCEPT<br />MADE FOR THE EVERYDAY DETOUR</span><a href="#top">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </div>
  );
}
