import type { TextureLoader } from "three";
import { GLTFLoader, OBJLoader, preloadFont, THREE } from "../../deps";
import { setMaterialRecursive } from "../../utilities/three";

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
    const textureLoader = new THREE.TextureLoader()

    await Promise.all([
        loadFont(),
        loadLeafModel(objLoader),
        loadPetalModel(gltfLoader, textureLoader)
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

async function loadPetalModel(gltfLoader: GLTFLoader, textureLoader: TextureLoader) {
    const model = await gltfLoader.loadAsync('/petal.glb')
    const texture = await textureLoader.loadAsync('/petal.png')
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter

    model.animations.forEach(clip => {
        petalAnimations[clip.name as PetalAnimationNames] = clip
    })
    
    petalModel = model.scene

    setMaterialRecursive(petalModel, new THREE.MeshPhongMaterial({
        map: texture,
        transparent: false,
        alphaTest: 0.5,
        depthWrite: true,
        depthTest: true,
        side: THREE.DoubleSide
    }))
}