<script lang="ts">
    const { link, width = "100%", aspectRatio = 16/9 } = $props<{
        link: string,
        width?: string,
        aspectRatio?: number,
    }>();
</script>


<iframe
    title="Youtube Video"
    class="video"
    src={link}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    allowfullscreen
    style="width: {width}; aspect-ratio: {aspectRatio}"
    loading="lazy"
>
</iframe>