import { THREE } from "../../deps";
import { onRender } from "./renderer";

export class Connection {
    readonly scene: THREE.Scene
    readonly startPoint: THREE.Vector3
    readonly startNormal: THREE.Vector3
    readonly endPoint: THREE.Vector3
    readonly endNormal: THREE.Vector3
    readonly mesh: THREE.Mesh

    private readonly curve: THREE.Curve<THREE.Vector3>
    private readonly updateMethod: () => void
    private readonly startControlPoint = new THREE.Vector3()
    private readonly endControlPoint = new THREE.Vector3()

    private updateControlPoints() {
        this.startControlPoint.addVectors(this.startPoint, this.startNormal)
        this.endControlPoint.addVectors(this.endPoint, this.endNormal)
    }

    private getGeometry() {
        return new THREE.TubeGeometry( this.curve, 20, 0.005, 4 )
    }

    private update() {
        this.updateControlPoints()

        this.mesh.geometry.dispose()
        this.mesh.geometry = this.getGeometry()
    }

    constructor(
        scene: THREE.Scene,
        startPoint: THREE.Vector3,
        startNormal: THREE.Vector3,
        endPoint: THREE.Vector3, 
        endNormal: THREE.Vector3
    ) {
        this.scene = scene
        this.startPoint = startPoint
        this.startNormal = startNormal
        this.endPoint = endPoint
        this.endNormal = endNormal
        
        this.updateControlPoints()
        this.curve = new THREE.CubicBezierCurve3(startPoint, this.startControlPoint, this.endControlPoint, endPoint)

        const material = new THREE.MeshBasicMaterial({ color: '#ffffff' })
        this.mesh = new THREE.Mesh( this.getGeometry(), material )

        this.updateMethod = () => this.update()

        scene.add(this.mesh)
        onRender.subscribe(this.updateMethod)
    }

    dispose() {
        onRender.unsubscribe(this.updateMethod)
        this.scene.remove(this.mesh)
    }
}