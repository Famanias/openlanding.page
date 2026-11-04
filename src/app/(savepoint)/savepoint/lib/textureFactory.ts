import * as THREE from 'three';
import type { Game } from '../data/games';
export function createLabelTexture(game: Game, renderer: THREE.WebGLRenderer) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    function type() {
        ctx.fillStyle = '#171b22';
        ctx.fillRect(0, 780, 1024, 244);
        ctx.fillStyle = game.accent;
        ctx.font = 'bold 75px sans-serif';
        let size = 75;
        while (ctx.measureText(game.title.toUpperCase()).width > 930) {
            size -= 2;
            ctx.font = `bold ${size}px sans-serif`;
        }
        ctx.fillText(game.title.toUpperCase(), 44, 874);
        ctx.font = '25px monospace';
        ctx.fillStyle = '#f2f0e8';
        ctx.fillText(`${game.archiveSpecs.catalogCode}     ${game.year}`, 44, 963);
        texture.needsUpdate = true;
    }
    ctx.fillStyle = '#252934';
    ctx.fillRect(0, 0, 1024, 1024);
    type();
    let disposed = false;
    const img = new Image();
    const ready = new Promise<void>((resolve, reject) => {
        img.onload = () => {
            if (!disposed) {
                const cropH = img.height * .80;
                const cropW = Math.min(img.width, cropH * 1024 / 780);
                ctx.drawImage(img, (img.width - cropW) / 2, 0, cropW, cropH, 0, 0, 1024, 780);
                type();
            }
            resolve();
        };
        img.onerror = () => reject(new Error(`Unable to load ${game.labelUrl}`));
    });
    img.src = game.labelUrl;
    return { texture, ready, dispose() { disposed = true; img.onload = null; img.onerror = null; texture.dispose(); } };
}
export function createSpineTexture(game: Game) { const c = document.createElement('canvas'); c.width = 128; c.height = 1024; const x = c.getContext('2d')!; x.fillStyle = '#252934'; x.fillRect(0, 0, 128, 1024); x.fillStyle = game.accent; x.fillRect(0, 40, 128, 16); x.save(); x.translate(78, 100); x.rotate(Math.PI / 2); x.fillStyle = '#f2f0e8'; x.font = 'bold 39px sans-serif'; x.fillText(game.title.toUpperCase(), 0, 0); x.restore(); x.font = '29px monospace'; x.fillStyle = game.accent; x.fillText(game.indexNumber, 39, 964); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
