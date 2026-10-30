import React from 'react';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenReserve }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <header className="nav" role="banner">
      <nav className="nav-left" aria-label="Cenote sections">
        <a href="#story" onClick={(e) => handleLinkClick(e, 'story')}>
          The Cenote
        </a>
        <a href="#rites" onClick={(e) => handleLinkClick(e, 'rites')}>
          The Calendar
        </a>
        <a href="#night" onClick={(e) => handleLinkClick(e, 'night')}>
          Pilgrims
        </a>
      </nav>

      <a
        href="#top"
        className="nav-logo"
        aria-label="Xibalba Home"
        onClick={(e) => handleLinkClick(e, 'top')}
      >
        <svg width="26" height="24" viewBox="0 0 26 24" aria-hidden="true">
          <polygon points="13,1 25,23 1,23" fill="#EEFAF6" />
          <circle cx="13" cy="15.2" r="3.4" fill="#040A0E" />
          <circle cx="14.4" cy="14.4" r="3" fill="#EEFAF6" />
        </svg>
      </a>

      <nav className="nav-right" aria-label="Sanctuary and Passages">
        <a href="#finale" onClick={(e) => handleLinkClick(e, 'finale')}>
          Sanctuary
        </a>
        <a href="#finale" onClick={(e) => handleLinkClick(e, 'finale')}>
          Codex
        </a>
        <button
          type="button"
          className="nav-cta"
          onClick={onOpenReserve}
          aria-label="Reserve Passage"
        >
          Passages
        </button>
      </nav>
    </header>
  );
};
