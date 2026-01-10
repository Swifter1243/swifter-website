import type { Object3D } from "three";

export interface IDisposable {
    parent: Object3D

    dispose(): void
}