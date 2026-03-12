<script lang="ts">
	let { children } = $props();
</script>

<style global>
	@import "/src/style.css";
</style>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

{@render children()}
