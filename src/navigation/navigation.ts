import { DirectoryNode } from "../model/directory_node";
import type { INode } from "../model/node";
import { Invokable } from "../utilities/invokable";

export class Navigation {
    rootNode: INode
    headerPath: string = '.'

    readonly onDescent = new Invokable()
    readonly onAscent = new Invokable<[string]>()

    constructor(rootNode: INode) {
        this.rootNode = rootNode
    }

    initialize() {
        
    }

    private getKeySequence(path: string): string[] {
        const entries = path.split('/')

        if (entries.length == 0) {
            return [path]
        }
        else {
            return entries
        }
    }

    grabCurrentNode(): INode {
        return this.fetchNode(this.headerPath)
    }

    ascend(key: string): boolean {
        const currentNode = this.grabCurrentNode()

        if (currentNode instanceof DirectoryNode && currentNode.nodes[key] !== undefined) {
            this.headerPath += `/${key}`
            this.onAscent.invoke(key)
            return true
        }
        
        return false
    }

    descend(): boolean {
        const nodes = this.getKeySequence(this.headerPath)

        if (nodes.length <= 1)
            return false

        const newNodes = nodes.splice(nodes.length - 2)
        const newPath = newNodes.join('/')
        this.headerPath = newPath
        this.onDescent.invoke()
        return true
    }

    fetchNode(path: string): INode {
        let lastNode = this.rootNode

        for (const key of this.getKeySequence(path)) {
            if (key == '.')
                continue

            if (lastNode instanceof DirectoryNode && lastNode.nodes[key] !== undefined) {
                lastNode = lastNode.nodes[key]
            }
        }

        return lastNode
    }

    truncatePathToValidated(path: string) {
        let lastNode = this.rootNode
        const result = ['.']

        for (const key of this.getKeySequence(path)) {
            if (key == '.')
                continue

            if (lastNode instanceof DirectoryNode && lastNode.nodes[key] !== undefined) {
                result.push(key)
                lastNode = lastNode.nodes[key]
            }
        }

        return result.join('/')
    }

    goToPath(path: string) {
        path = this.truncatePathToValidated(path)

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
        this.getKeySequence(pathDown).filter(x => x.length > 0).reverse().forEach(_ => {
            this.headerPath = this.headerPath.substring(0, this.headerPath.lastIndexOf('/'))
            this.onDescent.invoke()
        })

        const pathUp = b.substring(commonLength)
        this.getKeySequence(pathUp).filter(x => x.length > 0).forEach(key => {
            this.headerPath += `/${key}`
            this.onAscent.invoke(key)
        })
    }
}