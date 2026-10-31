import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createFooterDroplets } from './FooterDroplets';

describe('footer droplets', () => {
  it('reuses a fixed pool and fades tap droplets out', () => {
    const drops = createFooterDroplets();
    const opacity = drops.mesh.geometry.getAttribute('aOpacity');
    const pointer = new THREE.Vector2();
    try {
      drops.update(0, pointer, 0);
      expect(drops.group.children[1].visible).toBe(false);
      expect(Array.from({ length: 18 }, (_, i) => opacity.getX(i + 18))).toEqual(Array(18).fill(0));

      drops.burst(0.2, -0.1, 0);
      drops.update(0.5, pointer, 0);
      expect(drops.group.children[1].visible).toBe(true);
      expect(Array.from({ length: 18 }, (_, i) => opacity.getX(i + 18)).filter((value) => value > 0)).toHaveLength(6);

      drops.update(3, pointer, 0);
      expect(drops.group.children[1].visible).toBe(false);
      expect(Array.from({ length: 18 }, (_, i) => opacity.getX(i + 18))).toEqual(Array(18).fill(0));
      expect(drops.mesh.count).toBe(36);
    } finally {
      drops.dispose();
    }
  });

  it('moves nearby floating drops away from the pointer', () => {
    const drops = createFooterDroplets();
    const matrix = new THREE.Matrix4();
    try {
      drops.update(1, new THREE.Vector2(), 0);
      drops.mesh.getMatrixAt(0, matrix);
      const resting = new THREE.Vector3().setFromMatrixPosition(matrix);
      const pointer = new THREE.Vector2(resting.x + 0.05, resting.y);
      drops.update(1, pointer, 1);
      drops.mesh.getMatrixAt(0, matrix);
      const moved = new THREE.Vector3().setFromMatrixPosition(matrix);
      expect(moved.x).toBeLessThan(resting.x - 0.1);
    } finally {
      drops.dispose();
    }
  });
});
