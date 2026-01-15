import { audioCtx } from "./context";

export const SOUNDS = {
    LEAF_BREAK: '/leaf break.wav',
    LEAF_MOVE: '/leaf move.wav',
    INTRO: '/intro.wav',
    CHORD_A: '/chord A.wav',
    CHORD_A_REVERB: '/chord A reverb.wav',
    CHORD_B: '/chord B.wav',
    CHORD_B_REVERB: '/chord B reverb.wav',
    CHORD_C: '/chord C.wav',
    CHORD_C_REVERB: '/chord C reverb.wav',
    CHORD_D: '/chord D.wav',
    CHORD_D_REVERB: '/chord D reverb.wav',
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