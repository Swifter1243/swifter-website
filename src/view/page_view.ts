import type { PageNode } from "../model/page_node";
import type { Navigation } from "../navigation/navigation";

const pageContent = document.getElementById('page-content')!
const pagePanel = document.getElementById('page-panel')!
const page = document.getElementById('page')!
const pageTitle = document.getElementById('page-title')!

export class PageView {
    constructor(navigation: Navigation) {
        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => navigation.descend())
        pagePanel.remove()
    }

    openPage(node: PageNode): void {
        page.hidden = false
        page.appendChild(pagePanel)
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
        pageTitle.textContent = node.name
    }

    closePage(): void {
        page.style.opacity = '0';
        pagePanel.style.transform = "translateY(50px)";

        setTimeout(() => {
            page.hidden = true
            pagePanel.remove()
        }, 0.5 * 1000);
    }
}