import type { Project } from "../project/project.ts";
import type { INode } from "./node.ts";
import type {Page} from "../page.ts";

export class PageNode implements INode {
    page: Page
    name: string
    project?: Project
    importance: number

    constructor(importance: number, name: string, page: Page, project?: Project) {
        this.name = name
        this.page = page
        this.project = project
        this.importance = importance
    }

    getImportance(): number {
        return this.importance
    }
}