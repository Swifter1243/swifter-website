import { THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { inverseLerp, lerp, randomRange } from "../../utilities/math";
import { SmoothNumber, SmoothVec3 } from "../../utilities/smooth_value";
import { generateSunflowerArrangement } from "../../utilities/arrangement";
import { Connection } from "./connection";
import type { IDisposable } from "./disposable";
import { VisualNode } from "./visual_node";
import { addUpdateable, removeUpdateable, type IUpdateable } from "./updateable";
import type { CameraPivot } from "./camera";

let time = 0

export class VisualDirectory implements IDisposable, IUpdateable {
    directoryNode: DirectoryNode
    content: THREE.Object3D
    parent: THREE.Object3D
    contentSize: number
    scalar: number
    pivotObject: THREE.Object3D
    cameraPivot: CameraPivot

    connections: Record<string, Connection> = {}
    visualNodes: Record<string, VisualNode> = {}
    disposables: IDisposable[] = []
    onNodeClicked = new Invokable<[string]>()
    startNormal = new SmoothVec3(0, 0.0001, 0, 5)
    endNormals: Record<string, SmoothVec3> = {}
    breezeOffsets: Record<string, number> = {}
    
    breezeAmount = new SmoothNumber(0.05, 2)
    currentOpenKey?: string

    constructor(directoryNode: DirectoryNode, parent: THREE.Object3D, scale: number, deltaScale: number) {
        this.directoryNode = directoryNode
        this.content = new THREE.Object3D()

        const nodeCount = Object.keys(this.directoryNode.nodes).length
        this.contentSize = Math.max(1, 1 + (nodeCount - 3) * 0.15)
        this.content.scale.setScalar(deltaScale)
        this.scalar = scale

        this.pivotObject = new THREE.Object3D()
        this.pivotObject.position.set(0, this.contentSize, 0)

        this.startNormal.copy(new THREE.Vector3(0, 0.8 * this.contentSize, 0))

        this.cameraPivot = {
            object: this.pivotObject,
            distance: this.contentSize * (5 - nodeCount * 0.1) * this.scalar
        }

        this.parent = parent
        parent.add(this.content)
        this.content.add(this.pivotObject)

        this.generateObjects()
        addUpdateable(this)
    }

    private generateObjects() {
        const nodeEntries = Object.entries(this.directoryNode.nodes)
        const objects = generateSunflowerArrangement(nodeEntries.length)

        const startPoint = new THREE.Vector3()

        let nextBreezeOffset = 0

        const maxImportance = nodeEntries
            .reduce((n, e) => Math.max(n, e[1].getImportance()), 0)

        const minImportance = nodeEntries
            .reduce((n, e) => Math.min(n, e[1].getImportance()), maxImportance)

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const key = entry[0]
            const node = entry[1]

            const relativeImportance = 
                minImportance === maxImportance ? 0.5 : inverseLerp(minImportance, maxImportance, node.getImportance())

            this.breezeOffsets[key] = nextBreezeOffset
            nextBreezeOffset += randomRange(0.3, 0.8) * this.contentSize

            const position = new THREE.Vector3().copy(o.position).multiplyScalar(this.contentSize)
            const normal = new THREE.Vector3().copy(o.position).multiplyScalar(this.contentSize)

            const endPoint = new THREE.Vector3()
            const endNormal = new SmoothVec3(0, 0, 0, 5)
            endNormal.copyImmediate(new THREE.Vector3().addScaledVector(normal, -0.001))
            endNormal.copy(new THREE.Vector3().addScaledVector(normal, -0.5))
            this.endNormals[key] = endNormal

            const connectionWidth = lerp(1, 1.5, relativeImportance) * 0.005
            const connection = new Connection(this.content, startPoint, this.startNormal.current, endPoint, endNormal.current, connectionWidth)
            this.connections[key] = connection
            this.disposables.push(connection)

            const visualNodeSize = lerp(0.5, 1.5, relativeImportance) * this.contentSize
            const visualNodeLabelSize = lerp(0.1, 0.2, relativeImportance)
            const visualNodePedals = Math.round(lerp(2, 4, relativeImportance))
            const visualNode = new VisualNode(node.name, this.content, position, o.normal, visualNodePedals, visualNodeSize, visualNodeLabelSize)
            visualNode.relativeImportance = relativeImportance
            this.visualNodes[key] = visualNode
            this.disposables.push(visualNode)

            visualNode.interactable.onClick.subscribe(() => this.onNodeClicked.invoke(key))
            visualNode.interactable.onHoverStart.subscribe(() => visualNode.label.textObject?.scale.setScalar(1.2))
            visualNode.interactable.onHoverEnd.subscribe(() => visualNode.label.textObject?.scale.setScalar(1.0))
        })
    }

    update(deltaTime: number): void {
        this.startNormal.update(deltaTime)
        this.breezeAmount.update(deltaTime)

        time += deltaTime

        Object.entries(this.visualNodes).forEach(entry => {
            const key = entry[0]
            const visualNode = entry[1]
            const connection = this.connections[key]
            const endNormal = this.endNormals[key]

            endNormal.update(deltaTime)
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

        this.content.remove(this.pivotObject)
        this.parent.remove(this.content)
        removeUpdateable(this)
    }

    openNode(key: string) {
        this.visualNodes[key].open()
        this.currentOpenKey = key

        Object.keys(this.visualNodes).forEach(k => {
            if (k !== key) {
                this.visualNodes[k].disable()
                this.connections[k].disable()
            }
        })
    }

    closeNode() {
        if (!this.currentOpenKey)
            return

        Object.keys(this.visualNodes).forEach(k => {
            if (k !== this.currentOpenKey) {
                this.visualNodes[k].enable()
                this.connections[k].enable()
            }
        })

        this.visualNodes[this.currentOpenKey].close()
        this.currentOpenKey = undefined
    }
}