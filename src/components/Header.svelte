<script lang="ts">
  import { domain, billing } from '../lib/data';
</script>

<header class="bg-accent border-b border-border">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
    <img src="/logo.png" alt={domain.name} class="h-8 sm:h-10" />
    <span class="text-white/80 text-sm hidden sm:block">{billing.customerName}</span>
  </div>
</header>
