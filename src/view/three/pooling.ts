import { THREE } from "../../deps"
import { cloneGltf } from "../../utilities/three"
import { scene } from "./main"
import { leafGeometry, petalModel } from "./resources"

export let petalPool: Object3DPool<THREE.Object3D>
export let leafPool: InstancedPool

export function initPools() {
    const petals: THREE.Object3D[] = []
    for (let i = 0; i < 128; i++) {
        petals.push(cloneGltf(petalModel))
    }
    petalPool = new Object3DPool(petals)
    petalPool.hideAll()

    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
    const leafMesh = new THREE.InstancedMesh(leafGeometry, mat, 512)
    leafMesh.frustumCulled = false
    scene.add(leafMesh)
    leafPool = new InstancedPool(leafMesh)
    leafPool.hideAll()
}

export abstract class Pool<T> {
    available: T[] = []
    objects: T[] = []

    constructor(objects: T[]) {
        this.objects = objects
        this.available.push(...objects)
    }

    hideAll() {
        this.objects.forEach(o => {
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

export type PooledInstance = {
    index: number
}

const dummyMatrix = new THREE.Matrix4()

class InstancedPool extends Pool<PooledInstance> {
    mesh: THREE.InstancedMesh

    constructor(mesh: THREE.InstancedMesh) {
        const instances: PooledInstance[] = []
        
        for (let i = 0; i < mesh.count; i++) {
            instances[i] = {
                index: i
            }
        }
        
        super(instances)
        this.mesh = mesh
    }

    protected prepare(item: PooledInstance): void {
        dummyMatrix.identity()
        this.mesh.setMatrixAt(item.index, dummyMatrix)
        this.mesh.instanceMatrix.needsUpdate = true
    }

    protected hide(item: PooledInstance): void {
        dummyMatrix.setPosition(0, -69420, 0)
        this.mesh.setMatrixAt(item.index, dummyMatrix)
        this.mesh.instanceMatrix.needsUpdate = true
    }
}