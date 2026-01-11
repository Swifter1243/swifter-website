import { THREE } from "../deps";
import { camera, composer, renderer } from "./three/main";
import { unrealBloomPass } from "./three/renderer";

export function initWindow() {
    onResize()
    window.onresize = onResize
}

const SAFE_ASPECT = 1; // 1:1 safe zone
const BASE_FOV = 40;

function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const aspect = w / h;

    if (aspect >= SAFE_ASPECT) {
        // wide screen → vertical FOV is constant
        camera.fov = BASE_FOV;
        camera.aspect = aspect;
    } else {
        // tall screen → horizontal FOV is constant
        const hFov = 2 * Math.atan(
            Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)) * SAFE_ASPECT
        );

        camera.fov = THREE.MathUtils.radToDeg(
            2 * Math.atan(
                Math.tan(hFov / 2) / aspect
            )
        );

        camera.aspect = aspect;
    }

    camera.updateProjectionMatrix();
    unrealBloomPass.setSize(w, h)
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(w, h)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}