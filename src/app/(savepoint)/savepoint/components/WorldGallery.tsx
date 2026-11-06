'use client';
import { useState, type CSSProperties } from 'react';
import { games } from '../data/games';

const filters = ['ALL', 'EXPLORATION', 'MYSTERY & HORROR', 'ACTION & ARCADE', 'STRATEGY & FANTASY'] as const;
const clusters: Record<(typeof filters)[number], string[]> = {
    ALL: [], EXPLORATION: ['lost-signal', 'mossheart', 'deep-current'],
    'MYSTERY & HORROR': ['dead-channel', 'ghost-frequency'],
    'ACTION & ARCADE': ['turbo-saints', 'neon-ruins', 'sunken-arcade'],
    'STRATEGY & FANTASY': ['mossheart', 'moon-relay', 'paper-kingdom'],
};
export default function WorldGallery({ onSelect }: { onSelect: (index: number, boot: boolean) => void }) {
    const [filter, setFilter] = useState<(typeof filters)[number]>('ALL');
    const visible = games.filter(game => filter === 'ALL' || clusters[filter].includes(game.id));
    return <section id="index" className="world-gallery editorial-section" aria-labelledby="index-title">
        <div className="section-rule utility"><span>04 / THE COMPLETE INDEX</span><span>1994 — 2003</span></div>
        <div className="catalog-heading"><h2 id="index-title" className="section-title">FIND YOUR<br /><span>NEXT DETOUR.</span></h2><p>Follow a feeling.<br />There&apos;s no wrong place to start.</p></div>
        <div className="catalog-filters" role="group" aria-label="Filter worlds by genre">{filters.map(item => <button key={item} aria-pressed={item === filter} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <p className="utility catalog-count" role="status">{String(visible.length).padStart(2, '0')} WORLDS / {filter}</p>
        <div className="catalog-list">{visible.map(game => <article key={game.id} className="catalog-entry" data-game={game.id} style={{ '--game-accent': game.accent } as CSSProperties} aria-labelledby={`catalog-${game.id}`}>
            <div className="catalog-art"><img className="catalog-world" src={game.worldUrl} alt={`${game.title} world artwork`} loading="lazy" width="2752" height="1536" /><img className="catalog-label" src={game.labelUrl} alt={`${game.title} cartridge label`} loading="lazy" width="2400" height="1792" /><span className="utility catalog-art-code">SVP-{game.indexNumber}</span></div>
            <div className="catalog-copy"><div className="catalog-meta utility"><span>SVP-{game.indexNumber}</span><span>{game.year}</span></div><h3 id={`catalog-${game.id}`}>{game.title}</h3><p className="utility catalog-genre">{game.genre.join(' / ')}</p><p className="catalog-hook">{game.hook}</p><div className="catalog-actions"><button onClick={() => onSelect(Number(game.indexNumber) - 1, false)} aria-label={`Select ${game.title} on shelf`}>SELECT ON SHELF <span>↑</span></button><button onClick={() => onSelect(Number(game.indexNumber) - 1, true)} aria-label={`Insert and boot ${game.title}`}>INSERT &amp; BOOT <span>↗</span></button></div></div>
        </article>)}</div>
    </section>;
}
