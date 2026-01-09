import { Invokable } from "../utilities/invokable";

export const onDragStart = new Invokable()
export const onDragEnd = new Invokable()
export const onDragMove = new Invokable()

export const onHoverStart = new Invokable()
export const onHoverEnd = new Invokable()

export const onClick = new Invokable()

export const inputState = {
    currentX: 0,
    currentY: 0,

    isPointerDown: false,
    downX: 0,
    downY: 0,

    isDragging: false,
    isHovering: false,
}

const DRAG_DISTANCE_THRESHOLD = 6

export function initInput() {
    document.addEventListener('pointermove', onPointerMove, false)
    document.addEventListener('pointerup', onPointerUp, false)
    document.addEventListener('pointerdown', onPointerDown, false)
    document.addEventListener('pointercancel', onPointerCancel, false)
}

function onPointerMove(e: PointerEvent) {
    if (e.pointerType === 'mouse' && !inputState.isHovering) {
        onHoverStart.invoke()
        inputState.isHovering = true
    }

    inputState.currentX = e.clientX
    inputState.currentY = e.clientY

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
    if (e.pointerType !== 'mouse' && !inputState.isHovering) {
        inputState.isHovering = true
        onHoverStart.invoke()
    }

    inputState.downX = e.clientX
    inputState.downY = e.clientY
}

function onPointerUp(e: PointerEvent) {
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
    endPointerDown()
}

function endPointerDown() {
    inputState.isPointerDown = false
    
    if (inputState.isDragging) {
        inputState.isDragging = false
        onDragEnd.invoke()
    }
}

function _onClick() {
    onClick.invoke()
}