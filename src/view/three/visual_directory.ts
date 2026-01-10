import { Object3D } from "three";
import { TextGeometry, THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { Invokable } from "../../utilities/invokable";
import { generateSunflowerArrangement, type ArrangedObject } from "./arrangement";
import { Connection } from "./connection";
import { Interactable } from "./interactable";
import { Label } from "./label";
import { font, scene } from "./main";

export class VisualDirectory {
    directoryNode: DirectoryNode
    parent: Object3D

    connections: Record<string, Connection> = {}
    arrangedObjects: Record<string, ArrangedObject> = {} 
    onNodeClicked = new Invokable<[string]>()

    constructor(directoryNode: DirectoryNode) {
        this.directoryNode = directoryNode
        this.parent = new Object3D()
        scene.add(this.parent)

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
            const node = entry[1]
            this.arrangedObjects[key] = o

            const endPoint = o.position
            const endNormal = new THREE.Vector3().addScaledVector(o.normal, -0.5)

            const connection = new Connection(scene, startPoint, startNormal, endPoint, endNormal)
            this.connections[key] = connection
            this.parent.add(connection.mesh)

            const label = new Label(scene, key)
            label.parent.position.copy(endPoint).add(textOffset)
            this.parent.add(label.parent)

            const interactable = new Interactable(0.1)
            interactable.onClick.subscribe(() => this.onNodeClicked.invoke(key))
            interactable.mesh.position.copy(endPoint)
            scene.add(interactable.mesh) // TODO: Interactables shouldn't be visible >:(
            this.parent.add(interactable.mesh)
        })
    }
}