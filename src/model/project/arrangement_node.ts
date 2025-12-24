import type { IArrangement } from "../abstract/arrangement";
import type { INode, NODE_TYPE } from "../abstract/node";

export class ArrangementNode implements INode {
    private arrangement: IArrangement
    private name: string

    constructor(arrangement: IArrangement, name: string) {
        this.arrangement = arrangement
        this.name = name
    }

    GetNext(): IArrangement {
        return this.arrangement
    }
    GetName(): string {
        return this.name
    }
    GetType(): NODE_TYPE {
        return 'Arrangement'
    }
}