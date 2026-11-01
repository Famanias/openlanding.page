'use client';

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { CR_MOTION } from './tokens';

/** Native focus containment, Escape and focus restoration, with interruptible exits. */
export function MotionDialog({ open, onClose, onAfterClose, label, labelledBy, children, className = '' }: {
  open: boolean; onClose: () => void; onAfterClose?: () => void; label?: string; labelledBy?: string; children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const afterCloseRef = useRef(onAfterClose);
  useLayoutEffect(() => { afterCloseRef.current = onAfterClose; }, [onAfterClose]);
  useEffect(() => () => {
    animationRef.current?.cancel();
    unlockRef.current?.();
  }, []);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const wasOpen = dialog.open;
    // Read the displayed state before cancelling either an entrance or an exit.
    const displayed = wasOpen ? { opacity: getComputedStyle(dialog).opacity, transform: getComputedStyle(dialog).transform } : {
      opacity: '0', transform: className.includes('cr-nav-dialog') ? 'translateY(-24px)' : 'translateY(16px) scale(0.985)',
    };
    animationRef.current?.cancel();
    if (!open && !wasOpen) return;
    if (open) {
      if (!wasOpen) dialog.showModal();
      if (!unlockRef.current) {
        const previous = document.body.style.overflow;
        unlockRef.current = () => { document.body.style.overflow = previous; unlockRef.current = null; };
      }
      document.body.style.overflow = 'hidden';
      delete dialog.dataset.crClosing;
    } else dialog.dataset.crClosing = 'true';
    const animation = dialog.animate([displayed, open
      ? { opacity: '1', transform: 'none' }
      : { opacity: '0', transform: displayed.transform }], {
      duration: reduce.matches ? 0 : (open ? (className.includes('cr-nav-dialog') ? CR_MOTION.menu : CR_MOTION.dialog) : CR_MOTION.exit) * 1000,
      easing: CR_MOTION.cssEase, fill: 'both',
    });
    animationRef.current = animation;
    animation.finished.then(() => {
      if (animationRef.current !== animation || open) return;
      dialog.close();
      delete dialog.dataset.crClosing;
      animation.cancel();
      animationRef.current = null;
      unlockRef.current?.();
      afterCloseRef.current?.();
    }).catch(() => {});
    const settlePreference = () => { if (reduce.matches) animation.finish(); };
    reduce.addEventListener('change', settlePreference);
    return () => { reduce.removeEventListener('change', settlePreference); };
  }, [open, className]);
  return <dialog ref={ref} aria-label={label} aria-labelledby={labelledBy}
    onClickCapture={event => { if (!open) { event.preventDefault(); event.stopPropagation(); } }}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]'))
        .filter(el => el.getClientRects().length > 0);
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    className={`cr-dialog ${className}`}>
    {children}
  </dialog>;
}
