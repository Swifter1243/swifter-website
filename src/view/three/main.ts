import { initCamera } from "./camera.ts";
import { EffectComposer, THREE } from "../../deps";
import { initRenderer } from "./renderer";
import { initScene } from "./scene";
import { initWindow } from "./window.ts";
import { initInteractables } from "./interactable";
import { initLeafParticleSystem } from "./leaf_particle_system";
import { initResources } from "./resources";
import { initUpdateables } from "./updateable";
import { initInput } from "./input";
import { initPools } from "./pooling";

export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;
export let composer: EffectComposer;

export async function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    renderer = new THREE.WebGLRenderer();
    composer = new EffectComposer(renderer)

    const resourcesPromise = initResources()
    initInput()
    initCamera()
    initRenderer()
    initWindow()
    initInteractables()
    initUpdateables()
    initLeafParticleSystem()
    await resourcesPromise
    initScene()
    initPools()
}