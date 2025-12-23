import type { IModel } from "../model/abstract/model";

export class Controller {
    private model: IModel

    constructor(model: IModel) {
        this.model = model
    }
}