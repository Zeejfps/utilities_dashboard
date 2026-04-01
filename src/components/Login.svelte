<script lang="ts">
  import { auth } from '../lib/auth';
  import { domain } from '../lib/data';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      await auth.login(email, password);
    } catch (err: any) {
      error = err.message || 'Login failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-bg flex items-center justify-center px-4">
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <img src="/logo.png" alt={domain.name} class="h-12 mx-auto mb-6" />
      <p class="text-text-muted text-sm">Sign in to your account</p>
    </div>

    <form onsubmit={handleSubmit} class="bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
      {#if error}
        <div class="bg-negative/10 border border-negative/30 text-negative text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      {/if}

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-text-muted text-sm">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          class="bg-bg border border-border rounded-lg px-4 py-2.5 text-text text-sm placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-text-muted text-sm">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          class="bg-bg border border-border rounded-lg px-4 py-2.5 text-text text-sm placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="bg-accent hover:bg-accent-light disabled:opacity-50 text-white font-medium text-sm rounded-lg px-4 py-2.5 mt-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>

    <p class="text-text-dim text-xs text-center mt-6">
      {domain.name} &bull; {domain.phoneNumber}
    </p>
  </div>
</div>
