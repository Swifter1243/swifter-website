import { THREE } from "../../deps";
import { scene } from "./main";

export async function initScene() {
    const point = new THREE.PointLight('#feffd7', 2, 0.8, 1.6)
    point.position.set(0, 0.2, 0)
    createSky()

    scene.add(point)
}

function createSky() {
    const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
            horizonColor: { value: new THREE.Color('#00060f') },
            zenithColor: { value: new THREE.Color(0x000000) }
        },
        depthWrite: false,
        vertexShader: `
            varying vec3 vPos;

            void main() {
                vPos = position.xyz;
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vPos;
            uniform vec3 horizonColor;
            uniform vec3 zenithColor;

            void main() {
                float t = 1.0 - pow(1.0 - abs(vPos.y), 3.0);

                vec3 color = mix(horizonColor, zenithColor, t);
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });
    const skyGeo = new THREE.SphereGeometry(1, 32, 15);
    const mesh = new THREE.Mesh(skyGeo, skyMat)
    mesh.scale.setScalar(300)

    scene.add(mesh)
}