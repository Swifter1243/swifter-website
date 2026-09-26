<script module lang="ts">
    export type LoadingError = {
        message: string
        cause: unknown
    }
</script>

<script lang="ts">
    import { fade } from "svelte/transition";
    import StackTrace from "./StackTrace.svelte";

    const { error = null }: {
        error?: LoadingError | null
    } = $props()
</script>

<style>
    .root {
        position: fixed;
        inset: 0;
        z-index: 10;
        box-sizing: border-box;
        padding: clamp(12px, 3dvh, 40px) clamp(20px, 5vw, 40px);
        background-color: #000;
        touch-action: pan-y;
    }

    .content {
        --flower-size: min(256px, 38dvh, 70vw);
        display: grid;
        grid-template-rows: minmax(0, 1fr) var(--flower-size) minmax(0, 1fr);
        justify-items: center;
        gap: clamp(12px, 2.5dvh, 20px);
        width: min(100%, 480px);
        height: 100%;
        min-width: 0;
        margin: 0 auto;
        text-align: center;
        animation: appear 250ms ease-out both;
    }

    .status {
        align-self: end;
        width: 100%;
        margin-bottom: clamp(12px, 2.5dvh, 20px);
    }

    h1 {
        margin: 0;
        font-size: clamp(26px, 5vmin, 34px);
        font-weight: 400;
        line-height: 1.3;
    }

    .reason {
        margin: 8px 0 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 16px;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }

    .ellipsis::after {
        content: '.';
        animation: ellipsis 1.5s step-end infinite;
    }

    @keyframes ellipsis {
        0%, 100% { content: '.'; }
        33.333% { content: '..'; }
        66.667% { content: '...'; }
    }

    @keyframes appear {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
        .content, .ellipsis::after {
            animation: none;
        }

        .ellipsis::after {
            content: '...';
        }
    }

    img {
        display: block;
        width: var(--flower-size);
        height: var(--flower-size);
        aspect-ratio: 1;
        object-fit: contain;
        margin: 0;
    }

</style>

<div class="root" out:fade|global={{ duration: 1000 }}>
    <div class="content">
        {#if error}
            <div class="status" role="alert" aria-atomic="true">
                <h1>failed to load</h1>
                <p class="reason">{error.message}</p>
            </div>

            <img src="/error.png" alt="" width="512" height="512" />

            <StackTrace cause={error.cause}></StackTrace>
        {:else}
            <div class="status" role="status" aria-atomic="true">
                <h1 aria-label="loading">loading<span class="ellipsis" aria-hidden="true"></span></h1>
            </div>

            <img src="/loading.png" alt="" width="512" height="512" />
        {/if}
    </div>
</div>
