<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types.js';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

{@render children()}