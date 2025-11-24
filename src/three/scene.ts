import { THREE } from "./deps";
import { scene } from "./main";

export function initScene() {
    const geometry = new THREE.BoxGeometry();
    geometry.rotateY(45)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

    const mesh = new THREE.Mesh(geometry, material);

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(10, 2, 0)

    scene.add(mesh);
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.05))
}