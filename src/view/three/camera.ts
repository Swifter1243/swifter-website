import { camera } from "../three/main";
import { onRender } from "./renderer";
import { SmoothValue } from "../../utilities/smooth_value";
import { onPointerMove, onResize } from "./window";

const cameraRotX = new SmoothValue(0)
const cameraRotY = new SmoothValue(0)

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

    onPointerMove.subscribe(e => {
        const uvX = e.clientX / window.innerWidth
        const uvY = e.clientY / window.innerHeight

        cameraRotX.target = (uvY - 0.5) * 0.03
        cameraRotY.target = (uvX - 0.5) * 0.03
    })

    onResize.subscribe(() => {
        setCameraAspectFromWindow()
    })
}

function setCameraAspectFromWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}