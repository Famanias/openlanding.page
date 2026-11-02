import { BufferGeometry, Color, Curve, Float32BufferAttribute, Vector3 } from "three";

const TAU = Math.PI * 2;

function positive(value: number, name: string) {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be finite and positive`);
}

function subdivisions(value: number, minimum: number, maximum: number, name: string) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new RangeError(`${name} must be an integer between ${minimum} and ${maximum}`);
  }
}

/** One complete toroidal winding, in the XY plane with depth along Z. */
export function calculateTorusKnotPoint(t: number, p = 2, q = 3, radius = 2, heightScale = 0.8): Vector3 {
  if (!Number.isFinite(t)) throw new RangeError("t must be finite");
  positive(radius, "radius");
  positive(heightScale, "heightScale");
  subdivisions(p, 1, 20, "p");
  subdivisions(q, 1, 20, "q");
  const radial = radius * (1 + 0.32 * Math.cos(q * t));
  return new Vector3(radial * Math.cos(p * t), radial * Math.sin(p * t), -heightScale * Math.sin(q * t));
}

/** Excludes the repeated endpoint so callers can connect the final sample to the first. */
export function generateTorusKnotSamples(samples: number, p = 2, q = 3, radius = 2): Vector3[] {
  subdivisions(samples, 3, 4096, "samples");
  return Array.from({ length: samples }, (_, index) => calculateTorusKnotPoint(index / samples * TAU, p, q, radius));
}

class KnotCurve extends Curve<Vector3> {
  getPoint(t: number, target = new Vector3()) {
    return target.copy(calculateTorusKnotPoint(t * TAU));
  }
}

/** A flattened, closed tube. Parallel-transport frames distribute seam twist over the curve. */
export function buildGeodesicRibbonGeometry(samples: number, segments: number, width: number, thickness: number): BufferGeometry {
  subdivisions(samples, 12, 200, "samples");
  subdivisions(segments, 3, 24, "segments");
  positive(width, "width");
  positive(thickness, "thickness");
  const curve = new KnotCurve();
  const frames = curve.computeFrenetFrames(samples, true);
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const cyan = new Color("#00E5FF");
  const lime = new Color("#CCFF00");
  const point = new Vector3();
  const tint = new Color();

  for (let ring = 0; ring <= samples; ring++) {
    const t = ring / samples;
    // Copy ring zero exactly at the longitudinal seam, including its normal frame.
    const frame = ring === samples ? 0 : ring;
    const center = curve.getPoint(ring === samples ? 0 : t);
    const tone = 0.5 + 0.5 * Math.sin(t * TAU - 0.7);
    tint.copy(cyan).lerp(lime, tone * tone * (3 - 2 * tone));
    for (let column = 0; column <= segments; column++) {
      const angle = (column === segments ? 0 : column / segments) * TAU;
      point.copy(center)
        .addScaledVector(frames.normals[frame], Math.cos(angle) * width)
        .addScaledVector(frames.binormals[frame], Math.sin(angle) * thickness);
      positions.push(point.x, point.y, point.z);
      colors.push(tint.r, tint.g, tint.b);
      uvs.push(t, column / segments);
      if (ring < samples && column < segments) {
        const a = ring * (segments + 1) + column;
        const b = a + segments + 1;
        // Alternate diagonals for a geodesic lattice rather than a uniform slash pattern.
        if ((ring + column) % 2 === 0) indices.push(a, b, a + 1, b, b + 1, a + 1);
        else indices.push(a, b, b + 1, a, b + 1, a + 1);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  // Weld the shading at both duplicated UV seams without welding UVs themselves.
  const normals = geometry.getAttribute("normal");
  const average = (a: number, b: number) => {
    point.fromBufferAttribute(normals, a).add(new Vector3().fromBufferAttribute(normals, b)).normalize();
    normals.setXYZ(a, point.x, point.y, point.z);
    normals.setXYZ(b, point.x, point.y, point.z);
  };
  for (let ring = 0; ring <= samples; ring++) average(ring * (segments + 1), ring * (segments + 1) + segments);
  for (let column = 0; column <= segments; column++) average(column, samples * (segments + 1) + column);
  geometry.computeBoundingSphere();
  return geometry;
}
