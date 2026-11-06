import * as THREE from 'three';
export function describeModel(root: THREE.Object3D) {
    root.updateMatrixWorld(true);
    const parts: {
        name: string;
        kind: string;
        module: string;
        triangles: number;
        parent: string | null;
        position: number[];
        rotation: number[];
        dimensions: number[];
        geometry: string;
    }[] = [];
    const meshes: {
        id: string;
        vertices: number[][];
        indices: number[];
        normals: number[][];
    }[] = [];
    const measured: Record<string, number[]> = {};
    let unnamedMeshes = 0;
    root.traverse(object => {
        if (object.name) {
            measured[object.name] = object.getWorldPosition(new THREE.Vector3()).toArray();
            const bounds = new THREE.Box3().setFromObject(object);
            const size = bounds.isEmpty() ? new THREE.Vector3(.001, .001, .001) : bounds.getSize(new THREE.Vector3());
            parts.push({ name: object.name, kind: 'part', module: object.name, triangles: object instanceof THREE.Mesh ? (object.geometry.index?.count ?? object.geometry.attributes.position.count) / 3 * (object instanceof THREE.InstancedMesh ? object.count : 1) : 0, parent: object === root ? null : object.parent?.name ?? null, position: object.position.toArray(), rotation: [object.rotation.x, object.rotation.y, object.rotation.z], dimensions: size.toArray(), geometry: object instanceof THREE.Mesh ? object.geometry.type : 'Group' });
        }
        if (!(object instanceof THREE.Mesh))
            return;
        if (!object.name)
            unnamedMeshes++;
        // Open label/display carriers are reported in the part tree. For repeated instances,
        // one closed prototype tests the identical topology shared by every instance.
        if (object.geometry instanceof THREE.PlaneGeometry)
            return;
        const geo = object.geometry;
        const positions = Array.from(geo.attributes.position.array) as number[];
        const normals = geo.attributes.normal ? Array.from(geo.attributes.normal.array) as number[] : [];
        const indices: number[] = geo.index ? Array.from(geo.index.array, Number) : Array.from({ length: geo.attributes.position.count }, (_, index) => index);
        const chunks = (values: number[]) => Array.from({ length: values.length / 3 }, (_, index) => values.slice(index * 3, index * 3 + 3));
        meshes.push({ id: object.name, vertices: chunks(positions), indices, normals: chunks(normals) });
    });
    return { model: root.name, parts, meshes, measured, unnamedMeshes, integralMeshes: 0 };
}
