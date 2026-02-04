import { camera } from "./main";
import { THREE } from "../../deps";
import type { IDisposable } from "./disposable";
import { Text } from "troika-three-text";
import { addUpdateable, removeUpdateable, type IUpdateable } from "./updateable";

export class Label implements IDisposable, IUpdateable {
    content: THREE.Object3D
    textObject: Text
    readonly parent: THREE.Object3D

    constructor(parent: THREE.Object3D, text: string, offset: THREE.Vector3, size = 1) {
        this.parent = parent
        addUpdateable(this)

        this.content = new THREE.Object3D()
        parent.add(this.content)

        this.textObject = new Text()
        this.textObject.text = text
        this.textObject.font = '/pala.ttf'
        this.textObject.fontSize = size
        this.textObject.anchorX = 'center';
        this.textObject.anchorY = 'middle';
        this.textObject.textAlign = 'center'
        this.textObject.color = '#9bfff7';
        this.textObject.outlineWidth = size * 0.1;
        this.textObject.outlineColor = '#000000';
        this.textObject.outlineBlur = size * 0.04;
        (this.textObject.material as unknown as { depthTest: boolean }[])[1].depthTest = false;
        this.textObject.sync();
        this.textObject.position.add(offset)
        this.content.add(this.textObject)
        this.update(0)
    }

    disable() {
        this.content.remove(this.textObject)
    }

    enable() {
        this.content.add(this.textObject)
    }

    setColor(color: THREE.ColorRepresentation) {
        this.textObject.color = color
    }

    update(_: number) {
        const camQ = new THREE.Quaternion()
        const parentQ = new THREE.Quaternion()

        camera.getWorldQuaternion(camQ)
        if (this.content.parent) {
            this.content.parent!.getWorldQuaternion(parentQ).invert()
            camQ.premultiply(parentQ)
            this.content.quaternion.copy(camQ)
        }
    }

    dispose() {
        this.textObject.dispose()
        removeUpdateable(this)
        this.content.remove(this.textObject)
        this.parent.remove(this.content)
    }
}