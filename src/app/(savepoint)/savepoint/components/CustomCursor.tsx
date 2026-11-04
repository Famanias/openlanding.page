'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursor = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = cursor.current!;
        const media = matchMedia('(hover: hover) and (pointer: fine)');
        let frame = 0, x = 0, y = 0;
        const hide = () => { element.dataset.visible = 'false'; };
        const move = (event: PointerEvent) => {
            if (!media.matches || event.pointerType === 'touch') { hide(); return; }
            x = event.clientX; y = event.clientY;
            const target = event.target as HTMLElement;
            const mode = target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? 'default';
            element.dataset.mode = mode;
            element.dataset.visible = 'true';
            if (!frame) frame = requestAnimationFrame(() => {
                element.style.transform = `translate3d(${x}px,${y}px,0)`;
                frame = 0;
            });
        };
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);
        window.addEventListener('scroll', hide, { passive: true });
        media.addEventListener('change', hide);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', hide); window.removeEventListener('blur', hide); window.removeEventListener('scroll', hide); media.removeEventListener('change', hide); };
    }, []);
    return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span>BOOT</span></div>;
}
