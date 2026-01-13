import { OBJLoader, preloadFont, THREE } from "../../deps";

export let leafGeometry: THREE.BufferGeometry

export async function initResources() {
    const objLoader = new OBJLoader()

    await Promise.all([
        loadFont(),
        loadLeafModel(objLoader)
    ])
}

async function loadFont() {
    const promise = new Promise((resolve) => {
        preloadFont({
            font: '/pala.ttf',
        }, () => resolve(undefined))
    })
    return promise
}

async function loadLeafModel(objLoader: OBJLoader) {
    const model = await objLoader.loadAsync('/leaf.obj')
    model.traverse(child => {
        const mesh = child as THREE.Mesh
        if (mesh.isMesh) {
            leafGeometry = mesh.geometry 
        }
    })
}