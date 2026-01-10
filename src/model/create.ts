import { DirectoryNode } from "./directory_node";
import type { INode } from "./node";

export function createRootNode(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('skills', skills())
    rootNode.addNode('about me', new DirectoryNode())
    rootNode.addNode('projects', new DirectoryNode())

    return rootNode
}

function skills(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('C#', new DirectoryNode())
    rootNode.addNode('C++', new DirectoryNode())

    return rootNode
}