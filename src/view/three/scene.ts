import { THREE } from "../../deps";
import { Interactable } from "./interactable";
import { scene } from "./main";

export async function initScene() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.setRotationFromEuler(new THREE.Euler(0, 20, 0))

    const interactableA = new Interactable(1)
    const interactableB = new Interactable(1)

    scene.add(interactableA.mesh)
    scene.add(interactableB.mesh)
    interactableB.mesh.position.y = 1

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    scene.add(dirLight)
}