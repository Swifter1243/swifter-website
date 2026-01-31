import type { PageNode } from "../model/page_node";
import { navigation } from "../navigation/navigation";
import { attachCarousels } from "./carousel";
import { disableInput, enableInput } from "./input";
import { attachLinks } from "./links";
import { loadProjectTags } from "./project_tags";

const pageContent = document.getElementById('page-content')!
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
        page.hidden = false
        pagePanel.style.display = 'flex'
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
        pageTitle.textContent = node.name

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

        lastTimeout = setTimeout(() => {
            page.hidden = true
            pagePanel.style.display = 'none'
        }, 0.5 * 1000);
    }
}