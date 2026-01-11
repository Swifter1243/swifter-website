import { camera, scene } from "../three/main";
import { onRender } from "./renderer";
import { SmoothNumber, SmoothVec3 } from "../../utilities/smooth_value";
import { inputState, onDragMove, onDragStart } from "../input";
import { THREE } from "../../deps";
import { clamp } from "../../utilities/math";

const cameraRotX = new SmoothNumber(0, 7)
const cameraRotY = new SmoothNumber(0, 7)

const pivotPos = new SmoothVec3(0, 0, 0, 5)
export let pivotObject: THREE.Object3D | undefined = undefined

export function setPivotObject(object?: THREE.Object3D) {
    pivotObject = object
}

let downRotX = 0
let downRotY = 0

export function initCamera() {
    const pivot = new THREE.Object3D()
    pivot.rotation.order = 'YXZ'
    scene.add(pivot)

    pivot.add(camera)
    camera.position.set(0, 0, 5)

    camera.fov = 40
    camera.far = 100

    const pivotWorldPos = new THREE.Vector3()
    onRender.subscribe(deltaTime => {
        cameraRotY.target += deltaTime * 0.05

        cameraRotX.step(deltaTime)
        cameraRotY.step(deltaTime)
        pivotPos.step(deltaTime)

        if (pivotObject) {
            pivotObject?.getWorldPosition(pivotWorldPos)
            pivotPos.copy(pivotWorldPos)
        } else {
            pivotPos.set(0, 0, 0)
        }

        pivot.position.copy(pivotPos.current)
        pivot.rotation.x = cameraRotX.current
        pivot.rotation.y = cameraRotY.current
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

        cameraRotX.target = clamp(downRotX + deltaUVY * -2, -Math.PI / 2, Math.PI / 2) // vertical
        cameraRotY.target = downRotY + deltaUVX * -2 * aspect // horizontal
    })
}