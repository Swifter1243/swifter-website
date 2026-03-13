<script lang="ts">
    type Shader = {
        name: string,
        description: string,
        src: string,
        url: string
    }

    const shaders: Shader[] = [
        {
            name: "Parallax Occlusion Mapping",
            description: "An exploration of parallax occlusion mapping utilizing raymarching.",
            src: "/shadertoy%20shaders/pom.gif",
            url: "https://www.shadertoy.com/view/3fXBzn"
        },
        {
            name: "Height & Normal Canvas",
            description: "An exploration of persistent buffers.",
            src: "/shadertoy%20shaders/height canvas.gif",
            url: "https://www.shadertoy.com/view/3clBRn"
        },
        {
            name: "3D Reflections/Lighting Test",
            description: "An exploration of raymarching to create shadows and reflections.",
            src: "/shadertoy%20shaders/reflections test.gif",
            url: "https://www.shadertoy.com/view/mtlczf"
        },
        {
            name: "Desert Scene",
            description: "An exploration of realistic raymarched scenes.",
            src: "/shadertoy%20shaders/desert.gif",
            url: "https://www.shadertoy.com/view/mlXyD2"
        },
        {
            name: "Tungsten Cube Recursion",
            description: "An exploration of time and light warping.",
            src: "/shadertoy%20shaders/tungsten cube.gif",
            url: "https://www.shadertoy.com/view/lcyyWV"
        },
        {
            name: "4D Raymarcher",
            description: "An exploration of transformations in four spatial dimensions.",
            src: "/shadertoy%20shaders/4d renderer.gif",
            url: "https://www.shadertoy.com/view/XcSfWW"
        },
        {
            name: "Spatial Repetition/Rotation Test",
            description: "An exploration of spatial repetition and rotation matrices.",
            src: "/shadertoy%20shaders/spatial repetition.gif",
            url: "https://www.shadertoy.com/view/ctsyRj"
        },
        {
            name: "Stylized Lens Flare",
            description: "An exploration of advanced visual effects utilizing vector operations.",
            src: "/shadertoy%20shaders/lens flare.gif",
            url: "https://www.shadertoy.com/view/ddcXRN"
        },
        {
            name: "Wallpaper Style Hexagon Grid",
            description: "An exploration of hexagonal grids.",
            src: "/shadertoy%20shaders/hexagon wallpaper.gif",
            url: "https://www.shadertoy.com/view/dtfBRn"
        },
    ]
</script>

<p>
    <a href="https://www.shadertoy.com/">ShaderToy</a> is a website that allows
    you to run GLSL on the web for simple shaders and acts like a social media
    site where you can share said shaders.
</p>
<p>
    I used ShaderToy to learn shader programming, exploring various graphics
    concepts.
</p>

<div class="spacer"></div>

<h2>Here are some of my favorite shaders I made.</h2>

<div class="content-row" style="align-items: start">
    {#each shaders as shader}
        <div class="linked-descripted-item">
            <img src={shader.src} alt="">
            <br>
            <a href={shader.url}>{shader.name}</a>
            <p>{shader.description}</p>
        </div>
    {/each}
</div>