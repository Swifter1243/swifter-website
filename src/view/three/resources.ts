import { FBXLoader, OBJLoader, preloadFont, THREE } from "../../deps";

export let leafGeometry: THREE.BufferGeometry

export type PetalAnimationNames = 
    'Petal|Close' |
    'Petal|Open' |
    'Petal|Idle'
export let petalAnimations: Record<PetalAnimationNames, THREE.AnimationClip> = {} as Record<PetalAnimationNames, THREE.AnimationClip>
export let petalFbx: THREE.Group<THREE.Object3DEventMap>

export async function initResources() {
    const objLoader = new OBJLoader()
    const fbxLoader = new FBXLoader()

    await Promise.all([
        loadFont(),
        loadLeafModel(objLoader),
        loadPetalModel(fbxLoader)
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

async function loadPetalModel(fbxLoader: FBXLoader) {
    const model = await fbxLoader.loadAsync('/petal.fbx')

    model.animations.forEach(clip => {
        petalAnimations[clip.name as PetalAnimationNames] = clip
    })

    petalFbx = model
}