<script lang="ts">
  import { electric, electricLoading } from '../lib/data';
  import { formatCurrency, formatNumber } from '../lib/format';
</script>

<div class="bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
  <h2 class="text-white text-base font-semibold">This Month</h2>

  {#if $electricLoading}
    <div class="animate-pulse flex flex-col gap-4">
      <div class="h-8 bg-border rounded w-32"></div>
      <div class="h-4 bg-border rounded w-20"></div>
      <div class="border-t border-border pt-4 flex flex-col gap-3">
        <div class="h-4 bg-border rounded w-full"></div>
        <div class="h-4 bg-border rounded w-full"></div>
      </div>
    </div>
  {:else if $electric}
    {@const current = $electric.current}
    {@const lastMonth = $electric.lastMonth}
    {@const lastYear = $electric.lastYear}
    {@const vsLastMonth = ((current.usage - lastMonth.usage) / lastMonth.usage) * 100}
    {@const vsLastYear = ((current.usage - lastYear.usage) / lastYear.usage) * 100}

    <div>
      <p class="text-3xl font-bold text-white">{formatNumber(current.usage)} <span class="text-text-muted text-lg font-normal">KWH</span></p>
      <p class="text-text-muted text-sm mt-1">{formatCurrency(current.cost)}</p>
    </div>

    <div class="border-t border-border pt-4 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-text-muted text-sm">vs Last Month</span>
        <span class="text-sm font-medium {vsLastMonth <= 0 ? 'text-positive' : 'text-negative'}">
          {vsLastMonth <= 0 ? '▼' : '▲'} {Math.abs(vsLastMonth).toFixed(1)}%
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-text-muted text-sm">vs Last Year</span>
        <span class="text-sm font-medium {vsLastYear <= 0 ? 'text-positive' : 'text-negative'}">
          {vsLastYear <= 0 ? '▼' : '▲'} {Math.abs(vsLastYear).toFixed(1)}%
        </span>
      </div>
    </div>
  {/if}
</div>
