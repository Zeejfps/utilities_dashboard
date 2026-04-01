<script lang="ts">
  import { auth } from '../lib/auth';
  import { domain } from '../lib/data';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);
  let showPassword = $state(false);

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
        <span class="text-white text-2xl font-semibold tracking-tight">Utilities Dashboard</span>
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
            type={showPassword ? 'text' : 'password'}
            bind:value={password}
            class="w-full bg-bg border border-border rounded-lg pl-10 pr-10 py-2.5 text-text text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onclick={() => showPassword = !showPassword}
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors cursor-pointer"
            tabindex={-1}
          >
            {#if showPassword}
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            {:else}
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
              </svg>
            {/if}
          </button>
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
