import { THREE } from "../../deps";
import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";

export class BigFlower implements IDisposable {
    interactable: Interactable
    parent: THREE.Object3D
    mesh: THREE.Mesh
    geometry: THREE.BufferGeometry

    constructor(parent: THREE.Object3D) {
        this.parent = parent
        this.interactable = new Interactable(0.5, parent)
        this.geometry = new THREE.CylinderGeometry(0.5, 0.1, 0.3)
        this.mesh = new THREE.Mesh(this.geometry, undefined)
        this.parent.add(this.mesh)
    }

    bloom() {
        // TODO
    }

    dispose() {
        this.geometry.dispose()
        this.interactable.dispose()
        this.parent.remove(this.mesh)
    }
}