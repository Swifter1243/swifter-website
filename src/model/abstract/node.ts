import type { IArrangement } from "./arrangement";
import type { IDocument } from "./document";

export type NODE_TYPE = 'Arrangement' | 'Document'

export interface INode {
    GetNext(): IDocument | IArrangement
    GetType(): NODE_TYPE
    GetName(): string
}