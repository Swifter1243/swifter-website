<script>
    import DemoButton from "$lib/components/DemoButton.svelte";
import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    import NodeLink from "$lib/components/NodeLink.svelte";
import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";
</script>

<h2>
    BoomBox Remastered is a virtual reality rhythm game about hitting drums with
    drumsticks.
</h2>

<div class="horizontal-center">
    <YoutubeVideo videoId="17WGkOJ7-_k" width="90%" />
</div>

<p>
    It originally released in 2021, but after some struggling with the
    publisher, it was taken offline to be released independently. <br>
    I was hired as a <b>Technical Artist & Programmer</b> to help rebuild the
    project.
</p>

<div class="spacer"></div>

<h2>My Contributions to BoomBox Remastered</h2>

<div class="content-pair-left">
    <ImageCarousel images={[
        {
            src: "/boombox%20remastered/simple japan before.png",
            caption: '"Simple Japan" - Before'
        },
        {
            src: "/boombox%20remastered/simple japan after.png",
            caption: '"Simple Japan" - After'
        },
        {
            src: "/boombox%20remastered/simple city before.png",
            caption: '"Simple City" - Before'
        },
        {
            src: "/boombox%20remastered/simple city after.png",
            caption: '"Simple City" - After'
        },
        {
            src: "/boombox%20remastered/simple alien before.png",
            caption: '"Simple Alien" - Before'
        },
        {
            src: "/boombox%20remastered/simple alien after.png",
            caption: '"Simple Alien" - After'
        },
    ]} />
    <div>
        <p>
            For this project, I took all of the old environments and moved them
            into the new project with updated visuals.
        </p>

        <p>
            I utilized Unity's ShaderGraph to create a standard Lit shader for
            the project, as well as a few other shaders, like my stylized water
            shader.
        </p>

        <p>
            I additionally adjusted lighting, added subtle fog and smoke VFX,
            and made other tweaks to add to the feel of the environment.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/boombox%20remastered/environment scrolling.gif" alt="">
    <div>
        <p>
            The original game's environments only had a fixed length, so I
            created a system to procedurally fit chunks of the environment
            together as the song goes on.
        </p>

        <p>
            It automatically hides and spawns pieces (with a nice little
            animation) and always ensures you start at the start piece and end
            at the end piece.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <ImageCarousel images={[
        {
            src: "/boombox%20remastered/baked before.png",
            caption: 'Broken/missing lightmap UVs.'
        },
        {
            src: "/boombox%20remastered/baked after.png",
            caption: 'Fixed lightmap UVs.'
        }
    ]} />
    <div>
        <p>
            Since we were targetting a full framerate on standalone mobile
            headsets, I needed to pivot from realtime to baked lighting for the
            environments.
        </p>

        <p>
            This introduced some problems with the dynamic environment chunks,
            but after looking into how baked lighting works in Unity, I created
            a system that transfers the lightmap data to the instantiated
            pieces.
        </p>

        <p>
            I learned how to effectively utilize baked lighting, fixing broken
            UVs and balancing memory footprint with fidelity.
        </p>
    </div>
</div>

<p>
    I was responsible for some small gameplay polish and features around the
    game, which required an understanding of the large codebase, and was an
    introduction to Dependency Injection. For these features, I had to sometimes
    create proprietary shaders along with script behavior to control the
    visuals.
</p>

<div class="content-row">
    <div class="descripted-item">
        <img src="/boombox%20remastered/tv animations.gif" alt="">
        <p>Preview shader and animations I made for the TV.</p>
    </div>
    <div class="descripted-item">
        <img src="/boombox%20remastered/timing indicators.gif" alt="">
        <p>Drum timing, score, spawn, and link effects I made.</p>
    </div>
</div>

<div class="content-pair-right">
    <div class="descripted-item">
        <img src="/boombox%20remastered/achievement UI.png" alt="">
        <p>Achievement window that I made.</p>
    </div>
    <div>
        <p>
            During this project, I learned how to use <a
                href="https://docs.unity3d.com/6000.3/Documentation/Manual/UIElements.html"
            >UI Toolkit</a> to create functional UI views. Since I was also
            creating <NodeLink path="./my-website">this website</NodeLink> at the time, 
            I was able to easily understand how to create dynamic layouts and styles.
        </p>

        <p>
            I also learned how UI Toolkit binds with the underlying scripting,
            creating efficient UI flows that efficiently updated elements using
            an event based approach.
        </p>
    </div>
</div>

<div class="spacer"></div>

<h2>BoomBox Remastered launched December 25th, 2025 on Meta and Steam.</h2>

<DemoButton>PLAY</DemoButton>

<div style="height: 40px"></div>