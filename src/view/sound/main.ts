import { changeChord } from "./chord"
import { onRender } from "../three/renderer"
import { initResources, sounds } from "./resources"
import { playOneShot } from "./context"

export const soundState = {
    queueChordChange: false,
    queueLeafBreak: false
}

export async function initSound() {
    await initResources()
    onRender.subscribe(playQueuedSounds)
}

function playQueuedSounds() {
    if (soundState.queueChordChange) {
        changeChord()
        soundState.queueChordChange = false
    }

    if (soundState.queueLeafBreak) {
        playLeafBreak()
        soundState.queueLeafBreak = false
    }
}

function playLeafBreak() {
    playOneShot(sounds.get('/leaf break.wav')!, {
        pitchMax: 0.9,
        pitchMin: 1.1
    })
}