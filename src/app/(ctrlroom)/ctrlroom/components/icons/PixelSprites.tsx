'use client';
import React from 'react';
import { AppId, PixelIconId } from '../../lib/os/types';

interface SpriteProps {
  icon: PixelIconId;
  className?: string;
  color?: string;
}

/**
 * Strict 16x16 logical pixel-grid icon suite designed specifically for CTRL/ROOM OS.
 * Rendered with shapeRendering="crispEdges" so every icon has razor-sharp pixel geometry.
 */
export const PixelActionIcon: React.FC<SpriteProps> = ({
  icon,
  className = 'w-6 h-6',
  color = 'currentColor',
}) => {
  const renderPixels = () => {
    switch (icon) {
      case 'record':
        return (
          <>
            <rect x="4" y="2" width="8" height="2" fill={color} />
            <rect x="2" y="4" width="12" height="8" fill={color} />
            <rect x="4" y="12" width="8" height="2" fill={color} />
            <rect x="6" y="6" width="4" height="4" fill="#FC5FA9" />
          </>
        );
      case 'mic':
        return (
          <>
            <rect x="6" y="1" width="4" height="7" fill={color} />
            <rect x="3" y="5" width="2" height="4" fill={color} />
            <rect x="11" y="5" width="2" height="4" fill={color} />
            <rect x="5" y="9" width="6" height="2" fill={color} />
            <rect x="7" y="11" width="2" height="3" fill={color} />
            <rect x="4" y="14" width="8" height="2" fill="#E4FF58" />
          </>
        );
      case 'notes':
        return (
          <>
            <rect x="2" y="1" width="12" height="14" fill="none" stroke={color} strokeWidth="2" />
            <rect x="5" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="5" y="7" width="6" height="2" fill={color} />
            <rect x="5" y="10" width="4" height="2" fill={color} />
          </>
        );
      case 'scene':
        return (
          <>
            <rect x="1" y="2" width="9" height="7" fill={color} />
            <rect x="3" y="4" width="5" height="3" fill="#111A31" />
            <rect x="6" y="7" width="9" height="7" fill="#E4FF58" />
            <rect x="8" y="9" width="5" height="3" fill="#111A31" />
          </>
        );
      case 'color':
        return (
          <>
            <rect x="2" y="2" width="5" height="5" fill="#FC5FA9" />
            <rect x="9" y="2" width="5" height="5" fill="#E4FF58" />
            <rect x="2" y="9" width="5" height="5" fill="#2858FF" />
            <rect x="9" y="9" width="5" height="5" fill={color} />
            <rect x="7" y="7" width="2" height="2" fill="#E8F0FF" />
          </>
        );
      case 'focus':
        return (
          <>
            <rect x="2" y="2" width="4" height="2" fill={color} />
            <rect x="2" y="2" width="2" height="4" fill={color} />
            <rect x="10" y="2" width="4" height="2" fill={color} />
            <rect x="12" y="2" width="2" height="4" fill={color} />
            <rect x="2" y="12" width="4" height="2" fill={color} />
            <rect x="2" y="10" width="2" height="4" fill={color} />
            <rect x="10" y="12" width="4" height="2" fill={color} />
            <rect x="12" y="10" width="2" height="4" fill={color} />
            <rect x="6" y="6" width="4" height="4" fill="#E4FF58" />
          </>
        );
      case 'timer':
        return (
          <>
            <rect x="5" y="1" width="6" height="2" fill="#E4FF58" />
            <rect x="3" y="4" width="10" height="10" fill={color} />
            <rect x="5" y="6" width="6" height="6" fill="#111A31" />
            <rect x="7" y="6" width="2" height="4" fill="#E4FF58" />
            <rect x="9" y="8" width="2" height="2" fill="#FC5FA9" />
          </>
        );
      case 'marker':
        return (
          <>
            <rect x="3" y="2" width="2" height="12" fill={color} />
            <rect x="5" y="2" width="8" height="6" fill="#E4FF58" />
            <rect x="7" y="4" width="4" height="2" fill="#111A31" />
          </>
        );
      case 'render':
        return (
          <>
            <rect x="2" y="3" width="12" height="4" fill={color} />
            <rect x="2" y="9" width="12" height="4" fill={color} />
            <rect x="4" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="4" y="10" width="9" height="2" fill="#FC5FA9" />
          </>
        );
      case 'split':
        return (
          <>
            <rect x="1" y="6" width="5" height="4" fill={color} />
            <rect x="10" y="6" width="5" height="4" fill={color} />
            <rect x="7" y="1" width="2" height="14" fill="#E4FF58" />
          </>
        );
      case 'lut':
        return (
          <>
            <rect x="2" y="2" width="6" height="12" fill={color} />
            <rect x="8" y="2" width="6" height="12" fill="#FC5FA9" />
            <rect x="4" y="5" width="8" height="6" fill="#E4FF58" />
          </>
        );
      case 'keyframe':
        return (
          <>
            <rect x="7" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="5" y="4" width="6" height="2" fill="#E4FF58" />
            <rect x="3" y="6" width="10" height="4" fill={color} />
            <rect x="5" y="10" width="6" height="2" fill="#E4FF58" />
            <rect x="7" y="12" width="2" height="2" fill="#E4FF58" />
          </>
        );
      case 'audio-duck':
        return (
          <>
            <rect x="2" y="4" width="2" height="8" fill={color} />
            <rect x="5" y="7" width="2" height="5" fill="#E4FF58" />
            <rect x="8" y="9" width="2" height="3" fill="#E4FF58" />
            <rect x="11" y="4" width="2" height="8" fill={color} />
            <rect x="5" y="3" width="5" height="2" fill="#FC5FA9" />
          </>
        );
      case 'brb':
        return (
          <>
            <rect x="1" y="3" width="14" height="10" fill={color} />
            <rect x="3" y="5" width="2" height="6" fill="#111A31" />
            <rect x="7" y="5" width="2" height="6" fill="#FC5FA9" />
            <rect x="11" y="5" width="2" height="6" fill="#E4FF58" />
          </>
        );
      case 'chat-mark':
        return (
          <>
            <rect x="2" y="2" width="12" height="9" fill={color} />
            <rect x="4" y="11" width="3" height="3" fill={color} />
            <rect x="5" y="5" width="6" height="3" fill="#111A31" />
          </>
        );
      case 'lower-third':
        return (
          <>
            <rect x="1" y="2" width="14" height="12" fill="none" stroke={color} strokeWidth="2" />
            <rect x="3" y="9" width="10" height="3" fill="#E4FF58" />
            <rect x="3" y="6" width="5" height="2" fill="#FC5FA9" />
          </>
        );
      case 'cam-zoom':
        return (
          <>
            <rect x="2" y="3" width="9" height="9" fill={color} />
            <rect x="4" y="5" width="5" height="5" fill="#111A31" />
            <rect x="11" y="5" width="3" height="5" fill="#E4FF58" />
          </>
        );
      case 'stream-clip':
        return (
          <>
            <rect x="2" y="2" width="12" height="3" fill="#E4FF58" />
            <rect x="2" y="6" width="12" height="8" fill={color} />
            <rect x="6" y="8" width="4" height="4" fill="#111A31" />
          </>
        );
      case 'pomodoro':
      case 'window-tidy':
        return (
          <>
            <rect x="2" y="2" width="5" height="5" fill={color} />
            <rect x="9" y="2" width="5" height="5" fill="#E4FF58" />
            <rect x="2" y="9" width="5" height="5" fill="#B6D7F7" />
            <rect x="9" y="9" width="5" height="5" fill={color} />
          </>
        );
      case 'daily-log':
        return (
          <>
            <rect x="3" y="2" width="10" height="12" fill={color} />
            <rect x="5" y="5" width="2" height="2" fill="#111A31" />
            <rect x="8" y="5" width="3" height="2" fill="#111A31" />
            <rect x="5" y="9" width="6" height="2" fill="#E4FF58" />
          </>
        );
      case 'calc-macro':
        return (
          <>
            <rect x="2" y="2" width="12" height="12" fill={color} />
            <rect x="4" y="4" width="8" height="3" fill="#111A31" />
            <rect x="4" y="9" width="3" height="3" fill="#E4FF58" />
            <rect x="9" y="9" width="3" height="3" fill="#FC5FA9" />
          </>
        );
      case 'folder-jump':
        return (
          <>
            <rect x="2" y="3" width="5" height="2" fill="#E4FF58" />
            <rect x="2" y="5" width="12" height="9" fill={color} />
            <rect x="5" y="8" width="6" height="3" fill="#111A31" />
          </>
        );
      case 'ambient-synth':
        return (
          <>
            <rect x="2" y="8" width="2" height="5" fill={color} />
            <rect x="5" y="4" width="2" height="9" fill="#E4FF58" />
            <rect x="8" y="6" width="2" height="7" fill="#FC5FA9" />
            <rect x="11" y="2" width="2" height="11" fill={color} />
          </>
        );
      case 'dice-prompt':
        return (
          <>
            <rect x="2" y="2" width="12" height="12" fill={color} />
            <rect x="4" y="4" width="2" height="2" fill="#111A31" />
            <rect x="10" y="4" width="2" height="2" fill="#111A31" />
            <rect x="7" y="7" width="2" height="2" fill="#FC5FA9" />
            <rect x="4" y="10" width="2" height="2" fill="#111A31" />
            <rect x="10" y="10" width="2" height="2" fill="#111A31" />
          </>
        );
      case 'coffee-break':
        return (
          <>
            <rect x="5" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="9" y="2" width="2" height="2" fill="#E4FF58" />
            <rect x="3" y="5" width="8" height="8" fill={color} />
            <rect x="11" y="6" width="2" height="4" fill={color} />
            <rect x="2" y="13" width="10" height="2" fill="#FC5FA9" />
          </>
        );
      default:
        return <rect x="3" y="3" width="10" height="10" fill={color} />;
    }
  };

  return (
    <svg
      viewBox="0 0 16 16"
      className={`cr-pixel-sprite shrink-0 ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {renderPixels()}
    </svg>
  );
};

export const AppLauncherPixelIcon: React.FC<{ appId: AppId; className?: string }> = ({
  appId,
  className = 'w-6 h-6',
}) => {
  switch (appId) {
    case 'deck-lab':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="1" y="2" width="14" height="12" fill="#111A31" stroke="#E8F0FF" strokeWidth="1" />
          <rect x="3" y="4" width="2" height="2" fill="#E4FF58" />
          <rect x="7" y="4" width="2" height="2" fill="#2858FF" />
          <rect x="11" y="4" width="2" height="2" fill="#FC5FA9" />
          <rect x="3" y="7" width="2" height="2" fill="#2858FF" />
          <rect x="7" y="7" width="2" height="2" fill="#E8F0FF" />
          <rect x="11" y="7" width="2" height="2" fill="#2858FF" />
          <rect x="3" y="10" width="2" height="2" fill="#B6D7F7" />
          <rect x="7" y="10" width="2" height="2" fill="#E4FF58" />
          <rect x="11" y="10" width="2" height="2" fill="#B6D7F7" />
        </svg>
      );
    case 'action-library':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" fill="#E4FF58" />
          <rect x="9" y="2" width="5" height="5" fill="#FC5FA9" />
          <rect x="2" y="9" width="5" height="5" fill="#E8F0FF" />
          <rect x="9" y="9" width="5" height="5" fill="#2858FF" />
        </svg>
      );
    case 'run-log':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="1" y="2" width="14" height="12" fill="#111A31" stroke="#B6D7F7" strokeWidth="1" />
          <rect x="3" y="5" width="3" height="2" fill="#E4FF58" />
          <rect x="7" y="5" width="6" height="2" fill="#E8F0FF" />
          <rect x="3" y="9" width="3" height="2" fill="#FC5FA9" />
          <rect x="7" y="9" width="5" height="2" fill="#B6D7F7" />
        </svg>
      );
    case 'profile-switcher':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="9" height="7" fill="#2858FF" />
          <rect x="4" y="5" width="9" height="7" fill="#FC5FA9" />
          <rect x="6" y="8" width="8" height="6" fill="#E4FF58" />
        </svg>
      );
    case 'device-info':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" fill="#E8F0FF" />
          <rect x="4" y="4" width="8" height="8" fill="#111A31" />
          <rect x="7" y="5" width="2" height="2" fill="#E4FF58" />
          <rect x="7" y="8" width="2" height="3" fill="#2858FF" />
        </svg>
      );
    case 'about-concept':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" fill="#FC5FA9" />
          <rect x="4" y="4" width="8" height="8" fill="#111A31" />
          <rect x="6" y="6" width="4" height="4" fill="#E4FF58" />
        </svg>
      );
    case 'notes':
      return (
        <svg viewBox="0 0 16 16" className={`cr-pixel-sprite ${className}`} shapeRendering="crispEdges" aria-hidden="true">
          <rect x="3" y="1" width="10" height="14" fill="#E8F0FF" />
          <rect x="5" y="4" width="6" height="2" fill="#2858FF" />
          <rect x="5" y="8" width="6" height="2" fill="#111A31" />
          <rect x="5" y="11" width="4" height="2" fill="#FC5FA9" />
        </svg>
      );
  }
};

export const CtrlRoomGlyphLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`cr-pixel-sprite shrink-0 ${className}`}
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="24" height="24" fill="#2858FF" />
    <rect x="20" y="0" width="4" height="4" fill="#111A31" />
    <rect x="3" y="3" width="5" height="5" fill="#E4FF58" />
    <rect x="10" y="3" width="5" height="5" fill="#E8F0FF" />
    <rect x="3" y="10" width="5" height="5" fill="#E8F0FF" />
    <rect x="10" y="10" width="5" height="5" fill="#111A31" />
    <rect x="17" y="10" width="4" height="5" fill="#FC5FA9" />
    <rect x="3" y="17" width="18" height="4" fill="#111A31" />
    <rect x="5" y="18" width="6" height="2" fill="#E4FF58" />
  </svg>
);
