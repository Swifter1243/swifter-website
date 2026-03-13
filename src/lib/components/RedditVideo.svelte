<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    const { path, width = "80%" } = $props<{
        path: string
        width?: string
    }>()

    let iframe: HTMLIFrameElement

    const onMessage: (e: MessageEvent) => void = (event) => {
        if (event.origin === 'https://www.reddit.com' || event.origin === 'https://embed.reddit.com') {
            const payload = JSON.parse(event.data);
            if (payload.type === 'resize.embed' && iframe) {
                iframe.style.height = payload.data + 'px';
            }
        }
    }

    onMount(() => {
        window.addEventListener('message', onMessage)
    })

    onDestroy(() => {
        window.removeEventListener('message', onMessage)
    })
</script>

<style>
    .video {
        border: none; 
        border-radius: 8px;
    }
</style>

<iframe
    class="video"
    bind:this={iframe}
    title="Reddit Video"
    src="https://embed.reddit.com/{path}?
        embed=true&
        ref_source=embed&
        ref=share&
        utm_medium=widgets&
        utm_source=embedv2&
        utm_term=23&
        theme=dark&
        showedits=false&
        showmedia=false&
        utm_name=post_embed"
    scrolling="no"
    allowfullscreen
    sandbox="allow-scripts 
        allow-same-origin 
        allow-popups"
    style="width:{width}">
</iframe>