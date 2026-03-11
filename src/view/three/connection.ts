import { Object3D } from "three";
import { THREE } from "../../deps";
import { lerp, randomRange } from "../../utilities/math";
import { alignLocalUp } from "../../utilities/three";
import type { IDisposable } from "./disposable";
import { leafParticleSystem } from "./leaf_particle_system";
import { leafPool, type PooledInstance } from "./pooling";
import { addUpdateable, removeUpdateable, type IUpdateable } from "./updateable";

type Leaf = {
    instance: PooledInstance
    t: number,
    rotation: THREE.Quaternion,
    scale: number
}

export class Connection implements IDisposable, IUpdateable {
    readonly parent: THREE.Object3D
    readonly startPoint: THREE.Vector3
    readonly startNormal: THREE.Vector3
    readonly endPoint: THREE.Vector3
    readonly endNormal: THREE.Vector3
    readonly mesh: THREE.Mesh
    readonly dummy: THREE.Object3D
    readonly branchMaterial: THREE.MeshBasicMaterial

    private readonly width: number
    private readonly brightness: number
    private readonly curve: THREE.Curve<THREE.Vector3>
    private readonly startControlPoint = new THREE.Vector3()
    private readonly endControlPoint = new THREE.Vector3()
    private readonly leaves: Leaf[] = []

    private updateControlPoints() {
        this.startControlPoint.addVectors(this.startPoint, this.startNormal)
        this.endControlPoint.addVectors(this.endPoint, this.endNormal)
    }

    private getGeometry() {
        return new THREE.TubeGeometry( this.curve, 20, this.width, 4 )
    }

    update(_: number) {
        this.updateControlPoints()
        this.updateGeometry()
    }

    private updateGeometry() {
        this.mesh.geometry.dispose()
        this.mesh.geometry = this.getGeometry()

        this.leaves.forEach(leaf => {
            alignLocalUp(this.dummy, this.curve.getTangent(leaf.t))
            this.dummy.quaternion.multiply(leaf.rotation)
            this.dummy.position.copy(this.curve.getPoint(leaf.t))
            this.dummy.scale.setScalar(leaf.scale)
            this.dummy.updateMatrixWorld()
            leafPool.mesh.setMatrixAt(leaf.instance.index, this.dummy.matrixWorld)
            leafPool.mesh.instanceMatrix.needsUpdate = true
        })
    }

    constructor(
        parent: THREE.Object3D,
        startPoint: THREE.Vector3,
        startNormal: THREE.Vector3,
        endPoint: THREE.Vector3, 
        endNormal: THREE.Vector3,
        importance: number,
        length: number
    ) {
        this.parent = parent
        this.startPoint = startPoint
        this.startNormal = startNormal
        this.endPoint = endPoint
        this.endNormal = endNormal
        this.width = lerp(0.6, 1.3, importance) * 0.005
        this.brightness = 1

        addUpdateable(this)

        this.dummy = new Object3D()
        this.parent.add(this.dummy)
        
        this.updateControlPoints()
        this.curve = new THREE.CubicBezierCurve3(startPoint, this.startControlPoint, this.endControlPoint, endPoint)

        this.branchMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        this.branchMaterial.color.setScalar(this.brightness)
        this.mesh = new THREE.Mesh( this.getGeometry(), this.branchMaterial )

        parent.add(this.mesh)

        const leafColor = new THREE.Color().setScalar(this.brightness)
        for (let u = randomRange(0.3, 0.7); u < length; u += randomRange(0.5, 0.6)) {
            const t = u / length
            const instance = leafPool.get()

            alignLocalUp(this.dummy, this.curve.getTangent(t))
            const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, randomRange(0, Math.PI * 2), 0, 'YXZ'))
            const scale = randomRange(0.08, 0.12)
            
            this.dummy.quaternion.multiply(rotation)
            this.dummy.position.copy(this.curve.getPoint(t))
            this.dummy.scale.setScalar(scale)
            this.dummy.updateMatrixWorld()
            leafPool.mesh.setMatrixAt(instance.index, this.dummy.matrixWorld)
            leafPool.mesh.setColorAt(instance.index, leafColor)
            
            this.leaves.push({ instance, t, rotation, scale })
        }

        leafPool.mesh.instanceMatrix.needsUpdate = true
        leafPool.mesh.instanceColor!.needsUpdate = true
    }

    enable() {
        this.branchMaterial.color.setScalar(this.brightness)

        const leafColor = new THREE.Color().setScalar(this.brightness)
        this.leaves.forEach(leaf => {
            leafPool.mesh.setColorAt(leaf.instance.index, leafColor)
        })
        leafPool.mesh.instanceColor!.needsUpdate = true
    }

    disable() {
        this.branchMaterial.color.setScalar(0.1)

        const leafColor = new THREE.Color().setScalar(0.1)
        this.leaves.forEach(leaf => {
            leafPool.mesh.setColorAt(leaf.instance.index, leafColor)
        })
        leafPool.mesh.instanceColor!.needsUpdate = true
    }

    dispose() {
        const parentWorldScale = new THREE.Vector3()
        this.parent.getWorldScale(parentWorldScale)
    
        this.mesh.geometry.dispose()
        this.branchMaterial.dispose()
        this.parent.remove(this.mesh)
        this.parent.remove(this.dummy)
        removeUpdateable(this)

        this.leaves.forEach(leaf => {
            const originalScale = new THREE.Vector3().copy(parentWorldScale)
            originalScale.multiplyScalar(leaf.scale)

            leafParticleSystem.add({
                time: 0,
                lifetime: randomRange(0.1, 1),
                instance: leaf.instance,
                velocityY: randomRange(0, 0.2),
                velocityLocalZ: randomRange(0.3, 0.7) * originalScale.x,
                originalScale: originalScale,
                matrix: new THREE.Matrix4()
            })
        })
    }
}