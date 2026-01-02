import type { INode } from "./node";

export class DirectoryNode implements INode {
    readonly nodes: Record<string, INode> = {}

    addNode(key: string, node: INode) {
        this.nodes[key] = node
    }
}