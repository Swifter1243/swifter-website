<script>
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";

</script>
<h2>
    SDL Minecraft is a simple paint-like program made in SDL 2.
</h2>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId="GQVq09MDxoE" width="80%" />
    </div>
    <p>A short demo of the project.</p>
</div>

<p>
    It was a school project me and my friend Evan were partnered up for to learn
    <a href="https://www.libsdl.org/">SDL</a>. It wasn't meant to be anything
    close to a real Minecraft clone, but moreso just a small project to learn
    how to properly architect and manage system resources.
</p>

<div class="spacer"></div>

<div class="content-pair-left">
    <img src="/sdl%20minecraft/building.gif" alt="">
    <div>
        <p>
            You can left-click to add blocks to the world, and you can right
            click to add blocks. You can also use keys 0-9 to select blocks to
            place.
        </p>

        <p>
            These blocks actually effect the world save, which you can serialize
            to disk, share with a friend, and load back up. This required a
            custom file format with a custom header and custom binary schema.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/sdl%20minecraft/terrain.png" alt="">
    <div>
        <p>
            Every time the program starts up, we generate terrain using a noise
            algorithm for caves and terrain height. After the solid terrain is
            determined, grass is placed on the top block, then dirt 3 blocks
            under that, and then stone.
        </p>

        <p>
            Decorations such as trees and tall grass are later placed on
            available blocks. This is very inspired by how Minecraft actually
            generates it's terrain.
        </p>
    </div>
</div>
