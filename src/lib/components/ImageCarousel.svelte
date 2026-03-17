<script lang="ts">
    import { fade } from "svelte/transition";

    type Image = {
        src: string,
        caption?: string
    }
    type UnparsedImage = Image | string

    const { images, aspectRatio = 16/9 } = $props<{
        images: UnparsedImage[],
        aspectRatio?: number
    }>()

    function parseImage(unparsed: UnparsedImage): Image {
        if (typeof unparsed === 'string') {
            return {
                src: unparsed
            }
        } else {
            return unparsed
        }
    }

    let parsedImages: Image[] = $derived(images.map(parseImage))
    let currentIndex = $state(0);
    let currentImage: Image = $derived(parsedImages[currentIndex])

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    function previous() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
</script>

<style>
    .root {
        position: relative;
    }

    .viewport {
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .slide {
        position: absolute;
        width: 100%;
        margin: 0;
        padding: 0;
	    object-fit: cover;
    }

    .control-row {
        position: absolute;
        width: 100%;
        padding: 0;
        height: 40px;
        display: flex;
        align-items: center;
    }

    .control {
        cursor: pointer;
        position: absolute;
        width: auto;
        border-style: none;
        color: rgb(255, 255, 255);
        padding: 10px;
        font-size: 18px;
        font-weight: bold;
        user-select: none;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .control:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .control.prev {
        left: 0;
    }

    .control.next {
        right: -1px;
    }

    .caption {
        text-align: center;
        margin: 10px;
    }

    .dot-row {
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .dot {
        height: 30%;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: white;
        opacity: 0.2;
        transition: opacity 0.4s ease;
    }

    .dot.active {
        opacity: 1
    }
</style>

<div class="root">
    <div class="viewport" style="aspect-ratio: 16/9">
        {#each [parsedImages[currentIndex]] as image (currentIndex)}
            <img
                src={image.src}
                alt={image.caption ?? "carousel slide"}
                transition:fade="{{ duration: 300 }}"
                class="slide"
                style="aspect-ratio: {aspectRatio};"
            />
        {/each}
        <div class="control-row">
            <button onclick={previous} class="control prev">&#10094;</button>
            <button onclick={next} class="control next">&#10095;</button>
        </div>
    </div>
    {#if (currentImage.caption !== undefined)}
        <p class="caption">{currentImage.caption}</p>
    {/if}
    <div class="dot-row">
        {#each parsedImages as _, i}
            <div
                class="dot"
                class:active={i === currentIndex}
            ></div>
        {/each}
    </div>
</div>
