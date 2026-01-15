import { randomRange } from "../../utilities/math"
import { setupChords } from "./chord"
import { decodeAllPreloadedSounds } from "./resources"

export let audioCtx: AudioContext | undefined = undefined
export let masterGain: GainNode | undefined = undefined
export let audioContextStarted = false

async function startContext() {
    if (audioContextStarted)
        return
    
    audioCtx = new AudioContext()
    masterGain = audioCtx.createGain()
    masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime)
    masterGain.connect(audioCtx.destination)
    
    await decodeAllPreloadedSounds()
    setupChords()
    audioContextStarted = true
}

window.addEventListener('pointerdown', startContext, { once: true })

export function playOneShot(
    buffer: AudioBuffer,
    {
        volume = 1,
        pitchMin = 1,
        pitchMax = 1
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