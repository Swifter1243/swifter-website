import { type IDocument } from "../abstract/document"

export class Document implements IDocument {
    private iconPath: string
    private contentsPath: string

    constructor(iconPath: string, contentsPath: string) {
        this.iconPath = iconPath
        this.contentsPath = contentsPath
    }

    GetIconPath(): string {
        return this.iconPath
    }
    GetContentPath(): string {
        return this.contentsPath
    }
}