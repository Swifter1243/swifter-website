import { Object3D } from "three";
import { THREE } from "../../deps";
import { Invokable } from "../../utilities/invokable";

export const interactables = new Map<Object3D, Interactable>()

export class Interactable {
    mesh: THREE.Mesh
    readonly onHoverStart = new Invokable()
    readonly onHoverEnd = new Invokable()
    readonly onClick = new Invokable()

    constructor(radius: number) {
        const geometry = new THREE.BoxGeometry(radius, radius, radius)
        this.mesh = new THREE.Mesh(geometry, undefined)
        interactables.set(this.mesh, this)
    }

    dispose() {
        interactables.delete(this.mesh)
    }
}