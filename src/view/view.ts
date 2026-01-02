import type { Navigation } from "../navigation/navigation"

export class View {
    navigation: Navigation

    constructor(navigation: Navigation) {
        this.navigation = navigation
    }

    initialize() {
        
    }
}