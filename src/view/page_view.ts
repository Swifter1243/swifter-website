import type { PageNode } from "../nodes/model/page_node";
import { disableInput, enableInput } from "./three/input";
import { muteChordPads, unmuteChordPads } from "./sound/chord";
import {writable} from "svelte/store";

export const activePageNode = writable<PageNode | null>(null)

export class PageView {
    openPage(node: PageNode): void {
        disableInput()
        muteChordPads(3)
        
        activePageNode.set(node);
    }

    closePage(): void {
        enableInput()
        unmuteChordPads()

        activePageNode.set(null)
    }
}