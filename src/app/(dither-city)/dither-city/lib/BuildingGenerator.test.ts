import { test } from 'vitest';
import assert from 'node:assert/strict';
import { generateCityGeometry } from './BuildingGenerator';

test('procedural city generator builds all 6 architectural classes deterministically', () => {
  const cityA = generateCityGeometry(204907);
  const cityB = generateCityGeometry(204907);

  const classes = new Set(cityA.buildings.map((b) => b.buildingClass));
  assert.ok(classes.has('industrial_monolith'));
  assert.ok(classes.has('brutalist_monolith'));
  assert.ok(classes.has('scaffolding_tower'));
  assert.ok(classes.has('antenna_spire'));
  assert.ok(classes.has('sculptural_dome_tower'));
  assert.ok(classes.has('distant_silhouette'));

  assert.equal(cityA.buildings.length, cityB.buildings.length);
  assert.equal(
    cityA.mainGeometry.attributes.position.count,
    cityB.mainGeometry.attributes.position.count,
  );
  assert.ok(cityA.mainGeometry.attributes.position.count > 1000);
  assert.ok(cityA.scaffoldGeometry.attributes.position.count > 1000);
  assert.ok(cityA.accentGeometry.attributes.position.count > 100);
  assert.ok(cityA.distantGeometry.attributes.position.count > 400);

  // Verify zero NaN coordinates across all merged position buffers
  for (const geo of [
    cityA.mainGeometry,
    cityA.darkDetailGeometry,
    cityA.scaffoldGeometry,
    cityA.accentGeometry,
    cityA.distantGeometry,
  ]) {
    const arr = geo.attributes.position.array;
    for (let i = 0; i < arr.length; i++) {
      assert.ok(Number.isFinite(arr[i]), `Found non-finite vertex coordinate at index ${i}`);
    }
    geo.dispose();
  }
  cityB.mainGeometry.dispose();
  cityB.darkDetailGeometry.dispose();
  cityB.scaffoldGeometry.dispose();
  cityB.accentGeometry.dispose();
  cityB.distantGeometry.dispose();
});

test('city layout preserves left negative space and has tall foreground megastructures', () => {
  const city = generateCityGeometry(204907);

  // No foreground or midground hero towers intruding deep into the left 35-40% safe zone (x < -4)
  const foregroundAndMid = city.buildings.filter((b) => b.layer !== 'distant');
  for (const b of foregroundAndMid) {
    assert.ok(
      b.position[0] >= -2.5,
      `Hero building ${b.id} at x=${b.position[0]} intrudes into left hero text safe zone`,
    );
  }

  // Hero megastructure extends below bottom edge and well above top viewport edge
  const hero = city.buildings.find((b) => b.id === 'tower-d-hero-megastructure');
  assert.ok(hero, 'Hero megastructure must exist');
  assert.ok(hero.position[1] < -5, 'Hero megastructure must extend below bottom edge');
  assert.ok(hero.position[1] + hero.height > 26, 'Hero megastructure must extend above top edge');

  city.mainGeometry.dispose();
  city.darkDetailGeometry.dispose();
  city.scaffoldGeometry.dispose();
  city.accentGeometry.dispose();
  city.distantGeometry.dispose();
});
