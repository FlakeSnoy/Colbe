<script lang="ts">
  import type { Snippet } from 'svelte';
  import TabBar from '$lib/components/shared/TabBar.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex h-screen flex-col bg-neutral-950 text-white md:flex-row">
  <!-- side rail on md+, hidden here because TabBar renders itself fixed on mobile -->
  <div class="hidden md:flex">
    <TabBar />
  </div>

  <!-- main content -->
  <main class="flex-1 overflow-y-auto pb-16 md:pb-0">
    {@render children?.()}
  </main>

  <!-- bottom bar on mobile only -->
  <div class="md:hidden">
    <TabBar />
  </div>
</div>