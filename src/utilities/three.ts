import type { Object3D, Vector3 } from "three";
import { BufferGeometryUtils, SkeletonUtils, THREE } from "../deps";

export function alignLocalUp(object: Object3D, up: Vector3) {
    const unitUp = new THREE.Vector3(0, 1, 0)
    const q = new THREE.Quaternion().setFromUnitVectors(unitUp, up)
    object.quaternion.copy(q)
}

export function reparentKeepWorldTransform(child: Object3D, newParent: Object3D) {
    if (!child || !newParent) return

    const worldMatrix = child.matrixWorld.clone()
    newParent.add(child)

    const parentInverse = new THREE.Matrix4()
        .copy(newParent.matrixWorld)
        .invert()

    child.matrix.copy(parentInverse.multiply(worldMatrix))

    child.matrix.decompose(
        child.position,
        child.quaternion,
        child.scale
    )
    
    child.updateMatrixWorld(true)
}

export function cloneGltf(original: THREE.Group<THREE.Object3DEventMap>): Object3D {
    const clone = SkeletonUtils.clone(original);

    // Share geometry and materials (important for performance)
    original.traverse((src) => {
        if (src instanceof THREE.Mesh && src.isMesh) {
            const dest = clone.getObjectByName(src.name) as THREE.Mesh;
            dest.geometry = src.geometry;
            dest.material = src.material;
        }
    });

    return clone;
}

export function setMaterialRecursive(object: THREE.Object3D, material: THREE.Material) {
    object.traverse((child) => {
        if (child instanceof THREE.Mesh && child.isMesh) {
            child.material = material
        }
    });
}


export function mergeGroupGeometries(group: THREE.Group): THREE.BufferGeometry {
    const geometries: THREE.BufferGeometry[] = [];

    group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            // Apply the mesh's world transform
            const geom = mesh.geometry.clone();
            geom.applyMatrix4(mesh.matrixWorld);
            geometries.push(geom);
        }
    });

    // Merge all geometries into one
    return BufferGeometryUtils.mergeGeometries(geometries, true)!;
}

export function updateObliqueMatrix(camera: THREE.Camera, plane: THREE.Plane) {
    const projectionMatrix = camera.projectionMatrix;
    
    // 1. Calculate the clip plane in camera space
    const viewPlane = new THREE.Plane();
    viewPlane.copy(plane).applyMatrix4(camera.matrixWorldInverse);
    const clipPlane = new THREE.Vector4(viewPlane.normal.x, viewPlane.normal.y, viewPlane.normal.z, viewPlane.constant);

    // 2. Calculate the "q" vector based on the projection matrix
    const q = new THREE.Vector4();
    q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
    q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
    q.z = -1.0;
    q.w = (1.0 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];

    // 3. Scale the clip plane
    const c = clipPlane.multiplyScalar(2.0 / clipPlane.dot(q));

    // 4. Replace the third row of the projection matrix
    projectionMatrix.elements[2] = c.x;
    projectionMatrix.elements[6] = c.y;
    projectionMatrix.elements[10] = c.z + 1.0;
    projectionMatrix.elements[14] = c.w;
}