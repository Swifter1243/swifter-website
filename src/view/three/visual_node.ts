import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";
import { THREE } from "../../deps";
import { Label } from "./label";
import { alignLocalUp } from "../../utilities/three";

const textOffset = new THREE.Vector3(0, 0.1, 0)

export class VisualNode implements IDisposable {
    parent: THREE.Object3D
    content: THREE.Object3D
    interactable: Interactable
    label: Label

    position: THREE.Vector3

    constructor(key: string, parent: THREE.Object3D, position: THREE.Vector3, normal: THREE.Vector3) {
        this.parent = parent
        this.content = new THREE.Object3D()
        this.parent.add(this.content)

        this.position = position
        this.content.position.copy(this.position) // Temp
        alignLocalUp(this.content, normal)
        
        this.interactable = new Interactable(0.4, this.content)

        this.label = new Label(this.parent, key)
        this.label.content.position.copy(position).add(textOffset)
    }

    dispose(): void {
        this.label.dispose()
        this.interactable.dispose()
        this.parent.remove(this.content)
    }
}