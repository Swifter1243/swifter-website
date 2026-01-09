import { THREE } from "../../deps";
import { Interactable } from "./interactable";
import { scene } from "./main";

export async function initScene() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.setRotationFromEuler(new THREE.Euler(0, 20, 0))

    const interactableA = new Interactable(1)
    interactableA.onClick.subscribe(() => console.log("interactable A clicked"))
    interactableA.onHoverStart.subscribe(() => console.log("interactable A hover start"))
    interactableA.onHoverEnd.subscribe(() => console.log("interactable A hover end"))

    const interactableB = new Interactable(1)
    interactableB.onClick.subscribe(() => console.log("interactable B clicked"))
    interactableB.onHoverStart.subscribe(() => console.log("interactable B hover start"))
    interactableB.onHoverEnd.subscribe(() => console.log("interactable B hover end"))

    scene.add(interactableA.mesh)
    scene.add(interactableB.mesh)
    interactableB.mesh.position.y = 1

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    scene.add(dirLight)
}