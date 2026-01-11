import { DirectoryNode } from '../model/directory_node'
import { type INode } from '../model/node'
import { PageNode } from '../model/page_node'

import aboutMeHTML from './pages/about_me.html?raw'

export function createRootNode(): INode {
    const rootNode = new DirectoryNode('Root')
    rootNode.addNode('skills', skills())
    rootNode.addNode('about-me', new PageNode('About Me', aboutMeHTML))
    rootNode.addNode('projects', projects())

    return rootNode
}

function skills(): INode {
    const rootNode = new DirectoryNode('Skills')
    rootNode.addNode('c-sharp', new DirectoryNode('C#'))
    rootNode.addNode('c++', new DirectoryNode('C++'))

    return rootNode
}

function projects(): INode {
    const rootNode = new DirectoryNode('Projects')
    rootNode.addNode('exsii', new PageNode('Extra Sensory II', ''))
    rootNode.addNode('derelict', new PageNode('Derelict', ''))
    rootNode.addNode('synergy', new PageNode('SYNERGY', ''))
    rootNode.addNode('aether', new PageNode('743⁺Aether*✧ . * ¹¹¹} ⁺ , .', ''))
    rootNode.addNode('grasping-at-straws', new PageNode('Grasping At Straws', ''))
    rootNode.addNode('zero', new PageNode('ZERO Inc.', ''))
    rootNode.addNode('bloon-man', new PageNode('BLOON MAN', ''))
    rootNode.addNode('plasma-shift', new PageNode('PlasmaShift', ''))
    rootNode.addNode('beat-craft', new PageNode('BeatCraft', ''))
    rootNode.addNode('remapper', new PageNode('ReMapper', ''))
    rootNode.addNode('blood-rushing', new PageNode('BRLCTAP', ''))
    rootNode.addNode('ricochet', new PageNode('ricochet', ''))

    return rootNode
}