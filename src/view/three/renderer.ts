import { EffectComposer, OutputPass, RenderPass, THREE, UnrealBloomPass } from "../../deps";
import { camera, renderer, scene } from "./main";
import { Invokable } from "../../utilities/invokable";
import { onResize } from "../window";

export const onRender = new Invokable<[number]>();

export function initRenderer() {
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop(render);

    document.getElementById('three')!.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer)

    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.5, 0.2))
    composer.addPass(new OutputPass())
    
    const clock = new THREE.Clock()
    
    function render() {
      composer.render()
      const deltaTime = clock.getDelta()
      onRender.invoke(deltaTime)
    }

    onResize.subscribe(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight)
    })
}