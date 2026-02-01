import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";
import { THREE } from "../../deps";
import { Label } from "./label";
import { alignLocalUp } from "../../utilities/three";
import { SmoothVec3 } from "../../utilities/smooth_value";
import { randomRange } from "../../utilities/math";
import { Flower } from "./flower";
import { addUpdateable, removeUpdateable, type IUpdateable } from "./updateable";

const textWorldOffset = 0.1
const textNormalOffset = 0.12
const interactableOffset = new THREE.Vector3(0, 0.05, 0)

const DEFAULT_COLOR = '#9bfff7'
const DISABLED_COLOR = '#293c3a'
const OPENED_COLOR = '#293c3a'

export class VisualNode implements IDisposable, IUpdateable {
    parent: THREE.Object3D
    content: THREE.Object3D
    interactable: Interactable
    label: Label
    flower: Flower

    position: THREE.Vector3
    normal: THREE.Vector3
    smoothedPosition: SmoothVec3
    size: number

    constructor(name: string, parent: THREE.Object3D, position: THREE.Vector3, normal: THREE.Vector3, pedals: number, size: number, labelSize = 0.04) {
        this.parent = parent
        this.content = new THREE.Object3D()
        this.parent.add(this.content)
        addUpdateable(this)

        this.size = size

        this.position = position
        this.normal = normal
        alignLocalUp(this.content, normal)
        
        this.interactable = new Interactable(0.4, this.content)
        this.interactable.mesh.position.addScaledVector(interactableOffset, this.size)

        const scaledTextOffset =  new THREE.Vector3(0, textWorldOffset, 0)
        this.label = new Label(this.parent, name, scaledTextOffset, labelSize)
        this.label.content.position.copy(position).addScaledVector(this.normal, this.size * textNormalOffset)

        this.smoothedPosition = new SmoothVec3(0, 0, 0, randomRange(3, 5))
        this.smoothedPosition.copy(this.position)

        this.updatePositions()

        this.flower = new Flower(this.content, pedals, 1)
        this.flower.content.scale.setScalar(0.1 * size)
    }

    open() {
        this.flower.open()
        this.label.setColor(OPENED_COLOR)
    }

    close() {
        this.flower.close()
        this.label.setColor(DEFAULT_COLOR)
    }

    disable() {
        this.label.setColor(DISABLED_COLOR)
    }

    enable() {
        this.label.setColor(DEFAULT_COLOR)
    }

    update(deltaTime: number): void {
        this.smoothedPosition.update(deltaTime)
        this.updatePositions()
    }

    updatePositions() {
        this.content.position.copy(this.smoothedPosition.current)
        this.label.content.position
            .copy(this.smoothedPosition.current).addScaledVector(this.normal, this.size * textNormalOffset)
    }
 
    dispose(): void {
        this.label.dispose()
        this.interactable.dispose()
        this.flower.dispose()
        removeUpdateable(this)
        this.parent.remove(this.content)
    }
}