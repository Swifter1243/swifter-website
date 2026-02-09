import { EffectComposer, OutputPass, RenderPass, THREE, UnrealBloomPass } from "../../deps";
import { camera, renderer, scene } from "./main";
import { Invokable } from "../../utilities/invokable";

export const onRender = new Invokable<[number]>();

export const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.1, 0.2)

export function initRenderer() {
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop(render);

    document.getElementById('three')!.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer)

    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(unrealBloomPass)
    composer.addPass(new OutputPass())
    
    const clock = new THREE.Clock()

    document.addEventListener('visibilitychange', () => {
        clock.running = document.visibilityState === 'visible'
    })
    
    function render() {
        composer.render()
        const deltaTime = clock.getDelta()
        onRender.invoke(deltaTime)
    }
}