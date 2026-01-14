import { THREE } from "../../deps";
import type { IDisposable } from "./disposable";
import { Flower } from "./flower";
import { Interactable } from "./interactable";

export class BigFlower implements IDisposable {
    interactable: Interactable
    parent: THREE.Object3D
    outerFlower: Flower
    innerFlower: Flower

    constructor(parent: THREE.Object3D) {
        this.parent = parent
        this.interactable = new Interactable(0.5, parent)
        this.outerFlower = new Flower(this.parent, 5)
        this.outerFlower.content.scale.setScalar(0.4)
        this.innerFlower = new Flower(this.parent, 5)
        this.innerFlower.content.scale.setScalar(0.3)
        this.innerFlower.petals.forEach(petal => {
            petal.model.scale.set(1, 1, 0.7)
        })
        this.innerFlower.content.translateY(0.01)
        this.innerFlower.content.rotateY((Math.PI * 2) / (this.innerFlower.petals.length * 2))
    }

    bloom() {
        this.outerFlower.open()
        this.innerFlower.open()
    }

    dispose() {
        this.interactable.dispose()
        this.outerFlower.dispose()
        this.innerFlower.dispose
    }
}