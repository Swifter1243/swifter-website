import { TextGeometry, THREE } from "../../deps";
import type { DirectoryNode } from "../../model/directory_node";
import { generateSunflowerArrangement } from "./arrangement";
import { Connection } from "./connection";
import { Label } from "./label";
import { font, scene } from "./main";

export class VisualDirectory {
    node: DirectoryNode
    connections: Record<string, Connection> = {}

    constructor(node: DirectoryNode) {
        this.node = node

        this.generateObjects()
    }

    private generateObjects() {
        const nodeEntries = Object.entries(this.node.nodes)
        const objects = generateSunflowerArrangement(nodeEntries.length)

        const startPoint = new THREE.Vector3()
        const startNormal = new THREE.Vector3(0, 0.8, 0)

        const textOffset = new THREE.Vector3(0, 0.1, 0)

        objects.forEach((o, i) => {
            const entry = nodeEntries[i]
            const name = entry[0]
            const node = entry[1]

            const endPoint = o.position
            const endNormal = new THREE.Vector3().addScaledVector(o.normal, -0.5)

            const connection = new Connection(scene, startPoint, startNormal, endPoint, endNormal)
            this.connections[name] = connection

            const label = new Label(scene, name)
            label.parent.position.copy(endPoint).add(textOffset)
        })
    }
}