<script lang="ts">
    import DemoButton from "$lib/components/DemoButton.svelte";
    import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    import NodeLink from "$lib/components/NodeLink.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";

    type MapEnvironments = {
        title: string;
        environments: {
            time: string;
            title: string;
        }[];
    };

    const maps = {
        somewhereOutThere: {
            title: "Somewhere Out There",
            environments: [
                { time: "1:37", title: "shore" },
                { time: "2:46", title: "foggy mountains" },
                { time: "3:12", title: "monoliths" },
                { time: "3:27", title: "abstract" },
                { time: "3:37", title: "forest" },
                { time: "3:47", title: "supernova" },
                { time: "4:02", title: "mountains" },
                { time: "4:12", title: "rainbow" },
                { time: "4:27", title: "horizon" },
                { time: "5:08", title: "outro" },
            ],
        },
        heliov: {
            title: "Heliov",
            environments: [
                { time: "0:00", title: "intro" },
                { time: "0:40", title: "intro2" },
                { time: "1:06", title: "intro3" },
                { time: "1:32", title: "build" },
                { time: "1:57", title: "drop1_1" },
                { time: "2:10", title: "drop1_2" },
                { time: "2:23", title: "drop1_3" },
                { time: "2:36", title: "drop1_4" },
                { time: "2:48", title: "calm" },
                { time: "3:01", title: "calm_2" },
                { time: "3:08", title: "calm_3" },
                { time: "3:11", title: "calm_4" },
                { time: "3:14", title: "calm_5" },
                { time: "3:27", title: "build2" },
                { time: "3:40", title: "drop2_1" },
                { time: "3:52", title: "drop2_2" },
                { time: "4:05", title: "drop2_3" },
                { time: "4:08", title: "drop2_4" },
                { time: "4:12", title: "drop2_5" },
                { time: "4:15", title: "drop2_6" },
                { time: "4:18", title: "drop2_7" },
                { time: "4:21", title: "drop2_8" },
                { time: "4:24", title: "drop2_9" },
                { time: "4:28", title: "drop2_10" },
                { time: "4:31", title: "outro" },
                { time: "4:43", title: "end" },
            ],
        },
        aether: {
            title: "Aether",
            environments: [
                { time: "0:27", title: "intro" },
                { time: "0:31", title: "intro2" },
                { time: "0:32", title: "intro3" },
                { time: "0:34", title: "intro4" },
                { time: "0:35", title: "intro5" },
                { time: "0:37", title: "intro6" },
                { time: "0:38", title: "intro7" },
                { time: "0:42", title: "intro8" },
                { time: "0:44", title: "intro9" },
                { time: "0:45", title: "intro10" },
                { time: "0:47", title: "intro11" },
                { time: "0:48", title: "intro12" },
                { time: "0:50", title: "intro13" },
                { time: "0:52", title: "intro14" },
                { time: "0:53", title: "intro15" },
                { time: "0:57", title: "intro16" },
                { time: "1:01", title: "intro17" },
                { time: "1:03", title: "intro18" },
                { time: "1:05", title: "intro19" },
                { time: "1:07", title: "intro20" },
                { time: "1:08", title: "intro21" },
                { time: "1:09", title: "intro22" },
                { time: "1:10", title: "intro23" },
                { time: "1:11", title: "intro24" },
                { time: "1:12", title: "intro25" },
                { time: "1:13", title: "intro26" },
                { time: "1:16", title: "intro27" },
                { time: "1:18", title: "intro28" },
                { time: "1:19", title: "intro29" },
                { time: "1:20", title: "intro30" },
                { time: "1:21", title: "introexit" },
                { time: "1:46", title: "mid" },
                { time: "1:56", title: "mid2" },
                { time: "2:05", title: "mid3" },
                { time: "2:13", title: "mid4" },
                { time: "2:19", title: "mid5" },
                { time: "2:25", title: "mid6" },
                { time: "2:33", title: "build" },
                { time: "3:16", title: "build2" },
                { time: "3:29", title: "build3" },
                { time: "3:36", title: "build4" },
                { time: "3:42", title: "build5" },
                { time: "3:56", title: "final" },
                { time: "3:59", title: "final2" },
                { time: "4:00", title: "final3" },
                { time: "4:01", title: "final4" },
                { time: "4:01", title: "final5" },
                { time: "4:02", title: "final6" },
                { time: "4:03", title: "final7" },
                { time: "4:09", title: "final8" },
                { time: "4:10", title: "final9" },
                { time: "4:12", title: "final10" },
                { time: "4:14", title: "final11" },
                { time: "4:14", title: "final12" },
                { time: "4:14", title: "final13" },
                { time: "4:15", title: "final14" },
                { time: "4:15", title: "final15" },
                { time: "4:16", title: "final16" },
                { time: "4:22", title: "outro" },
            ],
        },
    } satisfies Record<string, MapEnvironments>;
</script>

<h2>
    Aether is a completely original virtual reality experience inside of Beat
    Games' Rhythm game Beat Saber.
</h2>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId="qZ1prxep0Wc" width="80%" />
    </div>
    <p>An in-game playthrough of Aether.</p>
</div>

<h3>
    Aether is the culmination of years of determination while learning tech art
    from the ground up, <br />and you've probably never seen anything like it.
</h3>

<div class="spacer"></div>

<h2>Behind The Scenes</h2>

<div class="bts-row">
    <img style="transform: rotateZ(-2deg);" src="/aether/technical 1.png" />
    <img
        style="transform: rotateZ(3deg) scale(1.4);"
        src="/aether/technical 3.png"
    />
    <img style="transform: rotateZ(-4deg);" src="/aether/technical 2.png" />
</div>

<div class="content-pair-left">
    <img src="/aether/vfx.png" />
    <div>
        <p>
            The first thing I did for the map was create a bunch of generic
            "vfx" shaders.
        </p>

        <p>
            These shaders served as building blocks for the visuals, and
            experimenting with them helped me fill out the very dense
            representation I wanted.
        </p>

        <p>
            I utilized different unique <a
                href="https://docs.unity3d.com/530/Documentation/Manual/SL-Blend.html"
                >blend modes</a
            > to integrate these VFX in visually interesting ways, mainly subtractive
            and inverted blending.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <ImageCarousel
        images={[
            {
                src: "/aether/subtractive blend.png",
                caption: "Subtractive blending.",
            },
            {
                src: "/aether/invert blend.png",
                caption: "Inverted blending.",
            },
        ]}
    />
    <div>
        <p>
            Subtractive blending, <br /> (<span class="expression"
                >BlendOp Subtract</span
            >
            and <span class="expression">Blend SrcColor OneMinusSrcColor</span>)
            basically subtracts the shader's color from the render's color. I
            use this effect a lot during the "inversion" in the first drop.
        </p>

        <p>
            Inverted blending, <br />
            (<span class="expression"
                >Blend OneMinusDstColor OneMinusSrcColor</span
            >) basically blends toward an inverted color based on the shader
            output's brightness <br /> (black = normal, white = inverted).
        </p>

        <p>
            I'm particularly proud of deriving that last blend mode myself from <br
            /> <span class="expression">lerp(dst, 1 - dst, src)</span> and
            expanding it using
            <span class="expression">a * t + b * (1 - t)</span>.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img
        src="/unity%20animation%20window/particle playback.gif"
        loading="lazy"
    />

    <div>
        <p>
            In order to animate the dense contents of the song, I needed to have
            an audio preview in-editor while working on the animation.
        </p>

        <p>
            Not many good tools existed that allowed me to work like this, so I
            created a
            <NodeLink path="./unity-animation-window"
                >tool to do this myself</NodeLink
            >.
        </p>

        <p>
            This tool also included particle playback, which allowed me to have
            a true "what you see is what you get" workflow.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/aether/instanced particles.png" />
    <div>
        <p>
            Many scenes required dense terrain detail to feel believable at the
            scale I wanted to achieve.
        </p>

        <p>
            In order to do this in a performant manner, I utilized instanced
            particles to sprinkle the same mesh thousands of times across the
            scene. This basically served as a terrain generator, and the
            framerate gain felt like cheating.
        </p>

        <p>
            In a test scene, I went from 60 FPS with 3,000 particles to <br /> Max
            FPS with 30,000 particles.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img src="/aether/rainbow pillar.gif" />
    <div>
        <p>
            To create this "rainbow rift" shard effect, I utilized geometry
            shaders with stencils and multiple passes.
        </p>

        <p>
            The first pass simply draws the initial stencil. <br />
            The second pass occludes the stencil with the "flying" triangles.
            <br />
            The third pass draws the rift where the "flying" triangles haven't stenciled
            out.
        </p>

        <p>
            The result is a rift that can jump seamlessly out of any background.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/aether/arrow particles.gif" />
    <div>
        <p>
            I created this dynamic "arrow" particle system for a few sections.
            Each arrow transforms itself along a path defined by it's
            parameters.
        </p>

        <p>
            In order to do this in the shader, I needed to use partial
            derivaties to calculate the normal of the curve, calculate the
            tangent and bitangent, and use it to transform each segment.
        </p>

        <p>The result looks almost lifelike to me!</p>
    </div>
</div>

<div class="content-pair-left">
    <ImageCarousel
        images={[
            {
                src: "/aether/stencil showcase.gif",
                caption: 'Multiple "pocket dimensions", stenciled by boxes.',
            },
            {
                src: "/aether/stencil breakdown.gif",
                caption: "Here's each stencil from the player's POV.",
            },
        ]}
    />
    <div>
        <p>
            I utilized multiple consecutive stencils to achieve the "portal"
            effect seen at the end of the drop.
        </p>

        <p>
            The stencils are drawn on a bunch of boxes that slam into the
            player's head, and the seams are hidden using the star VFX.
        </p>

        <p>
            In order to have the feeling of the portal "wooshing by" while still
            fitting within the clipping planes, they are subtly scaled larger as
            they approach.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <ImageCarousel
        images={[
            {
                src: "/aether/zoom keyframes.gif",
                caption: "Tracking an individual object in the zoom.",
            },
            {
                src: "/aether/exponential scale.png",
                caption: "Scaling at an exponential rate.",
            },
            {
                src: "/aether/zoom generator.png",
                caption: "The tool used to generate the zoom sequence.",
            },
        ]}
    />
    <div>
        <p>
            This "infinite zoom" section is achieved by sequentially scaling
            multiple game objects from zero to a large number.
        </p>

        <p>
            The scale needs to happen at an exponential rate to cancel out the <a
                href="https://youtu.be/f7Oo828_kb8?si=CGfGiWUCJOvgaAE8&t=303"
                >perceived logarithmic growth of scaling an object with a linear
                relationship to time</a
            >.
        </p>

        <p>
            In order to generate the sequence from a set of "structure prefabs",
            I created an offline script to automatically insert keyframes and
            game objects.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <ImageCarousel
        images={[
            {
                src: "/aether/glass showcase.gif",
                caption: "Playing with the strength of the distortion.",
            },
            {
                src: "/aether/glass edge safety.gif",
                caption: "Fading when too close to the edge of the screen.",
            },
        ]}
    />
    <div>
        <p>
            I created this glass shader for multiple scenes using a screen
            distortion effect.
        </p>

        <p>
            I was worried a uniform UV offset for the sample would break stereo
            depth in VR, so I opted to offset a point in world space, and then
            convert that point to a screen-space UV to sample.
        </p>

        <p>
            When the offsetted sample gets too close to being offscreen, the
            shader fades the distortion out to prevent artifacts.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/aether/gemstone.gif" />
    <div>
        <p>
            I created this "gemstone" shader for the mid-section of the map. It
            utilizes two layers of voronoi noise, one on the surface, and one
            below.
        </p>

        <p>
            The surface layer refracts your view ray based on the provided IOR,
            and uses it to sample the second layer which is placed parallel to
            the surface at an arbitrary depth.
        </p>

        <p>
            The colors of the gemstone are hue shifted depending on your viewing
            angle.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img src="/aether/bridge.gif" />
    <div>
        <p>The mid-section also features this "endlessly moving" bridge.</p>

        <p>
            The bridge is actually segmented into multiple repeating pieces, and
            after moving a full segment's length, it's teleported back to it's
            starting position.
        </p>

        <p>
            The player isn't able to tell that this teleportation happens,
            making it feel endless while the movement loops indefinitely.
            Classic.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/aether/rainbow sky sphere.gif" />
    <div>
        <p>This "endless" tunnel is also just another illusion.</p>

        <p>
            It's actually just projected onto a sphere, which allows it to fit
            reasonably within the camera's clipping planes. The player can't
            tell the difference at this distance and position.
        </p>

        <i>
            This tunnel is actually modified from one of the original scrapped
            Aether attempts (explained later in the page).
        </i>
    </div>
</div>

<div class="content-pair-left">
    <img src="/aether/cracks.gif" />
    <div>
        <p>
            The cracks from the towers' impact were created procedurally using
            Geometry Nodes in Blender.
        </p>

        <p>
            It uses a couple of random curves to carve out the crack shape, and
            using a clever mix of the Merge By Distance and Extrude nodes, the
            geometry is brought to life!
        </p>

        <p>
            The terrain shader in-game compresses and expands the terrain during
            the impact animation to dynamically bring out the cracks.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/aether/impact frames.gif" />
    <div>
        <p>
            The tower animation is also complimented by a number of new
            introduced VFX elements such as the fire effects, layered animated
            laser, and shockwave.
        </p>

        <p>
            I additionally added some "impact frames" using the star VFX to add
            to the feeling of the massive explosion.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <ImageCarousel
        images={[
            {
                src: "/aether/rainbow storm before.jpg",
                caption: "Ribbons without SKYZA's texture.",
            },
            {
                src: "/aether/rainbow storm after.jpg",
                caption: "Ribbons with SKYZA's texture.",
            },
        ]}
    />
    <div>
        <p>
            The final scenes with the ribbons were created using Unity's trail
            system.
        </p>

        <p>
            Prewarming their paths created a massive lag spike, so instead I
            enable them a bit early and run their simulation speed at 100x
            before presenting them.
        </p>

        <p>
            My wonderful friend <a href="https://x.com/DROWNEDCOLORS">SKYZA.</a>
            also created an incredible ribbon texture which completely elevated the
            feel of the ribbons.
        </p>
    </div>
</div>

<p>
    Because of the low-level shader engineering which utilized meshes in clever
    ways to minimize disk footprint, I was able to fit the entire map well under
    the 5 mb distribution limit!
</p>

<img style="max-width: 600px;" src="/aether/upload limit.png" />

<div class="spacer"></div>

<h2>Story Time</h2>

<p>
    The song I used for this map came out in early 2022, from my friend Jaron's
    album "it's hard to see color". I was <i>immediately</i> struck by the song's
    unique finesse and energy, that I couldn't help but imagine ambitious visuals
    to the entire song.
</p>

<p>
    Around this time I was investigating my involvement with <NodeLink
        path="./extra-sensory-ii">Extra Sensory II</NodeLink
    >, and I decided that this song would be the perfect candidate for the
    event, given how clear and passionate my vision was for it.
</p>

<p>
    In fact, the vision was <i>so</i> clear, a couple of the things that I wrote
    down in my 2022 storyboard ended up happening pretty much beat for beat in the
    final 2025 version.
</p>

<div class="storyboard">
    <h2><u>Storyboard (from 2022)</u></h2>

    <p>...</p>

    <p>(1:19 - 1:46): You get thrown through kaleidoscope rainbow geometry</p>

    <p>...</p>

    <p>
        (3:35 - 3:43): Imagine something like rings where there's a repeated
        pair of objects with a slight step of rotation, but instead of rings
        it's 2 pillars that are above and below, and when the BIIG drums hit,
        they THUMP downwards creating shockwaves until the one above and below
        you stomp you (maybe make player face up towards it through notemods?)
    </p>

    <p>...</p>

    <p>
        (3:56 - 4:22): More fuzzy on the details here but general idea is to
        whip the player through multiple scenes, rotating them like crazy, and
        then during the angelic vocal part, have some floaty threads in space
        almost like auroras
    </p>

    <p>
        (4:22): Scene of a bunch of the floaty threads all heading into one
        point, kinda like this:
    </p>

    <div class="descripted-item">
        <img
            src="/aether/feint - silent light.jpg"
            style="width: 80%; max-width: 500px"
        />
        <p>
            Cover art for <a
                href="https://liquicity.bandcamp.com/album/silent-light"
                >Feint - Silent Light</a
            >
        </p>
    </div>
</div>

<p>
    I actually hadn't seen this storyboard again until <i>after</i> finishing
    the map in 2025, so I was shocked to see how much my vision had been
    maintained.
    <i>I was also slightly upset at a few cool ideas I forgot to implement.</i>
</p>

<div class="spacer"></div>

<h3>So now I had this super ambitious, clear vision for the map. Great.</h3>

<p>
    There was only one problem, which was that I had no idea how to make my own
    3D art. I mean, I had a lot of environment composition practice while
    working on <NodeLink path="./blood-rushing">Blood Rushing</NodeLink> and other
    maps, but I still relied heavily on the base game's materials.
</p>

<p>
    The artstyle I was going for with Aether wasn't really something you could
    just find on the internet (nor would any assets be compatable with Beat
    Saber's "alpha = bloom" problem), so I didn't really have a choice except to
    make proprietary assets.
</p>

<p>
    I proceeded to make a couple of attempts on the project while trying to
    learn shaders and 3D tech art.
</p>

<div class="content-row">
    <ImageCarousel
        images={[
            {
                src: "/aether/old/pillars.png",
                caption:
                    "These pillars were the first asset I tried to make for the level.",
            },
            {
                src: "/aether/old/note.png",
                caption: "This was the first skybox in the map.",
            },
            {
                src: "/aether/old/intro.gif",
                caption: "The first little bit of the intro sequence.",
            },
            {
                src: "/aether/old/structure.png",
                caption: 'A "metalheart" structure I made for a scene.',
            },
            {
                src: "/aether/old/shader sky 1.png",
                caption: "A rainbow skybox I made with a shader in Unity.",
            },
            {
                src: "/aether/old/shader sky 2.png",
                caption:
                    "Another rainbow skybox I made with a shader in Unity.",
            },
            {
                src: "/aether/old/shader sky 3.png",
                caption:
                    "A scene I made with a variation of the previous shader.",
            },
            {
                src: "/aether/old/messing around in blender.gif",
                caption: "Me messing with skybox parameters inside of Blender.",
            },
        ]}
    />
    <div class="descripted-item">
        <ImageCarousel
            images={[
                "/aether/old/blender 1.png",
                "/aether/old/blender 2.png",
                "/aether/old/blender 3.png",
                "/aether/old/blender 4.png",
                "/aether/old/blender 5.png",
                "/aether/old/blender 6.png",
                "/aether/old/blender 7.png",
                "/aether/old/blender 8.png",
            ]}
        />
        <p>Skyboxes I made inside of Blender which I imported as 360 images.</p>
    </div>
</div>

<p>
    The attempts looked okay, but ultimately I was not happy with the results
    and knew I could do better, but I had no idea how to improve. This lead to a
    loss of motivation and an ultimate death of the attempts. I was at an all
    time low with my confidence and the project started to feel really far
    outside of my reach, I didn't know if it would ever happen the way I wanted,
    which lead to a sort of creative depression.
</p>

<p>
    To put into perspective the ambition of this project, I had an <i
        >unprecidented</i
    >
    amount of unique scenes I wanted to include in the map. Here's a comparison of
    the scene outline between different maps I made against Aether.
</p>

<div class="map-list">
    {#each Object.values(maps) as map}
        <div class="map">
            <h2>{map.title}</h2>
            <i style="margin-top: 0; margin-bottom: 10px"
                >({map.environments.length} scenes)</i
            >
            {#each map.environments as env}
                <div class="environment">
                    <i class="environment-time">{env.time}</i>
                    <p class="environment-title">{env.title}</p>
                </div>
            {/each}
        </div>
    {/each}
</div>

<p>
    This project was <i>double</i> the scene count from my previously most ambitious
    project (which I almost quit), so yeah... this was a beast. Combine the insane
    workload for visuals with the fact I would have to learn the entire rendering
    AND asset pipeline from the ground up for this project, I was really struggling
    with what was ahead of me.
</p>

<div class="spacer"></div>

<p>
    Eventually I had some more shader experience through tangential endeavors
    such as my <NodeLink path="./shadertoy-shaders">Shadertoy Shaders</NodeLink>
    or various game jam projects. This gave me the confidence to re-evaluate my entry
    for Extra Sensory II, and I decided it would be best to tune down the scope so
    that the finish line was a bit more within my reach.
</p>

<div class="content-pair-left">
    <div>
        <YoutubeVideo videoId="2SgLtmqxu-k" />
    </div>

    <div>
        <p>
            This manifested in the form of my map "you", which was finally the
            moment all of my shader experience came together in a way I was
            happy with.
        </p>

        <p>
            While polishing the project for over a year during the lead-up to
            Extra Sensory II's release as well as assisting other artists on the
            project, I reinforced my skills and became even more confident with
            tech art.
        </p>

        <p>
            "you" was a massive success, quickly becoming the highest rated map
            in the community. This gave me the confidence to finally tackle the
            behemoth of a project that was Aether.
        </p>
    </div>
</div>

<h2>
    After 3 years of conceptualization, multiple failed attempts, and 3 months
    of hard work, I was able to create the final (successful) iteration of
    Aether!
</h2>

<DemoButton>PLAY</DemoButton>

<br>
<br>

<p>
    Many players have said that it's the best Beat Saber map in existence right
    now. I feel like it even transcends the game to be one of the most unique VR
    experiences available at the moment.
</p>

<p>
    I am <i>so</i> proud of the result, not only because of the end product, but
    because I think my perserverance speaks to the idea that I can learn anything
    I want as long as I don't give up on it. Even if it takes literal years.
</p>

<p>
    Since this project was such a success, I am planning on tackling even more
    ambitious projects in the future. <br> <span style="text-shadow: #ffffff 0 0 20px;">I hope you stay tuned!</span>
</p>

<style>
    .storyboard {
        margin-top: 40px;
        margin-bottom: 40px;
        font-style: italic;
        color: gray;
        border-style: solid;
        border-radius: 10px;
        background-color: rgba(34, 34, 34, 0.236);
    }

    .storyboard > * {
        margin: 20px;
    }

    .map-list {
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: rgba(34, 34, 34, 0.236);
        border-radius: 10px;
    }

    .map {
        flex: 1;
        margin-top: 15px;
        margin-bottom: 15px;
        min-width: 300px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }

    .map > h2 {
        margin-top: 0;
        margin-bottom: 0;
    }

    .environment-time,
    .environment-title {
        margin: 0;
    }

    .environment-time {
        flex: 1;
    }

    .environment-title {
        flex: 2;
    }

    .environment {
        width: 90%;
        display: flex;
        background-color: rgb(19, 19, 19);
        border-radius: 5px;
    }

    .bts-row {
        display: flex;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .bts-row > img {
        margin: 0;
        flex: 1;
        aspect-ratio: 16/9;
        object-fit: cover;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.492);
    }

    .expression {
        background-color: rgb(22, 24, 31);
        color: rgb(159, 159, 159);
        font-style: italic;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 3px;
        text-wrap-mode: nowrap;
    }
</style>
