<script lang="ts">
	import favicon from '/favicon.png';

	let { children } = $props();
</script>

<style global>
	@import "/src/style.css";
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
