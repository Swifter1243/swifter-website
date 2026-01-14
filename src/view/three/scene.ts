import { THREE } from "../../deps";
import { scene } from "./main";

export async function initScene() {
    const point = new THREE.PointLight('#feffac', 0.6, 0.8, 1.6)
    point.position.set(0, 0.2, 0)

    scene.add(point)
}