<script lang="ts">
    const { src } = $props<{
        src: string
    }>()
</script>

<audio controls>
    <source {src} type="audio/wav">
    Your browser does not support the audio element.
</audio>