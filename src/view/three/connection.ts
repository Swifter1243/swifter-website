import { THREE } from "../../deps";
import { onRender } from "./renderer";

export class Connection {
    readonly scene: THREE.Scene
    readonly startPos: THREE.Vector3
    readonly startTangent: THREE.Vector3
    readonly endPos: THREE.Vector3
    readonly endTangent: THREE.Vector3
    readonly mesh: THREE.Mesh

    private readonly curve: THREE.Curve<THREE.Vector3>
    private readonly updateMethod: () => void
    private readonly startControlPoint = new THREE.Vector3()
    private readonly endControlPoint = new THREE.Vector3()

    private updateControlPoints() {
        this.startControlPoint.addVectors(this.startPos, this.startTangent)
        this.endControlPoint.addVectors(this.endPos, this.endTangent)
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
        startPos: THREE.Vector3,
        startTangent: THREE.Vector3,
        endPos: THREE.Vector3, 
        endTangent: THREE.Vector3
    ) {
        this.scene = scene
        this.startPos = startPos
        this.startTangent = startTangent
        this.endPos = endPos
        this.endTangent = endTangent
        
        this.updateControlPoints()
        this.curve = new THREE.CubicBezierCurve3(startPos, this.startControlPoint, this.endControlPoint, endPos)

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