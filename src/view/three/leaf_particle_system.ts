import type { Object3D } from "three"
import { THREE } from "../../deps"
import { scene } from "./main"
import { onRender } from "./renderer"
import { reparentKeepWorldTransform } from "../../utilities/three"

export type LeafParticle = {
    lifetime: number,
    time: number,
    mesh: THREE.Mesh,
    velocityY: number
}

export class LeafParticleSystem {
    parent: Object3D
    particles: LeafParticle[] = []

    constructor(parent: Object3D) {
        this.parent = parent
    }

    step(deltaTime: number): void {
        this.particles = this.particles.filter(particle => this.stepParticle(deltaTime, particle))
    }

    private stepParticle(deltaTime: number, particle: LeafParticle): boolean {
        particle.time += deltaTime
        particle.mesh.scale.setScalar(1 - particle.time / particle.lifetime)
        particle.velocityY -= deltaTime * 2
        particle.mesh.position.y += particle.velocityY * deltaTime

        if (particle.time >= particle.lifetime) {
            this.parent.remove(particle.mesh)
            return false
        }
        return true
    }

    add(particle: LeafParticle, oldParent: Object3D) {
        reparentKeepWorldTransform(particle.mesh, this.parent)
        oldParent.remove(particle.mesh)
        this.particles.push(particle)
    }
}

export function initLeafParticleSystem() {
    leafParticleSystem = new LeafParticleSystem(scene)
    onRender.subscribe((deltaTime) => leafParticleSystem.step(deltaTime))
}

export let leafParticleSystem: LeafParticleSystem