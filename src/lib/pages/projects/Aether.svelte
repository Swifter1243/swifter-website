<script>
    import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    import NodeLink from "$lib/components/NodeLink.svelte";
import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";
</script>

<h2>
    Aether is a completely original virtual reality experience inside of Beat
    Games' Rhythm game Beat Saber.
</h2>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId=qZ1prxep0Wc width="80%" />
    </div>
    <p>An in-game playthrough of Aether.</p>
</div>

<h3>
    Aether was conceptualized over the course of 3 years, and created over the
    course of 300 hours. Nearly every asset (shader, animation, material,
    prefab) was created from the ground up by me.
</h3>

<div class="spacer"></div>

<h2>My work on Aether</h2>

<div class="content-pair-left">
    <ImageCarousel images={[
        "/aether/technical 1.png",
        "/aether/technical 2.png"
    ]} />

    <div>
        <p>
            Every shader effect in the map was created from scratch, allowing
            for a unique utilization of the render pipeline rarely seen in the
            Beat Saber community.
        </p>
        <p>
            Most shapes were created through math, allowing for a unique
            artstyle across many complicated effects.
        </p>
        <p>
            The result was a dense and constantly changing set of visuals that
            would not be possible without careful engineering.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/unity%20animation%20window/particle playback.gif" loading="lazy">

    <div>
        <p>
            In order to animate the dense contents of the song, I needed to have
            an audio preview in-editor while working on the animation.
        </p>

        <p>
            Not many good tools existed that allowed me to work like this, so I
            created a 
            <NodeLink path="./unity-animation-window">tool to do this myself</NodeLink>.
        </p>

        <p>
            This tool also included particle playback, which allowed me to have
            a true "what you see is what you get" workflow.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <img src="/aether/upload limit.png" loading="lazy">

    <div>
        <p>
            Due to the upload limitations of the Beat Saber custom level site
            <a href="https://beatsaver.com/">BeatSaver</a>, asset bundles for the experience had to be under 5mb.
        </p>

        <p>
            Using my knowledge of Unity systems and shader effects, I was able
            to bring the final file size of the bundles down to only 2.7 mb.
        </p>
    </div>
</div>

<div class="spacer"></div>

<h2>Aether was met with incredible reception, many saying it's the best Beat Saber map of all time.</h2>