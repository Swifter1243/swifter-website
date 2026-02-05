import { rampAudioParam } from "../../utilities/audio";
import { audioContextReady, audioCtx, masterGain, playOneShot } from "./context";
import { SOUNDS, sounds } from "./resources";

const PAD_GAIN = 0.8

class Chord {
    oneShotName: string
    padName: string

    oneShotSound?: AudioBuffer

    padGain?: GainNode
    padSound?: AudioBuffer

    constructor(oneShotName: string, padName: string) {
        this.oneShotName = oneShotName
        this.padName = padName
    }

    setup() {
        if (!audioCtx || !masterGain)
            return

        this.padSound = sounds.get(this.padName)
        this.oneShotSound = sounds.get(this.oneShotName)

        this.padGain = audioCtx.createGain()
        this.padGain.gain.setValueAtTime(0, audioCtx.currentTime)
        this.padGain.connect(masterGain)

        const padSource = audioCtx.createBufferSource()
        padSource.buffer = this.padSound!
        padSource.loop = true
        padSource.connect(this.padGain)
        padSource.start()
    }

    playOneShot() {
        if (!this.oneShotSound)
            return

        playOneShot(this.oneShotSound)
    }

    fadePadIn(fadeTime = 3) {
        if (!audioCtx || !this.padGain)
            return

        rampAudioParam(audioCtx, this.padGain.gain, PAD_GAIN, fadeTime)
    }

    fadePadOut(fadeTime = 1) {
        if (!audioCtx || !this.padGain)
            return

        rampAudioParam(audioCtx, this.padGain.gain, 0, fadeTime)
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

export function setupChords() {
    chords.forEach(chord => {
        chord.setup()
    })

    if (firstChordQueued) {
        currentChord.fadePadIn(3)
    }
}