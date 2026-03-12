import type { Project } from "../project/project.ts";
import type { INode } from "./node.ts";

export class PageNode implements INode {
    html: string
    name: string
    project?: Project
    importance: number

    constructor(importance: number, name: string, html: string, project?: Project) {
        this.name = name
        this.html = html
        this.project = project
        this.importance = importance
    }

    getImportance(): number {
        return this.importance
    }
}