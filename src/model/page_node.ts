import type { Project } from "../nodes/project/project";
import type { INode } from "./node";

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