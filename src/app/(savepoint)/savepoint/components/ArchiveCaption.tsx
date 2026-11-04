'use client';
import type { Game } from '../data/games';
export default function ArchiveCaption({ game, direction }: {
    game: Game;
    direction: number;
}) { return <div className="caption" aria-live="polite" style={{ '--caption-direction': direction } as React.CSSProperties}><div className="caption-mask"><div key={game.id} className="caption-content"><p className="utility">{game.indexNumber} <span>/ 10</span> <i /> {game.year}</p><h2>{game.title}</h2><p className="genre">{game.genre.join(' / ')}</p></div></div></div>; }
