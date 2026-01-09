import { lerp } from "three/src/math/MathUtils.js"

export class SmoothValue {
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

    set(value: number) {
        this.targetVal = value
    }

    step(deltaTime: number) {
        const t = Math.exp(-this.rate * deltaTime)
        this.currentVal = lerp(this.targetVal, this.currentVal, t)
    }
}