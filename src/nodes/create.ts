import { DirectoryNode } from '../model/directory_node'
import { type INode } from '../model/node'
import { PageNode } from '../model/page_node'

import aboutMeHTML from './pages/about_me.html?raw'

export function createRootNode(): INode {
    const rootNode = new DirectoryNode('Root')
    rootNode.addNode('skills', skills())
    rootNode.addNode('about-me', new PageNode('About Me', aboutMeHTML))
    rootNode.addNode('projects', new DirectoryNode('Projects'))

    return rootNode
}

function skills(): INode {
    const rootNode = new DirectoryNode('Skills')
    rootNode.addNode('c-sharp', new DirectoryNode('C#'))
    rootNode.addNode('c++', new DirectoryNode('C++'))

    return rootNode
}