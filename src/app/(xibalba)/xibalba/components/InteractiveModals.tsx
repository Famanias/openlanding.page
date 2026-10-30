import React, { useState } from 'react';
import { CODEX_FOLIOS, DESCENT_STATIONS } from '../data/sceneData';
import {
  PassageReservationInput,
  validatePassageReservation,
} from '../utils/cenoteMath';

export type ActiveModalType = 'codex' | 'reserve' | 'map' | null;

interface InteractiveModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  onJumpToScene: (sceneId: string) => void;
  reservedPassages: Array<PassageReservationInput & { code: string }>;
  onAddReservation: (res: PassageReservationInput & { code: string }) => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
  onJumpToScene,
  reservedPassages,
  onAddReservation,
}) => {
  const [activeFolioIndex, setActiveFolioIndex] = useState(0);

  // Reservation form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [waveTime, setWaveTime] = useState('18:00');
  const [partySize, setPartySize] = useState(2);
  const [censerOption, setCenserOption] = useState<'borrow' | 'bring'>('borrow');
  const [barkWish, setBarkWish] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [latestConfirmation, setLatestConfirmation] = useState<string | null>(null);

  if (!activeModal) return null;

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: PassageReservationInput = {
      fullName,
      email,
      waveTime,
      partySize: Number(partySize),
      censerOption,
      barkWish,
    };
    const result = validatePassageReservation(input);
    if (!result.valid || !result.confirmationCode) {
      setFormErrors(result.errors as Record<string, string>);
      return;
    }
    setFormErrors({});
    setLatestConfirmation(result.confirmationCode);
    onAddReservation({ ...input, code: result.confirmationCode });
  };

  const resetReserveForm = () => {
    setLatestConfirmation(null);
    setFullName('');
    setEmail('');
    setBarkWish('');
    setFormErrors({});
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          Close ×
        </button>

        {activeModal === 'codex' && (
          <div className="codex-modal-content">
            <p className="modal-kicker">Amate Bark Archive · Three Hundred Years of the Descent</p>
            <h2 id="modal-heading" className="modal-title">
              The Equinox Codex
            </h2>
            <div className="rule modal-rule" />

            <div className="codex-tabs" role="tablist" aria-label="Codex Folios">
              {CODEX_FOLIOS.map((folio, idx) => (
                <button
                  key={folio.numeral}
                  type="button"
                  role="tab"
                  aria-selected={activeFolioIndex === idx}
                  className={`codex-tab ${activeFolioIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveFolioIndex(idx)}
                >
                  {folio.numeral}
                </button>
              ))}
            </div>

            {(() => {
              const folio = CODEX_FOLIOS[activeFolioIndex];
              return (
                <article className="codex-folio-card" role="tabpanel">
                  <div className="codex-meta-row">
                    <span>{folio.mayaGlyphName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{folio.depth}</span>
                  </div>
                  <h3 className="codex-folio-heading">{folio.title}</h3>
                  <p className="codex-folio-body">{folio.excerpt}</p>
                  <div className="codex-rite-box">
                    <span className="codex-rite-label">Rite Protocol</span>
                    <p>{folio.riteNotes}</p>
                  </div>
                </article>
              );
            })()}

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-ghost"
                disabled={activeFolioIndex === 0}
                onClick={() => setActiveFolioIndex((i) => Math.max(0, i - 1))}
              >
                Previous Folio
              </button>
              <button
                type="button"
                className="btn-solid"
                onClick={() => {
                  if (activeFolioIndex < CODEX_FOLIOS.length - 1) {
                    setActiveFolioIndex((i) => i + 1);
                  } else {
                    onClose();
                  }
                }}
              >
                {activeFolioIndex < CODEX_FOLIOS.length - 1 ? 'Next Folio' : 'Return to Cenote'}
              </button>
            </div>
          </div>
        )}

        {activeModal === 'map' && (
          <div className="map-modal-content">
            <p className="modal-kicker">Subterranean Cross-Section · 0m to -180m</p>
            <h2 id="modal-heading" className="modal-title">
              Vertical Descent Map
            </h2>
            <div className="rule modal-rule" />

            <div className="descent-station-list">
              {DESCENT_STATIONS.map((st) => (
                <div key={st.id} className="descent-station-item">
                  <div className="descent-station-header">
                    <div>
                      <span className="descent-depth-tag">{st.depthMeters}m Depth</span>
                      <h3 className="descent-station-title">{st.title}</h3>
                      <p className="descent-station-sub">{st.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => {
                        onJumpToScene(st.sceneId);
                        onClose();
                      }}
                    >
                      Descend Here
                    </button>
                  </div>
                  <div className="descent-highlights">
                    {st.highlights.map((h, i) => (
                      <React.Fragment key={h}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span>{h}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === 'reserve' && (
          <div className="reserve-modal-content">
            <p className="modal-kicker">Autumn Equinox · Gates Open at 18:00</p>
            <h2 id="modal-heading" className="modal-title">
              Reserve Equinox Passage
            </h2>
            <div className="rule modal-rule" />

            {latestConfirmation ? (
              <div className="reservation-confirmed" data-testid="reservation-confirmation">
                <p className="confirmed-kicker">Passage Inscribed in the Turning Stone</p>
                <h3 className="confirmed-code">{latestConfirmation}</h3>
                <p className="confirmed-details">
                  Reserved for <strong>{fullName}</strong> · Party of {partySize} · Wave{' '}
                  {waveTime} ({censerOption === 'borrow' ? 'Rim Censer Loaned' : 'Personal Clay Censer'})
                </p>
                {barkWish.trim() && (
                  <p className="confirmed-wish">
                    Amate Bark Wish: <em>“{barkWish.trim()}”</em>
                  </p>
                )}
                <div className="modal-footer-actions">
                  <button type="button" className="btn-ghost" onClick={resetReserveForm}>
                    Inscribe Another Passage
                  </button>
                  <button type="button" className="btn-solid" onClick={onClose}>
                    Return to Sanctuary
                  </button>
                </div>
              </div>
            ) : (
              <form className="reserve-form" onSubmit={handleReserveSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="reserve-name">Pilgrim Full Name</label>
                  <input
                    id="reserve-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ixchel Balam"
                    required
                  />
                  {formErrors.fullName && (
                    <span className="field-error" role="alert">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-email">Dispatch Email</label>
                  <input
                    id="reserve-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilgrim@xibalba.org"
                    required
                  />
                  {formErrors.email && (
                    <span className="field-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label htmlFor="reserve-wave">Descent Wave</label>
                    <select
                      id="reserve-wave"
                      value={waveTime}
                      onChange={(e) => setWaveTime(e.target.value)}
                    >
                      <option value="18:00">18:00 — Rim Dusk Procession</option>
                      <option value="19:30">19:30 — Ghost Orchid Watch</option>
                      <option value="21:00">21:00 — Turning Wheel Cadence</option>
                      <option value="22:30">22:30 — Midnight Cauldron Vigil</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="reserve-party">Party Size (1–8)</label>
                    <input
                      id="reserve-party"
                      type="number"
                      min={1}
                      max={8}
                      value={partySize}
                      onChange={(e) => setPartySize(parseInt(e.target.value || '1', 10))}
                    />
                    {formErrors.partySize && (
                      <span className="field-error" role="alert">
                        {formErrors.partySize}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-censer">Clay Copal Censer</label>
                  <select
                    id="reserve-censer"
                    value={censerOption}
                    onChange={(e) => setCenserOption(e.target.value as 'borrow' | 'bring')}
                  >
                    <option value="borrow">Borrow a clay copal censer at the rim gate</option>
                    <option value="bring">Bringing our own ceremonial clay censer</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-wish">
                    Amate Bark Strip Wish (Optional — Wedged into the Turning Stone)
                  </label>
                  <input
                    id="reserve-wish"
                    type="text"
                    value={barkWish}
                    onChange={(e) => setBarkWish(e.target.value)}
                    placeholder="Write a brief wish for the water-wheel..."
                  />
                </div>

                {reservedPassages.length > 0 && (
                  <p className="existing-reservations-note">
                    {reservedPassages.length} passage{reservedPassages.length > 1 ? 's' : ''} sealed
                    in this session (latest: {reservedPassages[reservedPassages.length - 1].code}).
                  </p>
                )}

                <div className="modal-footer-actions">
                  <button type="button" className="btn-ghost" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-solid">
                    Confirm Passage
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
