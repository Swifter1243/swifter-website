import { rampAudioParam } from "../../utilities/audio"
import { randomRange } from "../../utilities/math"
import { setupChords } from "./chord"
import { decodeAllPreloadedSounds } from "./resources"

export let audioCtx: AudioContext | undefined = undefined
export let masterGain: GainNode | undefined = undefined
let focusGain: GainNode | undefined = undefined
export let audioContextReady = false

let audioContextPromise: Promise<void> | undefined = undefined

export async function startAudioContext() {
    if (!audioContextPromise)
        audioContextPromise = initialize()

    return audioContextPromise
}

export function unfocusAudioContext() {
    if (!audioCtx)
        return

    rampAudioParam(audioCtx, focusGain!.gain, 0, 0.4)
}

export function focusAudioContext() {
    if (!audioCtx)
        return

    rampAudioParam(audioCtx, focusGain!.gain, 1, 0.4)
}

async function initialize() {
    audioCtx = new AudioContext()
    focusGain = audioCtx.createGain()
    focusGain.gain.setValueAtTime(1, audioCtx.currentTime)
    focusGain.connect(audioCtx.destination)
    masterGain = audioCtx.createGain()
    masterGain.gain.setValueAtTime(0.3, audioCtx.currentTime)
    masterGain.connect(focusGain)
    
    await decodeAllPreloadedSounds()
    setupChords()
    audioContextReady = true
}

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