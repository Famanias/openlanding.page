import * as THREE from 'three';
export function projectBounds(object: THREE.Object3D, camera: THREE.Camera, canvas: HTMLCanvasElement) {
    object.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(object), rect = canvas.getBoundingClientRect();
    const points = [];
    for (const x of [bounds.min.x, bounds.max.x])
        for (const y of [bounds.min.y, bounds.max.y])
            for (const z of [bounds.min.z, bounds.max.z]) {
                const point = new THREE.Vector3(x, y, z).project(camera);
                points.push({ x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 });
            }
    return { left: Math.min(...points.map(point => point.x)), right: Math.max(...points.map(point => point.x)), top: Math.min(...points.map(point => point.y)), bottom: Math.max(...points.map(point => point.y)) };
}
export interface ScreenProjection {
    points: {
        x: number;
        y: number;
    }[];
    left: number;
    top: number;
    width: number;
    height: number;
}
export function projectScreen(screen: THREE.Mesh, camera: THREE.Camera, canvas: HTMLCanvasElement): ScreenProjection {
    screen.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    const rect = canvas.getBoundingClientRect();
    const box = screen.geometry.boundingBox ?? (screen.geometry.computeBoundingBox(), screen.geometry.boundingBox!);
    const points = [[box.min.x, box.max.y], [box.max.x, box.max.y], [box.max.x, box.min.y], [box.min.x, box.min.y]].map(([x, y]) => { const p = new THREE.Vector3(x, y, 0).applyMatrix4(screen.matrixWorld).project(camera); return { x: rect.left + (p.x + 1) * rect.width / 2, y: rect.top + (1 - p.y) * rect.height / 2 }; });
    const left = Math.min(...points.map(p => p.x)), top = Math.min(...points.map(p => p.y));
    return { points, left, top, width: Math.max(...points.map(p => p.x)) - left, height: Math.max(...points.map(p => p.y)) - top };
}
