import { THREE } from "../../deps"
import { randomRange } from "../../utilities/math"
import { Connection } from "./connection"
import { scene } from "../three/main"

const goldenRatioSquared = Math.pow((1 + Math.sqrt(5)) / 2, 2)

function sunflowerLength(n: number) {
    return Math.sqrt(n)
}

function sunflowerTheta(n: number) {
    return (n * 2 * Math.PI) / goldenRatioSquared 
}

export function generateSunflowerArrangement(points: number) {
    const startPoint = new THREE.Vector3()
    const startTangent = new THREE.Vector3(0, 0.8, 0)

    const maxSunflowerLength = sunflowerLength(points)

    for (let i = 1; i <= points; i++) {
        const angle = sunflowerTheta(i)
        const len = sunflowerLength(i) / maxSunflowerLength

        const endDir = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(len, angle, 0, 'YXZ'))
        const endPoint = new THREE.Vector3().addScaledVector(endDir, randomRange(1.5, 1.9))
        const endTangent = new THREE.Vector3().addScaledVector(endDir, -0.5)

        const connection = new Connection(scene, startPoint, startTangent, endPoint, endTangent)
    }
}