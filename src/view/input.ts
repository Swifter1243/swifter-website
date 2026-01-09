import { THREE } from "../deps";
import { Interactable, interactables } from "./three/interactable";
import { camera } from "./three/main";
import { onRender } from "./three/renderer";

export function initInput() {
    const raycaster = new THREE.Raycaster()

    document.addEventListener('click', onClick, false)
    document.addEventListener('touchend', onTouch, false)
    
    function onClick(event: MouseEvent) {
        console.log('clicked')

        const interactable = doRaycast(event.clientX, event.clientY)

        if (interactable !== undefined)
            interactable.onClick.invoke()
    }

    function onTouch(event: TouchEvent) {
        if (event.changedTouches.length <= 0)
            return

        const touch = event.changedTouches[0]
        const interactable = doRaycast(touch.clientX, touch.clientY)

        if (interactable !== undefined)
            interactable.onClick.invoke()
    }

    function doRaycast(clientX: number, clientY: number): Interactable | undefined {
        const uvX = (clientX / window.innerWidth) * 2 - 1
        const uvY = -(clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(new THREE.Vector2(uvX, uvY), camera)

        const result = raycaster.intersectObjects([...interactables.keys()], false)

        if (result.length > 0) {
            const interactable = interactables.get(result[0].object)
            return interactable
        }
    }
}