import { Object3D } from "three";
import { THREE } from "../../deps";
import { Invokable } from "../../utilities/invokable";
import { onRender } from "./renderer";
import { inputState, onClick, onHoverEnd } from "../input";
import { camera } from "./main";
import type { IDisposable } from "./disposable";

const interactables = new Map<Object3D, Interactable>()
let hoveredInteractable: Interactable | undefined = undefined

const raycaster = new THREE.Raycaster()

export class Interactable implements IDisposable {
    mesh: THREE.Mesh
    parent: THREE.Object3D
    readonly onHoverStart = new Invokable()
    readonly onHoverEnd = new Invokable()
    readonly onClick = new Invokable()

    constructor(radius: number, parent: THREE.Object3D) {
        const geometry = new THREE.BoxGeometry(radius, radius, radius)
        this.mesh = new THREE.Mesh(geometry, undefined)
        interactables.set(this.mesh, this)

        this.parent = parent
        this.parent.add(this.mesh)
    }

    dispose() {
        interactables.delete(this.mesh)
        this.parent.remove(this.mesh)
    }
}

export function initInteractables() {
    onRender.subscribe(_onHoverUpdate)
    onClick.subscribe(_onClick)
    onHoverEnd.subscribe(_onHoverEnd)
}

function _onClick() {
    const interactable = doRaycast(inputState.currentX, inputState.currentY)

    if (interactable !== undefined) {
        interactable.onClick.invoke()
    }
}

function _onHoverUpdate() {
    if (!inputState.isHovering)
        return

    const interactable = doRaycast(inputState.currentX, inputState.currentY)

    if (interactable !== undefined) {
        if (hoveredInteractable !== interactable) {
            interactable.onHoverStart.invoke()
        }

        if (hoveredInteractable !== undefined && interactable !== hoveredInteractable) {
            clearHoveredInteractable()
        }
        
        hoveredInteractable = interactable
    }
    else {
        clearHoveredInteractable()
    }
}

function _onHoverEnd() {
    clearHoveredInteractable()
}

function clearHoveredInteractable() {
    if (hoveredInteractable !== undefined) {
        hoveredInteractable.onHoverEnd.invoke()
        hoveredInteractable = undefined
    }
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