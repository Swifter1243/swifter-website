import { THREE } from "../../deps";
import { lerp, randomRange } from "../../utilities/math";
import { alignLocalUp } from "../../utilities/three";
import type { IDisposable } from "./disposable";
import { leafParticleSystem } from "./leaf_particle_system";
import { leafGeometry } from "./resources";
import { addUpdateable, removeUpdateable, type IUpdateable } from "./updateable";

type Leaf = {
    mesh: THREE.Mesh,
    t: number,
    rotation: THREE.Quaternion
}

export class Connection implements IDisposable, IUpdateable {
    readonly parent: THREE.Object3D
    readonly startPoint: THREE.Vector3
    readonly startNormal: THREE.Vector3
    readonly endPoint: THREE.Vector3
    readonly endNormal: THREE.Vector3
    readonly mesh: THREE.Mesh
    readonly branchMaterial: THREE.MeshBasicMaterial
    readonly leafMaterial: THREE.MeshBasicMaterial

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
            alignLocalUp(leaf.mesh, this.curve.getTangent(leaf.t))
            leaf.mesh.quaternion.multiply(leaf.rotation)
            leaf.mesh.position.copy(this.curve.getPoint(leaf.t))
        })
    }

    constructor(
        parent: THREE.Object3D,
        startPoint: THREE.Vector3,
        startNormal: THREE.Vector3,
        endPoint: THREE.Vector3, 
        endNormal: THREE.Vector3,
        importance: number
    ) {
        this.parent = parent
        this.startPoint = startPoint
        this.startNormal = startNormal
        this.endPoint = endPoint
        this.endNormal = endNormal
        this.width = lerp(0.6, 1.3, importance) * 0.005
        this.brightness = 1

        addUpdateable(this)
        
        this.updateControlPoints()
        this.curve = new THREE.CubicBezierCurve3(startPoint, this.startControlPoint, this.endControlPoint, endPoint)

        this.branchMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        this.branchMaterial.color.setScalar(this.brightness)
        this.mesh = new THREE.Mesh( this.getGeometry(), this.branchMaterial )

        parent.add(this.mesh)

        this.leafMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide })
        this.leafMaterial.color.setScalar(this.brightness)

        const max = lerp(0.5, 1, importance)
        for (let u = randomRange(0.05, 0.2); u < max; u += randomRange(0.1, 0.3)) {
            const t = u / max
            const mesh = new THREE.Mesh(leafGeometry, this.leafMaterial)
            this.parent.add(mesh)

            alignLocalUp(mesh, this.curve.getTangent(t))
            const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, randomRange(0, Math.PI * 2), 0, 'YXZ'))
            mesh.quaternion.multiply(rotation)
            mesh.position.copy(this.curve.getPoint(t))
            mesh.scale.setScalar(randomRange(0.08, 0.12))
            this.leaves.push({ mesh, t, rotation })
        }
    }

    enable() {
        this.branchMaterial.color.setScalar(this.brightness)
        this.leafMaterial.color.setScalar(this.brightness)
    }

    disable() {
        this.branchMaterial.color.setScalar(0.1)
        this.leafMaterial.color.setScalar(0.1)
    }

    dispose() {
        this.mesh.geometry.dispose()
        this.branchMaterial.dispose()
        this.parent.remove(this.mesh)
        removeUpdateable(this)

        this.leaves.forEach(leaf => {
            const worldScale = new THREE.Vector3()
            leaf.mesh.getWorldScale(worldScale)

            leafParticleSystem.add({
                time: 0,
                lifetime: randomRange(0.1, 1),
                mesh: leaf.mesh,
                velocityY: randomRange(0, 0.2),
                velocityLocalZ: randomRange(0.3, 0.7) * worldScale.x,
                originalScale: worldScale
            }, this.parent)
        })
    }
}