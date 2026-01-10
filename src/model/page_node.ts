import type { INode } from "./node";

export class PageNode implements INode {
    html: string

    constructor(html: string) {
        this.html = html
    }
}