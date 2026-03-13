<script lang="ts">
    import type { Snippet } from "svelte";
    import {navigation} from "../../navigation/navigation.ts";

    let { path, children } = $props<{
        path: string
        children: Snippet
    }>();

    function goToPath(_: Event) {
        navigation.goToPath(path);
    }
</script>

<style>
    .link {
        text-shadow: #51fff1 0 0 20px, #fcffbd 0 0 8px;
        text-decoration: underline;
        color: white;
        cursor: pointer;
    }

    .link:hover {
        filter: brightness(0.7);
    }

    .link:active {
        filter: brightness(0.4);
    }
</style>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_missing_attribute -->
<a class="link" role="button" onclick={goToPath}>
    {@render children()}
</a>