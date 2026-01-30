import { DirectoryNode } from "../model/directory_node"
import { PageNode } from "../model/page_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { DirectoryView } from "./three/directory_view"
import { PageView } from "./page_view"
import { BigFlower } from "./three/big_flower"
import { scene } from "./three/main"
import { setCameraPivot } from "./three/camera"
import { soundState } from "./sound/main"
import { playOneShot, startAudioContext } from "./sound/context"
import { SOUNDS, sounds } from "./sound/resources"
import { fadeFirstChordIn } from "./sound/chord"
import { getPathKeySequence } from "../navigation/utility"

const title = document.getElementById("title")!

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
        this.bigFlower.interactable.onClick.subscribe(async () => {
            await startAudioContext()
            this.spawnRoot()
        })
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
            soundState.queueOpen = false
        }

        window.addEventListener('popstate', _ => {
            this.dontPushURLHistory = true
            const path = '.' + location.pathname
            const keys = getPathKeySequence(path)
            if (keys.length > 1) {
                this.spawnRoot()
            }
            this.navigation.goToPath(path)
        })
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()
        this.currentNode = newNode
        soundState.queueOpen = true

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
                setCameraPivot({
                    object: visualNode.content,
                    distance: currentVisualDirectory.scalar * 4
                })
            }

            this.pageView.openPage(newNode)
        }
    }

    private onDescent() {
        soundState.queueClose = true

        if (this.currentNode instanceof DirectoryNode) {
            this.directoryView.onDescent(this.currentNode)
            soundState.queueBreak = true
        }
        else if (this.currentNode instanceof PageNode) {
            const currentVisualDirectory = this.directoryView.getCurrent()
            if (currentVisualDirectory) {
                setCameraPivot(currentVisualDirectory.cameraPivot)
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
        if (!this.dontPushURLHistory) {
            const url = this.navigation.headerPath === '.' ? '/' : this.navigation.headerPath.substring(1)
            history.pushState(null, '', url)
        } else {
            this.dontPushURLHistory = false
        }

        if (this.navigation.headerPath !== '.') 
            title.textContent = 'PORTFOLIO - ' + this.navigation.grabCurrentNode().name.toUpperCase()
        else
            title.textContent = 'PORTFOLIO'
    }
    
    private spawnRoot() {
        if (this.rootSpawned)
            return

        playOneShot(sounds.get(SOUNDS.INTRO)!)
        playOneShot(sounds.get(SOUNDS.LEAF_MOVE)!, {
            pitchMin: 1.3,
            pitchMax: 1.3,
            volume: 0.4
        })
        fadeFirstChordIn()
        this.rootSpawned = true
        this.bigFlower.bloom()
        this.directoryView.spawnRoot()
    }
}