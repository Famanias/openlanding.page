import * as THREE from 'three';
import { box, part, polymer, enableAssembly } from './geometry';
export const DECK_SLOT = { width: .99, depth: .18, entranceY: 1.075, z: -1.05, floorY: .76, dockY: .84 } as const;
export interface Deck01Anchors {
    slotEntrance: THREE.Object3D;
    slotAlignment: THREE.Object3D;
    slotFullyInserted: THREE.Object3D;
    screenPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
}
export function createDeck01Model() {
    const group = new THREE.Group();
    group.name = 'DECK-01';
    const plastic = polymer(), cavity = new THREE.MeshStandardMaterial({ color: 0x090b10, roughness: .88 }), trim = new THREE.MeshStandardMaterial({ color: 0x17191e, roughness: .43 });
    const shell = new THREE.Group();
    shell.name = 'shell';
    group.add(shell);
    part(shell, 'lower-shell', box(2.4, .22, 2.745, .055), plastic, [0, .11, 0]);
    const profile = new THREE.Shape();
    profile.moveTo(-1.35, .20);
    profile.lineTo(1.35, .20);
    profile.lineTo(1.35, 1.08);
    profile.lineTo(.84, 1.08);
    profile.lineTo(-1.35, .30);
    profile.closePath();
    const cheekGeometry = new THREE.ExtrudeGeometry(profile, { depth: .14, bevelEnabled: true, bevelSize: .038, bevelThickness: .025, bevelSegments: 4, steps: 1 });
    cheekGeometry.rotateY(Math.PI / 2);
    part(shell, 'right-cheek', cheekGeometry, plastic, [1.06, 0, 0]);
    part(shell, 'left-cheek', cheekGeometry, plastic, [-1.20, 0, 0]);
    part(shell, 'rear-wall', box(2.15, .83, .09, .025), plastic, [0, .64, -1.31]);
    part(shell, 'front-lip', box(2.18, .14, .09, .025), plastic, [0, .265, 1.31]);
    const slope = Math.atan((1.08 - .30) / 2.19);
    const surfaceY = (z: number) => .30 + (1.35 - z) * Math.tan(slope);
    const slopedPanel = part(shell, 'inclined-panel', box(2.18, .05, 2.32, .02), plastic, [0, surfaceY(.245) - .026, .245]);
    slopedPanel.rotation.x = slope;
    // Closed overlapping frame segments keep the opening empty and avoid concave bevel folds.
    const rearDeck = new THREE.Group();
    rearDeck.name = 'rear-deck';
    shell.add(rearDeck);
    for (const sign of [-1, 1]) {
        part(rearDeck, `rear-frame-side-${sign < 0 ? 'left' : 'right'}`, box(.595, .045, .51, .008), plastic, [sign * .7925, 1.0475, DECK_SLOT.z]);
        part(rearDeck, `rear-frame-edge-${sign < 0 ? 'rear' : 'front'}`, box(1.05, .045, .165, .008), plastic, [0, 1.0475, DECK_SLOT.z + sign * .1725]);
    }
    const slotLip = new THREE.Group();
    slotLip.name = 'slotLip';
    group.add(slotLip);
    const slotInterior = new THREE.Group();
    slotInterior.name = 'slotInterior';
    group.add(slotInterior);
    for (const sign of [-1, 1]) {
        part(slotLip, `slot-edge-${sign < 0 ? 'rear' : 'front'}`, box(1.05, .018, .025, .005), trim, [0, DECK_SLOT.entranceY, DECK_SLOT.z + sign * .104]);
        part(slotLip, `slot-end-${sign < 0 ? 'left' : 'right'}`, box(.025, .018, .20, .005), trim, [sign * .516, DECK_SLOT.entranceY, DECK_SLOT.z]);
        part(slotInterior, `slot-wall-${sign < 0 ? 'rear' : 'front'}`, box(1.02, .28, .025, .005), cavity, [0, .91, DECK_SLOT.z + sign * .105]);
        part(slotInterior, `end-guide-${sign < 0 ? 'left' : 'right'}`, box(.025, .28, .18, .005), cavity, [sign * .509, .91, DECK_SLOT.z]);
    }
    part(slotInterior, 'slot-floor', box(.99, .035, .18, .005), cavity, [0, DECK_SLOT.floorY, DECK_SLOT.z]);
    const screenBezel = part(group, 'screenBezel', box(1.96, .036, 1.32, .035), trim, [0, surfaceY(.28) + .012, .28]);
    screenBezel.rotation.x = slope;
    const screenGlass = part(group, 'screenGlass', box(1.83, .018, 1.20, .018), new THREE.MeshPhysicalMaterial({ color: 0x11151b, roughness: .22, clearcoat: 1, clearcoatRoughness: .12 }), [0, surfaceY(.28) + .043, .28]);
    screenGlass.rotation.x = slope;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.73, 1.05), new THREE.MeshBasicMaterial({ color: 0x080c12 }));
    screen.name = 'activeScreenPlane';
    screen.rotation.x = -Math.PI / 2 + slope;
    screen.position.set(0, surfaceY(.28) + .059, .28);
    group.add(screen);
    const anchor = (name: string, y: number) => { const object = new THREE.Object3D(); object.name = name; object.position.set(0, y, DECK_SLOT.z); group.add(object); return object; };
    const anchors: Deck01Anchors = { slotEntrance: anchor('slotEntrance', DECK_SLOT.entranceY), slotAlignment: anchor('slotAlignment', 1.55), slotFullyInserted: anchor('slotFullyInserted', DECK_SLOT.dockY), screenPlane: screen };
    const frontButtons = new THREE.Group();
    frontButtons.name = 'frontButtons';
    group.add(frontButtons);
    for (const x of [-.84, -.58, .58, .84])
        part(frontButtons, `button-${x < 0 ? 'left' : 'right'}-${Math.abs(x)}`, box(.17, .053, .035, .014), trim, [x, .275, 1.367]);
    const indicator = part(group, 'powerIndicator', new THREE.SphereGeometry(.018, 12, 8), new THREE.MeshStandardMaterial({ color: 0xcdf266, emissive: 0xcdf266, emissiveIntensity: .05 }), [.84, surfaceY(1.15) + .02, 1.15]);
    const baseSeam = part(group, 'baseSeam', box(2.37, .015, 2.71, .03), trim, [0, .22, 0]);
    const ventRibs = new THREE.Group();
    ventRibs.name = 'ventRibs';
    group.add(ventRibs);
    const dummy = new THREE.Object3D();
    const lowerVents = new THREE.InstancedMesh(box(.012, .105, .023, .004), cavity, 84);
    lowerVents.name = 'lower-vent-recesses';
    ventRibs.add(lowerVents);
    let instance = 0;
    for (const sign of [-1, 1])
        for (let i = 0; i < 42; i++) {
            dummy.position.set(sign * 1.205, .12, -1.23 + i * .06);
            dummy.updateMatrix();
            lowerVents.setMatrixAt(instance++, dummy.matrix);
        }
    const upperVents = new THREE.InstancedMesh(box(.09, .02, .026, .005), cavity, 28);
    upperVents.name = 'upper-vent-recesses';
    ventRibs.add(upperVents);
    instance = 0;
    for (const sign of [-1, 1])
        for (let i = 0; i < 14; i++) {
            const z = -1.27 + i * .038;
            dummy.position.set(sign * 1.155, z < -.84 ? 1.092 : surfaceY(z) + .018, z);
            dummy.updateMatrix();
            upperVents.setMatrixAt(instance++, dummy.matrix);
        }
    const contactMaterial = new THREE.MeshStandardMaterial({ color: 0xb29c6c, metalness: .8, roughness: .3 });
    for (let i = 0; i < 28; i++)
        part(slotInterior, `slot-contact-${i}`, box(.012, .025, .025, .002), contactMaterial, [-.33 + i * .024, .803, DECK_SLOT.z]);
    for (const x of [-.9, .9])
        for (const z of [-1.12, 1.12])
            part(shell, `rubber-foot-${x < 0 ? 'left' : 'right'}-${z < 0 ? 'rear' : 'front'}`, box(.21, .04, .18, .02), cavity, [x, -.01, z]);
    const parts = { shell, screenBezel, screenGlass, activeScreenPlane: screen, slotLip, slotInterior, ventRibs, frontButtons, powerIndicator: indicator, baseSeam };
    screen.userData.explodeWithParent = true;
    screenGlass.attach(screen);
    const assembly = enableAssembly(group, parts);
    return { group, anchors, parts, assembly, setBootState(state: number) { indicator.material.emissiveIntensity = state * 2 + .05; screen.material.color.set(state ? 0xcdf266 : 0x080c12); } };
}
