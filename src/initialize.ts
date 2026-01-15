import type { INode } from "./model/node"
import { Navigation } from "./navigation/navigation"
import { createRootNode } from "./nodes/create"
import { View } from "./view/view"

export function initMVC() {
    const rootNode = createRootNode()
    const navigation = createNavigation(rootNode)
    createView(navigation)
    navigation.initialize()
}

function createNavigation(rootNode: INode): Navigation {
    return new Navigation(rootNode)
}

function createView(navigation: Navigation): View {
    const view = new View(navigation)
    view.initialize()
    return view
}