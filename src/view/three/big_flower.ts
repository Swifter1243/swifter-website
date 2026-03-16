import { THREE } from "../../deps";
import { setCameraDistance } from "./camera";
import type { IDisposable } from "./disposable";
import { Flower } from "./flower";
import { Interactable } from "./interactable";
import { onRender } from "./renderer";
import { flowerBaseGeometry, rootsGeometry } from "./resources";
import { OCEAN_Y_LEVEL } from "./scene";

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
                varying vec3 vWorldPosition;
                varying vec2 vUV;

                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;

                    vUV = uv;
                    gl_Position = projectionMatrix * viewMatrix * worldPosition;
                }
            `,
            fragmentShader: `
                varying vec2 vUV;
                varying vec3 vWorldPosition;
                uniform float time;

                void main() {
                    float timeSpeedup = smoothstep(1.0, 8.0, time);

                    float v = smoothstep(0.0, mix(0.5, 40.0, timeSpeedup), pow(time, 2.0) * 4.0 - vUV.y);

                    float oceanDelta = vWorldPosition.y - ${OCEAN_Y_LEVEL.toFixed(2)};
                    float disappearDepth = -1.5;
                    v *= smoothstep(disappearDepth, 0.0, oceanDelta);

                    v *= mix(0.2, 1.0, smoothstep(20.0, 10.0, vUV.y));

                    gl_FragColor = vec4(v);
                }
            `
        });
        this.roots = new THREE.Mesh(rootsGeometry, this.rootsMaterial)
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