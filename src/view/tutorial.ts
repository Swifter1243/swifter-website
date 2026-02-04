import { Invokable } from "../utilities/invokable"
import { isMobile } from "../utilities/mobile"

const tutorialDiv = document.getElementById('tutorial')!
const tutorialText = document.getElementById('tutorial-text')!

class Tutorial {
    message: string
    delay: number
    transitionIn = 2
    transitionOut = 1.5
    horizontalPosition: number
    
    onComplete = new Invokable()
    isCompleted = false

    constructor(message: string, delay: number, horizontalPosition: number) {
        this.message = message
        this.delay = delay
        this.horizontalPosition = horizontalPosition
    }
    
    complete() {
        if (!this.isCompleted) {
            this.isCompleted = true
            this.onComplete.invoke()
        }
    }
}

export const BUD_TUTORIAL = new Tutorial(`${isMobile() ? 'tap' : 'click'} on a bud to open it.`, 1, 0.6)
BUD_TUTORIAL.transitionOut = 0.25
export const ORBIT_TUTORIAL = new Tutorial(`${isMobile() ? 'use your finger' : 'click'} and drag to move the camera.`, 2, 0.2)

let tutorialQueue: Tutorial[]
let currTimeout = 0

function peek(): Tutorial | undefined {
    return tutorialQueue[tutorialQueue.length - 1]
}

export function initTutorials(tutorials: Tutorial[]) {
    tutorialQueue = [...tutorials].reverse()
    startNextTutorial()
}

function startNextTutorial() {
    const curr = peek()

    if (!curr)
        return

    if (curr.isCompleted) {
        tutorialQueue.pop()
        startNextTutorial()
        return
    }

    tutorialDiv.style.opacity = '0'
    curr.onComplete.subscribe(finishCurrentTutorial)

    currTimeout = setTimeout(() => {
        tutorialDiv.style.opacity = '1'
        tutorialDiv.style.transition = `opacity ${curr.transitionIn}s`
        tutorialDiv.style.top = `${curr.horizontalPosition * 100}%`
        void tutorialDiv.offsetWidth // force reflow since transition cuts off text on mobile. rendering bug!!!
        tutorialText.textContent = curr.message
    }, curr.delay * 1000)
}

function finishCurrentTutorial() {
    const curr = tutorialQueue.pop()

    if (!curr)
        return

    clearTimeout(currTimeout)
    curr.onComplete.unsubscribe(finishCurrentTutorial)
    tutorialDiv.style.transition = `opacity ${curr.transitionOut}s`
    tutorialDiv.style.opacity = '0'
    startNextTutorial()
}