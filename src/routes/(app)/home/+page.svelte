<script lang="ts">
  import { TabBar } from '$lib/index.js';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-screen flex-col overflow-hidden bg-neutral-950 text-white md:flex-row">
  <TabBar />
  <main class="flex-1 overflow-hidden pb-14 md:pb-0">
    {@render children()}
  </main>
</div>