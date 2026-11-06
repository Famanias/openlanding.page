'use client';
import { useEffect, useRef } from 'react';
import { createArchiveScene, type SceneController } from '../lib/archiveSceneEngine';
import type { ScreenProjection } from '../lib/projection';
export default function ArchiveStageCanvas({ controller, onProjection, onError, onRestore }: {
    controller: React.RefObject<SceneController | null>;
    onProjection: (rect: ScreenProjection, progress: number) => void;
    onError: () => void;
    onRestore: () => void;
}) {
    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const element = canvas.current!;
        const fail = () => { controller.current?.dispose(); controller.current = null; onError(); };
        const initialize = () => {
            try {
                element.dataset.sceneReady = 'false';
                controller.current = createArchiveScene(element, onProjection, fail);
                onRestore();
            }
            catch {
                fail();
            }
        };
        element.addEventListener('webglcontextrestored', initialize);
        initialize();
        return () => { element.removeEventListener('webglcontextrestored', initialize); controller.current?.dispose(); controller.current = null; };
    }, [controller, onProjection, onError, onRestore]);
    return <canvas ref={canvas} className="archive-canvas" aria-label="Three-dimensional cartridge archive. Use the previous, next and boot buttons to explore."/>;
}
