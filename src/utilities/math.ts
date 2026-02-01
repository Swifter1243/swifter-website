export function lerp(a: number, b: number, t: number) {
    return b * t + a * (1 - t)
}

export function inverseLerp(a: number, b: number, x: number) {
    return (x - a) / (b - a)
}

export function randomRange(min: number, max: number) {
    return lerp(min, max, Math.random())
}

export function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max)
}