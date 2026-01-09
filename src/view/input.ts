import { THREE } from "../deps";
import { Invokable } from "../utilities/invokable";
import { Interactable, interactables } from "./three/interactable";
import { camera } from "./three/main";
import { onRender } from "./three/renderer";

export const onDragStart = new Invokable()
export const onDragEnd = new Invokable()
export const onDragMove = new Invokable()

let currentX = 0
let currentY = 0

let isPointerDown = false
let downX = 0
let downY = 0

let isDragging = false
let isHovering = false

const DRAG_DISTANCE_THRESHOLD = 6

const raycaster = new THREE.Raycaster()

export function initInput() {
    document.addEventListener('pointermove', onPointerMove, false)
    document.addEventListener('pointerup', onPointerUp, false)
    document.addEventListener('pointerdown', onPointerDown, false)
    document.addEventListener('pointercancel', onPointerCancel, false)
    onRender.subscribe(onHoverUpdate)
}

function onPointerMove(e: PointerEvent) {
    if (e.pointerType === 'mouse') {
        isHovering = true
    }

    currentX = e.clientX
    currentY = e.clientY

    if (isPointerDown && !isDragging) {
        const deltaX = downX - currentX
        const deltaY = downY - currentY
        const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (dragDistance > DRAG_DISTANCE_THRESHOLD) {
            isDragging = true
            onDragStart.invoke()
        }
    }

    if (isDragging) {
        onDragMove.invoke()
    }
}

function onPointerDown(e: PointerEvent) {
    if (e.pointerType !== 'mouse') {
        isHovering = true
    }

    downX = e.clientX
    downY = e.clientY
}

function onPointerUp(e: PointerEvent) {
    if (e.pointerType !== 'mouse') {
        isHovering = false
    }

    if (!isDragging) {
        onClick()
    }

    endPointerDown()
}

function onPointerCancel(_: PointerEvent) {
    endPointerDown()
}

function endPointerDown() {
    isPointerDown = false
    
    if (isDragging) {
        isDragging = false
        onDragEnd.invoke()
    }
}

function onClick() {
    const interactable = doRaycast(currentX, currentY)

    if (interactable !== undefined) {
        interactable.onClick.invoke()
    }
}

function onHoverUpdate() {
    if (!isHovering)
        return

    const interactable = doRaycast(currentX, currentY)

    if (interactable !== undefined) {
        interactable.onHover.invoke()
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