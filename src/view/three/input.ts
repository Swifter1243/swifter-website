import { Invokable } from "../../utilities/invokable";

export const onDragStart = new Invokable()
export const onDragEnd = new Invokable()
export const onDragMove = new Invokable()

export const onHoverStart = new Invokable()
export const onHoverEnd = new Invokable()

export const onClick = new Invokable()

export const inputState = {
    enabled: true,

    currentX: 0,
    currentY: 0,

    isPointerDown: false,
    downX: 0,
    downY: 0,

    isDragging: false,
    isHovering: false,
}

export function disableInput() {
    inputState.enabled = false
    inputState.isDragging = false
    inputState.isHovering = false
    inputState.isPointerDown = false
}

export function enableInput() {
    inputState.enabled = true
}

const DRAG_DISTANCE_THRESHOLD = 10

export function initInput() {
    document.addEventListener('pointermove', onPointerMove, false)
    document.addEventListener('pointerup', onPointerUp, false)
    document.addEventListener('pointerdown', onPointerDown, false)
    document.addEventListener('pointercancel', onPointerCancel, false)
}

function onPointerMove(e: PointerEvent) {
    if (!inputState.enabled)
        return

    inputState.currentX = e.clientX
    inputState.currentY = e.clientY

    if (e.pointerType === 'mouse' && !inputState.isHovering) {
        onHoverStart.invoke()
        inputState.isHovering = true
    }

    if (inputState.isPointerDown && !inputState.isDragging) {
        const deltaX = inputState.downX - inputState.currentX
        const deltaY = inputState.downY - inputState.currentY
        const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (dragDistance > DRAG_DISTANCE_THRESHOLD) {
            inputState.isDragging = true
            onDragStart.invoke()
        }
    }

    if (inputState.isDragging) {
        onDragMove.invoke()
    }
}

function onPointerDown(e: PointerEvent) {
    if (!inputState.enabled)
        return

    inputState.isPointerDown = true

    inputState.downX = e.clientX
    inputState.downY = e.clientY
    inputState.currentX = e.clientX
    inputState.currentY = e.clientY

    if (e.pointerType !== 'mouse' && !inputState.isHovering) {
        inputState.isHovering = true
        onHoverStart.invoke()
    }
}

function onPointerUp(e: PointerEvent) {
    if (!inputState.enabled)
        return

    if (e.pointerType !== 'mouse' && inputState.isHovering) {
        onHoverEnd.invoke()
        inputState.isHovering = false
    }

    if (!inputState.isDragging) {
        _onClick()
    }

    endPointerDown()
}

function onPointerCancel(_: PointerEvent) {
    if (!inputState.enabled)
        return

    endPointerDown()
}

function endPointerDown() {
    if (!inputState.enabled)
        return

    inputState.isPointerDown = false
    
    if (inputState.isDragging) {
        inputState.isDragging = false
        onDragEnd.invoke()
    }
}

function _onClick() {
    onClick.invoke()
}