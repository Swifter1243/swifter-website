import { Controller } from "./controller/controller";
import type { IArrangement } from "./model/abstract/arrangement";
import type { IModel } from "./model/abstract/model";
import { Arrangement } from "./model/project/arrangement";
import { ArrangementNode } from "./model/project/arrangement_node";
import { Model } from "./model/project/model";
import { View } from "./view/view";

export function initMVC() {
    const model = createModel()
    const controller = createController(model)
    const view = createView(controller)
    controller.initialize()
}

function createModel(): IModel {
    const root = new Arrangement()

    const skillsArrangement = new Arrangement()
    const skillsNode = new ArrangementNode(skillsArrangement, "Skills")
    
    root.AddNode(skillsNode)

    return new Model(root)
}

function createController(model: IModel): Controller {
    return new Controller(model)
}

function createView(controller: Controller): View {
    const view = new View(controller)
    view.initialize()
    return view
}