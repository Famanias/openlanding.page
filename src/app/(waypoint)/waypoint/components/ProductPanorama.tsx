"use client";

import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { SuppliedArtwork, type ArtworkId } from "./SuppliedArtwork";

const views: { id: ArtworkId; title: string; description: string }[] = [
  {
    id: 9,
    title: "The bigger picture",
    description:
      "A considered collection of the details that make a workspace feel calm.",
  },
  {
    id: 3,
    title: "The details, together",
    description: "Notes, context, and the next conversation, held in one view.",
  },
  {
    id: 6,
    title: "Small things, considered",
    description:
      "A closer look at the interface, on its original warm paper canvas.",
  },
  {
    id: 7,
    title: "A change of scenery",
    description: "The same visual language, imagined for a smaller screen.",
  },
];

export function ProductPanorama() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="wyp-panorama wyp-chapter" id="overview">
      <div className="wyp-container">
        <div className="wyp-panorama-heading">
          <div>
            <p className="wyp-kicker">Find your bearings</p>
            <h2>
              Your search,
              <br />
              in one place.
            </h2>
          </div>
          <p>
            Not another tab to keep open.
            <br />A place to bring it all together.
            <br />
            <a className="wyp-text-link" href="#story">
              Follow the journey <ArrowDown size={16} />
            </a>
          </p>
        </div>
        <div
          className="wyp-artwork-gallery"
          aria-label="Waypoint concept artwork"
        >
          <div
            className="wyp-artwork-gallery-tabs"
            role="group"
            aria-label="Choose an artwork view"
          >
            {views.map((view, i) => (
              <button
                type="button"
                key={view.id}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                {view.title}
              </button>
            ))}
          </div>
          <div className="wyp-panorama-artboard" data-panorama>
            <div className="wyp-gallery-frame">
              {views.map((view, i) => (
                <div
                  key={view.id}
                  className={`wyp-gallery-image ${selected === i ? "is-active" : ""}`}
                  aria-hidden={selected !== i}
                >
                  <SuppliedArtwork
                    id={view.id}
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="wyp-gallery-caption">
            <div aria-live="polite">
              <h3>{views[selected].title}</h3>
              <p>{views[selected].description}</p>
            </div>
            <div className="wyp-gallery-controls">
              <button
                type="button"
                aria-label="Previous concept artwork"
                onClick={() =>
                  setSelected((selected + views.length - 1) % views.length)
                }
              >
                <ArrowLeft size={18} />
              </button>
              <span>{String(selected + 1).padStart(2, "0")} / 04</span>
              <button
                type="button"
                aria-label="Next concept artwork"
                onClick={() => setSelected((selected + 1) % views.length)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <p className="wyp-artwork-note">
          Supplied interface concepts, including hiring-side sample screens.
          Explore Waypoint’s working job-search demos below.
        </p>
      </div>
    </section>
  );
}
