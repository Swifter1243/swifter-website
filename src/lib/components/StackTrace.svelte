<script lang="ts">
    const { cause }: { cause: unknown } = $props()
</script>

<style>
    .stack {
        align-self: start;
        box-sizing: border-box;
        width: min(100%, 360px);
        max-height: min(160px, 100%);
        overflow: auto;
        margin: 0;
        padding: 12px 14px;
        border: 1px solid rgba(235, 92, 108, 0.5);
        border-radius: 5px;
        background-color: rgba(235, 70, 88, 0.12);
        color: rgba(255, 220, 224, 0.8);
        font-family: monospace;
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
        overflow-wrap: anywhere;
        touch-action: pan-y;
        scrollbar-color: #e66b7c rgba(235, 70, 88, 0.12);
    }

    .stack:focus-visible {
        outline: 2px solid rgb(235, 92, 108);
        outline-offset: 3px;
    }

    .stack-message {
        margin: 0 0 10px;
        color: #ffe5e9;
    }

    .frames {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
        gap: 4px 12px;
    }

    .function, .file {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .location {
        display: flex;
        color: #ffabb7;
        white-space: nowrap;
    }

    .position {
        flex-shrink: 0;
    }

    pre {
        margin: 0;
        font: inherit;
        white-space: pre-wrap;
        grid-column: 1 / -1;
    }

    .cause {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(235, 92, 108, 0.5);
    }
</style>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (The scrollable stack trace needs keyboard access.) -->
<div class="stack" tabindex="0" role="region" aria-label="Stack trace">
    {#if cause instanceof Error}
        <p class="stack-message">{cause.name}: {cause.message}</p>
        <div class="frames">
            {#each cause.stack?.split('\n') || [] as line}
                {@const frame = line.trim().match(/^(.*?)@(.+:\d+(?::\d+)?)$/)
                    || line.trim().match(/^at (?:(.+) \()?(.+:\d+(?::\d+)?)\)?$/)}
                {#if frame}
                    {@const source = frame[2].replace(/\?.*?(?=:\d+(?::\d+)?$)/, '').match(/([^/\\]+?)(:\d+(?::\d+)?)$/)}
                    <span class="function" title={frame[1]}>{frame[1] || '<anonymous>'}</span>
                    <span class="location" title={frame[2]}>
                        {#if source}
                            <span class="file">{source[1]}</span><span class="position">{source[2]}</span>
                        {:else}
                            {frame[2]}
                        {/if}
                    </span>
                {:else if line.trim() && line.trim() !== `${cause.name}: ${cause.message}`}
                    <pre>{line}</pre>
                {/if}
            {/each}
        </div>
        {#if cause.cause instanceof Error}
            <pre class="cause">Caused by: {cause.cause.stack || cause.cause.message}</pre>
        {/if}
    {:else if typeof cause === 'string'}
        <pre>{cause}</pre>
    {:else}
        <pre>No stack trace available.</pre>
    {/if}
</div>
