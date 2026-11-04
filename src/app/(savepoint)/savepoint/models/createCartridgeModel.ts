import * as THREE from 'three';
import { box, part, polymer, enableAssembly } from './geometry';
let shared: ReturnType<typeof makeGeometries> | null = null;
let sharedMaterials: {
    plastic: THREE.MeshPhysicalMaterial;
    dark: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
} | null = null;
function getSharedMaterials() { return sharedMaterials ??= { plastic: polymer(), dark: new THREE.MeshStandardMaterial({ color: 0x1b1d22, roughness: .72 }), metal: new THREE.MeshStandardMaterial({ color: 0xa89159, metalness: .8, roughness: .36 }) }; }
export function resetSharedCartridgeResources() { shared = null; sharedMaterials = null; }
function makeGeometries() {
    const outline = new THREE.Shape();
    outline.moveTo(-.42, .14);
    outline.lineTo(.42, .14);
    outline.lineTo(.42, 1.06);
    outline.lineTo(.31, 1.17);
    outline.lineTo(-.36, 1.17);
    outline.quadraticCurveTo(-.42, 1.17, -.42, 1.11);
    outline.closePath();
    const shell = new THREE.ExtrudeGeometry(outline, { depth: .11, bevelEnabled: true, bevelSize: .012, bevelThickness: .015, bevelSegments: 3, steps: 1 });
    shell.translate(0, 0, -.055);
    return { shell, tongue: box(.70, .15, .09, .006), panel: new THREE.PlaneGeometry(.64, .65), recess: box(.73, .87, .012, .018), rear: box(.75, .88, .012, .018), spine: new THREE.PlaneGeometry(.105, .90), contact: box(.011, .027, .006, .001), well: new THREE.TorusGeometry(.021, .004, 5, 12), screw: new THREE.CylinderGeometry(.013, .013, .006, 8), molding: box(.008, .87, .009, .003) };
}
export function getSharedCartridgeGeometries() { return shared ??= makeGeometries(); }
export function createCartridgeModel(options: {
    labelMaterial?: THREE.MeshBasicMaterial;
    spineMaterial?: THREE.MeshStandardMaterial;
} = {}) {
    const geo = getSharedCartridgeGeometries(), group = new THREE.Group();
    group.name = 'universal-cartridge';
    const { plastic, dark, metal } = getSharedMaterials();
    const shell = part(group, 'shell', geo.shell, plastic, [0, 0, 0]);
    const tongue = part(group, 'connectorTongue', geo.tongue, plastic, [0, .075, 0]);
    const frontFrame = new THREE.Group();
    frontFrame.name = 'frontFrame';
    group.add(frontFrame);
    const recess = part(frontFrame, 'labelRecess', geo.recess, dark, [0, .675, .071]);
    recess.userData.explodeWithParent = true;
    const label = part(frontFrame, 'labelPanel', geo.panel, options.labelMaterial ?? new THREE.MeshBasicMaterial({ color: 0x252934, toneMapped: false }), [0, .70, .079]);
    label.userData.explodeWithParent = true;
    part(group, 'rearShell', geo.rear, plastic, [0, .675, -.075]);
    const spine = part(group, 'spine', geo.spine, options.spineMaterial ?? new THREE.MeshStandardMaterial({ color: 0x252934, roughness: .64 }), [-.433, .655, 0]);
    spine.rotation.y = -Math.PI / 2;
    const contacts = new THREE.Group();
    contacts.name = 'contacts';
    group.add(contacts);
    const screwWells = new THREE.Group();
    screwWells.name = 'screwWells';
    group.add(screwWells);
    const gripCorners = new THREE.Group();
    gripCorners.name = 'gripCorners';
    group.add(gripCorners);
    const seam = new THREE.Group();
    seam.name = 'seam';
    group.add(seam);
    const instances = (parent: THREE.Group, name: string, geometry: THREE.BufferGeometry, material: THREE.Material, positions: number[][], rotationX = 0) => { const mesh = new THREE.InstancedMesh(geometry, material, positions.length); mesh.name = name; const transform = new THREE.Object3D(); transform.rotation.x = rotationX; positions.forEach((position, index) => { transform.position.set(position[0], position[1], position[2]); transform.updateMatrix(); mesh.setMatrixAt(index, transform.matrix); }); parent.add(mesh); return mesh; };
    instances(contacts, 'contact-array', geo.contact, metal, Array.from({ length: 28 }, (_, i) => [-.31 + i * .023, .016, .047]));
    const screwPositions = [[-.30, .225], [.30, .225], [-.30, 1.065], [.30, 1.065]];
    instances(screwWells, 'well-array', geo.well, dark, screwPositions.map(([x, y]) => [x, y, -.075]));
    instances(screwWells, 'screw-array', geo.screw, dark, screwPositions.map(([x, y]) => [x, y, -.077]), Math.PI / 2);
    instances(seam, 'mold-seam-array', geo.molding, dark, [[-.378, .665, .068], [.378, .665, .068]]);
    instances(gripCorners, 'grip-array', box(.025, .009, .015, .002), dark, [-.38, .35].flatMap(x => Array.from({ length: 3 }, (_, i) => [x, 1.02 - i * .035, .068])));
    const connectorTongue = new THREE.Object3D();
    connectorTongue.name = 'connectorTip';
    group.add(connectorTongue);
    const parts = { shell, connectorTongue: tongue, frontFrame, labelPanel: label, labelRecess: recess, rearShell: group.getObjectByName('rearShell')!, spine, contacts, screwWells, gripCorners, seam };
    const assembly = enableAssembly(group, parts);
    const originals = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>(), clones = new Map<THREE.Material, THREE.Material>();
    const clone = (material: THREE.Material) => {
        let copy = clones.get(material);
        if (!copy) {
            copy = material.clone();
            clones.set(material, copy);
        }
        return copy;
    };
    const setSpine = (texture: THREE.Texture) => { spine.material.map = texture; spine.material.color.set(0xffffff); spine.material.needsUpdate = true; };
    return { group, parts, assembly, anchors: { connectorTongue }, setSpine, setLabel(texture: THREE.Texture, spineTexture: THREE.Texture) { label.material.map = texture; label.material.color.set(0xffffff); label.material.needsUpdate = true; setSpine(spineTexture); }, setClipping(plane: THREE.Plane | null) {
            if (!plane) {
                for (const [mesh, material] of originals)
                    mesh.material = material;
                originals.clear();
                clones.forEach(material => material.dispose());
                clones.clear();
                return;
            }
            if (!originals.size)
                group.traverse(object => {
                    if (object instanceof THREE.Mesh) {
                        originals.set(object, object.material);
                        object.material = Array.isArray(object.material) ? object.material.map(clone) : clone(object.material);
                    }
                });
            clones.forEach(material => { material.clippingPlanes = [plane]; material.needsUpdate = true; });
        } };
}
