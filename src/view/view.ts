import { DirectoryNode } from "../model/directory_node"
import { PageNode } from "../model/page_node"
import type { INode } from "../model/node"
import { navigation } from "../navigation/navigation"
import { DirectoryView } from "./three/directory_view"
import { PageView } from "./page_view"
import { BigFlower } from "./three/big_flower"
import { scene } from "./three/main"
import { setCameraPivot } from "./three/camera"
import { soundState } from "./sound/main"
import { playOneShot, startAudioContext } from "./sound/context"
import { SOUNDS, sounds } from "./sound/resources"
import { fadeFirstChordIn } from "./sound/chord"
import { getPathKeySequence, locationToNavigationPath } from "../navigation/utility"
import { BUD_TUTORIAL, initTutorials, ORBIT_TUTORIAL } from "./tutorial"
import { onDragEnd } from "./three/input"

const title = document.getElementById("title")!

export class View {
    directoryView: DirectoryView
    pageView: PageView
    bigFlower: BigFlower
    currentNode: INode

    private rootSpawned = false
    private dontPushURLHistory = false

    constructor() {
        this.currentNode = navigation.grabCurrentNode()
        this.directoryView = new DirectoryView()
        this.pageView = new PageView()
        this.bigFlower = new BigFlower(scene)
        this.bigFlower.interactable.onClick.subscribe(async () => {
            await startAudioContext()
            onDragEnd.subscribe(() => ORBIT_TUTORIAL.complete())
            this.spawnRoot()
            this.bigFlower.interactable.dispose()
        })
    }

    initialize() {
        navigation.onAscent.subscribe((key) => this.onAscent(key))
        navigation.onDescent.subscribe(() => this.onDescent())
        navigation.onChange.subscribe(() => this.onChange())

        this.directoryView.initialize()

        if (location.pathname !== '/') {
            this.dontPushURLHistory = true
            this.spawnRoot()
            const path = locationToNavigationPath(location.pathname)
            navigation.goToPath(path)
            soundState.queueOpen = false
        } else {
            initTutorials([BUD_TUTORIAL, ORBIT_TUTORIAL])
        }

        window.addEventListener('popstate', _ => {
            this.dontPushURLHistory = true
            const path = locationToNavigationPath(location.pathname)
            const keys = getPathKeySequence(path)
            if (keys.length > 1) {
                this.spawnRoot()
            }
            navigation.goToPath(path)
        })
    }

    private onAscent(key: string) {
        const newNode = navigation.grabCurrentNode()
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

        this.currentNode = navigation.grabCurrentNode()
    }

    private onChange() {
        const headerPath = navigation.getAliasedHeaderPath()

        if (!this.dontPushURLHistory) {
            const url = headerPath === '.' ? '/' : headerPath.substring(1)
            history.pushState(null, '', url)
        } else {
            this.dontPushURLHistory = false
        }

        if (headerPath !== '.') 
            title.textContent = 'PORTFOLIO - ' + navigation.grabCurrentNode().name.toUpperCase()
        else
            title.textContent = 'PORTFOLIO'
    }
    
    private spawnRoot() {
        if (this.rootSpawned)
            return

        BUD_TUTORIAL.complete()

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