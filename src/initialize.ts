import type { IArrangement } from "./model/abstract/arrangement";
import { Arrangement } from "./model/project/arrangement";
import { ArrangementNode } from "./model/project/arrangement_node";

export function initMVC() {
    const model = createModel()
}

function createModel(): IArrangement {
    const root = new Arrangement()

    const skillsArrangement = new Arrangement()
    const skillsNode = new ArrangementNode(skillsArrangement, "Skills")
    
    root.AddNode(skillsNode)

    return root
}