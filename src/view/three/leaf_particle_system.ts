import { THREE } from "../../deps"
import { scene } from "./main"
import { onRender } from "./renderer"
import { leafPool, type PooledInstance } from "./pooling"

export type LeafParticle = {
    lifetime: number,
    time: number,
    instance: PooledInstance,
    matrix: THREE.Matrix4
    velocityY: number
    velocityLocalZ: number,
    originalScale: THREE.Vector3
}

export class LeafParticleSystem {
    parent: THREE.Object3D
    dummy: THREE.Object3D
    particles: LeafParticle[] = []

    constructor(parent: THREE.Object3D) {
        this.parent = parent
        this.dummy = new THREE.Object3D()
        this.parent.add(this.dummy)
    }

    update(deltaTime: number): void {
        this.particles = this.particles.filter(particle => this.stepParticle(deltaTime, particle))
    }

    private stepParticle(deltaTime: number, particle: LeafParticle): boolean {
        particle.time += deltaTime
        particle.velocityY -= deltaTime * 2
        particle.velocityLocalZ += deltaTime * 0.4
        
        particle.matrix.decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale)
        this.dummy.scale.copy(particle.originalScale).multiplyScalar(1 - particle.time / particle.lifetime)
        this.dummy.position.y += particle.velocityY * deltaTime
        this.dummy.translateZ(particle.velocityLocalZ * deltaTime)
        this.dummy.updateMatrix()
        leafPool.mesh.setMatrixAt(particle.instance.index, this.dummy.matrix)
        leafPool.mesh.instanceMatrix.needsUpdate = true
        particle.matrix.copy(this.dummy.matrix)

        if (particle.time >= particle.lifetime) {
            leafPool.release(particle.instance)
            return false
        }
        return true
    }

    add(particle: LeafParticle) {
        leafPool.mesh.getMatrixAt(particle.instance.index, particle.matrix)
        this.particles.push(particle)
    }
}

export function initLeafParticleSystem() {
    leafParticleSystem = new LeafParticleSystem(scene)
    onRender.subscribe((deltaTime) => leafParticleSystem.update(deltaTime))
}

export let leafParticleSystem: LeafParticleSystem