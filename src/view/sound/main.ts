import { changeChord } from "./chord"
import { onRender } from "../three/renderer"

export const soundState = {
    queueChordChange: false,
    queueCrumple: false
}

export function initSound() {
    onRender.subscribe(playQueuedSounds)
}

function playQueuedSounds() {
    if (soundState.queueChordChange) {
        changeChord()
        soundState.queueChordChange = false
    }

    if (soundState.queueCrumple) {
        playCrumple()
        soundState.queueCrumple = false
    }
}

function playCrumple() {
    // TODO
}