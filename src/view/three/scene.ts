import { THREE } from "../../deps";
import { Interactable } from "./interactable";
import { scene } from "./main";

export async function initScene() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.setRotationFromEuler(new THREE.Euler(0, 20, 0))

    const interactableA = new Interactable(1)
    interactableA.onClick.subscribe(() => console.log("interactable A clicked"))

    scene.add(interactableA.mesh)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    scene.add(dirLight)
}