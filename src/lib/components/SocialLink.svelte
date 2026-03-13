<script lang="ts">
    let { background, shadowColor, href } = $props<{
        background: string,
        shadowColor: string
        href: string,
    }>();
</script>

<style>
    .my-link {
        text-decoration: none;
        color: rgb(255, 255, 255) !important;
        font-size: 30px;
        border-radius: 5px;
    }

    .my-link:hover {
        filter: brightness(0.7);
    }

    .my-link:active {
        filter: brightness(0.4);
    }
</style>

<a
        class="my-link"
        {href}
        style="background: {background}; box-shadow: 5px 5px 0 {shadowColor}"
>
    <slot></slot>
</a>