import { camera, scene } from "../three/main";
import { onRender } from "./renderer";
import { SmoothValue } from "../../utilities/smooth_value";
import { onResize } from "../window";
import { inputState, onDragMove, onDragStart } from "../input";
import { THREE } from "../../deps";
import { clamp } from "../../utilities/math";

const cameraRotX = new SmoothValue(0, 7)
const cameraRotY = new SmoothValue(0, 7)

const pivotPosX = new SmoothValue(0, 5)
const pivotPosY = new SmoothValue(0, 5)
const pivotPosZ = new SmoothValue(0, 5)

let downRotX = 0
let downRotY = 0

export function setPivotPos(x: number, y: number, z: number) {
    pivotPosX.set(x)
    pivotPosY.set(y)
    pivotPosZ.set(z)
}

export function initCamera() {
    const pivot = new THREE.Object3D()
    pivot.rotation.order = 'YXZ'
    scene.add(pivot)

    pivot.add(camera)
    camera.position.set(0, 0, 5)

    camera.fov = 40
    camera.far = 100
    setCameraAspectFromWindow()

    onRender.subscribe(deltaTime => {
        cameraRotY.target += deltaTime * 0.05

        cameraRotX.step(deltaTime)
        cameraRotY.step(deltaTime)
        pivotPosX.step(deltaTime)
        pivotPosY.step(deltaTime)
        pivotPosZ.step(deltaTime)

        pivot.position.set(pivotPosX.current, pivotPosY.current, pivotPosZ.current)
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

    onResize.subscribe(() => {
        setCameraAspectFromWindow()
    })
}

function setCameraAspectFromWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}