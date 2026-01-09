import { camera } from "../three/main";
import { onRender } from "./renderer";
import { SmoothValue } from "../../utilities/smooth_value";
import { onResize } from "../window";
import { inputState, onDragMove, onDragStart } from "../input";

const cameraRotX = new SmoothValue(0, 7)
const cameraRotY = new SmoothValue(0, 7)

let downRotX = 0
let downRotY = 0

export function initCamera() {
    camera.position.set(0, 1, 5)
    camera.fov = 40
    camera.far = 100
    setCameraAspectFromWindow()

    onRender.subscribe(deltaTime => {
        cameraRotX.step(deltaTime)
        cameraRotY.step(deltaTime)

        camera.rotation.x = cameraRotX.current
        camera.rotation.y = cameraRotY.current
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

        cameraRotX.target = downRotX + deltaUVY * 0.7 // vertical
        cameraRotY.target = downRotY + deltaUVX * 1.3 // horizontal
    })

    onResize.subscribe(() => {
        setCameraAspectFromWindow()
    })
}

function setCameraAspectFromWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}