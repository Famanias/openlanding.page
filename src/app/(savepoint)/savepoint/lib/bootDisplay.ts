import * as THREE from 'three';
import type { Game } from '../data/games';
export function createBootDisplay(material: THREE.MeshBasicMaterial) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 620;
    const context = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const images = new Map<string, HTMLImageElement>();
    let selected: Game | null = null, stage = 'OFF', disposed = false;
    function draw() {
        if (disposed)
            return;
        context.fillStyle = '#080c12';
        context.fillRect(0, 0, 1024, 620);
        const image = selected && images.get(selected.id);
        if (stage === 'WORLD FOUND' && image?.complete && image.naturalWidth) {
            const scale = Math.max(1024 / image.width, 620 / image.height);
            context.drawImage(image, (1024 - image.width * scale) / 2, (620 - image.height * scale) / 2, image.width * scale, image.height * scale);
            context.fillStyle = 'rgba(8,12,18,.55)';
            context.fillRect(0, 440, 1024, 180);
        }
        if (stage !== 'OFF') {
            context.fillStyle = '#cdf266';
            context.font = '24px monospace';
            context.fillText('SAVEPOINT // DECK-01', 46, 64);
            context.fillStyle = selected?.accent ?? '#cdf266';
            context.font = 'bold 54px sans-serif';
            context.fillText(stage === 'WORLD FOUND' ? selected!.title.toUpperCase() : 'READING ROM', 46, 506);
            context.fillStyle = '#f2f0e8';
            context.font = '22px monospace';
            context.fillText(stage === 'WORLD FOUND' ? `${selected!.archiveSpecs.catalogCode} / WORLD FOUND` : 'VERIFYING CARTRIDGE / PLEASE WAIT', 46, 562);
        }
        texture.needsUpdate = true;
    }
    material.map = texture;
    material.color.set(0xffffff);
    material.needsUpdate = true;
    return {
        select(game: Game) {
            selected = game;
            if (!images.has(game.id)) {
                const image = new Image();
                image.onload = draw;
                image.src = game.worldUrl;
                images.set(game.id, image);
            }
        },
        setStage(value: 'OFF' | 'READING ROM' | 'WORLD FOUND') { stage = value; material.color.set(0xffffff); draw(); },
        dispose() { disposed = true; images.forEach(image => { image.onload = null; image.onerror = null; }); images.clear(); material.map = null; texture.dispose(); },
    };
}
