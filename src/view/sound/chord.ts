import { audioContextStarted, audioCtx, masterGain, playOneShot } from "./context";
import { SOUNDS, sounds } from "./resources";

const PAD_GAIN = 0.5

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
        this.padGain.gain.value = 0
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

        const now = audioCtx.currentTime
        this.padGain.gain.cancelScheduledValues(now)
        this.padGain.gain.setValueAtTime(this.padGain.gain.value, now)
        this.padGain.gain.linearRampToValueAtTime(PAD_GAIN, now + fadeTime)
    }

    fadePadOut(fadeTime = 0.5) {
        if (!audioCtx || !this.padGain)
            return

        const now = audioCtx.currentTime
        this.padGain.gain.cancelScheduledValues(now)
        this.padGain.gain.setValueAtTime(this.padGain.gain.value, now)
        this.padGain.gain.linearRampToValueAtTime(0, now + fadeTime)
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
    if (audioContextStarted) {
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
    currentChord.fadePadOut()

    let newChord: Chord | undefined = undefined
    while (!newChord || newChord == currentChord) {
        newChord = chords[Math.floor(Math.random() * chords.length)]
    }
    newChord.fadePadIn()

    currentChord = newChord!
}

export function fadeFirstChordIn() {
    if (audioContextStarted) {
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
        currentChord.fadePadIn()
    }
}