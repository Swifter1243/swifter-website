import { DirectoryNode } from "../model/directory_node"
import { FileNode } from "../model/file_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { alignLocalUp } from "../utilities/three"
import { VisualDirectory } from "./three/visual_directory"

export class View {
    navigation: Navigation
    currentDir?: VisualDirectory

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        this.navigation.onAscent.subscribe((key) => this.onAscent(key))
        
        this.currentDir = new VisualDirectory(this.navigation.rootNode as DirectoryNode)
        this.currentDir.onNodeClicked.subscribe((key) => this.navigation.ascend(key))
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()

        if (newNode instanceof DirectoryNode) {
            const newDir = new VisualDirectory(newNode)

            if (this.currentDir) {
                this.currentDir.parent.add(newDir.parent)
                
                const object = this.currentDir.arrangedObjects[key]
                newDir.parent.position.copy(object.position)
                alignLocalUp(newDir.parent, object.normal)
            }

            this.currentDir = newDir
            this.currentDir.onNodeClicked.subscribe((key) => this.navigation.ascend(key))
        }
        else if (newNode instanceof FileNode) {
            // TODO: Display file
        }
    }
}