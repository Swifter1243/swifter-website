import { Invokable } from "../../utilities/invokable";
import { getCameraScrollScalar, setCameraScrollScalar } from "./camera";

export const onDragStart = new Invokable()
export const onDragEnd = new Invokable()
export const onDragMove = new Invokable()

export const onHoverStart = new Invokable()
export const onHoverEnd = new Invokable()

export const onClick = new Invokable()

export const onZoomEnd = new Invokable()

export const inputState = {
    enabled: true,

    currentX: 0,
    currentY: 0,

    isPointerDown: false,
    downX: 0,
    downY: 0,

    isDragging: false,
    isHovering: false,

    isZooming: false,
    initialZoomDistance: 0,
    initialZoomScalar: 1
}

export function disableInput() {
    inputState.enabled = false
    inputState.isDragging = false
    inputState.isHovering = false
    inputState.isPointerDown = false
    inputState.isZooming = false
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
    document.addEventListener('wheel', onWheel, false)
    document.addEventListener('touchstart', onTouchStart, false)
    document.addEventListener('touchmove', onTouchMove, false)
    document.addEventListener('touchend', onTouchEnd, false)
}

function onPointerMove(e: PointerEvent) {
    if (!inputState.enabled || inputState.isZooming)
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
    if (!inputState.enabled || inputState.isZooming)
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
    if (!inputState.enabled || inputState.isZooming)
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
    if (!inputState.enabled || inputState.isZooming)
        return

    endPointerDown()
}

function onWheel(e: WheelEvent) {
    if (!inputState.enabled)
        return

    const SCROLL_SPEED = 0.001
    const delta = e.deltaY * SCROLL_SPEED

    setCameraScrollScalar(getCameraScrollScalar() + delta) 
    onZoomEnd.invoke()
}

function onTouchStart(e: TouchEvent) {
    if (!inputState.enabled)
        return

    if (e.touches.length === 2) {
        inputState.initialZoomDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        )
        
        inputState.initialZoomScalar = getCameraScrollScalar()
        endPointerDown()
        inputState.isZooming = true
    }
}

function onTouchMove(e: TouchEvent) {
    if (!inputState.enabled)
        return

    if (e.touches.length === 2) {
        const zoomDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        )

        const ZOOM_SPEED = 0.003
        const delta = (inputState.initialZoomDistance - zoomDistance) * ZOOM_SPEED

        setCameraScrollScalar(inputState.initialZoomScalar + delta)
    }
}

function onTouchEnd(e: TouchEvent) {
    if (e.touches.length === 0 && inputState.isZooming) {
        inputState.isZooming = false
        onZoomEnd.invoke()
    }
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