import { THREE } from "../../deps";
import { lerp, randomRange } from "../../utilities/math";
import { isMobile } from "../../utilities/mobile";
import Perlin from "../../utilities/perlin";
import { SmoothNumber } from "../../utilities/smooth_value";
import { updateObliqueMatrix } from "../../utilities/three";
import { camera, renderer, scene } from "./main";
import { onRender } from "./renderer";
import { fogTexture, lillyPadGeometry, mountainPieceGeometry, oceanNormalTexture, smallFlowerGeometry } from "./resources";
import { onWindowResize } from "./window";

export const OCEAN_Y_LEVEL = -3
const skyFactor = new SmoothNumber(0, 0.7)
const flowerViewDistance = new SmoothNumber(0, 0.3)

const horizonBaseColor = new THREE.Color('#001026')
const currentHorizonColor = new THREE.Color(0, 0, 0)
const waveColor = new THREE.Color(0, 0, 0)

export function initScene() {
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
        waveColor.copy(currentHorizonColor)
        waveColor.multiplyScalar(0.65)
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
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
    const mobile = isMobile()

    const dpr = window.devicePixelRatio ?? 1;
    const res = mobile ? 1/4 : 1/2

    const texWidth = window.innerWidth * dpr * res
    const texHeight = window.innerHeight * dpr * res
    let aspect = texWidth / texHeight

    const reflectTarget = new THREE.WebGLRenderTarget(texWidth, texHeight, {
        type: THREE.HalfFloatType,
        generateMipmaps: false
    });
    const reflectCamera = new THREE.PerspectiveCamera();

    let refractTarget: THREE.WebGLRenderTarget
    let refractCamera: THREE.PerspectiveCamera

    const oceanGeometry = new THREE.PlaneGeometry(1000, 1000);
    const oceanMaterial = new THREE.ShaderMaterial({
        uniforms: {
            reflectionTexture: { value: reflectTarget.texture },
            normalMap: { value: oceanNormalTexture },
            waveColor: { value: waveColor  },
            time: {value: 0},
            invAspect: { value: 1 / aspect }
        },
        transparent: true,
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
            #ifndef IS_MOBILE
            uniform sampler2D refractionTexture;
            #endif
            uniform sampler2D normalMap;
            uniform float time;
            uniform float invAspect;
            uniform vec3 waveColor;
            varying vec3 vWorldPosition;
            varying vec4 vUvReflection;

            void main() {
                vec2 planePos = vWorldPosition.xz;

                vec3 normal1 = texture2D(normalMap, planePos * 0.01 + time * 0.01).rgb;
                vec3 normal2 = texture2D(normalMap, planePos * 0.1 + normal1.xz * 0.3 + time * 0.02).rgb;
                vec3 normal = (normal1 + normal2) * 0.5;

                // Calculate distortion from normal map
                vec2 distortion = (normal.xy * 2.0 - 1.0) * 0.07;
                distortion.x *= invAspect;
                distortion.y *= smoothstep(80.0, 20.0, length(planePos));

                // Projective mapping (NDC to UV)
                vec2 screenUV = (vUvReflection.xy / vUvReflection.w) * 0.5 + 0.5;

                vec2 reflectedScreenUV = screenUV;
                reflectedScreenUV.y = 1.0 - reflectedScreenUV.y;
                
                vec3 reflection = texture2D(reflectionTexture, reflectedScreenUV + distortion).rgb;

                #ifdef IS_MOBILE
                vec3 refraction = vec3(0);
                #else
                vec3 refraction = texture2D(refractionTexture, screenUV + distortion).rgb;
                #endif

                const float absorption = 0.8;
                const float transmittance = 0.04;
                vec3 col = mix(reflection * absorption, refraction, transmittance);
                float alignment = dot(normal, vec3(0, 1, 0));

                col += pow(alignment, 2.0) * waveColor;

                #ifdef IS_MOBILE
                gl_FragColor = vec4(col, 1.0 - transmittance);
                #else
                gl_FragColor = vec4(col, 1.0);
                #endif
            }
        `
    });

    if (mobile) {
        oceanMaterial.defines.IS_MOBILE = true
        oceanMaterial.blending = THREE.NormalBlending
    } else {
        refractTarget = new THREE.WebGLRenderTarget(texWidth, texHeight, {
            type: THREE.HalfFloatType,
            minFilter: THREE.LinearFilter,
            generateMipmaps: false
        })
        refractCamera = new THREE.PerspectiveCamera();
        oceanMaterial.uniforms.refractionTexture = { value: refractTarget.texture }
    }

    const reflectionMargin = 0.05
    const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -OCEAN_Y_LEVEL + reflectionMargin);
    const waterOppositePlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), OCEAN_Y_LEVEL);

    onRender.subscribe((dt: number) => {
        reflectionPass()
        
        if (!mobile)
            refractionPass()

        oceanMaterial.uniforms.time.value += dt;
    })

    onWindowResize.subscribe((w, h) => {
        const texWidth = w * dpr * res
        const texHeight = h * dpr * res

        reflectTarget.setSize(texWidth, texHeight)
        if (!mobile) 
            refractTarget.setSize(texWidth, texHeight)

        aspect = texWidth / texHeight
        oceanMaterial.uniforms.invAspect.value = 1 / aspect
    })

    function reflectionPass() {
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
    }

    function refractionPass() {
        refractCamera.copy(camera);
        camera.getWorldPosition(refractCamera.position)
        camera.getWorldQuaternion(refractCamera.quaternion)


        // oblique projection
        refractCamera.updateProjectionMatrix()
        refractCamera.updateMatrixWorld()
        updateObliqueMatrix(refractCamera, waterOppositePlane);

        // render
        ocean.visible = false;
        renderer.setRenderTarget(refractTarget);
        renderer.render(scene, refractCamera);
        renderer.setRenderTarget(null);
        ocean.visible = true;
    }

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
            viewDistance: { value: 0 },
            time: { value: 0}
        },
        vertexShader: `
            varying vec3 vColor;
            uniform float viewDistance;
            uniform float time;

            void main() {
                vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
                float worldLength = length(worldPos.xz);

                float wind = smoothstep(0.0, 0.2, worldPos.y - ${OCEAN_Y_LEVEL.toFixed(2)}) * 0.05;
                worldPos.x += sin(worldPos.x * 0.02 + worldPos.y + time * 4.0) * wind;
                worldPos.z += sin(worldPos.z * 0.1 + worldPos.y + time * 6.0) * wind;

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
    const perlin = new Perlin()

    const color = new THREE.Color();
    let angle = 0
    for (let i = 0; i < count; i++) {
        const dist = randomRange(30, 900)
        angle = angle + 0.2

        const x = Math.cos(angle) * dist
        const z = Math.sin(angle) * dist

        const size = 20
        const noise = perlin.perlin2(x / size, z / size) * 0.5 + 0.5
        const baseScale = lerp(0.2, 0.6, Math.pow(noise, 3))
        const yOffset = Math.pow(1 - noise, 1/2) * 8.5 * baseScale

        dummy.position.set(x, OCEAN_Y_LEVEL - yOffset, z);
        dummy.scale.set(baseScale, baseScale, baseScale)
        dummy.rotation.set(randomRange(0, 0.8), randomRange(0, Math.PI * 2), 0, 'YXZ')

        const colorIndex = Math.floor(Math.random() * colors.length)
        color.set(colors[colorIndex]); 
        color.multiplyScalar(randomRange(2, 4))
        mesh.setColorAt(i, color);

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceColor!.needsUpdate = true;

    onRender.subscribe(dt => {
        flowerViewDistance.update(dt)
        material.uniforms.viewDistance.value = flowerViewDistance.current
        material.uniforms.time.value += dt
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