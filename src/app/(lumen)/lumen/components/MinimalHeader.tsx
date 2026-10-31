'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { lockLumenScroll, scrollToLumen } from '../motion/scroll';

const links = [
  { href: '#workspace-hero', label: 'Workspace' },
  { href: '#inside-playbook', label: 'The playbook' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'Questions' },
];

const subscribeHydration = () => () => {};

export function MinimalHeader({ onFocusForm, onOpenGlassStudio }: { onFocusForm: () => void; onOpenGlassStudio: () => void }) {
  const interactive = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
    if (open) {
      const previous = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      lockLumenScroll(true);
      return () => { document.documentElement.style.overflow = previous; lockLumenScroll(false); };
    }
  }, [open]);
  const close = () => {
    dialogRef.current?.close();
    lockLumenScroll(false);
    setOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  };
  return (
    <header className="lumen-header">
      <div className="lm-nav-shell">
        <a href="#workspace-hero" className="lm-logo" aria-label="Lumen, back to workspace">
          <svg viewBox="0 0 28 28" aria-hidden="true"><path d="m14 2 11 6v12l-11 6-11-6V8Z" /><path d="m3 8 11 6 11-6M14 14v12M14 2v12" /></svg>
          <span>LUMEN<span className="lm-logo-dot">.</span></span>
        </a>
        <nav className="lm-desktop-nav" aria-label="Page sections">
          {links.map((link) => <a key={link.href} className="lm-nav-link" href={link.href}><span>{link.label}</span></a>)}
        </nav>
        <div className="lm-nav-actions">
          <button className="lm-studio-link" type="button" onClick={onOpenGlassStudio}>Glass Studio <ArrowUpRight size={13} aria-hidden="true" /></button>
          <a href="#hero-download-form" className="lm-btn lm-btn--small lm-magnetic" onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); onFocusForm();
          }}><span className="lm-button-label">Get the free playbook</span><ArrowUpRight size={15} aria-hidden="true" /></a>
          <button className="lm-menu-toggle" ref={menuButton} disabled={!interactive} aria-expanded={open} aria-controls="lm-mobile-menu" aria-label="Open navigation" type="button" onClick={() => setOpen(true)}><span /><span /></button>
        </div>
        <span className="lm-nav-progress" aria-hidden="true" />
      </div>
      <dialog ref={dialogRef} id="lm-mobile-menu" className="lm-mobile-menu" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); menuButton.current?.focus({ preventScroll: true }); }} aria-label="Navigation">
        <div className="lm-menu-top"><span>LUMEN.</span><button type="button" aria-label="Close navigation" onClick={close}><X /></button></div>
        <nav aria-label="Mobile page sections">
          {links.map((link, i) => <a href={link.href} key={link.href} style={{ '--item': i } as React.CSSProperties} onClick={(event) => {
            event.preventDefault();
            close();
            const target = document.getElementById(link.href.slice(1));
            if (target) { scrollToLumen(target); history.pushState(null, '', link.href); }
          }}><span>{link.label}</span><ArrowUpRight /></a>)}
        </nav>
        <button type="button" className="lm-menu-studio" onClick={() => { close(); onOpenGlassStudio(); }}>Explore Glass Studio <ArrowUpRight size={18} /></button>
        <p>Make space for better work.</p>
      </dialog>
    </header>
  );
}
