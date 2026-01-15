import { changeChord } from "./chord"
import { onRender } from "../three/renderer"
import { initResources, SOUNDS, sounds } from "./resources"
import { playOneShot } from "./context"

export const soundState = {
    queueOpen: false,
    queueBreak: false,
    queueClose: false
}

export async function initSound() {
    await initResources()
    onRender.subscribe(playQueuedSounds)
}

function playQueuedSounds() {
    let moveQueued = false

    if (soundState.queueOpen) {
        changeChord()
        moveQueued = true
        soundState.queueOpen = false
    }

    if (soundState.queueBreak) {
        playLeafBreak()
        soundState.queueBreak = false
    }

    if (soundState.queueClose) {
        moveQueued = true
        soundState.queueClose = false
    }

    if (moveQueued) {
        moveQueued = false
        playLeafMove()
    }
}

function playLeafBreak() {
    playOneShot(sounds.get(SOUNDS.LEAF_BREAK)!, {
        volume: 0.4,
        pitchMax: 0.9,
        pitchMin: 1.1
    })
}

function playLeafMove() {
    playOneShot(sounds.get(SOUNDS.LEAF_MOVE)!, {
        volume: 0.1,
        pitchMax: 1.5,
        pitchMin: 2.1
    })
}