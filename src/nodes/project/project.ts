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
    skills: Set<Skill>
    importance: number
}

export function makeProject(importance: number, name: string, key: string, html: string, category: Category, skills: Skill[]): Project {
    return {
        name,
        key,
        html,
        category,
        skills: new Set<Skill>(skills),
        importance
    }
}

export function nodeFromProject(project: Project): PageNode {
    return new PageNode(project.importance, project.name, project.html, project)
}