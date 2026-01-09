import { THREE } from "../../deps"
import { randomRange } from "../../utilities/math"

const goldenRatioSquared = Math.pow((1 + Math.sqrt(5)) / 2, 2)

function sunflowerLength(n: number) {
    return Math.sqrt(n)
}

function sunflowerTheta(n: number) {
    return (n * 2 * Math.PI) / goldenRatioSquared 
}

type ArrangedObject = {
    position: THREE.Vector3,
    normal: THREE.Vector3
}

export function generateSunflowerArrangement(points: number): ArrangedObject[] {
    const resultPoints: ArrangedObject[] = []
    
    const maxSunflowerLength = sunflowerLength(points)
    for (let i = 1; i <= points; i++) {
        const angle = sunflowerTheta(i)
        const len = sunflowerLength(i) / maxSunflowerLength

        const normal = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(len, angle, 0, 'YXZ'))
        const position = new THREE.Vector3().addScaledVector(normal, randomRange(1.5, 1.9))

        resultPoints.push({
            normal,
            position
        })
    }

    return resultPoints
}