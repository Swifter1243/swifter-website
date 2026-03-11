import { THREE } from "../../deps"
import { cloneGltf } from "../../utilities/three"
import { petalModel } from "./resources"

export let petalPool: Object3DPool<THREE.Object3D>

export function initPools() {
    const petals: THREE.Object3D[] = []
    for (let i = 0; i < 128; i++) {
        petals.push(cloneGltf(petalModel))
    }
    petalPool = new Object3DPool(petals)
}

export abstract class Pool<T> {
    available: T[] = []

    constructor(objects: T[]) {
        this.available.push(...objects)
        objects.forEach(o => {
            this.hide(o)
        })
    }

    get(): T {
        const item = this.available.pop()
        if (!item) {
            throw new Error("Tried to get item from pool, but pool was empty!")
        }
        this.prepare(item)
        return item
    }

    release(item: T) {
        this.available.push(item)
        this.hide(item)
    }

    protected abstract prepare(item: T): void
    protected abstract hide(item: T): void
}

class Object3DPool<T extends THREE.Object3D> extends Pool<T> {
    protected prepare(item: T): void {
        item.visible = true
        item.position.setScalar(0)
        item.scale.setScalar(1)
        item.quaternion.identity()
    }

    protected hide(item: T): void {
        item.visible = false
    }
}