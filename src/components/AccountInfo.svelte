<script lang="ts">
  import { activeAccount, getServiceAddress, getMeterNumber } from '../lib/data';

  const address = getServiceAddress();
  const maskedAccount = '****' + activeAccount.account.slice(-4);
  const meter = getMeterNumber();
  const services = activeAccount.services;
</script>

<div class="bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
  <h2 class="text-white text-base font-semibold">Account</h2>

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
  </div>
</div>
