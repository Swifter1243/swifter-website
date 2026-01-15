import { audioCtx } from "./context";

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
    await Promise.all([
        await preload('/leaf break.wav'),
        await preload('/intro.wav'),
        await preload('/chord A.wav'),
        await preload('/chord A reverb.wav'),
        await preload('/chord B.wav'),
        await preload('/chord B reverb.wav'),
        await preload('/chord C.wav'),
        await preload('/chord C reverb.wav'),
        await preload('/chord D.wav'),
        await preload('/chord D reverb.wav'),
    ])
}