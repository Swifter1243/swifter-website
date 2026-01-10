import { THREE } from "../../deps";
import type { IDisposable } from "./disposable";

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

    private updateControlPoints() {
        this.startControlPoint.addVectors(this.startPoint, this.startNormal)
        this.endControlPoint.addVectors(this.endPoint, this.endNormal)
    }

    private getGeometry() {
        return new THREE.TubeGeometry( this.curve, 20, 0.005, 4 )
    }

    step() {
        this.updateControlPoints()

        this.mesh.geometry.dispose()
        this.mesh.geometry = this.getGeometry()
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
    }

    dispose() {
        this.mesh.geometry.dispose()
        this.material.dispose()
        this.parent.remove(this.mesh)
    }
}