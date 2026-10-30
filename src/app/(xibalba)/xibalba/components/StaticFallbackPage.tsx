/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  ASSET_URLS,
  CODEX_FOLIOS,
  DESCENT_STATIONS,
} from '../data/sceneData';

export const StaticFallbackPage: React.FC = () => {
  return (
    <div className="xib-static-fallback">
      {/* Top Banner & Header */}
      <header className="xib-fallback-header">
        <div className="xib-fallback-brand">
          <svg width="28" height="26" viewBox="0 0 26 24" aria-hidden="true">
            <polygon points="13,1 25,23 1,23" fill="#EEFAF6" />
            <circle cx="13" cy="15.2" r="3.4" fill="#040A0E" />
            <circle cx="14.4" cy="14.4" r="3" fill="#EEFAF6" />
          </svg>
          <div>
            <h1 className="xib-fallback-logo">XIBALBA</h1>
            <p className="xib-fallback-sublogo">Night of the Jade Cenote</p>
          </div>
        </div>
        <nav className="xib-fallback-nav" aria-label="Descent overview">
          <a href="#station-top">Rim & Pyramid</a>
          <a href="#station-story">Orchid Vaults</a>
          <a href="#station-rites">Calendar Wheel</a>
          <a href="#station-night">Copal Foundry</a>
          <a href="#station-finale">Moon River</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="xib-fallback-hero" id="station-top">
        <div className="xib-fallback-hero-content">
          <span className="xib-kicker">AUTUMN EQUINOX OBSERVATORY</span>
          <h2 className="xib-fallback-title">XIBALBA</h2>
          <p className="xib-fallback-lead">
            An illustrated vertical descent into a collapsed Yucatan limestone sinkhole at midnight:
            five full-bleed scenes joined across every boundary by subterranean limestone seam bands,
            bioluminescent jade waterfalls, and warm copal firelight.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene1}
              alt="The Jungle Rim, Eclipsed Pyramid, and Upper & Lower Jade Falls"
              loading="eager"
            />
            <figcaption className="xib-plate-caption">
              Scene I — The Jungle Rim & Eclipsed Pyramid of Kukulcán (0m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station II */}
      <section className="xib-fallback-section" id="station-story">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION II · -42M DEPTH</span>
          <h2>The Cenote & Ghost-Orchid Vault</h2>
          <p>
            Every autumn equinox the subterranean springs of Xibalba run luminous jade. For one
            night the canyon rim lights its copal braziers, the root-carved steps open, and the
            forest spirits descend to the water.
          </p>
          <p>
            We have kept the descent for three hundred years: a walk through the orchid vaults, the
            water-calendar, and the resin kilns, ending where the underground river meets the moon.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene2}
              alt="The Cenote, Central Falls, Obsidian Mirror, and 6 Orchid Cylinders"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene II — The Cenote & Ghost-Orchid Vault (-42m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station III */}
      <section className="xib-fallback-section" id="station-rites">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION III · -96M DEPTH</span>
          <h2>The Calendar Wheel & Canopy Walk</h2>
          <h3>The Canopy Walk.</h3>
          <p>
            At dusk the procession leaves the pyramid steps and follows the jade cascade down into the
            limestone chasm. Bring a clay copal censer, or borrow one of ours at the rim. Initiates
            lead, the elders walk last, and nobody looks back until the water-drums stop.
          </p>
          <h3>The Turning Stone.</h3>
          <p>
            Below the upper falls the carved Mayan wheel turns all night. Press a wish onto a beaten
            bark strip, wedge it into a stone tooth, and let the current carry it round to midnight.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene3}
              alt="The Calendar Wheel, Left Falls, and Twin Codex Pedestals"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene III — The Turning Stone Water-Calendar Wheel (-96m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station IV */}
      <section className="xib-fallback-section" id="station-night">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION IV · -145M DEPTH</span>
          <h2>The Copal Foundry & Serpent Cauldron</h2>
          <h3>Rim Gates at Six.</h3>
          <p>
            The stone gates open at 18:00 on the Equinox. The walk takes ninety minutes down the steps,
            and the foundry halls stay open until three, serving spiced cacao, honey balché, and
            roasted squash.
          </p>
          <h3>Midnight at the Cauldron.</h3>
          <p>
            At the twelfth conch blast the three serpent conduits are unsealed and every lotus lantern
            is carried down to the subterranean river. Stay for it.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene4}
              alt="The Copal Foundry, Serpent Cauldron, and Molten Resin Streams"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene IV — The Copal Kiln Foundry & Serpent Spouts (-145m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station V & Finale */}
      <section className="xib-fallback-section" id="station-finale">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION V · -180M DEPTH</span>
          <h2>Meet us where the river opens.</h2>
          <p>
            Where the subterranean river meets the low horizon moon, fifteen ceremonial lotus
            lanterns drift across the obsidian lagoon under the grand limestone arch.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene5}
              alt="Sanctuary Where the River Opens, Low Moon & Pillar, and Floating Lotus Lanterns"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene V — The Moon River Sanctuary & Lotus Lantern Fleet (-180m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Codex Folios Section */}
      <section className="xib-fallback-section">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">AMATE BARK ARCHIVE</span>
          <h2>The Equinox Codex Folios</h2>
          <div className="xib-fallback-folios">
            {CODEX_FOLIOS.map((folio) => (
              <article key={folio.numeral} className="xib-folio-entry">
                <span className="xib-folio-meta">{folio.numeral} · {folio.mayaGlyphName} · {folio.depth}</span>
                <h3>{folio.title}</h3>
                <p>{folio.excerpt}</p>
                <div className="xib-folio-rite">
                  <strong>Rite Protocol:</strong> {folio.riteNotes}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Descent Stations Table */}
      <section className="xib-fallback-section">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION ELEVATIONS & PROTOCOLS</span>
          <h2>Subterranean Cross-Section</h2>
          <div className="xib-stations-table">
            {DESCENT_STATIONS.map((st) => (
              <div key={st.id} className="xib-station-row">
                <div className="xib-station-depth">{st.depthMeters}m</div>
                <div className="xib-station-info">
                  <h4>{st.title}</h4>
                  <p className="xib-station-time">{st.subtitle}</p>
                  <ul className="xib-station-tags">
                    {st.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="xib-fallback-footer">
        <p>© 2026 Xibalba Nocturnal Reserve · Yucatan, Mexico</p>
        <p>Autumn Equinox Descent · 18:00 to 03:00</p>
      </footer>
    </div>
  );
};
