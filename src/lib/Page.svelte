<title id="title">PORTFOLIO</title>

<script lang="ts">
    import { onMount } from "svelte"
    import { initSound } from "../view/sound/main"
    import { initThree } from "../view/three/main"
    import { initSystems } from "../initialize"
    import LoadingScreen, { type LoadingError } from "$lib/components/LoadingScreen.svelte";
    import PagePanel from "$lib/components/PagePanel.svelte";

    let loading = $state(true)
    let error: LoadingError | null = $state(null)

    onMount(async () => {
        let stage = 'sound'
        try {
            await initSound()
            stage = 'graphics'
            await initThree()
            stage = 'systems'
            initSystems()
            loading = false
        } catch (cause) {
            let message = 'Unknown error'
            if (stage === 'sound') message = "Sound resources couldn't be loaded"
            if (stage === 'graphics') message = "Graphics environment couldn't be started"
            error = { message, cause }
        }
    })
</script>

<div id="three"></div>

<div id="tutorial">
    <p id="tutorial-text"></p>
</div>

<PagePanel></PagePanel>

{#if loading}
    <LoadingScreen {error}></LoadingScreen>
{/if}
