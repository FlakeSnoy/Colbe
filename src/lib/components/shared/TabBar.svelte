<script lang="ts">
  import { page } from '$app/stores';
  import { MessageSquare, Phone, Radio, Wrench } from '@lucide/svelte';

  const tabs = [
    { href: '/home',    label: 'Home'    },
    { href: '/calls',   label: 'Calls'   },
    { href: '/updates', label: 'Updates' },
    { href: '/tools',   label: 'Tools'   },
  ];
</script>

<nav class="
  fixed bottom-0 left-0 right-0 z-50
  flex flex-row items-center justify-around
  border-t border-neutral-800 bg-neutral-950
  px-2 pt-2
  md:static md:flex-col md:justify-start md:gap-1
  md:border-r md:border-t-0 md:h-screen md:w-16 md:px-0 md:py-4
">
  {#each tabs as tab}
    {@const active = $page.url.pathname.startsWith(tab.href)}

    <a
      href={tab.href}
      aria-label={tab.label}
      class="relative flex flex-col items-center justify-center p-3 transition-colors md:w-full md:py-3
        {active ? 'text-blue-500' : 'text-neutral-500 hover:text-neutral-200'}"
      aria-current={active ? 'page' : undefined}
    >
      {#if active}
        <span class="absolute left-0 top-1/2 hidden h-5 w-0.75 -translate-y-1/2 rounded-r bg-blue-500 md:block"></span>
      {/if}

      {#if tab.href === '/home'}
        <MessageSquare size={22} strokeWidth={active ? 2.2 : 1.8} />
      {:else if tab.href === '/calls'}
        <Phone size={22} strokeWidth={active ? 2.2 : 1.8} />
      {:else if tab.href === '/updates'}
        <Radio size={22} strokeWidth={active ? 2.2 : 1.8} />
      {:else}
        <Wrench size={22} strokeWidth={active ? 2.2 : 1.8} />
      {/if}

      <span class="mt-0.5 text-[10px] tracking-wide md:hidden">{tab.label}</span>
    </a>
  {/each}
</nav>