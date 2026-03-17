<script lang="ts">
    import AudioPlayer from "$lib/components/AudioPlayer.svelte";
    import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    import NodeLink from "$lib/components/NodeLink.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";
    import { SOUNDS } from "../../../view/sound/resources";

    type ChordSound = {
        name: string;
        chordSrc: string;
        padSrc: string;
    };

    const chordSounds: ChordSound[] = [
        {
            name: "Chord A",
            chordSrc: SOUNDS.CHORD_A,
            padSrc: SOUNDS.CHORD_A_REVERB,
        },
        {
            name: "Chord B",
            chordSrc: SOUNDS.CHORD_B,
            padSrc: SOUNDS.CHORD_B_REVERB,
        },
        {
            name: "Chord C",
            chordSrc: SOUNDS.CHORD_C,
            padSrc: SOUNDS.CHORD_C_REVERB,
        },
        {
            name: "Chord D",
            chordSrc: SOUNDS.CHORD_D,
            padSrc: SOUNDS.CHORD_D_REVERB,
        },
    ];
</script>

<h1>YOU ARE HERE</h1>

<div class="spacer"></div>

<h3>Hey, welcome to my website!</h3>
<p>
    I wanted to create this website to summarize my skillset in a really fun and
    interactive way. I want anyone who opens it to understand immediately what
    makes my work special, and I feel like showing is way more effective than
    telling.
</p>

<p>
    When designing this website, I wanted users to be able to immediately find
    whatever they wanted to know about me with as little steps as possible. I
    wanted the website to feel like exploring a line of thought.
</p>

<div class="content-pair-left">
    <ImageCarousel
        images={[
            "/my website/concept 1.png",
            "/my website/concept 2.png",
            "/my website/concept 3.png",
        ]}
    />
    <div>
        <p>
            This lead me to the idea of being able to sort my experiences by
            skills or categories, and I designed a basic concept where those
            skills are connected by "branches".
        </p>
        <p>
            Originally I imagined everything taking place on a mostly 2D plane,
            but you would be pulled backward through 3D space when you
            "ascended" the structure.
        </p>
    </div>
</div>

<p>
    The final decision to break out of 2D <i
        >(and also some decisions for the sound design)</i
    >
    was inspired loosely by some visualizations from the Youtube channel
    <a href="https://www.youtube.com/@twoswap">2swap</a>, which made me realize
    that 3D would be more space efficient and feel more dynamic.
</p>

<p>
    I wanted to design the exploration component of the website with no user
    interface, but unfortunately I had to sacrifice this design a little bit in
    favor of HTML pages (rather than pages embedded into the world). I felt it
    would support me better as a developer and would be better for the user
    experience (e.g. being able to select text).
</p>

<div class="spacer"></div>

<p>
    With most of the design locked in, I decided to dive straight into a fresh
    project. I have never really made a serious attempt at a website, so I was
    going in pretty much completely blind.
</p>

<p>
    I decided to utilize <a href="https://threejs.org/">ThreeJS</a> for the 3D
    side as it was a popular choice and I already got familiar with some of it's
    3D utilities while creating <NodeLink path="./remapper">ReMapper</NodeLink>.
    Otherwise, I was going in with raw TypeScript, CSS, and HTML.
</p>

<div class="content-pair-right">
    <img src="/my website/prototype.gif" />
    <div>
        <p>
            I created a prototype which parsed node data into an explorable node
            tree, mostly using primitive shapes to block out the feel.
        </p>
        <p>
            I created two node types, "page nodes" and "directory nodes". A page
            node presents a page, and a directory node will contain any number
            of other nodes.
        </p>
        <p>
            They're visually organized using the
            <a
                href="https://demonstrations.wolfram.com/SunflowerSeedArrangements/"
                >sunflower seed arrangement</a
            >, which is based on how real sunflowers distribute their seeds. I
            thought that was kind of cute.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img src="/my website/adaptive layouts.gif" />
    <div>
        <p>
            Designing the pages required me to learn HTML and CSS for the first
            time.
        </p>

        <p>
            CSS was always a system that kind of confused me, so I am glad to
            have more experience with it now. My goal was to have the website
            work on any device, so I had to create adaptive layouts that worked
            at any resolution.
        </p>

        <p>
            I got pretty far making "components" by hooking them up imperatively
            with TypeScript, but eventually switched to <a
                href="https://svelte.dev/">Svelte</a
            > for maintainability, and it cleaned up my codebase quite a lot.
        </p>

        <p>
            This also allowed me to handle the pretty terrible performance when
            loading ~20 youtube players at once by making them "lazy loaded"
            (they don't actually load the player until you click on them).
        </p>
    </div>
</div>

<div class="content-pair-right">
    <ImageCarousel images={[
        {
            src: "/my website/animated leaf.gif",
            caption: 'The petal animated in Blender.'
        },
        {
            src: "/my website/bud open.gif",
            caption: 'The petal animations working together.'
        }
    ]}/>
    <div>
        <p>
            I later created a petal model in Blender, with it's own animations
            and texturing.
        </p>
        <p>
            There are three animations, "idle", "open", and "close". The open
            and close animations would play when a bud is open or closed, and
            the idle animation is blended in while the node is open.
        </p>
        <p>
            The appearance of the flowers make it seem like there's a point
            light in the middle, but I really just cheesed the brightness with a
            custom shader.
        </p>
    </div>
</div>

<div class="spacer"></div>

<p>
    For the sound design, I wanted to build off of the sound I have carved out
    while <NodeLink path="./my-music">learning music</NodeLink>, which leans
    heavily on melodic tonal swells and atmospheric piano.
</p>

<p>
    When opening a node, one of 4 chords will play, with an accompanying pad
    that drones on until the node is left. It kind of feels like you're making
    music when you're exploring the site.
</p>

{#each chordSounds as chordSound}
    <div class="sound-table">
        <div><b>{chordSound.name}</b></div>
        <div>
            <AudioPlayer src={chordSound.chordSrc} />
            <AudioPlayer src={chordSound.padSrc} />
        </div>
    </div>
{/each}

<p>
    The leaf moving/breaking sound effects were created using layered samples of
    me crumpling plastic.
</p>

<AudioPlayer src={SOUNDS.LEAF_MOVE} />
<AudioPlayer src={SOUNDS.LEAF_BREAK} />

<div class="spacer"></div>

<p>
    At this point the flower was still sitting in a black void. It was a unique
    vibe on it's own, but I always felt like my skill and wow factor really came
    out with environments. I decided to add some background elements to show off
    my shader/art ability, and this significantly boosted the effectiveness of
    the website.
</p>

<p>
    I based it loosely on my Beat Saber map "searching", which was also loosely
    inspired by the Minecraft mod <a href="https://modrinth.com/mod/betterend"
        >Better End</a
    >
    in combination with
    <a href="https://www.curseforge.com/minecraft/shaders/chocapic13-shaders"
        >Chocapic13's shaders</a
    >. I always found the vibrant bioluminescent flora in the fog to be
    strikingly beautiful.
</p>

<div class="content-row">
    <div class="descripted-item">
        <YoutubeVideo videoId="PUjS2AwQhS0" />
        <p>My Beat Saber map "searching".</p>
    </div>
    <div class="descripted-item">
        <ImageCarousel
            images={[
                "/my website/better end 1.jpg",
                "/my website/better end 2.jpg",
                "/my website/better end 3.jpg",
                "/my website/better end 4.jpg",
            ]}
        />
        <p>Some screenshots I took of Better End.</p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/my website/flowers.png" />
    <div>
        <p>
            I started out with a very simple skybox and mountains, and that
            already added so much depth to the scene.
        </p>

        <p>
            Next I added the bioluminescent flowers, and watching them sprawl
            out into the fog was the moment I knew I made the right choice
            leaving the black void behind.
        </p>

        <p>
            After that I added some fog cards (being careful not to create much
            overdraw), and worked on the water's appearance.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img src="/my website/water.gif" />
    <div>
        <p>
            Since I was very particular about the performance and look of the
            site, I opted to create my own water shader from scratch.
        </p>
        <p>
            The reflection is from a camera placed equidistantly under the ocean
            (similar to <NodeLink path="./ricochet">ricochet</NodeLink>),
            utilizing an oblique projection to trim blocking geometry.
        </p>
        <p>
            The refraction pass is desktop only (mobile falls back to a slightly
            transparent ocean), and it distorts the content underneath.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/my website/roots.gif" />
    <div>
        <p>
            At this point, I decided I needed to literally "ground" the flower
            into the world, since it felt quite disconnected.
        </p>
        <p>
            I utilized Geometry Nodes in Blender to create parameterized roots,
            and authored their texture coordinates to be based on their position
            in the curve, allowing me to animate along it in the shader.
        </p>
    </div>
</div>

<div class="spacer"></div>

<p>
    I chose the flower to represent myself, but I later realized the entire
    website is a metaphor for my own growth. The skills where I am stronger have
    larger branches, and my less experienced skills are still just seedlings.
</p>

<p>
    As time goes on, I am going to continue to update this website with my new
    experiences and strengths.
</p>

<h3 style="text-shadow: #ffffff 0 0 20px;">
    I hope you check back on this website to see how I grow!
</h3>

<style>
    .sound-table {
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 20px;
    }
</style>
