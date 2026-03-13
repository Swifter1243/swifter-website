<script lang="ts">
    import {navigation} from "../../navigation/navigation.ts";

    let { path } = $props<{
        path: string
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

<a class="link" onclick={goToPath}><slot></slot></a>