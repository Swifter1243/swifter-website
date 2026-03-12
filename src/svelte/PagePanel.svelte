<script lang="ts">
    import type {PageNode} from "../nodes/model/page_node.ts";
    import {navigation} from "../navigation/navigation.ts";
    import {activePageNode} from "../view/page_view.ts";
    import ProjectInfo from "./ProjectInfo.svelte";
    import { fade, fly } from "svelte/transition";

    let pageComponent: any = null;
    let pageNode: PageNode | null = $state(null);

    $effect(() => {
        pageNode = $activePageNode;

        if (pageNode) {
            loadComponent(pageNode);
        }
    });

    async function loadComponent(pageNode: PageNode) {
        //const mod = await pageNode.component();
        //pageComponent = mod.default;
        //(window as any).twttr.widgets.load();
    }

    function close() {
        navigation.descend()
    }
</script>

{#if pageNode}
    <div id="page" transition:fade={{ duration: 300 }}>
        <div id="page-panel" transition:fly={{ y: 50, duration: 500 }}>
            <div id="page-top-bar">
                <h2 id="page-title">
                    {pageNode.name}
                </h2>
                <div id="page-close-parent">
                    <button id="page-close" on:click={close}>
                        <h1>&#10094;</h1>
                    </button>
                </div>
            </div>

            <div id="page-content-parent">
                <ProjectInfo project={pageNode.project}></ProjectInfo>
                {#if pageComponent}
                    <div id="page-content">
                        <svelte:component this={pageComponent} />
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}