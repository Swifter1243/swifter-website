import { Object3D, Vector3 } from "three";
import { THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { generateSunflowerArrangement, type ArrangedObject } from "./arrangement";
import { Connection } from "./connection";
import { Interactable } from "./interactable";
import { Label } from "./label";
import type { IDisposable } from "./disposable";

export class VisualDirectory implements IDisposable {
    directoryNode: DirectoryNode
    content: Object3D
    parent: Object3D

    connections: Record<string, Connection> = {}
    disposables: IDisposable[] = []
    arrangedObjects: Record<string, ArrangedObject> = {} 
    onNodeClicked = new Invokable<[string]>()

    constructor(directoryNode: DirectoryNode, parent: Object3D) {
        this.directoryNode = directoryNode
        this.content = new Object3D()
        this.parent = parent
        parent.add(this.content)

        this.generateObjects()
    }

    private generateObjects() {
        const nodeEntries = Object.entries(this.directoryNode.nodes)
        const objects = generateSunflowerArrangement(nodeEntries.length)

        const startPoint = new THREE.Vector3()
        const startNormal = new THREE.Vector3(0, 0.8, 0)

        const textOffset = new THREE.Vector3(0, 0.1, 0)

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const key = entry[0]
            this.arrangedObjects[key] = o

            const endPoint = o.position
            const endNormal = new THREE.Vector3().addScaledVector(o.normal, -0.5)

            const connection = new Connection(this.content, startPoint, startNormal, endPoint, endNormal)
            this.connections[key] = connection
            this.disposables.push(connection)
            this.content.add(connection.mesh)

            const label = new Label(this.content, key)
            label.content.position.copy(endPoint).add(textOffset)
            this.disposables.push(label)
            this.content.add(label.content)

            const interactable = new Interactable(0.1, this.content)
            interactable.onClick.subscribe(() => this.onNodeClicked.invoke(key))
            interactable.mesh.position.copy(endPoint)
            this.disposables.push(interactable)
            this.content.add(interactable.mesh)
        })
    }

    getWorldCenter(): Vector3 {
        const localPos = new THREE.Vector3(0, 1, 0)
        const worldPos = this.content.localToWorld(localPos)
        return worldPos
    }

    dispose() {
        this.disposables.forEach(disposable => {
            disposable.dispose()
        }) 

        this.parent.remove(this.content)
    }
}