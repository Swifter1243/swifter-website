import type { TextureLoader } from "three";
import { GLTFLoader, OBJLoader, preloadFont, THREE } from "../../deps";
import { mergeGroupGeometries, setMaterialRecursive } from "../../utilities/three";

export let leafGeometry: THREE.BufferGeometry
export let flowerBaseGeometry: THREE.BufferGeometry

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
        loadFlowerBaseModel(objLoader),
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
    const model = await objLoader.loadAsync('/models/leaf.obj')
    model.traverse(child => {
        if (child instanceof THREE.Mesh && child.isMesh) {
            leafGeometry = child.geometry 
        }
    })
}

async function loadFlowerBaseModel(objLoader: OBJLoader) {
    const model = await objLoader.loadAsync('/models/flower base.obj')
    flowerBaseGeometry = mergeGroupGeometries(model)
}

async function loadPetalModel(gltfLoader: GLTFLoader, textureLoader: TextureLoader) {
    const model = await gltfLoader.loadAsync('/models/petal.glb')
    const texture = await textureLoader.loadAsync('/petal.png')
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.colorSpace = THREE.SRGBColorSpace

    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    model.animations.forEach(clip => {
        petalAnimations[clip.name as PetalAnimationNames] = clip
    })
    
    petalModel = model.scene

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uMap: { value: texture },
            uAlphaCutoff: { value: 0.5 }
        },
        vertexShader: `
            #define USE_SKINNING

            #include <common>
            #include <uv_pars_vertex>
            #include <skinning_pars_vertex>

            varying vec2 vUv;
            varying vec3 vObjectPos;

            void main() {
                #include <begin_vertex>
                vUv = uv;

                #include <skinbase_vertex>
                #include <skinning_vertex>

                vObjectPos = transformed;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
            }
        `,
        fragmentShader: `
            #include <common>
            #include <uv_pars_fragment>

            uniform sampler2D uMap;
            uniform float uAlphaCutoff;

            varying vec2 vUv;
            varying vec3 vObjectPos;

            void main() {
                vec3 toLight = vObjectPos - vec3(0, 0, 0);
                float falloff = exp(2.5 * -length(toLight));
                float v = falloff * 10.0;

                if (!gl_FrontFacing) {
                    v *= 0.1;
                }

                vec4 color = texture2D( uMap, vUv );
                if ( color.a < uAlphaCutoff ) discard;
                gl_FragColor = color * v;
            }
        `,
        transparent: false,
        side: THREE.DoubleSide
    })
    setMaterialRecursive(petalModel, material)
}