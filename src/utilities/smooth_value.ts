import { lerp } from "three/src/math/MathUtils.js"
import { THREE } from "../deps"

export class SmoothNumber {
    private currentVal: number
    private targetVal: number
    rate: number

    constructor(value: number, rate = 3) {
        this.currentVal = value
        this.targetVal = value
        this.rate = rate
    }

    get current() {
        return this.currentVal
    }

    get target() {
        return this.targetVal
    }

    set target(value: number) {
        this.set(value)
    }

    set(value: number): SmoothNumber {
        this.targetVal = value
        return this
    }

    setImmediate(value: number): SmoothNumber {
        this.targetVal = value
        this.currentVal = value
        return this
    }

    step(deltaTime: number) {
        const t = Math.exp(-this.rate * deltaTime)
        this.currentVal = lerp(this.targetVal, this.currentVal, t)
    }
}

export class SmoothVec3 {
    private x: SmoothNumber
    private y: SmoothNumber
    private z: SmoothNumber
    readonly current = new THREE.Vector3()

    constructor(x = 0, y = 0, z = 0, rate = 3) {
        this.x = new SmoothNumber(x, rate)
        this.y = new SmoothNumber(y, rate)
        this.z = new SmoothNumber(z, rate)
        this.updateCurrent()
    }

    step(deltaTime: number) {
        this.x.step(deltaTime)
        this.y.step(deltaTime)
        this.z.step(deltaTime)
        this.updateCurrent()
    }

    private updateCurrent() {
        this.current.set(this.x.current, this.y.current, this.z.current)
    }

    set(x: number, y: number, z: number): SmoothVec3 {
        this.x.set(x)
        this.y.set(y)
        this.z.set(z)
        this.updateCurrent()
        return this
    }

    copy(vector: THREE.Vector3): SmoothVec3 {
        this.x.set(vector.x)
        this.y.set(vector.y)
        this.z.set(vector.z)
        this.updateCurrent()
        return this
    }

    copyImmediate(vector: THREE.Vector3): SmoothVec3 {
        this.x.setImmediate(vector.x)
        this.y.setImmediate(vector.y)
        this.z.setImmediate(vector.z)
        this.updateCurrent()
        return this
    }
}