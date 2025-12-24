import type { INode } from "../model/abstract/node";

export class NodePath {
    path: INode[] = []

    constructor()
    constructor(path: INode[])
    constructor(path?: INode[]) {
        if (path)
            this.path = path
    }

    clone() {
        const newPath = new NodePath()

        for (let i = 0; i < this.path.length; i++) {
            newPath.path.push(this.path[i])
        }

        return newPath
    }

    add(node: INode) {
        this.path.push(node)
    }
}