import type { IArrangement } from "./arrangement";
import type { INode } from "./node";

export interface IModel {
    getRootNode(): INode
    pathToArrangement(path: string): IArrangement | undefined
}