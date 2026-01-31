import type { PageNode } from "../model/page_node";
import { navigation } from "../navigation/navigation";
import { attachCarousels } from "./carousel";
import { disableInput, enableInput } from "./input";
import { attachLinks } from "./links";

const pageContent = document.getElementById('page-content')!
const pagePanel = document.getElementById('page-panel')!
const page = document.getElementById('page')!
const pageTitle = document.getElementById('page-title')!

let lastTimeout: number | undefined = undefined

export class PageView {
    constructor() {
        const pageClose = document.getElementById('page-close')!
        pageClose.addEventListener('click', () => navigation.descend())
        pagePanel.remove()
    }

    openPage(node: PageNode): void {
        disableInput()
        page.hidden = false
        page.appendChild(pagePanel)
        pagePanel.style.transform = "translateY(0px)";
        page.style.opacity = '1'
        pageContent.innerHTML = node.html
        pageTitle.textContent = node.name

        if (lastTimeout !== undefined) {
            clearTimeout(lastTimeout)
        }

        attachCarousels()
        attachLinks()
        console.log('open')
    }

    closePage(): void {
        console.log('close')
        page.style.opacity = '0';
        pagePanel.style.transform = "translateY(50px)";
        enableInput()

        lastTimeout = setTimeout(() => {
            page.hidden = true
            pagePanel.remove()
        }, 0.5 * 1000);
    }
}