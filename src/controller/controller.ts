import type { IArrangement } from "../model/abstract/arrangement";
import type { IModel } from "../model/abstract/model";
import { Invokable } from "../utilities/invokable";

export class Controller {
    private model: IModel
    readonly onNewArrangementSelected = new Invokable<[IArrangement]>()

    constructor(model: IModel) {
        this.model = model
    }

    initialize() {
        this.onNewArrangementSelected.invoke(this.model.GetRootArrangement())
    }
}