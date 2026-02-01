import type { THREE } from "../../deps"
import { DirectoryNode } from "../../model/directory_node"
import { navigation } from "../../navigation/navigation"
import { lerp } from "../../utilities/math"
import { setCameraPivot } from "./camera"
import { scene } from "./main"
import { VisualDirectory } from "./visual_directory"

const GROW_FACTOR = 1.5

export class DirectoryView {
    visualDirectories: VisualDirectory[] = []

    initialize() {
        
    }

    spawnRoot() {
        this.add(new VisualDirectory(navigation.rootNode as DirectoryNode, scene, 1, 1))
    }

    add(dir: VisualDirectory) {
        const rootPath = navigation.headerPath
        dir.onNodeClicked.subscribe((key) => navigation.goToPath(`${rootPath}/${key}`))
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

        let growFactor = 1
        let currentScale = 1
        if (currentDir) {
            const visualNode = currentDir.visualNodes[key]
            newParent = visualNode.content
            growFactor = lerp(0.5, 1, visualNode.relativeImportance)
            currentScale = currentDir.scalar
        }
        
        growFactor *= GROW_FACTOR
        const newDir = new VisualDirectory(newNode, newParent, currentScale * growFactor, growFactor)

        this.add(newDir)
    }

    onDescent(_: DirectoryNode) {
        this.visualDirectories.pop()?.dispose()
        this.onCurrentChanged()
    }
}