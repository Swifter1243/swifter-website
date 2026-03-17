import { OutputPass, RenderPass, THREE, UnrealBloomPass } from "../../deps";
import {camera, composer, renderer, scene} from "./main";
import { Invokable } from "../../utilities/invokable";
import { onWindowResize } from "./window";

export const onRender = new Invokable<[number]>();

export let unrealBloomPass: UnrealBloomPass

export function initRenderer() {
    renderer.setAnimationLoop(render);

    document.getElementById('three')!.appendChild(renderer.domElement);

    unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.1, 0.2)

    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(unrealBloomPass)
    composer.addPass(new OutputPass())
    
    const clock = new THREE.Clock()

    document.addEventListener('visibilitychange', () => {
        clock.running = document.visibilityState === 'visible'
    })

    updateSize()
    onWindowResize.subscribe(updateSize)

    function updateSize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        unrealBloomPass.setSize(w, h)
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        composer.setSize(w, h)
        composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    
    function render() {
        composer.render()
        const deltaTime = clock.getDelta()
        onRender.invoke(deltaTime)
    }
}