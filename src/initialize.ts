import { DirectoryNode } from "./model/directory_node"
import type { INode } from "./model/node"
import { Navigation } from "./navigation/navigation"
import { View } from "./view/view"

export function initMVC() {
    const rootNode = createRootNode()
    const navigation = createNavigation(rootNode)
    const view = createView(navigation)
    navigation.initialize()

    navigation.onAscent.subscribe((p) => console.log(`ascended: ${p}`))
    navigation.onDescent.subscribe(() => console.log('descended'))

    navigation.goToPath('./skills')
}

function createRootNode(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('skills', new DirectoryNode())

    return rootNode
}

function createNavigation(rootNode: INode): Navigation {
    return new Navigation(rootNode)
}

function createView(navigation: Navigation): View {
    const view = new View(navigation)
    view.initialize()
    return view
}