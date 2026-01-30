import type { THREE } from "../../deps"
import { DirectoryNode } from "../../model/directory_node"
import type { Navigation } from "../../navigation/navigation"
import { setCameraPivot } from "./camera"
import { scene } from "./main"
import { VisualDirectory } from "./visual_directory"

const SHRINK_FACTOR = 0.5

export class DirectoryView {
    visualDirectories: VisualDirectory[] = []
    navigation: Navigation

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        
    }

    spawnRoot() {
        this.add(new VisualDirectory(this.navigation.rootNode as DirectoryNode, scene, 1, 1))
    }

    add(dir: VisualDirectory) {
        const rootPath = this.navigation.headerPath
        dir.onNodeClicked.subscribe((key) => this.navigation.goToPath(`${rootPath}/${key}`))
        this.visualDirectories.push(dir)
        this.onCurrentChanged()
    }

    onCurrentChanged(): void {
        const current = this.getCurrent()

        setCameraPivot(current?.cameraPivot)

        this.visualDirectories.forEach((visualDirectory, i) => {
            const depth = this.visualDirectories.length - 1 - i
            const nodeCount = Object.values(visualDirectory.directoryNode.nodes).length
            const countBias = Math.exp(-nodeCount * 0.2)
            const depthBias = Math.exp(-depth)
            const breezeAmount = depthBias * countBias * 0.2
            visualDirectory.breezeAmount.set(breezeAmount)
        })
    }

    getCurrent(): VisualDirectory | undefined {
        return this.visualDirectories[this.visualDirectories.length - 1]
    }

    onAscent(newNode: DirectoryNode, key: string) {
        let newParent: THREE.Object3D = scene
        const currentDir = this.getCurrent()

        let currentScale = 1
        if (currentDir) {
            const visualNode = currentDir.visualNodes[key]
            newParent = visualNode.content
            currentScale = currentDir.scalar
        }

        const newDir = new VisualDirectory(newNode, newParent, currentScale * SHRINK_FACTOR, SHRINK_FACTOR)

        this.add(newDir)
    }

    onDescent(_: DirectoryNode) {
        this.visualDirectories.pop()?.dispose()
        this.onCurrentChanged()
    }
}