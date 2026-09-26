import { createNavigation } from "./navigation/navigation"
import { createRootNode } from "./nodes/create"
import { createProjects } from "./nodes/project/create"
import { View } from "./view/view"
import {initializeTutorial} from "./view/tutorial.ts";

export function initSystems() {
    initializeTutorial()
    const projects = createProjects()
    const rootNode = createRootNode(projects)
    createNavigation(rootNode, projects)
    createView()
}

function createView(): View {
    const view = new View()
    view.initialize()
    return view
}
