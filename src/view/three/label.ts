import { camera } from "./main";
import { THREE } from "../../deps";
import { onRender } from "./renderer";
import type { IDisposable } from "./disposable";
import { Text } from "troika-three-text";

export class Label implements IDisposable {
    content: THREE.Object3D
    textObject: Text
    readonly parent: THREE.Object3D

    constructor(parent: THREE.Object3D, text: string, size = 1) {
        this.parent = parent

        this.content = new THREE.Object3D()
        parent.add(this.content)

        this.textObject = new Text()
        this.textObject.text = text
        this.textObject.font = '/pala.ttf'
        this.textObject.fontSize = size
        this.textObject.anchorX = 'center';
        this.textObject.anchorY = 'middle';
        this.textObject.textAlign = 'center'
        this.textObject.color = '#31eaff'
        this.textObject.sync()
        this.content.add(this.textObject)

        onRender.subscribe(() => this.update())
    }

    private update() {
        const camQ = new THREE.Quaternion()
        const parentQ = new THREE.Quaternion()

        camera.getWorldQuaternion(camQ)
        if (this.textObject.parent) {
            this.textObject.parent!.getWorldQuaternion(parentQ).invert()
            camQ.premultiply(parentQ)
            this.textObject.quaternion.copy(camQ)
        }
    }

    dispose() {
        this.textObject.dispose()
        this.content.remove(this.textObject)
        this.parent.remove(this.content)
    }
}