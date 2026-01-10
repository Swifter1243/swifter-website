import { DirectoryNode } from "../model/directory_node"
import { FileNode } from "../model/file_node"
import type { INode } from "../model/node"
import type { Navigation } from "../navigation/navigation"
import { DirectoryView } from "./three/directory_view"

export class View {
    navigation: Navigation
    directoryView: DirectoryView
    currentNode: INode

    constructor(navigation: Navigation) {
        this.navigation = navigation
        this.currentNode = this.navigation.grabCurrentNode()
        this.directoryView = new DirectoryView(navigation)
    }

    initialize() {
        this.navigation.onAscent.subscribe((key) => this.onAscent(key))
        this.navigation.onDescent.subscribe(() => this.onDescent())

        this.directoryView.initialize()
    }

    private onAscent(key: string) {
        const newNode = this.navigation.grabCurrentNode()
        this.currentNode = newNode

        if (newNode instanceof DirectoryNode) {
            this.directoryView.onAscent(newNode, key)
        }
        else if (newNode instanceof FileNode) {
            // TODO: Display file
        }
    }

    private onDescent() {
        if (this.currentNode instanceof DirectoryNode) {
            this.directoryView.onDescent(this.currentNode)
        }
        else if (this.currentNode instanceof FileNode) {
            // TODO: Close file
        }

        this.currentNode = this.navigation.grabCurrentNode()
    }
}