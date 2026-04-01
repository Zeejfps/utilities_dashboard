<script lang="ts">
  import { domain, billing, activeAccount } from '../lib/data';
  import { auth } from '../lib/auth';

  let open = $state(false);

  const initials = $derived(
    $billing
      ? $billing.customerName
          .split(' ')
          .filter((w) => w.length > 1)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
      : ''
  );

  const maskedAccount = $derived(
    $activeAccount ? '****' + $activeAccount.account.slice(-4) : null
  );

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      open = false;
    }
  }

  $effect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<header class="bg-accent border-b border-border">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <img src="{import.meta.env.BASE_URL}logo.png" alt="" class="h-8 sm:h-10" />
      <span class="text-white text-lg sm:text-xl font-semibold tracking-tight">Utilities Dashboard</span>
    </div>

    {#if $billing}
      <div class="relative profile-menu">
        <button
          onclick={() => open = !open}
          class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {initials}
        </button>

        {#if open}
          <div class="absolute right-0 top-12 w-64 bg-surface border border-border rounded-xl shadow-lg shadow-black/30 z-50 overflow-hidden">
            <div class="px-4 py-3">
              <p class="text-white text-sm font-medium">{$billing.customerName}</p>
              <p class="text-text-muted text-xs mt-0.5">{$auth.username}</p>
            </div>

            <div class="border-t border-border">
              <button
                onclick={() => { open = false; auth.logout(); }}
                class="w-full text-left px-4 py-2.5 text-sm text-text-muted hover:text-negative hover:bg-surface-hover transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</header>
