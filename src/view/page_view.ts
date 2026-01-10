import type { PageNode } from "../model/page_node";
import type { Navigation } from "../navigation/navigation";

const pageContent = document.getElementById('page-content')!
const pagePanel = document.getElementById('page-panel')!
const page = document.getElementById('page')!

export class PageView {
    constructor(navigation: Navigation) {
        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => navigation.descend())
    }

    openPage(node: PageNode): void {
        page.hidden = false
        pagePanel.style.transform = "translateY(50px)";
        page.style.opacity = '0'
        page.getBoundingClientRect()
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
    }

    closePage(): void {
        page.hidden = true
    }
}