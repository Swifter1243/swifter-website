import { THREE } from "../../deps";
import { lerp, randomRange } from "../../utilities/math";
import { SmoothNumber } from "../../utilities/smooth_value";
import { updateObliqueMatrix } from "../../utilities/three";
import { camera, renderer, scene } from "./main";
import { onRender } from "./renderer";
import { fogTexture, lillyPadGeometry, mountainPieceGeometry, oceanNormalTexture, smallFlowerGeometry } from "./resources";

export const OCEAN_Y_LEVEL = -3
const skyFactor = new SmoothNumber(0, 0.7)
const flowerViewDistance = new SmoothNumber(0, 0.3)

const horizonBaseColor = new THREE.Color('#001026')
const currentHorizonColor = new THREE.Color(0, 0, 0)

export async function initScene() {
    const point = new THREE.PointLight('#feffd7', 2, 0.8, 1.6)
    point.position.set(0, 0.2, 0)
    scene.add(point)

    createSky()
    createMountains()
    createOcean()
    createFlowers()
    createFog()
    createFoliage()

    onRender.subscribe(dt => {
        skyFactor.update(dt)
        currentHorizonColor.copy(horizonBaseColor)
        currentHorizonColor.multiplyScalar(skyFactor.current)
    })
}

export function revealScene() {
    skyFactor.set(1)
    flowerViewDistance.set(1500)
}

function createSky() {
    const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
            horizonColor: { value: currentHorizonColor },
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
    const texWidth = window.innerWidth * dpr / 2
    const texHeight = window.innerHeight * dpr / 2

    const reflectTarget = new THREE.WebGLRenderTarget(texWidth, texHeight, {
        type: THREE.HalfFloatType,
        generateMipmaps: false
    });
    reflectTarget.depthTexture = new THREE.DepthTexture(texWidth, texHeight)
    const reflectCamera = new THREE.PerspectiveCamera();

    const oceanGeometry = new THREE.PlaneGeometry(1000, 1000);
    const oceanMaterial = new THREE.ShaderMaterial({
        uniforms: {
            reflectionTexture: { value: reflectTarget.texture },
            normalMap: { value: oceanNormalTexture },
            time: {value: 0},
            depthTexture: { value: reflectTarget.depthTexture },
            cameraNear: { value: reflectCamera.near },
            cameraFar: { value: reflectCamera.far }
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
            #include <packing>

            uniform sampler2D reflectionTexture;
            uniform sampler2D normalMap;
            uniform float time;
            varying vec3 vWorldPosition;
            varying vec4 vUvReflection;
            uniform sampler2D depthTexture;
            uniform float cameraNear;
            uniform float cameraFar;

            float getDepth(const in vec2 uv) {
                return texture2D(depthTexture, uv).x;
            }

            void main() {
                // Calculate distortion from normal map
                vec2 distortion = (texture2D(normalMap, vWorldPosition.xz * 0.01 + time * 0.01).rg * 2.0 - 1.0) * 0.02;

                // Projective mapping (NDC to UV)
                vec2 uv = (vUvReflection.xy / vUvReflection.w) * 0.5 + 0.5;
                uv.y = 1.0 - uv.y;

                float depth = getDepth(uv);
                float mask = smoothstep(0.0, 0.1, depth); 
                distortion *= mask;
                
                vec3 reflection = texture2D(reflectionTexture, uv + distortion).rgb;
                gl_FragColor = vec4(reflection, 1.0);
            }
        `
    });

    const planeMargin = 0.1
    const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -OCEAN_Y_LEVEL + planeMargin);

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

function createFlowers() {
    const colors = [
        '#F98FFF', 
        '#968FFF', 
        '#7298CC',
        '#1869D6',
        '#64F5FC',
        '#5B7DE6',
        '#8C64B8',
        '#FF00FD',
        '#21D3FF',
        '#2157FF',
        '#4900FF',
        '#00FFFC',
        '#7E78C1',
        '#DC96F1',
        '#FA509E',
        '#9B509E',
        '#4DBBCB'
    ]

    const count = 800;

    const material = new THREE.ShaderMaterial({
        uniforms: {
            viewDistance: { value: 0 }
        },
        vertexShader: `
            varying vec3 vColor;
            uniform float viewDistance;

            void main() {
                vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
                float worldLength = length(worldPos.xz);
                const float fadeRegion = 200.0;
                float brightness = smoothstep(viewDistance, viewDistance - fadeRegion, worldLength);

                vColor = instanceColor * brightness;
                gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;

            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
        `
    });

    const mesh = new THREE.InstancedMesh(smallFlowerGeometry, material, count);

    const dummy = new THREE.Object3D();

    const color = new THREE.Color();
    let angle = 0
    for (let i = 0; i < count; i++) {
        const dist = randomRange(20, 900)
        angle = angle + 0.2
        const baseScale = lerp(0.3, 0.6, Math.pow(Math.random(), 3.0))

        dummy.position.set(Math.cos(angle) * dist, OCEAN_Y_LEVEL - baseScale * 0.1, Math.sin(angle) * dist);
        dummy.scale.set(baseScale, baseScale, baseScale)
        dummy.rotation.set(randomRange(0, 0.8), randomRange(0, Math.PI * 2), 0, 'YXZ')

        const colorIndex = Math.floor(Math.random() * colors.length)
        color.set(colors[colorIndex]); 
        color.multiplyScalar(3)
        mesh.setColorAt(i, color);

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceColor!.needsUpdate = true;

    onRender.subscribe(dt => {
        flowerViewDistance.update(dt)
        material.uniforms.viewDistance.value = flowerViewDistance.current
    })

    scene.add(mesh)
}

function createFog() {
    const bigCount = 15;
    const smallCount = 40;
    const totalCount = bigCount + smallCount;

    const material = new THREE.ShaderMaterial({
        uniforms: {
            map: { value: fogTexture },
            color: { value: currentHorizonColor },
            time: { value: 0 }
        },
        vertexShader: `
            attribute vec2 uvOffset;
            varying vec2 vCenterUv;
            varying vec2 vMapUv;
            varying float vWorldY;

            void main() {
                vCenterUv = uv * 2.0 - 1.0;
                vMapUv = uv + uvOffset;

                vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
                vWorldY = worldPos.y - ${OCEAN_Y_LEVEL.toFixed(2)};
                gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
        `,
        fragmentShader: `
            varying vec2 vCenterUv;
            varying vec2 vMapUv;
            varying float vWorldY;
            uniform sampler2D map;
            uniform vec3 color;
            uniform float time;

            void main() {
                float fog = texture2D(map, vMapUv + time * 0.01).r;
                float vignette = smoothstep(1.0, 0.2, length(vCenterUv));
                float value = max(pow(fog, 2.0), 0.0) * 1.0 * vignette;
                value *= smoothstep(0.0, 1.0, vWorldY);

                gl_FragColor = vec4(value * color, 1.0);

                // gl_FragColor = vec4(0.5,0,0,1.0);
            }
        `,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const geometry = new THREE.PlaneGeometry(1, 1)
    geometry.translate(0, 0.5, 0)
    const mesh = new THREE.InstancedMesh(geometry, material, totalCount);
    const uvOffsets = new Float32Array(totalCount * 2);

    const dummy = new THREE.Object3D();
    const eye = new THREE.Vector3(0, OCEAN_Y_LEVEL, 0)

    let angle = 0
    let moveAngle = Math.PI * 2 / bigCount
    for (let i = 0; i < bigCount; i++) {
        uvOffsets[i * 2 + 0] = Math.random()
        uvOffsets[i * 2 + 1] = Math.random()

        const dist = randomRange(50, 300)
        angle += moveAngle
        const arcLength = moveAngle * dist

        dummy.position.set(Math.cos(angle) * dist, OCEAN_Y_LEVEL, Math.sin(angle) * dist);
        dummy.scale.set(arcLength, randomRange(10, 20), 1.0)
        dummy.lookAt(eye)

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    angle = 0
    moveAngle = Math.PI * 2 / smallCount
    for (let i = bigCount; i < totalCount; i++) {
        uvOffsets[i * 2 + 0] = Math.random()
        uvOffsets[i * 2 + 1] = Math.random()

        const dist = randomRange(10, 100)
        angle += moveAngle

        dummy.position.set(Math.cos(angle) * dist, OCEAN_Y_LEVEL, Math.sin(angle) * dist);
        dummy.scale.set(10, randomRange(1, 3), 1.0)
        dummy.lookAt(eye)

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    geometry.setAttribute('uvOffset', new THREE.InstancedBufferAttribute(uvOffsets, 2));

    onRender.subscribe((dt) => {
        material.uniforms.time.value += dt
    })

    scene.add(mesh)
}

function createFoliage() {
    const dummy = new THREE.Object3D();
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const lillyCount = 800;
    const lillyPads = new THREE.InstancedMesh(lillyPadGeometry, material, lillyCount);

    let angle = 0
    for (let i = 0; i < lillyCount; i++) {
        const dist = randomRange(10, 500)
        angle += Math.PI * 2 / lillyCount
        const baseScale = lerp(0.4, 2, Math.pow(Math.random(), 3.0))

        dummy.position.set(Math.cos(angle) * dist, OCEAN_Y_LEVEL, Math.sin(angle) * dist);
        dummy.scale.set(baseScale, 1, baseScale)
        dummy.rotation.set(0, randomRange(0, Math.PI * 2), 0)

        dummy.updateMatrix();
        lillyPads.setMatrixAt(i, dummy.matrix);
    }

    scene.add(lillyPads)
}