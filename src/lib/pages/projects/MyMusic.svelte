<script lang="ts">
    import SoundcloudPlayer from "$lib/components/SoundcloudPlayer.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";

    const urls: string[] = [
        "/swifter1243/the-between",
        "/swifter1243/pathfinder",
        "/artbyform/swifter-jaron-lighthouse",
        "/swifter1243/tessellate",
        "/swifter1243/slip",
        "/swifter1243/glasswork",
        "/swifter1243/sink",
        "/swifter1243/or-swim",
        "/swifter1243/foveate",
        "/swifter1243/light-matter",
        "/swifter1243/light-well",
        "/swifter1243/obsidian",
        "/swifter1243/encased-in-amber",
        "/swifter1243/covalence",
    ]
</script>


<h2>
    Over the past 2-3 years, I've been (informally) learning music production.
</h2>

<p>
    Music is extremely important to me, it's embedded into almost every way I
    express myself. I've always felt the urge to create music and decided it was
    time to give it a shot, even if I knew almost nothing about how to create
    it.
</p>

<br>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId=W8PBNF7XtZo width=80%/>
    </div>
    <p>A video detailing my musical journey as of June 2025.</p>
</div>

<div class="spacer"></div>

<h2 style="margin-bottom: 0">
    Here are some of my favourite tracks I've made.
</h2>

<p style="font-style: italic">I also (usually) make the cover art!</p>

<br>

<div class="content-row">
    {#each urls as url}
        <SoundcloudPlayer trackUrl={url}/>
    {/each}
</div>