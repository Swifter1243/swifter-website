import type { IArrangement } from "./arrangement";

export interface IModel {
    GetRootArrangement(): IArrangement
    PathToArrangement(path: string): IArrangement | undefined
}