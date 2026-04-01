import { writable } from 'svelte/store';

interface AuthState {
  token: string | null;
  username: string | null;
  expiration: number | null;
}

function createAuth() {
  const stored = sessionStorage.getItem('auth');
  const initial: AuthState = stored ? JSON.parse(stored) : { token: null, username: null, expiration: null };

  // Clear if expired
  if (initial.expiration && Date.now() / 1000 > initial.expiration) {
    sessionStorage.removeItem('auth');
    initial.token = null;
    initial.username = null;
    initial.expiration = null;
  }

  const { subscribe, set } = writable<AuthState>(initial);

  return {
    subscribe,
    login: async (userId: string, password: string): Promise<void> => {
      const res = await fetch('/api/oauth/auth/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ userId, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();

      if (data.status !== 'SUCCESS') {
        throw new Error(data.status || 'Login failed');
      }

      const state: AuthState = {
        token: data.authorizationToken,
        username: data.username,
        expiration: data.expiration,
      };

      sessionStorage.setItem('auth', JSON.stringify(state));
      set(state);
    },
    logout: () => {
      sessionStorage.removeItem('auth');
      set({ token: null, username: null, expiration: null });
    },
  };
}

export const auth = createAuth();
