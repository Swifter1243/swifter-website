import type { THREE } from "../../deps"

export interface IDisposable {
    parent: THREE.Object3D

    dispose(): void
}