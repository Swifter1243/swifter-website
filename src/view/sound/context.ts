import { randomRange } from "../../utilities/math"
import { decodeAllPreloadedSounds } from "./resources"

export let audioCtx: AudioContext | undefined = undefined
export let masterGain: GainNode | undefined = undefined
let contextStarted = false

async function startContext() {
    if (contextStarted)
        return
    
    contextStarted = true
    audioCtx = new AudioContext()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 1
    masterGain.connect(audioCtx.destination)
    decodeAllPreloadedSounds()
}

window.addEventListener('pointerdown', startContext, { once: true })

export function playOneShot(
    buffer: AudioBuffer,
    {
        volume = 1,
        pitchMin = 0.95,
        pitchMax = 1.05
    } = {}
) {
    if (!audioCtx || !masterGain)
        return

    const source = audioCtx.createBufferSource();
    source.buffer = buffer

    source.playbackRate.value = randomRange(pitchMin, pitchMax);

    const gain = audioCtx.createGain()
    gain.gain.value = volume

    source.connect(gain)
    gain.connect(masterGain)

    source.start()
}