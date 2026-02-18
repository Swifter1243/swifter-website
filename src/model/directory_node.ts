import type { INode } from "./node";

export class DirectoryNode implements INode {
    name: string
    importance?: number
    readonly nodes: Record<string, INode> = {}

    constructor(name: string, importance?: number) {
        this.name = name
        this.importance = importance
    }

    addNode(key: string, node: INode) {
        this.nodes[key] = node
    }

    getImportance(): number {
        return this.importance ?? Object.keys(this.nodes).length
    }
}