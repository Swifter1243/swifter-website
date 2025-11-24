import { THREE } from "./deps";
import { camera, renderer, scene } from "./main";
import { Invokable } from "../utilities/invokable";
import { onResize } from "./window";

export const onRender = new Invokable<[number]>();

export function initRenderer() {
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop(render);
    document.body.appendChild(renderer.domElement);
    
    const clock = new THREE.Clock()
    
    function render() {
      renderer.render(scene, camera);
      const deltaTime = clock.getDelta()
      onRender.invoke(deltaTime)
    }

    onResize.subscribe(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    })
}