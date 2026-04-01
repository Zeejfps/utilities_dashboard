<script lang="ts">
  import { billing, electric } from '../lib/data';
  import { formatCurrency, formatDate } from '../lib/format';

  const balance = billing.totalBalance;
  const isPaid = balance === 0;
  const dueDate = billing.hasDueOn ? formatDate(billing.dueOn) : 'N/A';
  const lastPayment = billing.hasLastPayment ? formatCurrency(billing.lastPayment!) : null;
  const estimatedBill = formatCurrency(electric.current.cost);
  const isAutoPay = billing.type === 'AUTOPAY_ONLY';
</script>

<div class="bg-surface rounded-2xl border border-border p-6 sm:p-8">
  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
    <!-- Left: Balance -->
    <div>
      <p class="text-text-muted text-sm mb-1">Current Balance</p>
      <div class="flex items-center gap-3">
        <span class="text-4xl sm:text-5xl font-bold text-white">{formatCurrency(balance)}</span>
        {#if isPaid}
          <span class="bg-positive/20 text-positive text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Paid
          </span>
        {/if}
      </div>
      <p class="text-text-muted text-sm mt-3">
        Estimated this period: <span class="text-accent-light font-medium">{estimatedBill}</span>
      </p>
    </div>

    <!-- Right: Details -->
    <div class="flex flex-col gap-2 sm:items-end sm:text-right">
      <div>
        <p class="text-text-dim text-xs uppercase tracking-wide">Due Date</p>
        <p class="text-white font-medium">{dueDate}</p>
      </div>
      {#if lastPayment}
        <div>
          <p class="text-text-dim text-xs uppercase tracking-wide">Last Payment</p>
          <p class="text-white font-medium">{lastPayment}</p>
        </div>
      {/if}
      {#if isAutoPay}
        <span class="inline-flex items-center gap-1.5 text-accent-light text-sm mt-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          AutoPay Enabled
        </span>
      {/if}
    </div>
  </div>
</div>
