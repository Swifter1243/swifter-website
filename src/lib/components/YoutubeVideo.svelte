<script lang="ts">
    const { videoId, width = "100%", aspectRatio = 16/9 } = $props<{
        videoId: string,
        width?: string,
        aspectRatio?: number,
    }>();

    let thumbnailUrl: string = $state('')
    let iframeVisible = $state(false)

    function loadVideo() {
        iframeVisible = true
    }

    $effect(() => {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    })
</script>

<style>
    .root {
        position: relative;
        cursor: pointer;
        background-color: #000;
        overflow: hidden;
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        margin: 0;
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        /* Original: YouTube Vector: Jarould, Public domain, via Wikimedia Commons */
        background-image: url('https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg');
        pointer-events: none;
    }
</style>

<div class="root" style="width: {width}; aspect-ratio: {aspectRatio}">
    {#if !iframeVisible}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div onclick={loadVideo}>
            <img class="thumbnail" src={thumbnailUrl} alt="Video thumbnail" loading="lazy"/>
            <div class="play-button"></div>
        </div>
    {:else}
        <iframe
            title="Youtube Video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/{videoId}?autoplay=1&mute=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    {/if}
</div>