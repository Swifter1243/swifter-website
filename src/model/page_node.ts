import type { INode } from "./node";

export class PageNode implements INode {
    html: string
    name: string

    constructor(name: string, html: string) {
        this.name = name
        this.html = html
    }
}