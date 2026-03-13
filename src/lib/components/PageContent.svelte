<script lang="ts">
    import type {PageNode} from "../../nodes/model/page_node.ts";
    import {tick, type Component} from "svelte";

    const { pageNode } : { pageNode?: PageNode } = $props();
    let PageComponent: Component | null = $state(null);
    let root: HTMLElement | undefined = $state(undefined)

    $effect(() => {
        if (pageNode) {
            loadComponent(pageNode);
        }
    });

    async function loadComponent(pageNode: PageNode) {
        PageComponent = await pageNode.page.loadMethod();
        await tick();

        if (root)
            fixLinks(root)
    }

    function fixLinks(root: HTMLElement) {
        const anchors = root.querySelectorAll("a");

        for (const a of anchors) {
            const href = a.getAttribute("href");
            if (!href) continue;

            if (href.startsWith("/") || href.startsWith("./") || href.startsWith("#"))
                continue;

            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }
    }
</script>

<style>
    .root {
        padding: 0 15px 0 15px;
        text-align: center;
    }
</style>

{#if PageComponent}
    <div class="root" bind:this={root}>
        <PageComponent></PageComponent>
    </div>
{/if}