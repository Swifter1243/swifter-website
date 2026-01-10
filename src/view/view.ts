import { DirectoryNode } from "../model/directory_node"
import { PageNode } from "../model/page_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { DirectoryView } from "./three/directory_view"
import { PageView } from "./page_view"
import { setPivotPos } from "./three/camera"
import { BigFlower } from "./three/big_flower"
import { scene } from "./three/main"

export class View {
    navigation: Navigation
    directoryView: DirectoryView
    pageView: PageView
    bigFlower: BigFlower
    currentNode: INode

    private rootSpawned = false
    private dontPushState = false

    constructor(navigation: Navigation) {
        this.navigation = navigation
        this.currentNode = this.navigation.grabCurrentNode()
        this.directoryView = new DirectoryView(navigation)
        this.pageView = new PageView(navigation)
        this.bigFlower = new BigFlower(scene)
        this.bigFlower.interactable.onClick.subscribe(() => this.spawnRoot())
    }

    initialize() {
        this.navigation.onAscent.subscribe((key) => this.onAscent(key))
        this.navigation.onDescent.subscribe(() => this.onDescent())
        this.navigation.onChange.subscribe(() => this.onChange())

        this.directoryView.initialize()

        if (location.pathname !== '/') {
            this.spawnRoot()
            this.navigation.goToPath('.' + location.pathname)
        }

        window.addEventListener('popstate', _ => {
            this.dontPushState = true
            const url = '.' + location.pathname
            this.navigation.goToPath(url)
        })
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()
        this.currentNode = newNode

        if (newNode instanceof DirectoryNode) {
            this.directoryView.onAscent(newNode, key)
        }
        else if (newNode instanceof PageNode) {
            const currentDirectoryView = this.directoryView.getCurrent()
            if (currentDirectoryView) {
                const visualNode = currentDirectoryView.visualNodes[key]
                const worldPos = currentDirectoryView.parent.localToWorld(visualNode.position)
                setPivotPos(worldPos.x, worldPos.y, worldPos.z)
            }

            this.pageView.openPage(newNode)
        }
    }

    private onDescent() {
        if (this.currentNode instanceof DirectoryNode) {
            this.directoryView.onDescent(this.currentNode)
        }
        else if (this.currentNode instanceof PageNode) {
            const currentDirectoryView = this.directoryView.getCurrent()
            if (currentDirectoryView) {
                const worldPos = currentDirectoryView.getWorldCenter()
                setPivotPos(worldPos.x, worldPos.y, worldPos.z)
            }

            this.pageView.closePage()
        }

        this.currentNode = this.navigation.grabCurrentNode()
    }

    private onChange() {
        if (this.dontPushState) {
            this.dontPushState = false
            return
        }

        const url = this.navigation.headerPath === '.' ? '/' : this.navigation.headerPath.substring(1)
        history.pushState(null, '', url)
    }
    
    private spawnRoot() {
        if (this.rootSpawned)
            return

        this.rootSpawned = true
        this.bigFlower.bloom()
        this.directoryView.spawnRoot()
    }
}