import type { IArrangement } from "../model/abstract/arrangement";
import type { IModel } from "../model/abstract/model";
import { Invokable } from "../utilities/invokable";
import type { NodeInfo } from "./node_info";
import { NodePath } from "./node_path";

export class Controller {
    private model: IModel
    readonly onNewNodeSelected = new Invokable<[NodeInfo]>()

    private rootNodePath = new NodePath()

    constructor(model: IModel) {
        this.model = model
    }

    initialize() {
        const rootNode = this.model.getRootNode()
        this.rootNodePath.add(rootNode)
        const rootNodeInfo: NodeInfo = {
            node: rootNode,
            path: this.rootNodePath
        }

        this.onNewNodeSelected.invoke(rootNodeInfo)
    }
}