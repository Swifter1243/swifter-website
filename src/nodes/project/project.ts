import { PageNode } from "../../model/page_node"

export const CATEGORIES = {
    'Tools': 'tools',
    'Experiences': 'experiences',
    'Games': 'games',
    'Experiments': 'experiments'
} as const
export type Category = keyof typeof CATEGORIES

export const SKILLS = {
    'C#': 'c-sharp',
    'C++': 'c++',
    'Java': 'java',
    'TypeScript': 'typescript',
    'Unity': 'unity',
    'Shaders': 'shaders',
    'Teamwork': 'teamwork',
    'Python': 'python',
    'Mathematics': 'math',
    'Audio' : 'audio'
}
export type Skill = keyof typeof SKILLS

export type Project = {
    html: string
    name: string
    key: string
    category: Category
    skills: Skill[]
    importance: number
    demoLink?: string
    sourceLink?: string
    startDate: Date
    endDate?: Date
}

export function nodeFromProject(project: Project): PageNode {
    return new PageNode(project.importance, project.name, project.html, project)
}

export function getProjectCategoryPath(project: Project): string {
    const categoryKey = CATEGORIES[project.category]
    return `./projects/${categoryKey}/${project.key}`
}

export function getProjectSkillPaths(project: Project): string[] {
    const result: string[] = []

    project.skills.forEach(skill => {
        const skillKey = SKILLS[skill]
        result.push(`./skills/${skillKey}/${project.key}`)
    })

    return result
}