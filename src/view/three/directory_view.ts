import type { Object3D } from "three"
import { DirectoryNode } from "../../model/directory_node"
import type { Navigation } from "../../navigation/navigation"
import { setPivotPos } from "./camera"
import { scene } from "./main"
import { VisualDirectory } from "./visual_directory"

export class DirectoryView {
    visualDirectories: VisualDirectory[] = []
    navigation: Navigation

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        
    }

    spawnRoot() {
        this.add(new VisualDirectory(this.navigation.rootNode as DirectoryNode, scene))
    }

    add(dir: VisualDirectory) {
        const rootPath = this.navigation.headerPath
        dir.onNodeClicked.subscribe((key) => this.navigation.goToPath(`${rootPath}/${key}`))
        this.visualDirectories.push(dir)
        this.onCurrentChanged()
    }

    onCurrentChanged(): void {
        const current = this.getCurrent()

        if (current) {
            const worldCenter = current.getWorldCenter()
            setPivotPos(worldCenter.x, worldCenter.y, worldCenter.z)
        }
    }

    getCurrent(): VisualDirectory | undefined {
        return this.visualDirectories[this.visualDirectories.length - 1]
    }

    onAscent(newNode: DirectoryNode, key: string) {
        let newParent: Object3D = scene
        const currentDir = this.getCurrent()

        if (currentDir) {
            const visualNode = currentDir.visualNodes[key]
            newParent = visualNode.content
        }

        const newDir = new VisualDirectory(newNode, newParent)

        this.add(newDir)
    }

    onDescent(_: DirectoryNode) {
        this.visualDirectories.pop()?.dispose()
        this.onCurrentChanged()
    }
}