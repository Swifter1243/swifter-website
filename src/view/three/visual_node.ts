import { Object3D } from "three";
import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";
import { THREE } from "../../deps";
import { Label } from "./label";
import { alignLocalUp } from "../../utilities/three";

const textOffset = new THREE.Vector3(0, 0.1, 0)

export class VisualNode implements IDisposable {
    parent: Object3D
    content: Object3D
    interactable: Interactable
    label: Label

    endPoint: THREE.Vector3

    constructor(key: string, parent: Object3D, endPoint: THREE.Vector3, endNormal: THREE.Vector3) {
        this.parent = parent
        this.content = new Object3D()
        this.parent.add(this.content)

        this.endPoint = endPoint
        this.content.position.copy(this.endPoint) // Temp
        alignLocalUp(this.content, endNormal)
        
        this.interactable = new Interactable(0.4, this.content)

        this.label = new Label(this.parent, key)
        this.label.content.position.copy(endPoint).add(textOffset)
    }

    dispose(): void {
        this.label.dispose()
        this.interactable.dispose()
        this.parent.remove(this.content)
    }
}