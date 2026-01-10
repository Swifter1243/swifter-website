import { THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { randomRange } from "../../utilities/math";
import { SmoothNumber, SmoothVec3 } from "../../utilities/smooth_value";
import { generateSunflowerArrangement } from "./arrangement";
import { Connection } from "./connection";
import type { IDisposable } from "./disposable";
import { onRender } from "./renderer";
import { VisualNode } from "./visual_node";

let time = 0

export class VisualDirectory implements IDisposable {
    directoryNode: DirectoryNode
    content: THREE.Object3D
    parent: THREE.Object3D
    pivot: THREE.Object3D

    connections: Record<string, Connection> = {}
    visualNodes: Record<string, VisualNode> = {}
    disposables: IDisposable[] = []
    onNodeClicked = new Invokable<[string]>()
    startNormal = new SmoothVec3(0, 0.8, 0, 0.2)
    endNormals: Record<string, SmoothVec3> = {}
    breezeOffsets: Record<string, number> = {}

    breezeAmount = new SmoothNumber(0.05, 2)

    stepFunction: (deltaTime: number) => void

    constructor(directoryNode: DirectoryNode, parent: THREE.Object3D) {
        this.directoryNode = directoryNode
        this.content = new THREE.Object3D()
        this.pivot = new THREE.Object3D()
        this.pivot.position.set(0, 1, 0)
        this.parent = parent
        parent.add(this.content)
        this.content.add(this.pivot)

        this.generateObjects()

        this.stepFunction = (deltaTime) => this.step(deltaTime)
        onRender.subscribe(this.stepFunction)
    }

    private generateObjects() {
        const nodeEntries = Object.entries(this.directoryNode.nodes)
        const objects = generateSunflowerArrangement(nodeEntries.length)

        const startPoint = new THREE.Vector3()

        let nextBreezeOffset = 0

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const key = entry[0]

            this.breezeOffsets[key] = nextBreezeOffset
            nextBreezeOffset += randomRange(0.3, 0.8)

            const endPoint = new THREE.Vector3()
            const endNormal = new SmoothVec3(0, 0, 0, 0.5)
            endNormal.copyImmediate(new THREE.Vector3().addScaledVector(o.normal, -0.1))
            endNormal.copy(new THREE.Vector3().addScaledVector(o.normal, -0.5))
            this.endNormals[key] = endNormal

            const connection = new Connection(this.content, startPoint, this.startNormal.current, endPoint, endNormal.current)
            this.connections[key] = connection
            this.disposables.push(connection)

            const visualNode = new VisualNode(entry[1].name, this.content, o.position, o.normal)
            this.visualNodes[key] = visualNode
            this.disposables.push(visualNode)

            visualNode.interactable.onClick.subscribe(() => this.onNodeClicked.invoke(key))
            visualNode.interactable.onHoverStart.subscribe(() => visualNode.label.textMesh?.scale.setScalar(1.2))
            visualNode.interactable.onHoverEnd.subscribe(() => visualNode.label.textMesh?.scale.setScalar(1.0))
        })
    }

    step(deltaTime: number): void {
        this.startNormal.step(deltaTime)
        this.breezeAmount.step(deltaTime)

        time += deltaTime

        Object.entries(this.visualNodes).forEach(entry => {
            const key = entry[0]
            const visualNode = entry[1]
            const connection = this.connections[key]
            const endNormal = this.endNormals[key]

            visualNode.step(deltaTime)
            endNormal.step(deltaTime)
            connection.step()
            connection.endPoint.copy(visualNode.smoothedPosition.current)

            const t = time + this.breezeOffsets[key] * 3

            const newPosition = new THREE.Vector3(Math.sin(t), Math.cos(t * 0.283), Math.cos(t * 0.86))
            newPosition.multiplyScalar(this.breezeAmount.current)
            newPosition.add(visualNode.position)

            visualNode.smoothedPosition.copy(newPosition)
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

        this.content.remove(this.pivot)
        this.parent.remove(this.content)
        onRender.unsubscribe(this.stepFunction)
    }
}