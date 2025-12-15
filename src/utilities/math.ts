export function lerp(a: number, b: number, t: number) {
    return a * t + b * (1 - t)
}

export function randomRange(min: number, max: number) {
    return lerp(min, max, Math.random())
}