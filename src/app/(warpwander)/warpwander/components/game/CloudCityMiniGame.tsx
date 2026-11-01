'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  createInitialMiniGameState,
  stepMiniGameSimulation,
  MiniGameWorldState,
  MiniGameInputState,
  GAME_CONSTANTS,
} from '../../lib/game/miniGamePhysics';
import { PALETTE } from '../../lib/world/worldMap';
import { drawPipSpriteToCanvas, PixelCompassIcon } from '../sprites/PixelArtSprites';
import { soundEngine } from '../../lib/audio/soundEngine';

interface CloudCityMiniGameProps {
  onShardsUpdate: (count: number) => void;
  onCompleteGame: () => void;
  onSkipOrContinue: () => void;
}

/**
 * ACT 4 — THE CLOUD CITY / PLAYFUL INTERLUDE
 * Short, optional, accessible 2D platformer where Pip leaps across floating cloud platforms
 * to collect three Compass Shards.
 * - Scoped keyboard listener only active while game is in 'playing' mode and focused/active.
 * - Large accessible touch/click controls while active.
 * - Always-visible SKIP GAME and CONTINUE JOURNEY buttons.
 */
export const CloudCityMiniGame: React.FC<CloudCityMiniGameProps> = ({
  onShardsUpdate,
  onCompleteGame,
  onSkipOrContinue,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldStateRef = useRef<MiniGameWorldState>(createInitialMiniGameState(false));
  const inputRef = useRef<MiniGameInputState>({
    left: false,
    right: false,
    jumpHeld: false,
    jumpJustPressed: false,
    jumpJustReleased: false,
  });

  const [uiStatus, setUiStatus] = useState<'title' | 'playing' | 'paused' | 'victory'>('title');
  const [collectedCount, setCollectedCount] = useState<number>(0);

  const onShardsUpdateRef = useRef(onShardsUpdate);
  const onCompleteGameRef = useRef(onCompleteGame);

  useEffect(() => {
    onShardsUpdateRef.current = onShardsUpdate;
    onCompleteGameRef.current = onCompleteGame;
  }, [onShardsUpdate, onCompleteGame]);

  // Check for autostart query param safely on client mount
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1') {
      const fresh = createInitialMiniGameState(true);
      worldStateRef.current = fresh;
      setUiStatus('playing');
    }
  }, []);

  // Sync dataset.state for accessibility / automated verification
  useEffect(() => {
    const mapped = uiStatus === 'victory' ? 'gameover' : uiStatus;
    if (typeof document !== 'undefined') {
      document.body.dataset.state = mapped;
    }
  }, [uiStatus]);

  const startOrRestartGame = useCallback(() => {
    const fresh = createInitialMiniGameState(true);
    worldStateRef.current = fresh;
    inputRef.current = {
      left: false,
      right: false,
      jumpHeld: false,
      jumpJustPressed: false,
      jumpJustReleased: false,
    };
    setCollectedCount(0);
    onShardsUpdateRef.current(0);
    setUiStatus('playing');
    soundEngine.playButtonClick();
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    canvasRef.current?.focus();
  }, []);

  const togglePause = useCallback(() => {
    const current = worldStateRef.current.status;
    if (current === 'playing') {
      worldStateRef.current.status = 'paused';
      setUiStatus('paused');
      soundEngine.playButtonClick();
    } else if (current === 'paused') {
      worldStateRef.current.status = 'playing';
      setUiStatus('playing');
      soundEngine.playButtonClick();
    }
  }, []);

  // Scoped keyboard listener: only intercepts movement keys when mini-game is in 'playing' state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never hijack input if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const status = worldStateRef.current.status;

      if (status !== 'playing') {
        return;
      }

      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') {
        e.preventDefault();
        inputRef.current.left = true;
      } else if (code === 'ArrowRight' || code === 'KeyD') {
        e.preventDefault();
        inputRef.current.right = true;
      } else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
        e.preventDefault();
        if (!inputRef.current.jumpHeld) {
          inputRef.current.jumpJustPressed = true;
        }
        inputRef.current.jumpHeld = true;
      } else if (code === 'KeyP' || code === 'Escape') {
        e.preventDefault();
        togglePause();
      } else if (code === 'KeyR') {
        e.preventDefault();
        startOrRestartGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      if (code === 'ArrowLeft' || code === 'KeyA') {
        inputRef.current.left = false;
      } else if (code === 'ArrowRight' || code === 'KeyD') {
        inputRef.current.right = false;
      } else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
        if (inputRef.current.jumpHeld) {
          inputRef.current.jumpJustReleased = true;
        }
        inputRef.current.jumpHeld = false;
      }
    };

    const clearInputs = () => {
      inputRef.current.left = false;
      inputRef.current.right = false;
      inputRef.current.jumpHeld = false;
      inputRef.current.jumpJustPressed = false;
      inputRef.current.jumpJustReleased = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearInputs);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearInputs);
    };
  }, [startOrRestartGame, togglePause]);

  // 60 FPS Canvas Simulation & Rendering Loop (Decoupled from React State)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let rafId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;

      const state = worldStateRef.current;
      const events = stepMiniGameSimulation(state, inputRef.current, rawDt);

      // Consume single-frame edge triggers
      inputRef.current.jumpJustPressed = false;
      inputRef.current.jumpJustReleased = false;

      if (events.jumped) {
        soundEngine.playJump();
      }
      if (events.collectedShardIds.length > 0) {
        soundEngine.playShardPickup();
        setCollectedCount(state.collectedCount);
        onShardsUpdateRef.current(state.collectedCount);
      }
      if (events.justWon) {
        soundEngine.playVictoryFanfare();
        setUiStatus('victory');
        onCompleteGameRef.current();
      }

      // ================= RENDER CLOUD CITY SCENE =================
      const w = state.width;
      const h = state.height;

      // Sky background bands
      ctx.fillStyle = PALETTE.twilightIndigo;
      ctx.fillRect(0, 0, w, 120);
      ctx.fillStyle = PALETTE.mulberryShadow;
      ctx.fillRect(0, 120, w, 110);
      ctx.fillStyle = PALETTE.goldenNectar;
      ctx.fillRect(0, 230, w, 90);
      ctx.fillStyle = PALETTE.daylightCream;
      ctx.fillRect(0, 320, w, h - 320);

      // Gentle background wind current lines
      const windShift = Math.floor((now * 0.04) % 180);
      ctx.fillStyle = 'rgba(255, 241, 211, 0.35)';
      for (let i = 0; i < 5; i++) {
        const wx = ((i * 190 + windShift) % (w + 120)) - 60;
        const wy = 70 + i * 52;
        ctx.fillRect(wx, wy, 48, 4);
        ctx.fillRect(wx + 24, wy - 8, 32, 4);
      }

      // Draw Platforms
      for (let i = 0; i < state.platforms.length; i++) {
        const plat = state.platforms[i];
        if (plat.kind === 'stone') {
          ctx.fillStyle = PALETTE.fernForest;
          ctx.fillRect(plat.x, plat.y, plat.width, 8);
          ctx.fillStyle = PALETTE.twilightIndigo;
          ctx.fillRect(plat.x, plat.y + 8, plat.width, plat.height - 8);
          ctx.fillStyle = PALETTE.goldenNectar;
          ctx.fillRect(plat.x + 8, plat.y + 12, 16, 4);
          ctx.fillRect(plat.x + plat.width - 24, plat.y + 12, 16, 4);
        } else {
          // Fluffy stepped pixel cloud platform
          ctx.fillStyle = PALETTE.daylightCream;
          ctx.fillRect(plat.x, plat.y, plat.width, plat.height - 6);
          ctx.fillRect(plat.x + 8, plat.y - 4, plat.width - 16, 4);
          ctx.fillStyle = plat.kind === 'wind-lift' ? PALETTE.lagoonMist : PALETTE.coralBloom;
          ctx.fillRect(plat.x + 4, plat.y + plat.height - 6, plat.width - 8, 6);
        }
      }

      // Draw Collectible Compass Shards
      const pulseTick = Math.floor(now / 180);
      for (let i = 0; i < state.shards.length; i++) {
        const shard = state.shards[i];
        if (shard.collected) continue;

        const bobY = (pulseTick + i) % 2 === 0 ? -3 : 2;
        const sx = Math.round(shard.x);
        const sy = Math.round(shard.y + bobY);

        // Outer aura
        ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
        ctx.fillRect(sx - 14, sy - 14, 28, 28);

        // Diamond pixel shard
        ctx.fillStyle = shard.color;
        ctx.fillRect(sx - 4, sy - 10, 8, 20);
        ctx.fillRect(sx - 10, sy - 4, 20, 8);
        ctx.fillStyle = PALETTE.daylightCream;
        ctx.fillRect(sx - 4, sy - 4, 8, 8);
      }

      // Draw Pooled Particles
      for (let i = 0; i < state.particles.length; i++) {
        const pt = state.particles[i];
        if (!pt.active) continue;
        ctx.fillStyle = pt.color;
        ctx.fillRect(Math.round(pt.x), Math.round(pt.y), pt.size, pt.size);
      }

      // Draw Pip the Mapmaker
      const frameTick = Math.floor(state.player.walkDistance / 18) + Math.floor(now / 220);
      drawPipSpriteToCanvas(
        ctx,
        state.player.x - 7,
        state.player.y - 12,
        3,
        state.player.animState,
        frameTick,
        state.player.facing,
        state.player.scaleX,
        state.player.scaleY
      );

      const delay = state.status === 'playing' ? 16 : 120;
      timerId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(loop);
      }, delay);
    };

    let timerId = 0;
    rafId = window.requestAnimationFrame(loop);
    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto ww-storybook-panel storybook-panel p-4 sm:p-6">
      {/* Top Game Shell Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b-2 border-[#604A79]">
        <div className="flex items-center gap-3">
          <PixelCompassIcon size={24} />
          <div>
            <div className="ww-font-hud font-hud text-xs text-[#FFD06A] uppercase tracking-wider">
              OPTIONAL BROWSER MINI-GAME · CLOUD CITY
            </div>
            <h3 className="ww-font-pixel font-pixel text-lg sm:text-xl text-[#FFF1D3]">
              Wayfinder&apos;s Cloud Stepping Stones
            </h3>
          </div>
        </div>

        {/* Live Mechanics-Backed Compass Shard Counter + Always-Visible Skip/Continue Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="px-3 py-1.5 bg-[#171838] border-2 border-[#FFD06A] ww-font-hud font-hud text-xs sm:text-sm font-bold text-[#FFF1D3] whitespace-nowrap shrink-0"
            aria-live="polite"
          >
            COMPASS SHARDS: {collectedCount} / 3
          </div>

          {uiStatus === 'playing' && (
            <button
              type="button"
              onClick={togglePause}
              className="px-3 py-1.5 bg-[#604A79] text-[#FFF1D3] hover:bg-[#FFD06A] hover:text-[#23244F] ww-font-hud font-hud text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
            >
              Pause [P]
            </button>
          )}

          <button
            type="button"
            onClick={onSkipOrContinue}
            className="ww-btn-tactile btn-tactile px-3.5 py-1.5 bg-[#2F644F] text-[#FFF1D3] hover:bg-[#6DDCC5] hover:text-[#23244F] ww-font-pixel font-pixel text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            {uiStatus === 'victory' ? 'CONTINUE JOURNEY →' : 'SKIP GAME →'}
          </button>
        </div>
      </div>

      {/* Interactive 2D Pixel Canvas Stage */}
      <div className="relative w-full aspect-[2/1] bg-[#23244F] border-2 border-[#FFD06A] overflow-hidden">
        <canvas
          ref={canvasRef}
          width={GAME_CONSTANTS.CANVAS_WIDTH}
          height={GAME_CONSTANTS.CANVAS_HEIGHT}
          tabIndex={0}
          data-testid="cloud-city-game-canvas"
          aria-label="Cloud City optional mini-game canvas. Use A and D or Arrow keys to move Pip, Space or W to jump and collect 3 Compass Shards."
          className="w-full h-full block ww-pixelated pixelated focus:outline-none"
        />

        {/* TITLE OVERLAY */}
        {uiStatus === 'title' && (
          <div className="absolute inset-0 bg-[#23244F]/88 flex flex-col items-center justify-center p-6 text-center">
            <p className="ww-font-hud font-hud text-xs text-[#6DDCC5] uppercase tracking-widest mb-2">
              ACT 04 · PLAYFUL INTERLUDE
            </p>
            <h4 className="ww-font-pixel font-pixel text-2xl sm:text-3xl text-[#FFF1D3] mb-2">
              Gather the Three Compass Shards
            </h4>
            <p className="text-sm text-[#FFF1D3]/90 max-w-md mb-5">
              Guide Pip across the sunlit cloud platforms to collect 3 glowing shards—or skip straight to the Last Gate whenever you like.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-start="true"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-6 py-3 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                PLAY INTERLUDE
              </button>
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-5 py-3 bg-[#23244F] text-[#FFF1D3] border-2 border-[#FFF1D3] hover:border-[#FFD06A] hover:text-[#FFD06A] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                CONTINUE JOURNEY
              </button>
            </div>
            <p className="mt-4 ww-font-hud font-hud text-xs text-[#FFF1D3]/75">
              A/D or Arrow Keys Move · Space or W Jump · Touch Buttons Below
            </p>
          </div>
        )}

        {/* PAUSED MODAL OVERLAY */}
        {uiStatus === 'paused' && (
          <div className="absolute inset-0 bg-[#23244F]/90 flex flex-col items-center justify-center p-6 text-center">
            <h4 className="ww-font-pixel font-pixel text-2xl text-[#FFD06A] mb-2">EXPEDITION PAUSED</h4>
            <p className="ww-font-hud font-hud text-xs text-[#FFF1D3] mb-5">
              SHARDS GATHERED: {collectedCount} / 3
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={togglePause}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                RESUME
              </button>
              <button
                type="button"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#604A79] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                RESTART
              </button>
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-5 py-2.5 bg-[#2F644F] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                SKIP TO FINAL GATE
              </button>
            </div>
          </div>
        )}

        {/* VICTORY MODAL OVERLAY */}
        {uiStatus === 'victory' && (
          <div className="absolute inset-0 bg-[#23244F]/90 flex flex-col items-center justify-center p-6 text-center">
            <div className="px-3 py-1 bg-[#6DDCC5] text-[#23244F] ww-font-hud font-hud text-xs font-bold mb-2">
              WAYFINDER COMPASS RESTORED · 3 / 3 SHARDS
            </div>
            <h4 className="ww-font-pixel font-pixel text-2xl sm:text-3xl text-[#FFD06A] mb-2">
              The Sanctuary Gate Awaits!
            </h4>
            <p className="text-sm text-[#FFF1D3]/90 max-w-md mb-5">
              Pip raises the restored lantern compass! You have unlocked the Cloud City Wayfinder Badge in your Field Guide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onSkipOrContinue}
                className="ww-btn-tactile btn-tactile px-6 py-3 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-base font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                CONTINUE JOURNEY →
              </button>
              <button
                type="button"
                data-start="true"
                onClick={startOrRestartGame}
                className="ww-btn-tactile btn-tactile px-5 py-3 bg-[#23244F] text-[#FFF1D3] border-2 border-[#FFD06A] ww-font-pixel font-pixel text-sm font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accessible On-Screen Touch / Pointer Controls + Quick Collect Assist */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3" role="group" aria-label="Game Movement Controls">
          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.left = true;
            }}
            onPointerUp={() => {
              inputRef.current.left = false;
            }}
            onPointerLeave={() => {
              inputRef.current.left = false;
            }}
            aria-label="Move Left"
            className="ww-btn-tactile btn-tactile min-w-[68px] min-h-[44px] px-4 py-2.5 bg-[#23244F] border-2 border-[#FFD06A] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            ◀ LEFT
          </button>

          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.jumpJustPressed = true;
              inputRef.current.jumpHeld = true;
            }}
            onPointerUp={() => {
              inputRef.current.jumpJustReleased = true;
              inputRef.current.jumpHeld = false;
            }}
            onPointerLeave={() => {
              inputRef.current.jumpHeld = false;
            }}
            aria-label="Jump"
            className="ww-btn-tactile btn-tactile min-w-[84px] min-h-[44px] px-5 py-2.5 bg-[#FFD06A] text-[#23244F] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            ▲ JUMP
          </button>

          <button
            type="button"
            onPointerDown={() => {
              if (uiStatus !== 'playing') startOrRestartGame();
              inputRef.current.right = true;
            }}
            onPointerUp={() => {
              inputRef.current.right = false;
            }}
            onPointerLeave={() => {
              inputRef.current.right = false;
            }}
            aria-label="Move Right"
            className="ww-btn-tactile btn-tactile min-w-[68px] min-h-[44px] px-4 py-2.5 bg-[#23244F] border-2 border-[#FFD06A] text-[#FFF1D3] ww-font-pixel font-pixel text-sm font-bold cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            RIGHT ▶
          </button>
        </div>

        <p className="ww-font-hud font-hud text-xs text-[#FFF1D3]/80">
          Note: Optional browser interlude created for WARP &amp; WANDER; not bundled software on Analogue Pocket.
        </p>
      </div>
    </div>
  );
};
