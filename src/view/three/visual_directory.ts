import { THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { SmoothVec3 } from "../../utilities/smooth_value";
import { generateSunflowerArrangement } from "./arrangement";
import { Connection } from "./connection";
import type { IDisposable } from "./disposable";
import { onRender } from "./renderer";
import { VisualNode } from "./visual_node";

export class VisualDirectory implements IDisposable {
    directoryNode: DirectoryNode
    content: THREE.Object3D
    parent: THREE.Object3D

    connections: Record<string, Connection> = {}
    visualNodes: Record<string, VisualNode> = {}
    disposables: IDisposable[] = []
    onNodeClicked = new Invokable<[string]>()
    startNormal = new SmoothVec3(0, 0.8, 0) 

    stepFunction: (deltaTime: number) => void

    constructor(directoryNode: DirectoryNode, parent: THREE.Object3D) {
        this.directoryNode = directoryNode
        this.content = new THREE.Object3D()
        this.parent = parent
        parent.add(this.content)

        this.generateObjects()

        this.stepFunction = (deltaTime) => this.step(deltaTime)
        onRender.subscribe(this.stepFunction)
    }

    private generateObjects() {
        const nodeEntries = Object.entries(this.directoryNode.nodes)
        const objects = generateSunflowerArrangement(nodeEntries.length)

        const startPoint = new THREE.Vector3()

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const key = entry[0]

            const endPoint = new THREE.Vector3()
            const endNormal = new THREE.Vector3().addScaledVector(o.normal, -0.5)

            const connection = new Connection(this.content, startPoint, this.startNormal.current, endPoint, endNormal)
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

    step(deltaTime: number): void {
        this.startNormal.step(deltaTime)

        Object.entries(this.visualNodes).forEach(entry => {
            const key = entry[0]
            const visualNode = entry[1]
            const connection = this.connections[key]

            visualNode.step(deltaTime)
            connection.step()
            connection.endPoint.copy(visualNode.smoothedPosition.current)
        })
    }

    getWorldCenter(): THREE.Vector3 {
        const localPos = new THREE.Vector3(0, 1, 0)
        const worldPos = this.content.localToWorld(localPos)
        return worldPos
    }

    dispose() {
        this.disposables.forEach(disposable => {
            disposable.dispose()
        }) 

        this.parent.remove(this.content)
        onRender.unsubscribe(this.stepFunction)
    }
}