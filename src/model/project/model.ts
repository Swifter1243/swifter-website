import type { IArrangement } from "../abstract/arrangement";
import type { IModel } from "../abstract/model";
import type { INode } from "../abstract/node";

export class Model implements IModel {
    private rootNode: INode

    constructor(rootNode: INode) {
        this.rootNode = rootNode
    }

    getRootNode(): INode {
        return this.rootNode
    }

    pathToArrangement(path: string): IArrangement | undefined {
        throw new Error("Method not implemented.")
    }
}