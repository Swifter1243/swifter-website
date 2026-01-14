import { THREE } from "../../deps";
import { randomRange } from "../../utilities/math";
import { cloneGltf } from "../../utilities/three";
import type { IDisposable } from "./disposable";
import { onRender } from "./renderer";
import { petalAnimations, petalModel, type PetalAnimationNames } from "./resources";

type Petal = {
    mixer: THREE.AnimationMixer,
    model: THREE.Object3D,
    actions: Record<PetalAnimationNames, THREE.AnimationAction>
}

export class Flower implements IDisposable {
    parent: THREE.Object3D
    content: THREE.Object3D
    petals: Petal[] = []
    stepFunction: (deltaTime: number) => void

    constructor(parent: THREE.Object3D, count = 5) {
        this.parent = parent
        this.content = new THREE.Object3D()
        this.parent.add(this.content)
        this.stepFunction = (deltaTime) => this.step(deltaTime)
        onRender.subscribe(this.stepFunction)

        const yRot = (Math.PI * 2) / count
        for (let i = 0; i < count; i++) {
            const model = cloneGltf(petalModel)
            this.content.add(model)
            model.rotateY(yRot * i)
            model.rotateX(randomRange(-1, 1) * 0.01)
            model.translateX(0.05)
            model.translateY(randomRange(-1, 1) * 0.01)
            model.scale.setScalar(0.4)

            const mixer = new THREE.AnimationMixer(model)
            const actions: Record<PetalAnimationNames, THREE.AnimationAction> = {} as Record<PetalAnimationNames, THREE.AnimationAction>

            for (const name in petalAnimations) {
                const safeName = name as PetalAnimationNames
                actions[safeName] = mixer.clipAction(petalAnimations[safeName])
            }

            const idleAction = actions.Idle
            idleAction.setEffectiveTimeScale(0.3)
            idleAction.time = petalAnimations.Idle.duration * randomRange(0, 0.2)
            idleAction.setEffectiveWeight(0)
            idleAction.play()

            const closeAction = actions.Close
            closeAction.time = petalAnimations.Close.duration
            closeAction.setLoop(THREE.LoopOnce, 1)
            closeAction.clampWhenFinished = true
            closeAction.play()

            const openAction = actions.Open
            openAction.setEffectiveTimeScale(0.5)
            openAction.setLoop(THREE.LoopOnce, 1)
            openAction.clampWhenFinished = true

            this.petals.push({
                model,
                mixer,
                actions
            })
        }
    }

    private step(deltaTime: number) {
        this.petals.forEach(petal => {
            petal.mixer.update(deltaTime)
        })
    }

    open() {
        this.petals.forEach(p => {
            const openAction = p.actions.Open
            openAction.reset()
            openAction.play()

            const closeAction = p.actions.Close
            closeAction.stop()

            const idleAction = p.actions.Idle
            idleAction.setEffectiveWeight(1)
            idleAction.fadeIn(0.3)
        })
    }

    close() {
        // TODO
    }

    dispose(): void {
        this.petals.forEach(petal => {
            this.content.remove(petal.model)
        })
        onRender.unsubscribe(this.stepFunction)
        
        this.parent.remove(this.content)
    }
}