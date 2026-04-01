<script lang="ts">
  import { quickLinks } from '../lib/data';

  const icons: Record<string, string> = {
    'Power Outage Map': 'M13 10V3L4 14h7v7l9-11h-7z',
    'Huntsville Utilities Website': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    'Rebates': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'Project Share Donation': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'Chat': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  };
</script>

<div class="bg-surface rounded-2xl border border-border p-6">
  <h2 class="text-white text-base font-semibold mb-4">Quick Links</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {#each quickLinks as link}
      <a
        href={link.link}
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center gap-2 p-3 rounded-xl bg-bg border border-border hover:border-accent/50 hover:bg-surface-hover transition-colors text-center group"
      >
        <svg class="w-5 h-5 text-text-dim group-hover:text-accent-light transition-colors" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d={icons[link.text] ?? 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'}/>
        </svg>
        <span class="text-text-muted text-xs group-hover:text-text transition-colors">{link.text}</span>
      </a>
    {/each}
  </div>
</div>
