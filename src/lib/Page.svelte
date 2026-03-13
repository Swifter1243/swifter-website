<title id="title">PORTFOLIO</title>

<script lang="ts">
    import { onMount } from "svelte"
    import { initSound } from "../view/sound/main"
    import { initThree } from "../view/three/main"
    import { initSystems } from "../initialize"
    import { fadeIn } from "../view/fade"
    import PagePanel from "$lib/components/PagePanel.svelte";

    onMount(async () => {
        await initSound()
        await initThree()
        initSystems()
        fadeIn()
    })
</script>

<div id="three"></div>

<div id="tutorial">
    <p id="tutorial-text"></p>
</div>

<PagePanel></PagePanel>

<div id="fade"></div>