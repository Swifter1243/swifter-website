import { navigation } from "../main";
import { CATEGORIES, SKILLS, type Project } from "../nodes/project/project";

const div = document.getElementById('page-project-tags')!

export function loadProjectTags(project: Project | undefined) {
    div.style.display = project ? 'flex' : 'none'

    if (project) {
        div.replaceChildren()

        const categoryTag = document.createElement('button')
        const categoryPath = './projects/' + CATEGORIES[project.category]
        categoryTag.className = 'category-tag'
        categoryTag.textContent = project.category
        categoryTag.onclick = () => navigation.goToPath(categoryPath)
        div.appendChild(categoryTag)

        project.skills.forEach(skill => {
            const skillTag = document.createElement('button')
            const skillPath = './skills/' + SKILLS[skill]
            skillTag.className = 'skill-tag'
            skillTag.textContent = skill
            skillTag.onclick = () => navigation.goToPath(skillPath)
            div.appendChild(skillTag)
        })
    }
}