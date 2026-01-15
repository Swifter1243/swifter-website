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
    velocityLocalZ: number,
    originalScale: THREE.Vector3
}

export class LeafParticleSystem {
    parent: Object3D
    particles: LeafParticle[] = []

    constructor(parent: Object3D) {
        this.parent = parent
    }

    update(deltaTime: number): void {
        this.particles = this.particles.filter(particle => this.stepParticle(deltaTime, particle))
    }

    private stepParticle(deltaTime: number, particle: LeafParticle): boolean {
        particle.time += deltaTime
        particle.mesh.scale.copy(particle.originalScale).multiplyScalar(1 - particle.time / particle.lifetime)
        particle.velocityY -= deltaTime * 2
        particle.velocityLocalZ += deltaTime * 0.4
        particle.mesh.position.y += particle.velocityY * deltaTime
        particle.mesh.translateZ(particle.velocityLocalZ * deltaTime)

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
    onRender.subscribe((deltaTime) => leafParticleSystem.update(deltaTime))
}

export let leafParticleSystem: LeafParticleSystem