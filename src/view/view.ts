import type { Controller } from "../controller/controller";
import type { NodeInfo } from "../controller/node_info";
import type { IArrangement } from "../model/abstract/arrangement";
import { generateSunflowerArrangement } from "../three/arrangement";

export class View {
    controller: Controller

    constructor(controller: Controller) {
        this.controller = controller
    }

    initialize() {
        this.controller.onNewNodeSelected.subscribe((x) => this.onNewNodeSelected(x))
    }

    private onNewNodeSelected(nodeInfo: NodeInfo) {
        if (nodeInfo.node.GetType() == 'Arrangement') {
            const arrangement = nodeInfo.node.GetNext() as IArrangement
            generateSunflowerArrangement(arrangement.GetNodes().length)
        }
    }
}