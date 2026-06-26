<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const tabs = [
    {
      id: 'home',
      href: '/home',
      label: 'Chats',
      badge: 6,
      dot: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    },
    {
      id: 'updates',
      href: '/updates',
      label: 'Updates',
      badge: 0,
      dot: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
    },
    {
      id: 'calls',
      href: '/calls',
      label: 'Calls',
      badge: 0,
      dot: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
    },
    {
      id: 'communities',
      href: '/communities',
      label: 'Communities',
      badge: 0,
      dot: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
    {
      id: 'tools',
      href: '/tools',
      label: 'Tools',
      badge: 0,
      dot: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="7" height="7" rx="1"></rect><rect x="15" y="3" width="7" height="7" rx="1"></rect><rect x="2" y="14" width="7" height="7" rx="1"></rect><rect x="15" y="14" width="7" height="7" rx="1"></rect></svg>`,
    },
  ];

  const mobileTabs = [
    {
      id: 'home',
      href: '/home',
      label: 'Chats',
      badge: 6,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    },
    {
      id: 'updates',
      href: '/updates',
      label: 'Updates',
      badge: 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
    },
    {
      id: 'calls',
      href: '/calls',
      label: 'Calls',
      badge: 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.98 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
    },
    {
      id: 'tools',
      href: '/tools',
      label: 'Tools',
      badge: 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="7" height="7" rx="1"></rect><rect x="15" y="3" width="7" height="7" rx="1"></rect><rect x="2" y="14" width="7" height="7" rx="1"></rect><rect x="15" y="14" width="7" height="7" rx="1"></rect></svg>`,
    },
  ];

  const currentPath = $derived($page.url.pathname);

  function isActive(href: string): boolean {
    return currentPath === href || currentPath.startsWith(href + '/');
  }
</script>

<!-- Desktop: left icon rail -->
<nav
  class="hidden md:flex flex-col items-center w-15 bg-zinc-900 border-r border-zinc-800 py-3 gap-1 shrink-0 h-full"
  aria-label="Main navigation"
>
  <div class="flex flex-col items-center gap-1 flex-1">
    {#each tabs as tab (tab.id)}
      <button
        onclick={() => goto(tab.href)}
        aria-label={tab.label}
        aria-current={isActive(tab.href) ? 'page' : undefined}
        class="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-150
          {isActive(tab.href)
            ? 'text-blue-400'
            : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800'}"
      >
        <!-- Active left pill -->
        {#if isActive(tab.href)}
          <span
            class="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-6 bg-blue-500 rounded-r-full"
            aria-hidden="true"
          ></span>
        {/if}

        <!-- Icon + badge -->
        <span class="relative flex items-center justify-center">
          {@html tab.icon}

          {#if tab.badge > 0}
            <span
              class="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
              aria-label="{tab.badge} unread"
            >{tab.badge}</span>
          {:else if tab.dot}
            <span
              class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-zinc-900"
              aria-hidden="true"
            ></span>
          {/if}
        </span>

        <!-- Tooltip -->
        <span
          class="pointer-events-none absolute left-13 z-50 whitespace-nowrap rounded-md bg-zinc-800 border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-100 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          role="tooltip"
        >{tab.label}</span>
      </button>
    {/each}
  </div>

  <!-- Divider -->
  <div class="w-7 h-px bg-zinc-800 my-1" aria-hidden="true"></div>

  <!-- Settings -->
  <button
    onclick={() => goto('/settings')}
    aria-label="Settings"
    class="group relative flex items-center justify-center w-11 h-11 rounded-full text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all duration-150"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    <span
      class="pointer-events-none absolute left-13 z-50 whitespace-nowrap rounded-md bg-zinc-800 border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-100 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100"
      role="tooltip"
    >Settings</span>
  </button>

  <!-- Avatar -->
  <button
    onclick={() => goto('/settings')}
    aria-label="Your profile"
    class="mt-1 w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-200 hover:ring-2 hover:ring-blue-500 transition-all"
  >
    IK
  </button>
</nav>

<!-- Mobile: bottom tab bar -->
<nav
  class="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 h-15"
  aria-label="Main navigation"
>
  {#each mobileTabs as tab (tab.id)}
    <button
      onclick={() => goto(tab.href)}
      aria-label={tab.label}
      aria-current={isActive(tab.href) ? 'page' : undefined}
      class="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150
        {isActive(tab.href) ? 'text-blue-400' : 'text-zinc-500'}"
    >
      <span class="relative flex items-center justify-center">
        {@html tab.icon}
        {#if tab.badge > 0}
          <span
            class="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
            aria-label="{tab.badge} unread"
          >{tab.badge}</span>
        {/if}
      </span>
      <span class="text-[10px] font-medium leading-none">{tab.label}</span>
    </button>
  {/each}
</nav>