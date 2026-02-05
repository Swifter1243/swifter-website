import { navigation } from "../navigation/navigation"
import type { Project } from "../nodes/project/project"

export function attachLinks(project?: Project) {
    const pathLinks = document.getElementsByClassName('go-to-path-link')
    for (let i = 0; i < pathLinks.length; i++) {
        const elem = pathLinks[i] as HTMLElement
        const path = elem.getAttribute('href')!
        elem.onclick = () => navigation.goToPath(path)
    }

    if (project?.demoLink) {
        const demoButtons = document.getElementsByClassName('demo-button')
        for (let i = 0; i < demoButtons.length; i++) {
            const elem = demoButtons[i] as HTMLAnchorElement
            elem.href = project.demoLink
        }
    }
}