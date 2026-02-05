import { rampAudioParam } from "../../utilities/audio";
import { audioContextReady, audioCtx, masterGain, playOneShot } from "./context";
import { SOUNDS, sounds } from "./resources";

const PAD_DEFAULT_GAIN = 0.8

class Chord {
    oneShotName: string
    padName: string

    oneShotSound?: AudioBuffer

    padSourceGain?: GainNode
    padSound?: AudioBuffer

    constructor(oneShotName: string, padName: string) {
        this.oneShotName = oneShotName
        this.padName = padName
    }

    setup() {
        if (!audioCtx || !padGain)
            return

        this.padSound = sounds.get(this.padName)
        this.oneShotSound = sounds.get(this.oneShotName)

        this.padSourceGain = audioCtx.createGain()
        this.padSourceGain.gain.setValueAtTime(0, audioCtx.currentTime)
        this.padSourceGain.connect(padGain)

        const padSource = audioCtx.createBufferSource()
        padSource.buffer = this.padSound!
        padSource.loop = true
        padSource.connect(this.padSourceGain)
        padSource.start()
    }

    playOneShot() {
        if (!this.oneShotSound)
            return

        playOneShot(this.oneShotSound)
    }

    fadePadIn(fadeTime = 3) {
        if (!audioCtx || !this.padSourceGain)
            return

        rampAudioParam(audioCtx, this.padSourceGain.gain, 1, fadeTime)
    }

    fadePadOut(fadeTime = 1) {
        if (!audioCtx || !this.padSourceGain)
            return

        rampAudioParam(audioCtx, this.padSourceGain.gain, 0, fadeTime)
    }
}

const chords = [
    new Chord(SOUNDS.CHORD_A, SOUNDS.CHORD_A_REVERB),
    new Chord(SOUNDS.CHORD_B, SOUNDS.CHORD_B_REVERB),
    new Chord(SOUNDS.CHORD_C, SOUNDS.CHORD_C_REVERB),
    new Chord(SOUNDS.CHORD_D, SOUNDS.CHORD_D_REVERB),
]
let currentChord = chords[0]
let firstChordQueued = false
let chordPadMuteQueued = false
export let padGain: GainNode | undefined = undefined

export function changeChord() {
    if (audioContextReady) {
        currentChord.fadePadOut()

        let newChord: Chord | undefined = undefined
        while (!newChord || newChord == currentChord) {
            newChord = chords[Math.floor(Math.random() * chords.length)]
        }
        newChord.fadePadIn()
        newChord.playOneShot()

        currentChord = newChord!
    } else {
        firstChordQueued = true
    }
}

export function changeChordPad() {
    currentChord.fadePadOut(1)

    let newChord: Chord | undefined = undefined
    while (!newChord || newChord == currentChord) {
        newChord = chords[Math.floor(Math.random() * chords.length)]
    }
    newChord.fadePadIn()

    currentChord = newChord!
}

export function fadeFirstChordIn() {
    if (audioContextReady) {
        currentChord.fadePadIn()
    } else {
        firstChordQueued = true
    }
}

export function muteChordPads(fadeTime = 1) {
    if (!audioCtx || !padGain)
    {
        chordPadMuteQueued = true
        return
    }

    rampAudioParam(audioCtx, padGain.gain, 0, fadeTime)
}

export function unmuteChordPads(fadeTime = 1) {
    if (!audioCtx || !padGain)
        return
    
    rampAudioParam(audioCtx, padGain.gain, 1, fadeTime)
}

export function setupChords() {
    if (!audioCtx || !masterGain)
        return

    padGain = audioCtx.createGain()
    padGain.gain.setValueAtTime(PAD_DEFAULT_GAIN, audioCtx.currentTime)
    padGain.connect(masterGain)

    chords.forEach(chord => {
        chord.setup()
    })

    if (firstChordQueued) {
        currentChord.fadePadIn(3)
    }

    if (chordPadMuteQueued) {
        muteChordPads()
    }
}