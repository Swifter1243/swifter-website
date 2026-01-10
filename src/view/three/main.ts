import { initCamera } from "../../view/three/camera";
import { Font, FontLoader, THREE } from "../../deps";
import { initRenderer } from "./renderer";
import { initScene } from "./scene";
import { initWindow } from "../window";
import { initInteractables } from "./interactable";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera();
export const renderer = new THREE.WebGLRenderer();

export let font: Promise<Font>

export function initThree() {
    initScene()
    initCamera()
    initRenderer()
    initWindow()
    initInteractables()
    initFont()
}

function initFont() {
    const loader = new FontLoader()
    font = loader.loadAsync('/helvetiker_regular.typeface.json')
}