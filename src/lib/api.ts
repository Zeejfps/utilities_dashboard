import { get } from 'svelte/store';
import { auth } from './auth';
import type { UserDataAccount, CustomerOverview, ElectricData } from './types';

function getAuthState() {
  const state = get(auth);
  if (!state.token || !state.username) {
    throw new Error('Not authenticated');
  }
  return state;
}

async function apiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const { token, username } = getAuthState();

  const url = new URL(`/api/${path}`, window.location.origin);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-nisc-smarthub-username': username!,
      'x-nisc-smarthub-customernumber': '',
      'cassandracacheable': 'USE_CACHE',
    },
  });

  if (res.status === 401) {
    auth.logout();
    throw new Error('Session expired');
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const { token, username } = getAuthState();

  const res = await fetch(`/api/${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-nisc-smarthub-username': username!,
      'x-nisc-smarthub-customernumber': '',
      'cassandracacheable': 'USE_CACHE',
    },
    body: JSON.stringify(body),
  });

  if (res.status === 401) {
    auth.logout();
    throw new Error('Session expired');
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export interface Account {
  account: string;
  serviceLocations: string[];
}

export interface UserProfile {
  domain: string;
  emailAddress: string;
  registeredOn: number;
  lastSuccessfulLogin: number;
  acceptedTerms: Array<{ termType: string }>;
}

export interface User {
  id: string;
  name: string;
  paperBills: boolean;
  emailNotifications: boolean;
  serviceLocations: Array<{ accountNumber: string; serviceLocation: string }>;
}

export function fetchAccounts(email: string): Promise<Account[]> {
  return apiGet('secured/accounts', { user: email });
}

export function fetchUserData(email: string): Promise<UserDataAccount[]> {
  return apiGet('secured/user-data', { userId: email });
}

export function fetchUserProfile(email: string): Promise<UserProfile> {
  return apiGet('secured/userProfile', { emailAddress: email });
}

export function fetchUser(email: string): Promise<User> {
  return apiGet(`secured/user/${encodeURIComponent(email)}`);
}

export function fetchCustomerOverview(email: string): Promise<CustomerOverview[]> {
  return apiGet('secured/exposed/customer-overview', { email });
}

export function fetchLastBilled(overviewData: CustomerOverview[]): Promise<CustomerOverview[]> {
  return apiPost('secured/exposed/customer-overview/last-billed', overviewData);
}

export function fetchUsageOverview(account: string, serviceLocation: string, industry: string): Promise<ElectricData> {
  return apiGet(`secured/usage-overview/${encodeURIComponent(account)}/${encodeURIComponent(serviceLocation)}/${encodeURIComponent(industry)}`);
}
