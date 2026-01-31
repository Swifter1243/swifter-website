import { createNavigation } from "./navigation/navigation"
import { createRootNode } from "./nodes/create"
import { View } from "./view/view"

export function initMVC() {
    const rootNode = createRootNode()
    createNavigation(rootNode)
    createView()
}

function createView(): View {
    const view = new View()
    view.initialize()
    return view
}