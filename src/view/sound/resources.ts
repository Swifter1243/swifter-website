import { audioCtx } from "./context";

export const SOUNDS = {
    LEAF_BREAK: '/sounds/leaf break.wav',
    LEAF_MOVE: '/sounds/leaf move.wav',
    INTRO: '/sounds/intro.wav',
    CHORD_A: '/sounds/chord A.wav',
    CHORD_A_REVERB: '/sounds/chord A reverb.wav',
    CHORD_B: '/sounds/chord B.wav',
    CHORD_B_REVERB: '/sounds/chord B reverb.wav',
    CHORD_C: '/sounds/chord C.wav',
    CHORD_C_REVERB: '/sounds/chord C reverb.wav',
    CHORD_D: '/sounds/chord D.wav',
    CHORD_D_REVERB: '/sounds/chord D reverb.wav',
} as const

const rawAudioData = new Map<string, ArrayBuffer>()
export const sounds = new Map<string, AudioBuffer>()

async function preload(url: string) {
    if (rawAudioData.has(url)) return;

    const data = await fetch(url).then(r => r.arrayBuffer());
    rawAudioData.set(url, data)
}

export async function decodeAllPreloadedSounds() {
    for await (const [url, data] of rawAudioData) {
        const decoded = await audioCtx!.decodeAudioData(data)
        sounds.set(url, decoded)
    }
}

export async function initResources() {
    await Promise.all(Object.values(SOUNDS).map(preload))
}