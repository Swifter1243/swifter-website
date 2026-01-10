import { DirectoryNode } from "./directory_node";
import type { INode } from "./node";
import { PageNode } from "./page_node";

export function createRootNode(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('skills', skills())
    rootNode.addNode('about me', new PageNode('<h1>yeah big fun</h1><button>ya</button>'.repeat(20)))
    rootNode.addNode('projects', new DirectoryNode())

    return rootNode
}

function skills(): INode {
    const rootNode = new DirectoryNode()
    rootNode.addNode('C#', new DirectoryNode())
    rootNode.addNode('C++', new DirectoryNode())

    return rootNode
}