'use client';
import type { Game } from '../data/games';
export default function MotionFallback({ game }: {
    game: Game;
}) { return <div className="motion-fallback"><img src={game.labelUrl} alt={`${game.title} cartridge label`}/><p>Image archive mode · use the controls below to explore.</p></div>; }
