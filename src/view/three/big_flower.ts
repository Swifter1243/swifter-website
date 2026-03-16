import { THREE } from "../../deps";
import { setCameraDistance } from "./camera";
import type { IDisposable } from "./disposable";
import { Flower } from "./flower";
import { Interactable } from "./interactable";
import { onRender } from "./renderer";
import { flowerBaseGeometry, rootsGeometry } from "./resources";

export class BigFlower implements IDisposable {
    interactable: Interactable
    parent: THREE.Object3D
    outerFlower: Flower
    innerFlower: Flower
    base: THREE.Mesh
    roots: THREE.Mesh
    rootsMaterial: THREE.ShaderMaterial

    constructor(parent: THREE.Object3D) {
        this.parent = parent
        this.interactable = new Interactable(1, parent)
        
        this.outerFlower = new Flower(this.parent, 5, 0.7)
        this.outerFlower.content.scale.setScalar(0.4)
        this.outerFlower.petals.forEach(petal => {
            petal.model.scale.set(1, 1, 0.8)
        })

        this.innerFlower = new Flower(this.parent, 5, 0.3)
        this.innerFlower.content.scale.setScalar(0.3)
        this.innerFlower.petals.forEach(petal => {
            petal.model.scale.set(1, 1, 0.7)
            petal.model.rotateZ(-0.2)
        })
        this.innerFlower.content.rotateY((Math.PI * 2) / (this.innerFlower.petals.length * 2))

        this.base = new THREE.Mesh(flowerBaseGeometry, new THREE.MeshPhongMaterial({ color: '#000000', side: THREE.DoubleSide }))
        this.base.translateY(-0.01)
        this.base.scale.setScalar(0.3)
        this.parent.add(this.base)

        this.rootsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0}
            },
            vertexShader: `
                varying vec2 vUV;

                void main() {
                    vUV = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUV;
                uniform float time;

                void main() {
                    float v = smoothstep(0.0, 0.5, pow(time, 2.0) * 4.0 - vUV.y);

                    gl_FragColor = vec4(v);
                }
            `
        });
        this.roots = new THREE.Mesh(rootsGeometry, this.rootsMaterial)
        this.roots.position.set(0, -0.3, 0)
        this.parent.add(this.roots)
    }

    bloom() {
        this.outerFlower.open()
        this.innerFlower.open()
        setCameraDistance(5)

        onRender.subscribe((dt) => {
            this.rootsMaterial.uniforms.time.value += dt
        })
    }

    dispose() {
        this.interactable.dispose()
        this.outerFlower.dispose()
        this.parent.remove(this.base)
        this.parent.remove(this.roots)
        this.innerFlower.dispose()
    }
}