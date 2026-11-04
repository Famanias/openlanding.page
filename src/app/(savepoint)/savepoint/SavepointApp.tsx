'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ArchiveStageCanvas from './components/ArchiveStageCanvas';
import ArchiveCaption from './components/ArchiveCaption';
import GameDetail from './components/GameDetail';
import MotionFallback from './components/MotionFallback';
import DeviceStory from './components/DeviceStory';
import AboutArchive from './components/AboutArchive';
import WorldGallery from './components/WorldGallery';
import SiteFooter from './components/SiteFooter';
import CustomCursor from './components/CustomCursor';
import { games } from './data/games';
import { useArchiveStore } from './hooks/useArchiveStore';
import type { SceneController } from './lib/archiveSceneEngine';
import type { ScreenProjection } from './lib/projection';
export default function SavepointApp() {
    const controller = useRef<SceneController | null>(null), overlay = useRef<HTMLDivElement>(null), bootButton = useRef<HTMLButtonElement>(null);
    const [failed, setFailed] = useState(false);
    const wasBusy = useRef(false);
    const cancelVisit = useRef<(() => void) | null>(null);
    const { activeIndex, phase, direction, select, setPhase } = useArchiveStore();
    const game = games[activeIndex];
    const busy = phase !== 'archive', detail = phase === 'game-detail';
    const project = useCallback((rect: ScreenProjection, p: number) => {
        const element = overlay.current;
        if (!element)
            return;
        element.dataset.visible = String(p > 0);
        const left = rect.left * (1 - p), top = rect.top * (1 - p), width = rect.width + (innerWidth - rect.width) * p, height = rect.height + (innerHeight - rect.height) * p;
        Object.assign(element.style, { left: `${left}px`, top: `${top}px`, right: 'auto', bottom: 'auto', width: `${width}px`, height: `${height}px` });
        element.style.clipPath = `polygon(${rect.points.map((point, index) => {
            const x = point.x + (index === 0 || index === 3 ? -point.x : innerWidth - point.x) * p;
            const y = point.y + (index < 2 ? -point.y : innerHeight - point.y) * p;
            return `${x - left}px ${y - top}px`;
        }).join(',')})`;
    }, []);
    const error = useCallback(() => {
        setFailed(true);
        useArchiveStore.getState().setPhase('archive');
    }, []);
    const restored = useCallback(() => setFailed(false), []);
    const step = (n: number) => {
        if (failed) {
            select(activeIndex + n);
        }
        else
            controller.current?.step(n);
    };
    const boot = () => {
        if (failed) {
            if (overlay.current) {
                Object.assign(overlay.current.style, { left: '0', top: '0', width: '100vw', height: '100dvh', clipPath: 'none' });
                overlay.current.dataset.visible = 'true';
            }
            setPhase('game-detail');
            const url = new URL(location.href);
            url.searchParams.set('game', games[useArchiveStore.getState().activeIndex].id);
            history.pushState({}, '', url);
        }
        else
            controller.current?.boot();
    };
    const back = () => {
        if (failed) {
            setPhase('archive');
            const url = new URL(location.href);
            url.searchParams.delete('game');
            history.pushState({}, '', url);
        }
        else
            controller.current?.back();
    };
    function visitArchive(index?: number, shouldBoot = false) {
        if (busy) return;
        cancelVisit.current?.();
        if (index !== undefined) {
            if (failed) select(index);
            else controller.current?.select(index);
        }
        const target = document.getElementById('archive')!.getBoundingClientRect().top + window.scrollY;
        let frame = 0;
        const cancel = () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('wheel', cancel);
            window.removeEventListener('touchstart', cancel);
            window.removeEventListener('pointerdown', cancel);
            window.removeEventListener('keydown', cancel);
            cancelVisit.current = null;
        };
        const settled = () => {
            if (Math.abs(window.scrollY - target) > 2) { frame = requestAnimationFrame(settled); return; }
            cancel();
            bootButton.current?.focus({ preventScroll: true });
            if (shouldBoot && index !== undefined) {
                if (failed) boot();
                else controller.current?.selectAndBoot(index);
            }
        };
        cancelVisit.current = cancel;
        window.addEventListener('wheel', cancel, { passive: true, once: true });
        window.addEventListener('touchstart', cancel, { passive: true, once: true });
        window.addEventListener('pointerdown', cancel, { passive: true, once: true });
        window.addEventListener('keydown', cancel, { once: true });
        window.scrollTo({ top: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        frame = requestAnimationFrame(settled);
    }
    useEffect(() => () => cancelVisit.current?.(), []);
    useEffect(() => {
        const previous = document.body.style.overflow;
        if (busy)
            document.body.style.overflow = 'hidden';
        else if (wasBusy.current)
            bootButton.current?.focus({ preventScroll: true });
        wasBusy.current = busy;
        return () => { document.body.style.overflow = previous; };
    }, [busy]);
    useEffect(() => {
        if (!failed)
            return;
        const key = (event: KeyboardEvent) => {
            const state = useArchiveStore.getState();
            if (event.key === 'Escape' && state.phase !== 'archive') {
                state.setPhase('archive');
                const url = new URL(location.href);
                url.searchParams.delete('game');
                history.pushState({}, '', url);
                return;
            }
            const stage = document.querySelector('.stage')?.getBoundingClientRect();
            if (state.phase === 'archive' && stage && stage.bottom > 0 && stage.top < innerHeight && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                event.preventDefault();
                state.select(state.activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
            }
        };
        const historyChange = () => {
            const index = games.findIndex(game => game.id === new URLSearchParams(location.search).get('game'));
            if (index < 0) { useArchiveStore.getState().setPhase('archive'); return; }
            useArchiveStore.getState().select(index);
            if (overlay.current) {
                Object.assign(overlay.current.style, { left: '0', top: '0', width: '100vw', height: '100dvh', clipPath: 'none' });
                overlay.current.dataset.visible = 'true';
            }
            useArchiveStore.getState().setPhase('game-detail');
        };
        window.addEventListener('keydown', key);
        window.addEventListener('popstate', historyChange);
        historyChange();
        return () => { window.removeEventListener('keydown', key); window.removeEventListener('popstate', historyChange); };
    }, [failed]);
    function changeWorld(n: number) {
        const index = (activeIndex + n + 10) % 10;
        if (!failed) {
            controller.current?.openWorld(index);
            return;
        }
        select(index);
        const url = new URL(location.href);
        url.searchParams.set('game', games[index].id);
        history.pushState({}, '', url);
    }
    return <><main className={`savepoint ${busy ? 'is-busy' : ''}`} data-phase={phase}><section id="archive" className="archive-hero" inert={busy}><header className="site-header"><a className="wordmark" href="#archive" aria-label="Savepoint archive"><svg width="23" height="25" viewBox="0 0 23 25" fill="none"><path d="M3 1h15l4 4v19H1V1h2Z" stroke="currentColor"/><path d="M6 1v8h11V1M6 24v-9h11v9" stroke="currentColor"/></svg>SAVEPOINT<span>.</span></a><nav className="header-nav utility" aria-label="Main"><a href="#archive">ARCHIVE</a><a href="#the-deck">THE DECK</a><a href="#manifest">MANIFEST</a><a href="#index">INDEX</a></nav><span className="status utility"><i />10 WORLDS / 01 CONSOLE</span></header><div className="hero-type" aria-hidden={busy}><p className="eyebrow utility"><span /> AN INTERACTIVE ARCHIVE OF ORIGINAL GAMES <span /></p><h1>EVERY CARTRIDGE<br /><span>HOLDS A WORLD.</span></h1><p className="support">Ten strange little universes. One console.<br className="mobile-break"/> Pick a cartridge and press start.</p></div><div className="stage"><div className="stage-rule"><span>COLLECTION — VOL. 01</span><span>1994—2003</span></div><ArchiveStageCanvas controller={controller} onProjection={project} onError={error} onRestore={restored}/>{failed && <MotionFallback game={game}/>}<div className="rail-baseline"/><button disabled={busy} className="previous arrow" aria-label="Previous cartridge" onClick={() => step(-1)}>←</button><button disabled={busy} className="next arrow" aria-label="Next cartridge" onClick={() => step(1)}>→</button></div><div className="archive-bottom"><ArchiveCaption game={game} direction={direction}/><button ref={bootButton} disabled={busy} className="boot-button" onClick={boot}>BOOT THIS GAME <span>↗</span></button><p className="utility instruction">CHOOSE A WORLD. INSERT TO BEGIN.</p><div className="bottom-line utility"><span>← → ARROWS TO NAVIGATE</span><span>DRAG TO BROWSE</span><a href="#the-deck">SCROLL TO DISCOVER ↓</a></div></div></section><div className="editorial-content" inert={busy}><DeviceStory/><AboutArchive/><WorldGallery onSelect={visitArchive}/></div><CustomCursor/>{busy && !detail && <div className="boot-status" role="status"><p className="utility">{phase.replaceAll('-', ' ').toUpperCase()}{phase === 'booting' ? ' / WORLD FOUND' : ''}</p>{phase !== 'returning' && <button onClick={() => controller.current?.skip()}>SKIP INTRO ↗</button>}</div>}<div ref={overlay} className={`screen-takeover ${phase === 'screen-expanding' || detail || phase === 'returning' ? 'visible' : ''}`} style={{ backgroundImage: `url(${game.worldUrl})` }}>{detail && <GameDetail game={game} back={back} previous={() => changeWorld(-1)} next={() => changeWorld(1)}/>}</div><div className="sr-only" aria-live="polite">{busy ? phase.replaceAll('-', ' ') : `${game.title}, ${game.year}, ${game.genre.join(', ')}`}</div></main><SiteFooter busy={busy} onReturn={() => visitArchive()}/></>;
}
