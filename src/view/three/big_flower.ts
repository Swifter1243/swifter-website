import { THREE } from "../../deps";
import type { IDisposable } from "./disposable";
import { Flower } from "./flower";
import { Interactable } from "./interactable";

export class BigFlower implements IDisposable {
    interactable: Interactable
    parent: THREE.Object3D
    flower: Flower

    constructor(parent: THREE.Object3D) {
        this.parent = parent
        this.interactable = new Interactable(0.5, parent)
        this.flower = new Flower(this.parent, 5)
    }

    bloom() {
        this.flower.open()
    }

    dispose() {
        this.interactable.dispose()
        this.flower.dispose()
    }
}