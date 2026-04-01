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

    if (!email.trim() || !password) {
      error = 'Please enter your email and password.';
      return;
    }

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
      <div class="flex items-center justify-center gap-3 mb-4">
        <img src="/hsv_utils_logo.png" alt="" class="h-14" />
        <span class="text-white text-2xl font-semibold tracking-tight">Huntsville Utilities</span>
      </div>
      <p class="text-text-muted text-sm">Sign in to your account</p>
    </div>

    <form novalidate onsubmit={handleSubmit} class="bg-surface rounded-2xl border border-border p-6 flex flex-col gap-4">
      {#if error}
        <div class="bg-negative/10 border border-negative/30 text-negative text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      {/if}

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-text-muted text-sm">Email</label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-dim pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full bg-bg border border-border rounded-lg pl-10 pr-4 py-2.5 text-text text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-text-muted text-sm">Password</label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-dim pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
          </svg>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="w-full bg-bg border border-border rounded-lg pl-10 pr-4 py-2.5 text-text text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="Enter your password"
          />
        </div>
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

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--color-bg) inset;
    -webkit-text-fill-color: var(--color-text);
    caret-color: var(--color-text);
    transition: background-color 5000s ease-in-out 0s;
  }

  input::placeholder {
    color: var(--color-text-dim);
  }
</style>
