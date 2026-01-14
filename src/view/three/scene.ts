import { THREE } from "../../deps";
import { scene } from "./main";

export async function initScene() {
    const point = new THREE.PointLight(0xffffff, 0.2, 0.8, 1.6)
    point.position.set(0, 0.2, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.01))

    const underPoint = new THREE.PointLight(0xffffff, 0.6, 0.8, 0.4)
    underPoint.position.set(0, -0.6, 0)

    scene.add(point)
}