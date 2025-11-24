import { FontLoader, TextGeometry, THREE } from "./deps";
import { scene } from "./main";

export async function initScene() {
    const loader = new FontLoader()
    const font = await loader.loadAsync('helvetiker_regular.typeface.json')

    const textMaterial = new THREE.MeshPhongMaterial({ color: 'red'})
    const textGeometry = new TextGeometry('Hello!', {
        font: font,
        size: 0.5,
        depth: 0.1,
    })

    for (let z = 0; z >= -100; z -= 2) {
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textMesh.position.set(0, 0, z)
        textMesh.rotateZ(z * 0.04)
        scene.add(textMesh)
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
}