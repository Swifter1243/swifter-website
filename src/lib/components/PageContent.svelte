<script lang="ts">
    import type {PageNode} from "../../nodes/model/page_node.ts";
    import {navigation} from "../../navigation/navigation.ts";
    import {activePageNode} from "../../view/page_view.ts";
    import ProjectInfo from "./ProjectInfo.svelte";
    import { fade, fly } from "svelte/transition";
    import type {Component} from "svelte";
    import type {Project} from "../../nodes/project/project.ts";

    const { pageNode } : { pageNode?: PageNode } = $props();
    let PageComponent: Component | null = $state(null);

    $effect(() => {
        if (pageNode) {
            loadComponent(pageNode);
        }
    });

    async function loadComponent(pageNode: PageNode) {
        PageComponent = await pageNode.page.loadMethod();
        //(window as any).twttr.widgets.load();
    }
</script>

<style>
    .root {
        padding: 0 15px 0 15px;
        text-align: center;
    }
</style>

{#if PageComponent}
    <div class="root">
        <PageComponent></PageComponent>
    </div>
{/if}