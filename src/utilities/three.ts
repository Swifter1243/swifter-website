import type { Object3D, Vector3 } from "three";
import { THREE } from "../deps";

export function alignLocalUp(object: Object3D, up: Vector3) {
    const unitUp = new THREE.Vector3(0, 1, 0)
    const q = new THREE.Quaternion().setFromUnitVectors(unitUp, up)
    object.quaternion.copy(q)
}