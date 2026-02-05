import type { PageNode } from "../model/page_node";
import { attachCarousels } from "./carousel";
import { disableInput, enableInput } from "./three/input";
import { attachLinks } from "./links";
import { loadProjectTags } from "./project_tags";
import { muteChordPads, unmuteChordPads } from "./sound/chord";

const pageContent = document.getElementById('page-content')!
const pageContentParent = document.getElementById('page-content-parent')!
const pagePanel = document.getElementById('page-panel')!
const page = document.getElementById('page')!
const pageTitle = document.getElementById('page-title')!

let lastTimeout: number | undefined = undefined

export class PageView {
    constructor() {
        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => history.back())
        pagePanel.style.display = 'none'
    }

    openPage(node: PageNode): void {
        disableInput()
        muteChordPads(3)
        page.hidden = false
        pagePanel.style.display = 'flex'
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
        pageTitle.textContent = node.name
        pageContentParent.scrollTop = 0

        loadProjectTags(node.project)

        if (lastTimeout !== undefined) {
            clearTimeout(lastTimeout)
        }

        attachCarousels()
        attachLinks()
    }

    closePage(): void {
        page.style.opacity = '0';
        pagePanel.style.transform = "translateY(50px)";
        enableInput()
        unmuteChordPads()

        lastTimeout = setTimeout(() => {
            page.hidden = true
            pagePanel.style.display = 'none'
        }, 0.5 * 1000);
    }
}