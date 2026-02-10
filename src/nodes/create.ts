import { DirectoryNode } from '../model/directory_node'
import { type INode } from '../model/node'
import { PageNode } from '../model/page_node'
import { CATEGORIES, nodeFromProject, SKILLS, type Category, type Project, type Skill } from './project/project'

import aboutMeHTML from './pages/about_me.html?raw'

export function createRootNode(projects: Project[]): INode {
    const rootNode = new DirectoryNode('Root')
    rootNode.addNode('skills', createSkillNodes(projects))
    rootNode.addNode('about-me', new PageNode(1, 'About Me', aboutMeHTML))
    rootNode.addNode('projects', createProjectNodes(projects))

    return rootNode
}

function createSkillNodes(projects: Project[]): INode {
    const rootNode = new DirectoryNode('Skills')

    const skillNodes: Partial<Record<Skill, DirectoryNode>> = {}

    Object.entries(SKILLS).forEach(([name, key]) => {
        const node = new DirectoryNode(name)
        rootNode.addNode(key, node)
        skillNodes[name as Skill] = node
    })

    projects.forEach(project => {
        project.skills.forEach(skill => {
            const directoryNode = skillNodes[skill]!
            directoryNode.addNode(project.key, nodeFromProject(project))
        })
    })

    return rootNode
}

function createProjectNodes(projects: Project[]): INode {
    const rootNode = new DirectoryNode('Projects')

    const categoryNodes: Partial<Record<Category, DirectoryNode>> = {}

    Object.entries(CATEGORIES).forEach(([name, key]) => {
        const node = new DirectoryNode(name)
        rootNode.addNode(key, node)
        categoryNodes[name as Category] = node
    })

    projects.forEach(project => {
        const directoryNode = categoryNodes[project.category]!
        directoryNode.addNode(project.key, nodeFromProject(project))
    })

    return rootNode
}