import { preloadFont } from "../../deps";


export async function initResources() {
    await Promise.all([
        loadFont()
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