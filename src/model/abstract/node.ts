import type { IArrangement } from "./arrangement";
import type { IDocument } from "./document";

export interface INode {
    GetNext(): IDocument | IArrangement
    GetName(): string
}