import { Mesh, Object3D } from "three";
import { camera, font } from "./main";
import { TextGeometry, THREE } from "../../deps";
import { onRender } from "./renderer";
import type { IDisposable } from "./disposable";

const textMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' })

export class Label implements IDisposable {
    content: Object3D
    textMesh?: Mesh
    textGeometry?: TextGeometry
    readonly parent: Object3D

    constructor(parent: Object3D, text: string) {
        this.parent = parent

        this.content = new Object3D()
        parent.add(this.content)

        font.then(f => {
            this.textGeometry = new TextGeometry(text, {
                font: f,
                size: 0.08,
                depth: 0.01,
            })
            this.textGeometry.computeBoundingBox()
            this.textGeometry.center()
            this.textMesh = new THREE.Mesh(this.textGeometry, textMaterial)

            parent.add(this.textMesh)
            this.content.add(this.textMesh)
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

    dispose() {
        if (this.textMesh)
            this.content.remove(this.textMesh)

        if (this.textGeometry)
            this.textGeometry.dispose()

        this.parent.remove(this.content)
    }
}