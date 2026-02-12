import type { PageNode } from "../model/page_node";
import { attachCarousels } from "./carousel";
import { disableInput, enableInput } from "./three/input";
import { attachLinks } from "./links";
import { loadPageProjectInfo } from "./page_project_info";
import { muteChordPads, unmuteChordPads } from "./sound/chord";
import { navigation } from "../navigation/navigation";

const pageContent = document.getElementById('page-content')!
const pageContentParent = document.getElementById('page-content-parent')!
const pagePanel = document.getElementById('page-panel')!
const page = document.getElementById('page')!
const pageTitle = document.getElementById('page-title')!

let lastTimeout: number | undefined = undefined

export class PageView {
    constructor() {
        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => navigation.descend())
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

        if (lastTimeout !== undefined) {
            clearTimeout(lastTimeout)
        }
        
        loadPageProjectInfo(node.project)
        attachCarousels()
        attachLinks(node.project);
        (window as any).___redditEmbed?.load();
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