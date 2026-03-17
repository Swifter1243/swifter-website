import { THREE } from "../../deps.ts";
import { Invokable } from "../../utilities/invokable.ts";
import { camera } from "./main.ts";

export function initWindow() {
    onResize()
    window.onresize = onResize
}
export const onWindowResize = new Invokable<[number, number]>()

const SAFE_ASPECT = 0.9; // 1:1 safe zone
const BASE_FOV = 37;

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
    onWindowResize.invoke(w, h)
}