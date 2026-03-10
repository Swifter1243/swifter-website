import { camera, scene } from "../three/main";
import { onRender } from "./renderer";
import { SmoothNumber, SmoothVec3 } from "../../utilities/smooth_value";
import { inputState, onDragMove, onDragStart } from "./input";
import { THREE } from "../../deps";
import { clamp } from "../../utilities/math";

const cameraRotX = new SmoothNumber(0, 7)
const cameraRotY = new SmoothNumber(0, 7)
const cameraDistance = new SmoothNumber(3)
const cameraScrollScalar = new SmoothNumber(1, 8)

const CAMERA_SCROLL_SCALAR_MIN = 0.3
const CAMERA_SCROLL_SCALAR_MAX = 1.4

export type CameraPivot = {
    object: THREE.Object3D,
    distance: number
}

const pivotPos = new SmoothVec3(0, 0, 0, 5)
export let cameraPivot: CameraPivot | undefined = undefined

export function setCameraPivot(pivot?: CameraPivot) {
    cameraPivot = pivot
}

export function setCameraDistance(distance: number) {
    cameraDistance.set(distance)
}

export function setCameraScrollScalar(scalar: number) {
    const newScalar = clamp(scalar, CAMERA_SCROLL_SCALAR_MIN, CAMERA_SCROLL_SCALAR_MAX)
    cameraScrollScalar.set(newScalar)
}

export function getCameraScrollScalar(): number {
    return cameraScrollScalar.target
}

let downRotX = 0
let downRotY = 0

export function initCamera() {
    const pivot = new THREE.Object3D()
    pivot.rotation.order = 'YXZ'
    scene.add(pivot)

    pivot.add(camera)
    camera.position.set(0, 0, cameraDistance.current)
    camera.fov = 40
    camera.near = 0.1
    camera.far = 1000

    const pivotWorldPos = new THREE.Vector3()
    onRender.subscribe(deltaTime => {
        cameraRotY.target += deltaTime * 0.05

        cameraRotX.update(deltaTime)
        cameraRotY.update(deltaTime)
        cameraDistance.update(deltaTime)
        cameraScrollScalar.update(deltaTime)
        pivotPos.update(deltaTime)

        if (cameraPivot) {
            cameraPivot.object.getWorldPosition(pivotWorldPos)
            pivotPos.copy(pivotWorldPos)
            cameraDistance.set(cameraPivot.distance)
        } else {
            pivotPos.set(0, 0, 0)
            cameraDistance.set(3)
        }

        pivot.position.copy(pivotPos.current)
        pivot.rotation.x = cameraRotX.current
        pivot.rotation.y = cameraRotY.current
        camera.position.set(0, 0, cameraDistance.current * cameraScrollScalar.current)
    })

    onDragStart.subscribe(() => {
        downRotX = cameraRotX.target
        downRotY = cameraRotY.target
    })

    onDragMove.subscribe(() => {
        const downUVX = (inputState.downX / window.innerWidth) * 2 - 1
        const downUVY = (inputState.downY / window.innerHeight) * 2 - 1

        const currentUVX = (inputState.currentX / window.innerWidth) * 2 - 1
        const currentUVY = (inputState.currentY / window.innerHeight) * 2 - 1

        const deltaUVX = currentUVX - downUVX
        const deltaUVY = currentUVY - downUVY

        const aspect = window.innerWidth / window.innerHeight

        const CAMERA_CLAMP_VERTICAL = Math.PI / 4
        cameraRotX.target = clamp(downRotX + deltaUVY * -2, -CAMERA_CLAMP_VERTICAL, CAMERA_CLAMP_VERTICAL) // vertical
        cameraRotY.target = downRotY + deltaUVX * -2 * aspect // horizontal
    })
}