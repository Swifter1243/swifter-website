<script lang="ts">
    import type {PageNode} from "../../nodes/model/page_node.ts";
    import {navigation} from "../../navigation/navigation.ts";
    import {activePageNode} from "../../view/page_view.ts";
    import ProjectInfo from "./ProjectInfo.svelte";
    import { fade, fly } from "svelte/transition";
    import type {Component} from "svelte";
    import PageContent from "$lib/components/PageContent.svelte";

    let PageComponent: Component | null = $state(null);
    let pageNode: PageNode | null = $state(null);

    $effect(() => {
        pageNode = $activePageNode;

        if (pageNode) {
            loadComponent(pageNode);
        }
    });

    async function loadComponent(pageNode: PageNode) {
        PageComponent = await pageNode.page.loadMethod();
        //(window as any).twttr.widgets.load();
    }

    function close() {
        navigation.descend()
    }
</script>

<style>
    .root {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: min(100%, 1100px);
        box-sizing: border-box;
        padding: 10px 0 10px 0;
        margin: 0;
    }

    .top-bar {
        height: 50px;
        min-height: 50px;
        background: linear-gradient(
                45deg,
                rgba(173, 164, 99, 0.6) 20%,
                rgba(99, 169, 173, 0.6) 80%
        );
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .close-parent {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: flex-start;
    }

    .close {
        aspect-ratio: 1;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.3);
        border-style: none;
    }

    .close:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .scrollable {
        flex-grow: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 0;
    }
</style>

{#if pageNode}
    <div class="root" transition:fade={{ duration: 300 }}>
        <div class="panel" transition:fly={{ y: 50, duration: 500 }}>
            <div class="top-bar">
                <h2 class="title">
                    {pageNode.name}
                </h2>
                <div class="close-parent">
                    <button class="close" onclick={close}>&#10094;</button>
                </div>
            </div>

            <div class="scrollable">
                <ProjectInfo project={pageNode.project}></ProjectInfo>
                <PageContent pageNode={pageNode}></PageContent>
            </div>
        </div>
    </div>
{/if}