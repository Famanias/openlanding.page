'use client';
import { useEffect, useRef } from 'react';
import type { Game } from '../data/games';
export default function GameDetail({ game, back, next, previous }: {
    game: Game;
    back: () => void;
    next: () => void;
    previous: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        ref.current?.focus();
        const key = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('button');
                if (!buttons?.length)
                    return;
                const first = buttons[0], last = buttons[buttons.length - 1];
                if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', key);
        return () => { document.removeEventListener('keydown', key); previous?.focus(); };
    }, []);
    return <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="world-title" className="game-detail" style={{ '--world-accent': game.accent } as React.CSSProperties}><div className="world-plate" style={{ backgroundImage: `url(${game.worldUrl})` }}/><header className="world-header"><span>SAVEPOINT. / {game.archiveSpecs.catalogCode}</span><button onClick={back}>↖ BACK TO ARCHIVE</button></header><article><p className="utility">{game.year} / {game.genre.join(' · ')} / AN IMAGINARY GAME</p><h1 id="world-title">{game.title}</h1><p className="tagline">{game.tagline}</p><p className="description">{game.description}</p><div className="world-notes"><h2>WORLD NOTES</h2>{game.worldNotes.map(note => <p key={note}>{note}</p>)}</div><div className="archive-data"><h2>ARCHIVE DATA</h2>{Object.values(game.archiveSpecs).map(value => <span key={value}>{value}</span>)}</div><nav><button onClick={previous}>← PREVIOUS CARTRIDGE</button><button onClick={next}>NEXT CARTRIDGE →</button></nav></article></div>;
}
