import { Object3D, Vector3 } from "three";
import { THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { generateSunflowerArrangement } from "./arrangement";
import { Connection } from "./connection";
import type { IDisposable } from "./disposable";
import { VisualNode } from "./visual_node";

export class VisualDirectory implements IDisposable {
    directoryNode: DirectoryNode
    content: Object3D
    parent: Object3D

    connections: Record<string, Connection> = {}
    visualNodes: Record<string, VisualNode> = {}
    disposables: IDisposable[] = []
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

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const key = entry[0]

            const endPoint = o.position
            const endNormal = new THREE.Vector3().addScaledVector(o.normal, -0.5)

            const connection = new Connection(this.content, startPoint, startNormal, endPoint, endNormal)
            this.connections[key] = connection
            this.disposables.push(connection)

            const visualNode = new VisualNode(key, this.content, o.position, o.normal)
            this.visualNodes[key] = visualNode
            this.disposables.push(visualNode)

            visualNode.interactable.onClick.subscribe(() => this.onNodeClicked.invoke(key))
            visualNode.interactable.onHoverStart.subscribe(() => visualNode.label.textMesh?.scale.setScalar(1.2))
            visualNode.interactable.onHoverEnd.subscribe(() => visualNode.label.textMesh?.scale.setScalar(1.0))
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