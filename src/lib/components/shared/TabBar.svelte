<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import {
    MessageSquare, Phone, Radio, Wrench,
    Settings, Menu, X
  } from '@lucide/svelte';
  import type { Component } from 'svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Sheet from '$lib/components/ui/sheet/index.js';
  import UserAvatar from './UserAvatar.svelte';

  type Tab = { href: string; label: string; icon: Component };

  const tabs: Tab[] = [
    { href: '/home',    label: 'Chats',   icon: MessageSquare },
    { href: '/calls',   label: 'Calls',   icon: Phone         },
    { href: '/updates', label: 'Updates', icon: Radio         },
    { href: '/tools',   label: 'Tools',   icon: Wrench        },
  ];

  let current        = $derived($page.url.pathname);
  let settingsActive = $derived(current.startsWith('/settings'));
  let open           = $state(false);

  function navigate(href: string) {
    goto(href);
    open = false;
  }
</script>

<!-- ─── Desktop sidebar ──────────────────────────────────── -->
<aside class="
  hidden md:flex flex-col items-center justify-between
  h-screen w-15 shrink-0
  border-r border-white/10 bg-[#111b21] py-3
">
  <!-- Avatar -->
  <Button
    variant="ghost"
    size="icon"
    onclick={() => navigate('/settings/profile')}
    class="rounded-full mb-2 p-0 h-9 w-9 opacity-80 hover:opacity-100"
  >
    <UserAvatar class="h-9 w-9 rounded-full" />
  </Button>

  <!-- Main tabs -->
  <nav class="flex flex-col items-center gap-1 flex-1 pt-1 w-full">
    {#each tabs as { href, label, icon: Icon }}
      {@const active = current.startsWith(href)}
      <div class="relative w-full flex justify-center">
        {#if active}
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 rounded-r-full bg-blue-400 pointer-events-none" />
        {/if}
        <Button
          variant="ghost"
          size="icon"
          onclick={() => navigate(href)}
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          class="w-full h-12 rounded-lg {active ? 'text-blue-400 hover:text-blue-400' : 'text-neutral-500 hover:text-neutral-200'}"
        >
          <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
        </Button>
      </div>
    {/each}
  </nav>

  <!-- Settings -->
  <div class="relative w-full flex justify-center">
    {#if settingsActive}
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 rounded-r-full bg-blue-400 pointer-events-none" />
    {/if}
    <Button
      variant="ghost"
      size="icon"
      onclick={() => navigate('/settings')}
      aria-label="Settings"
      aria-current={settingsActive ? 'page' : undefined}
      class="w-full h-11 rounded-lg {settingsActive ? 'text-blue-400 hover:text-blue-400' : 'text-neutral-500 hover:text-neutral-200'}"
    >
      <Settings size={21} strokeWidth={settingsActive ? 2.2 : 1.8} />
    </Button>
  </div>
</aside>

<!-- ─── Mobile bottom bar + Sheet ────────────────────────── -->
<div class="md:hidden">
  <!-- Bottom bar -->
  <nav class="
    fixed bottom-0 inset-x-0 z-50 h-14
    flex items-center justify-around
    border-t border-white/10 bg-[#111b21]
  ">
    {#each tabs.slice(0, 3) as { href, label, icon: Icon }}
      {@const active = current.startsWith(href)}
      <Button
        variant="ghost"
        size="icon"
        onclick={() => navigate(href)}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        class="flex flex-col gap-0.5 h-12 w-14 rounded-lg
          {active ? 'text-blue-400 hover:text-blue-400' : 'text-neutral-500 hover:text-neutral-200'}"
      >
        {#if active}
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <span class="absolute -top-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 pointer-events-none" />
        {/if}
        <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
        <span class="text-[10px] leading-none">{label}</span>
      </Button>
    {/each}

    <!-- Hamburger opens Sheet with all nav items -->
    <Sheet.Root bind:open>
      <Sheet.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            size="icon"
            aria-label="More"
            class="flex flex-col gap-0.5 h-12 w-14 rounded-lg text-neutral-500 hover:text-neutral-200"
          >
            <Menu size={21} strokeWidth={1.8} />
            <span class="text-[10px] leading-none">More</span>
          </Button>
        {/snippet}
      </Sheet.Trigger>

      <Sheet.Content side="bottom" class="bg-[#111b21] border-t border-white/10 rounded-t-2xl px-4 pb-8">
        <Sheet.Header class="mb-4">
          <Sheet.Title class="text-white text-sm font-medium">Navigation</Sheet.Title>
        </Sheet.Header>

        <div class="grid grid-cols-4 gap-3">
          {#each tabs as { href, label, icon: Icon }}
            {@const active = current.startsWith(href)}
            <Button
              variant="ghost"
              onclick={() => navigate(href)}
              aria-label={label}
              class="flex flex-col items-center gap-1.5 h-auto py-3 rounded-xl
                {active ? 'text-blue-400 bg-blue-400/10 hover:text-blue-400' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'}"
            >
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              <span class="text-[11px] leading-none">{label}</span>
            </Button>
          {/each}

          <Button
            variant="ghost"
            onclick={() => navigate('/settings')}
            aria-label="Settings"
            class="flex flex-col items-center gap-1.5 h-auto py-3 rounded-xl
              {settingsActive ? 'text-blue-400 bg-blue-400/10 hover:text-blue-400' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'}"
          >
            <Settings size={22} strokeWidth={settingsActive ? 2.2 : 1.8} />
            <span class="text-[11px] leading-none">Settings</span>
          </Button>

          <Button
            variant="ghost"
            onclick={() => navigate('/settings/profile')}
            aria-label="Profile"
            class="flex flex-col items-center gap-1.5 h-auto py-3 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
          >
            <UserAvatar class="h-6 w-6 rounded-full" />
            <span class="text-[11px] leading-none">Profile</span>
          </Button>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  </nav>
</div>