import type { IArrangement } from "../abstract/arrangement";
import type { INode } from "../abstract/node";

export class Arrangement implements IArrangement {
    private nodes: INode[] = []

    constructor(nodes: INode[])
    constructor()
    constructor(nodes?: INode[]) {
        if (nodes)
            this.nodes = nodes
    }

    GetNodes(): INode[] {
        return this.nodes
    }

    AddNode(node: INode) {
        this.nodes.push(node)
    }
}