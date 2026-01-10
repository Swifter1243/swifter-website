import { DirectoryNode } from "../model/directory_node"
import { FileNode } from "../model/file_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { alignLocalUp } from "../utilities/three"
import { scene } from "./three/main"
import { VisualDirectory } from "./three/visual_directory"

export class View {
    navigation: Navigation
    visualDirectories: VisualDirectory[]
    currentNode: INode

    constructor(navigation: Navigation) {
        this.navigation = navigation
        this.currentNode = this.navigation.grabCurrentNode()
        this.visualDirectories = []
    }

    initialize() {
        this.navigation.onAscent.subscribe((key) => this.onAscent(key))
        this.navigation.onDescent.subscribe(() => this.onDescent())

        this.addNewVisualDirectory(new VisualDirectory(this.navigation.rootNode as DirectoryNode, scene))
    }

    addNewVisualDirectory(dir: VisualDirectory) {
        const rootPath = this.navigation.headerPath
        dir.onNodeClicked.subscribe((key) => this.navigation.goToPath(`${rootPath}/${key}`))
        this.visualDirectories.push(dir)
    }

    getCurrentVisualDirectory(): VisualDirectory | undefined {
        return this.visualDirectories[this.visualDirectories.length - 1]
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()
        this.currentNode = newNode

        if (newNode instanceof DirectoryNode) {
            const newDir = new VisualDirectory(newNode, scene)
            const currentDir = this.getCurrentVisualDirectory()
            this.addNewVisualDirectory(newDir)

            if (currentDir) {
                currentDir.content.add(newDir.content)
                
                const object = currentDir.arrangedObjects[key]
                newDir.content.position.copy(object.position)
                alignLocalUp(newDir.content, object.normal)
            }
        }
        else if (newNode instanceof FileNode) {
            // TODO: Display file
        }
    }

    private onDescent() {
        if (this.currentNode instanceof DirectoryNode) {
            this.visualDirectories.pop()?.dispose()
        }
        else if (this.currentNode instanceof FileNode) {
            // TODO: Close file
        }

        this.currentNode = this.navigation.grabCurrentNode()
    }
}