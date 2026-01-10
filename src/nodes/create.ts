import { DirectoryNode } from '../model/directory_node'
import { type INode } from '../model/node'
import { PageNode } from '../model/page_node'

import aboutMeHTML from './pages/about_me.html?raw'

export function createRootNode(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('Skills', skills())
    rootNode.addNode('About Me', new PageNode(aboutMeHTML))
    rootNode.addNode('Projects', new DirectoryNode())

    return rootNode
}

function skills(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('C#', new DirectoryNode())
    rootNode.addNode('C++', new DirectoryNode())

    return rootNode
}