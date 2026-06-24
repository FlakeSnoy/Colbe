<!-- src/lib/components/shared/UserAvatar.svelte -->
<script lang="ts">
  import { User } from '@lucide/svelte';
  import * as Avatar from '$lib/components/ui/avatar/index.js';

  type Props = {
    src?: string | null;
    name?: string | null;
    class?: string;
  };

  let { src = null, name = null, class: className = '' }: Props = $props();

  // Turn a display name into 1–2 initials  e.g. "John Doe" → "JD"
  let initials = $derived(
    name
      ? name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0].toUpperCase())
          .join('')
      : ''
  );
</script>

<Avatar.Root class="h-9 w-9 shrink-0 {className}">
  {#if src}
    <Avatar.Image {src} alt={name ?? 'User avatar'} class="object-cover" />
  {/if}

  <Avatar.Fallback
    class="bg-neutral-700 text-neutral-200 text-xs font-semibold select-none"
  >
    {#if initials}
      {initials}
    {:else}
      <User size={16} strokeWidth={1.8} class="text-neutral-400" />
    {/if}
  </Avatar.Fallback>
</Avatar.Root>