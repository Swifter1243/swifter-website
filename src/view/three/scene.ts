import { THREE } from "../../deps";
import { lerp, randomRange } from "../../utilities/math";
import { updateObliqueMatrix } from "../../utilities/three";
import { camera, renderer, scene } from "./main";
import { onRender } from "./renderer";
import { mountainPieceGeometry, oceanNormalTexture } from "./resources";

export const OCEAN_Y_LEVEL = -3

export async function initScene() {
    const point = new THREE.PointLight('#feffd7', 2, 0.8, 1.6)
    point.position.set(0, 0.2, 0)
    scene.add(point)

    createSky()
    createMountains()
    createOcean()
}

function createSky() {
    const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
            horizonColor: { value: new THREE.Color('#001026') },
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
                float t = 1.0 - pow(1.0 - abs(vPos.y), 20.0);

                vec3 color = mix(horizonColor, zenithColor, t);
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });
    const skyGeo = new THREE.SphereGeometry(1, 32, 15);
    const mesh = new THREE.Mesh(skyGeo, skyMat)
    mesh.scale.setScalar(900)

    scene.add(mesh)
}

function createMountains() {
    const count = 200;

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const mesh = new THREE.InstancedMesh(mountainPieceGeometry, material, count);

    const dummy = new THREE.Object3D();

    let angle = 0
    for (let i = 0; i < count; i++) {
        const dist = randomRange(100, 600)
        angle = angle + 0.2
        const baseScale = lerp(0.4, 6, Math.pow(Math.random(), 3.0))

        dummy.position.set(Math.cos(angle) * dist, OCEAN_Y_LEVEL - baseScale * 0.1, Math.sin(angle) * dist);
        dummy.scale.set(baseScale, baseScale * randomRange(0.4, 1.6), baseScale)
        dummy.rotation.set(randomRange(0, 0.8), randomRange(0, Math.PI * 2), 0, 'YXZ')

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    scene.add(mesh)
}

function createOcean() {
    const dpr = window.devicePixelRatio ?? 1;
    const reflectTarget = new THREE.WebGLRenderTarget(window.innerWidth * dpr / 2, window.innerHeight * dpr / 2, {
        type: THREE.HalfFloatType,
        generateMipmaps: false
    });
    const reflectCamera = new THREE.PerspectiveCamera();

    const oceanGeometry = new THREE.PlaneGeometry(1000, 1000);
    const oceanMaterial = new THREE.ShaderMaterial({
        uniforms: {
            reflectionTexture: { value: reflectTarget.texture },
            normalMap: { value: oceanNormalTexture },
            time: {value: 0}
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            varying vec4 vUvReflection;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                vUvReflection = gl_Position;
            }
        `,
        fragmentShader: `
            uniform sampler2D reflectionTexture;
            uniform sampler2D normalMap;
            uniform float time;
            varying vec3 vWorldPosition;
            varying vec4 vUvReflection;

            void main() {
                // Calculate distortion from normal map
                vec2 distortion = (texture2D(normalMap, vWorldPosition.xz * 0.01 + time * 0.01).rg * 2.0 - 1.0) * 0.05;

                // Projective mapping (NDC to UV)
                vec2 uv = (vUvReflection.xy / vUvReflection.w) * 0.5 + 0.5;
                uv.y = 1.0 - uv.y;
                
                vec3 reflection = texture2D(reflectionTexture, uv + distortion).rgb;
                gl_FragColor = vec4(reflection, 1.0);
            }
        `
    });

    const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -OCEAN_Y_LEVEL + 1);

    onRender.subscribe((dt: number) => {
        reflectCamera.copy(camera);
        
        // position
        camera.getWorldPosition(reflectCamera.position)
        reflectCamera.position.y = OCEAN_Y_LEVEL - (reflectCamera.position.y - OCEAN_Y_LEVEL)
        
        const target = new THREE.Vector3();
        camera.getWorldDirection(target);
        target.y *= -1;
        reflectCamera.lookAt(reflectCamera.position.clone().add(target));

        // oblique projection
        reflectCamera.updateProjectionMatrix()
        reflectCamera.updateMatrixWorld()
        updateObliqueMatrix(reflectCamera, waterPlane);

        // render
        ocean.visible = false;
        renderer.setRenderTarget(reflectTarget);
        renderer.render(scene, reflectCamera);
        renderer.setRenderTarget(null);
        ocean.visible = true;

        oceanMaterial.uniforms.time.value += dt;
    })

    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = OCEAN_Y_LEVEL
    scene.add(ocean)
}