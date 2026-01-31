import type { INode } from "./node";

export class DirectoryNode implements INode {
    name: string
    readonly nodes: Record<string, INode> = {}

    constructor(name: string) {
        this.name = name
    }

    addNode(key: string, node: INode) {
        this.nodes[key] = node
    }

    getImportance(): number {
        return Object.keys(this.nodes).length
    }
}