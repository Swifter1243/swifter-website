import { DirectoryNode } from "../model/directory_node";
import type { INode } from "../model/node";
import { Invokable } from "../utilities/invokable";

export class Navigation {
    rootNode: INode
    headerPath: string = './'

    readonly onDescent = new Invokable()
    readonly onAscent = new Invokable<[string]>()

    constructor(rootNode: INode) {
        this.rootNode = rootNode
    }

    initialize() {
        
    }

    validatePath(path: string) {
        let lastNode = this.rootNode
        const result = ['.']

        for (const node of path.split('/')) {
            if (node == '.')
                continue

            if (lastNode instanceof DirectoryNode && lastNode.nodes[node] !== undefined) {
                result.push(node)
                lastNode = lastNode.nodes[node]
            }
        }

        return result.join('/')
    }

    goToPath(path: string) {
        path = this.validatePath(path)

        const a = this.headerPath
        const b = path

        const maxCommonLength = Math.min(a.length, b.length)
        let commonLength = 0

        for (let i = 0; i < maxCommonLength; i++) {
            if (a[i] != b[i]) {
                break
            }

            commonLength++
        }

        const pathDown = a.substring(commonLength)
        pathDown.split('/').filter(x => x.length > 0).reverse().forEach(_ => this.onDescent.invoke())

        const pathUp = b.substring(commonLength)
        pathUp.split('/').filter(x => x.length > 0).forEach(p => this.onAscent.invoke(p))

        this.headerPath = path
    }
}