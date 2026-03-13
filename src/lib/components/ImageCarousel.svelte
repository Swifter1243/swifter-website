<script lang="ts">
    import { fade } from "svelte/transition";

    const { images } = $props<{
        images: string[]
    }>()

    let currentIndex = $state(0);

    function previous() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    function next() {
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
        color: black;
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
        {#each [images[currentIndex]] as src (currentIndex)}
            <img
                {src}
                alt="carousel slide"
                transition:fade="{{ duration: 300 }}"
                class="slide"
            />
        {/each}
        <div class="control-row">
            <button onclick={previous} class="control prev">&#10094;</button>
            <button onclick={next} class="control next">&#10095;</button>
        </div>
    </div>
    <div class="dot-row">
        {#each images as _, i}
            <div
                class="dot"
                class:active={i === currentIndex}
            ></div>
        {/each}
    </div>
</div>
