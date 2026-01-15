import { DirectoryNode } from "../model/directory_node"
import { PageNode } from "../model/page_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { DirectoryView } from "./three/directory_view"
import { PageView } from "./page_view"
import { BigFlower } from "./three/big_flower"
import { scene } from "./three/main"
import { setPivotObject } from "./three/camera"
import { soundState } from "./sound/main"

export class View {
    navigation: Navigation
    directoryView: DirectoryView
    pageView: PageView
    bigFlower: BigFlower
    currentNode: INode

    private rootSpawned = false
    private dontPushURLHistory = false

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
            this.dontPushURLHistory = true
            this.spawnRoot()
            this.navigation.goToPath('.' + location.pathname)
            soundState.queueChordChange = false
        }

        window.addEventListener('popstate', _ => {
            this.dontPushURLHistory = true
            const url = '.' + location.pathname
            this.navigation.goToPath(url)
        })
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()
        this.currentNode = newNode
        soundState.queueChordChange = true

        const currentVisualDirectory = this.directoryView.getCurrent()
        if (currentVisualDirectory) {
            currentVisualDirectory.openNode(key)
        }

        if (newNode instanceof DirectoryNode) {
            this.directoryView.onAscent(newNode, key)
        }
        else if (newNode instanceof PageNode) {
            const currentVisualDirectory = this.directoryView.getCurrent()
            if (currentVisualDirectory) {
                const visualNode = currentVisualDirectory.visualNodes[key]
                setPivotObject(visualNode.content)
            }

            this.pageView.openPage(newNode)
        }
    }

    private onDescent() {
        if (this.currentNode instanceof DirectoryNode) {
            this.directoryView.onDescent(this.currentNode)
            soundState.queueLeafBreak = true
        }
        else if (this.currentNode instanceof PageNode) {
            const currentVisualDirectory = this.directoryView.getCurrent()
            if (currentVisualDirectory) {
                setPivotObject(currentVisualDirectory.pivot)
            }

            this.pageView.closePage()
        }

        const currentVisualDirectory = this.directoryView.getCurrent()
        if (currentVisualDirectory) {
            currentVisualDirectory.closeNode()
        }

        this.currentNode = this.navigation.grabCurrentNode()
    }

    private onChange() {
        if (this.dontPushURLHistory) {
            this.dontPushURLHistory = false
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