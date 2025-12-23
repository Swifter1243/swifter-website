import type { IArrangement } from "../abstract/arrangement";
import type { IModel } from "../abstract/model";

export class Model implements IModel {
    private rootArrangement: IArrangement

    constructor(rootArrangement: IArrangement) {
        this.rootArrangement = rootArrangement
    }

    GetRootArrangement(): IArrangement {
        return this.rootArrangement
    }

    PathToArrangement(path: string): IArrangement | undefined {
        throw new Error("Method not implemented.")
    }
}