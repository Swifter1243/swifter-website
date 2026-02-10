import { DirectoryNode } from "../model/directory_node";
import type { INode } from "../model/node";
import { getProjectCategoryPath, getProjectSkillPaths, type Project } from "../nodes/project/project";
import { Invokable } from "../utilities/invokable";
import { getCommonPath, getPathKeySequence } from "./utility";

export let navigation: Navigation

export function createNavigation(rootNode: INode, projects: Project[]) {
    navigation = new Navigation(rootNode)

    projects.forEach(project => {
        const alias = `./${project.key}`
        
        navigation.addResolution(getProjectCategoryPath(project), alias)
        getProjectSkillPaths(project).forEach(skillPath => {
            navigation.addResolution(skillPath, alias)
        })
        navigation.addAlias(alias, getProjectCategoryPath(project))
    })
}

export class Navigation {
    rootNode: INode
    headerPath: string = '.'

    readonly onDescent = new Invokable()
    readonly onAscent = new Invokable<[string]>()
    readonly onChange = new Invokable()

    private readonly pathAliasToResolution: Record<string, string> = {}
    private readonly pathResolutionToAlias: Record<string, string> = {}

    constructor(rootNode: INode) {
        this.rootNode = rootNode
    }

    /** expands path internally */
    addAlias(alias: string, resolution: string) {
        this.pathAliasToResolution[alias] = resolution
    }
    
    /** shortens path, only when using {@link getAliasedHeaderPath} */
    addResolution(resolution: string, alias: string) {
        this.pathResolutionToAlias[resolution] = alias
    }

    getAliasedHeaderPath() {
        return this.pathResolutionToAlias[this.headerPath] ?? this.headerPath
    }

    grabCurrentNode(): INode {
        return this.fetchNode(this.headerPath)
    }

    ascend(key: string): boolean {
        const currentNode = this.grabCurrentNode()

        if (currentNode instanceof DirectoryNode && currentNode.nodes[key] !== undefined) {
            this.headerPath += `/${key}`
            this.headerPath = this.pathAliasToResolution[this.headerPath] ?? this.headerPath
            this.onAscent.invoke(key)
            this.onChange.invoke()
            return true
        }
        
        return false
    }

    descend(): boolean {
        const nodes = getPathKeySequence(this.headerPath)

        if (nodes.length <= 1)
            return false

        nodes.pop()
        this.headerPath = nodes.join('/')
        this.headerPath = this.pathAliasToResolution[this.headerPath] ?? this.headerPath
        this.onDescent.invoke()
        this.onChange.invoke()
        return true
    }

    fetchNode(path: string): INode {
        path = this.pathAliasToResolution[path] ?? path

        let lastNode = this.rootNode

        for (const key of getPathKeySequence(path)) {
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

        for (const key of getPathKeySequence(path)) {
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
        path = this.pathAliasToResolution[path] ?? path

        if (path === this.headerPath) {
            this.descend()
            return
        }

        path = this.truncatePathToValidated(path)

        const a = this.headerPath
        const b = path

        if (a === b) {
            return
        }

        const commonLength = getCommonPath(a, b).length

        const pathDown = a.substring(commonLength)
        getPathKeySequence(pathDown).filter(x => x.length > 0).reverse().forEach(_ => {
            this.headerPath = this.headerPath.substring(0, this.headerPath.lastIndexOf('/'))
            this.onDescent.invoke()
        })

        const pathUp = b.substring(commonLength)
        getPathKeySequence(pathUp).filter(x => x.length > 0).forEach(key => {
            this.headerPath += `/${key}`
            this.onAscent.invoke(key)
        })

        this.onChange.invoke()
    }
}