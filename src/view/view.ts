import type { Controller } from "../controller/controller";
import type { IArrangement } from "../model/abstract/arrangement";
import { generateSunflowerArrangement } from "../three/arrangement";

export class View {
    controller: Controller

    constructor(controller: Controller) {
        this.controller = controller
    }

    initialize() {
        this.controller.onNewArrangementSelected.subscribe((a) => this.onNewArrangementSelected(a))
    }

    private onNewArrangementSelected(arrangement: IArrangement) {
        generateSunflowerArrangement(arrangement.GetNodes().length)
    }
}