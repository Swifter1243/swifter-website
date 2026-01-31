import { navigation } from "../navigation/navigation"

export function attachLinks() {
    const pathLinks = document.getElementsByClassName('go-to-path-link')
    for (let i = 0; i < pathLinks.length; i++) {
        const elem = pathLinks[i] as HTMLElement
        const path = elem.getAttribute('href')!
        elem.onclick = () => navigation.goToPath(path)
    }
}