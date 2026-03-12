import type { PageNode } from "../nodes/model/page_node";
import { attachCarousels } from "./carousel";
import { disableInput, enableInput } from "./three/input";
import { attachLinks, setLinksToOpenNewTab } from "./links";
import {initializePageProjectInfo, loadPageProjectInfo} from "./page_project_info";
import { muteChordPads, unmuteChordPads } from "./sound/chord";
import { navigation } from "../navigation/navigation";

let pageContent: HTMLElement
let pagePanel: HTMLElement
let page: HTMLElement
let pageTitle: HTMLElement

let lastTimeout: number | undefined = undefined

export class PageView {
    constructor() {
        initializePageProjectInfo()

        pageContent = document.getElementById('page-content')!
        pagePanel = document.getElementById('page-panel')!
        page = document.getElementById('page')!
        pageTitle = document.getElementById('page-title')!

        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => navigation.descend())
        page.hidden = true
        page.removeChild(pagePanel)
        pagePanel.style.pointerEvents = 'none'
    }

    openPage(node: PageNode): void {
        disableInput()
        muteChordPads(3)
        page.appendChild(pagePanel)
        pagePanel.style.pointerEvents = 'all'
        page.hidden = false
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
        pageTitle.textContent = node.name

        if (lastTimeout !== undefined) {
            clearTimeout(lastTimeout)
        }
        
        loadPageProjectInfo(node.project)
        attachCarousels()
        attachLinks(node.project);
        setLinksToOpenNewTab();

        (window as any).twttr.widgets.load();
    }

    closePage(): void {
        pagePanel.style.transform = "translateY(50px)";
        page.style.opacity = '0';
        pagePanel.style.pointerEvents = 'none'
        enableInput()
        unmuteChordPads()

        lastTimeout = setTimeout(() => {
            page.hidden = true
            page.removeChild(pagePanel)
        }, 0.5 * 1000);
    }
}