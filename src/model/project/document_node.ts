import type { IDocument } from "../abstract/document";
import type { INode, NODE_TYPE } from "../abstract/node";

export class DocumentNode implements INode {
    private document: IDocument
    private name: string

    constructor(document: IDocument, name: string) {
        this.document = document
        this.name = name
    }

    GetNext(): IDocument {
        return this.document
    }
    GetName(): string {
        return this.name
    }
    GetType(): NODE_TYPE {
        return 'Document'
    }
}