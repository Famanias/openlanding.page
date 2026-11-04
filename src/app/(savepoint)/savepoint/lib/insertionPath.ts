import * as THREE from 'three';
export interface Pose {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
}
export function worldPose(anchor: THREE.Object3D): Pose { anchor.updateWorldMatrix(true, false); return { position: anchor.getWorldPosition(new THREE.Vector3()), quaternion: anchor.getWorldQuaternion(new THREE.Quaternion()) }; }
export function interpolatePose(object: THREE.Object3D, from: Pose, to: Pose, progress: number) { object.position.lerpVectors(from.position, to.position, progress); object.quaternion.slerpQuaternions(from.quaternion, to.quaternion, progress); }
export function slotClippingPlane(entrance: THREE.Object3D) { const pose = worldPose(entrance); const normal = new THREE.Vector3(0, 1, 0).applyQuaternion(pose.quaternion); return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, pose.position); }
export function seatingProgress(t: number) {
    if (t < .86)
        return t / .86 * .97;
    const settle = (t - .86) / .14;
    return settle >= 1 ? 1 : .97 + .03 * (1 - Math.exp(-6 * settle) * Math.cos(10 * settle));
}
