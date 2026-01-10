import { DirectoryNode } from "../../model/directory_node"
import type { Navigation } from "../../navigation/navigation"
import { alignLocalUp } from "../../utilities/three"
import { scene } from "./main"
import { VisualDirectory } from "./visual_directory"

export class DirectoryView {
    visualDirectories: VisualDirectory[] = []
    navigation: Navigation

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        this.add(new VisualDirectory(this.navigation.rootNode as DirectoryNode, scene))
    }

    add(dir: VisualDirectory) {
        const rootPath = this.navigation.headerPath
        dir.onNodeClicked.subscribe((key) => this.navigation.goToPath(`${rootPath}/${key}`))
        this.visualDirectories.push(dir)
    }

    getCurrent(): VisualDirectory | undefined {
        return this.visualDirectories[this.visualDirectories.length - 1]
    }

    onAscent(newNode: DirectoryNode, key: string) {
        const newDir = new VisualDirectory(newNode, scene)
        const currentDir = this.getCurrent()
        this.add(newDir)

        if (currentDir) {
            currentDir.content.add(newDir.content)

            const object = currentDir.arrangedObjects[key]
            newDir.content.position.copy(object.position)
            alignLocalUp(newDir.content, object.normal)
        }
    }

    onDescent(_: DirectoryNode) {
        this.visualDirectories.pop()?.dispose()
    }
}