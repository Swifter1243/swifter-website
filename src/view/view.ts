import type { DirectoryNode } from "../model/directory_node"
import type { Navigation } from "../navigation/navigation"
import { VisualDirectory } from "./three/visual_directory"

export class View {
    navigation: Navigation

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        const dir = new VisualDirectory(this.navigation.rootNode as DirectoryNode)
    }
}