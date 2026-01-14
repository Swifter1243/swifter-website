import { GLTFLoader, OBJLoader, preloadFont, THREE } from "../../deps";

export let leafGeometry: THREE.BufferGeometry

export type PetalAnimationNames = 
    'Close' |
    'Open' |
    'Idle'
export let petalAnimations: Record<PetalAnimationNames, THREE.AnimationClip> = {} as Record<PetalAnimationNames, THREE.AnimationClip>
export let petalModel: THREE.Group<THREE.Object3DEventMap>

export async function initResources() {
    const objLoader = new OBJLoader()
    const gltfLoader = new GLTFLoader()

    await Promise.all([
        loadFont(),
        loadLeafModel(objLoader),
        loadPetalModel(gltfLoader)
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

async function loadPetalModel(gltfLoader: GLTFLoader) {
    const model = await gltfLoader.loadAsync('/petal.glb')

    model.animations.forEach(clip => {
        petalAnimations[clip.name as PetalAnimationNames] = clip
    })

    petalModel = model.scene
}