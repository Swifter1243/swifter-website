import { PageNode } from "../../model/page_node"

export const CATEGORIES = {
    'Tools': 'tools',
    'Art': 'art',
    'Games': 'games'
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
}
export type Skill = keyof typeof SKILLS

export type Project = {
    html: string
    name: string
    key: string
    categories: Set<Category>
    skills: Set<Skill>
}

export function makeProject(name: string, key: string, html: string, categories: Category[], skills: Skill[]): Project {
    return {
        name,
        key,
        html,
        categories: new Set<Category>(categories),
        skills: new Set<Skill>(skills)
    }
}

export function nodeFromProject(project: Project): PageNode {
    return new PageNode(project.name, project.html)
}