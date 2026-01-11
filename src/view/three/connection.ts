import { THREE } from "../../deps";
import { randomRange } from "../../utilities/math";
import { alignLocalUp } from "../../utilities/three";
import type { IDisposable } from "./disposable";
import { leafParticleSystem } from "./leaf_particle_system";

type Leaf = {
    mesh: THREE.Mesh,
    t: number,
    rotation: THREE.Quaternion
}

export class Connection implements IDisposable {
    readonly parent: THREE.Object3D
    readonly startPoint: THREE.Vector3
    readonly startNormal: THREE.Vector3
    readonly endPoint: THREE.Vector3
    readonly endNormal: THREE.Vector3
    readonly mesh: THREE.Mesh
    readonly material: THREE.Material

    private readonly curve: THREE.Curve<THREE.Vector3>
    private readonly startControlPoint = new THREE.Vector3()
    private readonly endControlPoint = new THREE.Vector3()
    private readonly leaves: Leaf[] = []

    private updateControlPoints() {
        this.startControlPoint.addVectors(this.startPoint, this.startNormal)
        this.endControlPoint.addVectors(this.endPoint, this.endNormal)
    }

    private getGeometry() {
        return new THREE.TubeGeometry( this.curve, 20, 0.005, 4 )
    }

    step() {
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
        endNormal: THREE.Vector3
    ) {
        this.parent = parent
        this.startPoint = startPoint
        this.startNormal = startNormal
        this.endPoint = endPoint
        this.endNormal = endNormal
        
        this.updateControlPoints()
        this.curve = new THREE.CubicBezierCurve3(startPoint, this.startControlPoint, this.endControlPoint, endPoint)

        this.material = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        this.mesh = new THREE.Mesh( this.getGeometry(), this.material )

        parent.add(this.mesh)

        for (let t = randomRange(0.2, 0.5); t < 1; t += randomRange(0.1, 0.5)) {
            const geometry = new THREE.BoxGeometry(0.05, 0.01, 0.05)
            geometry.translate(0, 0, 0.025)
            const mesh = new THREE.Mesh(geometry, this.material)
            this.parent.add(mesh)

            alignLocalUp(mesh, this.curve.getTangent(t))
            const rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), randomRange(0, Math.PI * 2))
            mesh.quaternion.multiply(rotation)
            mesh.position.copy(this.curve.getPoint(t))
            this.leaves.push({ mesh, t, rotation })
        }
    }

    dispose() {
        this.mesh.geometry.dispose()
        this.material.dispose()
        this.parent.remove(this.mesh)

        this.leaves.forEach(leaf => {
            leafParticleSystem.add({
                time: 0,
                lifetime: randomRange(0.1, 1),
                mesh: leaf.mesh,
                velocityY: randomRange(0, 0.2),
                velocityLocalZ: randomRange(0.3, 0.7),
            }, this.parent)
        })
    }
}