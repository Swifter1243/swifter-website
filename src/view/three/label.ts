import { Mesh, Object3D, type Scene } from "three";
import { camera, font } from "./main";
import { TextGeometry, THREE } from "../../deps";
import { onRender } from "./renderer";

const textMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' })

export class Label {
    parent: Object3D
    textMesh?: Mesh

    constructor(scene: Scene, text: string) {
        this.parent = new Object3D()
        scene.add(this.parent)

        font.then(f => {
            const textGeometry = new TextGeometry(text, {
                font: f,
                size: 0.08,
                depth: 0.01,
            })
            textGeometry.computeBoundingBox()
            textGeometry.center()
            this.textMesh = new THREE.Mesh(textGeometry, textMaterial)

            scene.add(this.textMesh)
            this.parent.add(this.textMesh)
        })

        onRender.subscribe(() => this.update())
    }

    private update() {
        if (this.textMesh) {
            const target = new THREE.Vector3()
            camera.getWorldPosition(target)
            this.textMesh.lookAt(target)
        }
    }
}