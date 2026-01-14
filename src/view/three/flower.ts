import { THREE } from "../../deps";
import { cloneFbx } from "../../utilities/three";
import type { IDisposable } from "./disposable";
import { onRender } from "./renderer";
import { petalAnimations, petalFbx, type PetalAnimationNames } from "./resources";

type Petal = {
    mixer: THREE.AnimationMixer,
    fbx: THREE.Object3D,
    actions: Record<string, THREE.AnimationAction>
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

        console.log(petalFbx.animations.map(a => ({
            name: a.name,
            duration: a.duration,
            tracks: a.tracks.map(t => ({ name: t.name, times: t.times.length }))
        })));

        for (let i = 0; i < count; i++) {
            const fbx = cloneFbx(petalFbx)
            this.content.add(fbx)

            const mixer = new THREE.AnimationMixer(fbx)
            const actions: Record<PetalAnimationNames, THREE.AnimationAction> = {} as Record<PetalAnimationNames, THREE.AnimationAction>

            for (const name in petalAnimations) {
                const safeName = name as PetalAnimationNames
                actions[safeName] = mixer.clipAction(petalAnimations[safeName])
            }

            const closeAction = actions['Petal|Idle']
            closeAction.reset()
            closeAction.setEffectiveWeight(1);
            closeAction.timeScale = 30
            closeAction.play()

            this.petals.push({
                fbx,
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
        // TODO
    }

    close() {
        // TODO
    }

    dispose(): void {
        this.petals.forEach(petal => {
            this.content.remove(petal.fbx)
        })
        onRender.unsubscribe(this.stepFunction)
        
        this.parent.remove(this.content)
    }
}