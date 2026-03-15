<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Project } from "../../nodes/project/project";
    import { activePageNode } from "../../view/page_view";

    let project: Project | undefined = $derived($activePageNode?.project)

    const { children } = $props<{
        children: Snippet
    }>()
</script>

<style>
    .button {
        padding: 5px 80px;
        color: black !important;
        font-size: 40px;
        border-radius: 5px;
        background: linear-gradient(
            var(--rotate),
            rgb(213, 46, 255) 0%,
            rgb(198, 203, 160) 50%,
            rgb(99, 169, 173) 100%
        );
        background-size: 120% 400%;
        background-position: center;
        text-decoration: none;
        animation: rotate-gradient;
        animation-duration: 4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
</style>

<a class="button" href={project?.demoLink} target="_blank">{@render children()}</a>