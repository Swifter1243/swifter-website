<title id="title">PORTFOLIO</title>

<script lang="ts">
    import { onMount } from "svelte"
    import { initSound } from "../view/sound/main"
    import { initThree } from "../view/three/main"
    import { initSystems } from "../initialize"
    import { fadeIn } from "../view/fade"

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

<div id="fade"></div>

<div id="page" hidden>
    <div id="page-panel">
        <div id="page-top-bar">
            <h2 id="page-title">
                page title
            </h2>
            <div id="page-close-parent">
                <button id="page-close">
                    <h1>&#10094;</h1>
                </button>
            </div>
        </div>
        <div id="page-content-parent">
            <div id="page-project-info">
                <p id="project-timeline" style="font-size: 16px; font-style: italic; color: rgba(255, 255, 255, 0.713);">(2019 - 2021)</p>
                <div style="display: flex; flex-direction: row; justify-content: center; gap: 10px;">
                    <div id="page-project-links">
                        <a id="project-source-link"></a>
                        <a id="project-demo-link"></a>
                    </div>
                    <div id="page-project-tags"></div>
                </div>
            </div>
            <div id="page-content">

            </div>
        </div>
    </div>
</div>