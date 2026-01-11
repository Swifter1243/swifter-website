import type { Object3D, Vector3 } from "three";
import { THREE } from "../deps";

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