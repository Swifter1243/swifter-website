<script lang="ts">
    import type {PageNode} from "../../nodes/model/page_node.ts";
    import type {Component} from "svelte";

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