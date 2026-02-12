import { navigation } from "../navigation/navigation";
import { CATEGORIES, SKILLS, type Project } from "../nodes/project/project";
import { getDateMonthName } from "../utilities/date";

const pageProjectTagsDiv = document.getElementById('page-project-tags')!
const pageProjectLinksDiv = document.getElementById('page-project-links')!
const projectSourceLink = document.getElementById('project-source-link')!
const projectDemoLink = document.getElementById('project-demo-link')!
const projectTimeline = document.getElementById('project-timeline')!

export function loadPageProjectInfo(project: Project | undefined) {
    loadProjectLinks(project)
    loadProjectTags(project)
    loadProjectTimeline(project)
}

function loadProjectLinks(project: Project | undefined) {
    const hasLinks = project?.demoLink !== undefined || project?.sourceLink !== undefined
    pageProjectLinksDiv.style.display = hasLinks ? 'flex' : 'none'

    projectSourceLink.style.display = project?.sourceLink !== undefined ? 'flex' : 'none'
    projectDemoLink.style.display = project?.demoLink !== undefined ? 'flex' : 'none'

    if (project?.sourceLink !== undefined) {
        projectSourceLink.setAttribute('href', project.sourceLink)
    }

    if (project?.demoLink !== undefined) {
        projectDemoLink.setAttribute('href', project.demoLink)
    }
}

function loadProjectTags(project: Project | undefined) {
    pageProjectTagsDiv.style.display = project ? 'flex' : 'none'

    if (project) {
        pageProjectTagsDiv.replaceChildren()

        const categoryTag = document.createElement('button')
        const categoryPath = './projects/' + CATEGORIES[project.category]
        categoryTag.className = 'category-tag'
        categoryTag.textContent = project.category
        categoryTag.onclick = () => navigation.goToPath(categoryPath)
        pageProjectTagsDiv.appendChild(categoryTag)

        project.skills.forEach(skill => {
            const skillTag = document.createElement('button')
            const skillPath = './skills/' + SKILLS[skill]
            skillTag.className = 'skill-tag'
            skillTag.textContent = skill
            skillTag.onclick = () => navigation.goToPath(skillPath)
            pageProjectTagsDiv.appendChild(skillTag)
        })
    }
}

function loadProjectTimeline(project: Project | undefined) {
    if (!project)
        return

    function formatDate(date: Date) {
        const monthName = getDateMonthName(date)
        const year = date.getFullYear()
        return `${monthName} ${year}`
    }

    const startText = formatDate(project.startDate)

    let endText: string | null = null
    if (project.endDate) {
        endText = formatDate(project.endDate)
    }

    if (startText == endText) {
        projectTimeline.textContent = `${startText}`
    } else if (startText && endText) {
        projectTimeline.textContent = `${startText} - ${endText}`
    } else {
        projectTimeline.textContent = `${startText} - Present`
    }
}