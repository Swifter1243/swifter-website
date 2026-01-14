import type { IDisposable } from "./disposable";
import { Interactable } from "./interactable";
import { THREE } from "../../deps";
import { Label } from "./label";
import { alignLocalUp } from "../../utilities/three";
import { SmoothNumber, SmoothVec3 } from "../../utilities/smooth_value";
import { randomRange } from "../../utilities/math";
import { Flower } from "./flower";

const textOffset = new THREE.Vector3(0, 0.2, 0)
const lightIntensity = 0.03

export class VisualNode implements IDisposable {
    parent: THREE.Object3D
    content: THREE.Object3D
    interactable: Interactable
    label: Label
    flower: Flower

    backLight: THREE.PointLight
    frontLight: THREE.PointLight
    frontLightIntensity = new SmoothNumber(0)

    position: THREE.Vector3
    smoothedPosition: SmoothVec3

    constructor(name: string, parent: THREE.Object3D, position: THREE.Vector3, normal: THREE.Vector3, labelSize = 0.04) {
        this.parent = parent
        this.content = new THREE.Object3D()
        this.parent.add(this.content)

        this.position = position
        alignLocalUp(this.content, normal)
        
        this.interactable = new Interactable(0.4, this.content)

        this.label = new Label(this.parent, name, labelSize)
        this.label.content.position.copy(position).add(textOffset)

        this.smoothedPosition = new SmoothVec3(0, 0, 0, randomRange(3, 5))
        this.smoothedPosition.copy(this.position)

        this.updatePositions()

        this.flower = new Flower(this.content, 4, 1)
        this.flower.content.scale.setScalar(0.1)

        this.backLight = new THREE.PointLight(0xffffff, lightIntensity, 0.2, 2)
        this.content.add(this.backLight)
        this.backLight.translateY(-0.05)

        this.frontLight = new THREE.PointLight(0xffffff, lightIntensity, 0.2, 2)
        this.content.add(this.frontLight)
        this.frontLight.translateY(0.05)
        this.content.remove(this.frontLight)
    }

    open() {
        this.flower.open()
        this.content.add(this.frontLight)
        this.frontLightIntensity.set(lightIntensity)
    }

    close() {
        this.flower.close()
        this.content.remove(this.frontLight)
        this.frontLightIntensity.set(0)
    }

    step(deltaTime: number): void {
        this.smoothedPosition.step(deltaTime)
        this.updatePositions()

        this.frontLightIntensity.step(deltaTime)
        this.frontLight.intensity = this.frontLightIntensity.current
    }

    updatePositions() {
        this.content.position.copy(this.smoothedPosition.current)
        this.label.content.position.copy(this.smoothedPosition.current).add(textOffset)
    }
 
    dispose(): void {
        this.label.dispose()
        this.interactable.dispose()
        this.flower.dispose()
        this.content.remove(this.backLight)
        this.content.remove(this.frontLight)
        this.parent.remove(this.content)
    }
}