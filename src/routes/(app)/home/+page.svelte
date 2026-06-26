<script lang="ts">
  import { TabBar } from '$lib/index.js';
  import type { PageData } from './$types.js';

  interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    online?: boolean;
  }

  const { data } = $props<{ data: PageData & { conversations?: Conversation[] } }>();
</script>

<div class="flex h-screen w-screen overflow-hidden bg-zinc-950">
  <!-- Left icon rail (desktop) -->
  <TabBar />

  <!-- Middle panel: conversation list -->
  <aside
    class="hidden md:flex flex-col w-85 shrink-0 bg-zinc-900 border-r border-zinc-800 h-full"
    aria-label="Conversations"
  >
    <!-- Panel header -->
    <div class="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
      <h1 class="text-[17px] font-semibold text-zinc-100 tracking-tight">Colbe</h1>
      <div class="flex items-center gap-1">
        <button
          aria-label="New chat"
          class="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="8" x2="12" y2="14"/>
            <line x1="9" y1="11" x2="15" y2="11"/>
          </svg>
        </button>
        <button
          aria-label="More options"
          class="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="px-3 py-2 border-b border-zinc-800">
      <div class="flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500 shrink-0" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="search"
          placeholder="Search or start new chat"
          class="bg-transparent border-none outline-none text-sm text-zinc-200 placeholder:text-zinc-500 w-full"
        />
      </div>
    </div>

    <!-- Filter chips -->
    <div class="flex items-center gap-2 px-3 py-2 border-b border-zinc-800">
      <button class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">All</button>
      <button class="px-3 py-1 rounded-full text-zinc-400 text-xs font-medium hover:bg-zinc-800 transition-colors">Unread</button>
      <button class="px-3 py-1 rounded-full text-zinc-400 text-xs font-medium hover:bg-zinc-800 transition-colors">Favorites</button>
      <button class="px-3 py-1 rounded-full text-zinc-400 text-xs font-medium hover:bg-zinc-800 transition-colors">Groups</button>
    </div>

    <!-- Conversation list -->
    <ul class="flex-1 overflow-y-auto" role="list" aria-label="Conversations">
      {#each data.conversations ?? [] as convo}
        <li>
          <a
            href="/home/{convo.id}"
            class="flex items-center gap-3 px-3 py-3 hover:bg-zinc-800/60 transition-colors border-b border-zinc-800/50"
          >
            <div class="relative shrink-0">
              <div class="w-11 h-11 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-200">
                {convo.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              {#if convo.online}
                <!-- svelte-ignore element_invalid_self_closing_tag -->
                <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900" aria-hidden="true" />
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-zinc-100 truncate">{convo.name}</span>
                <span class="text-[11px] text-zinc-500 shrink-0 ml-2">{convo.time}</span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-xs text-zinc-400 truncate">{convo.lastMessage}</span>
                {#if convo.unread > 0}
                  <span class="ml-2 min-w-4.5 h-4.5 px-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {convo.unread}
                  </span>
                {/if}
              </div>
            </div>
          </a>
        </li>
      {/each}

      <!-- Empty state -->
      {#if !data.conversations?.length}
        <li class="flex flex-col items-center justify-center h-40 text-zinc-500 text-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>No conversations yet</span>
        </li>
      {/if}
    </ul>
  </aside>

  <!-- Main content area -->
  <main class="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950 pb-15 md:pb-0">
    <!-- Empty state: no chat selected -->
    <div class="flex flex-col items-center justify-center h-full gap-4 select-none">
      <div class="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div class="text-center">
        <p class="text-zinc-200 font-medium text-base">Your messages</p>
        <p class="text-zinc-500 text-sm mt-1 max-w-55">
          Select a conversation or start a new one
        </p>
      </div>
      <button
        class="mt-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
      >
        New chat
      </button>
      <p class="text-[11px] text-zinc-600 flex items-center gap-1.5 mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        End-to-end encrypted
      </p>
    </div>
  </main>
</div>