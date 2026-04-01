<script lang="ts">
  import { activeAccount, accountLoading, accountError, getServiceAddress, getMeterNumber } from '../lib/data';
  import { auth } from '../lib/auth';
</script>

<div class="bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
  <h2 class="text-white text-base font-semibold">Account</h2>

  {#if $accountLoading}
    <div class="flex flex-col gap-3 animate-pulse">
      <div class="h-4 bg-border rounded w-3/4"></div>
      <div class="h-4 bg-border rounded w-1/2"></div>
      <div class="h-4 bg-border rounded w-1/3"></div>
    </div>
  {:else if $accountError}
    <p class="text-negative text-sm">{$accountError}</p>
  {:else if $activeAccount}
    {@const address = getServiceAddress($activeAccount)}
    {@const maskedAccount = '****' + $activeAccount.account.slice(-4)}
    {@const meter = getMeterNumber($activeAccount)}
    {@const services = $activeAccount.services}

    <div class="flex flex-col gap-3">
      <div>
        <p class="text-text-dim text-xs uppercase tracking-wide">Service Address</p>
        <p class="text-text text-sm">{address}</p>
      </div>
      <div class="flex gap-6">
        <div>
          <p class="text-text-dim text-xs uppercase tracking-wide">Account</p>
          <p class="text-text text-sm font-mono">{maskedAccount}</p>
        </div>
        <div>
          <p class="text-text-dim text-xs uppercase tracking-wide">Meter</p>
          <p class="text-text text-sm font-mono">{meter}</p>
        </div>
      </div>
      <div>
        <p class="text-text-dim text-xs uppercase tracking-wide">Services</p>
        <div class="flex gap-2 mt-1">
          {#each services as service}
            <span class="bg-accent/15 text-accent-light text-xs font-medium px-2.5 py-0.5 rounded-full">
              {service}
            </span>
          {/each}
        </div>
      </div>

      <button
        onclick={() => auth.logout()}
        class="text-text-dim hover:text-negative text-sm transition-colors cursor-pointer text-left mt-1"
      >
        Sign Out
      </button>
    </div>
  {/if}
</div>
