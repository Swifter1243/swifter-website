import { initCamera } from "../../view/three/camera";
import { EffectComposer, THREE } from "../../deps";
import { initRenderer } from "./renderer";
import { initScene } from "./scene";
import { initWindow } from "../window";
import { initInteractables } from "./interactable";
import { initLeafParticleSystem } from "./leaf_particle_system";
import { initResources } from "./resources";
import { initUpdateables } from "./updateable";
import { initInput } from "./input";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera();
export const renderer = new THREE.WebGLRenderer();
export const composer = new EffectComposer(renderer)

export async function initThree() {
    const resourcesPromise = initResources()
    initInput()
    initScene()
    initCamera()
    initRenderer()
    initWindow()
    initInteractables()
    initUpdateables()
    initLeafParticleSystem()
    await resourcesPromise
}