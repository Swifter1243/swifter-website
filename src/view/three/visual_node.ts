import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";
import { THREE } from "../../deps";
import { Label } from "./label";
import { alignLocalUp } from "../../utilities/three";
import { SmoothVec3 } from "../../utilities/smooth_value";
import { randomRange } from "../../utilities/math";

const textOffset = new THREE.Vector3(0, 0.1, 0)

export class VisualNode implements IDisposable {
    parent: THREE.Object3D
    content: THREE.Object3D
    interactable: Interactable
    label: Label

    position: THREE.Vector3
    smoothedPosition: SmoothVec3

    constructor(key: string, parent: THREE.Object3D, position: THREE.Vector3, normal: THREE.Vector3) {
        this.parent = parent
        this.content = new THREE.Object3D()
        this.parent.add(this.content)

        this.position = position
        alignLocalUp(this.content, normal)
        
        this.interactable = new Interactable(0.4, this.content)

        this.label = new Label(this.parent, key)
        this.label.content.position.copy(position).add(textOffset)

        this.smoothedPosition = new SmoothVec3(0, 0, 0, randomRange(3, 5))
        this.smoothedPosition.copy(this.position)

        this.updatePositions()
    }

    step(deltaTime: number): void {
        this.smoothedPosition.step(deltaTime)
        this.updatePositions()
    }

    updatePositions() {
        this.content.position.copy(this.smoothedPosition.current)
        this.label.content.position.copy(this.smoothedPosition.current).add(textOffset)
    }
 
    dispose(): void {
        this.label.dispose()
        this.interactable.dispose()
        this.parent.remove(this.content)
    }
}