import { FontLoader, THREE } from "../deps";
import { Connection } from "./connection";
import { scene } from "./main";
import { onRender } from "./renderer";

export async function initScene() {
    const startPoint = new THREE.Vector3()
    const startTangent = new THREE.Vector3(0, 1, 0)

    for (let i = 0; i < 20; i++) {
        const endDir = new THREE.Vector3(0, 1, 0).randomDirection()
        const endPoint = new THREE.Vector3().addScaledVector(endDir, 1)

        const connection = new Connection(scene, startPoint, startTangent, endPoint, endDir)
    }

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.setRotationFromEuler(new THREE.Euler(0, 20, 0))

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    scene.add(dirLight)
}