import { writable, get } from 'svelte/store';
import domainData from '../../data/domain.json';

import { fetchUserData, fetchCustomerOverview, fetchLastBilled, fetchUsageOverview } from './api';
import { getAuth } from './auth';

import type {
  ElectricData,
  CustomerOverview,
  DomainConfig,
  UserDataAccount,
} from './types';

// --- Static data (no API endpoints yet) ---

export const domain = (domainData as DomainConfig[])[0];

// --- Live data stores ---

export const billing = writable<CustomerOverview | null>(null);
export const billingLoading = writable(true);

export const electric = writable<ElectricData | null>(null);
export const electricLoading = writable(true);

export const activeAccount = writable<UserDataAccount | null>(null);
export const accountLoading = writable(true);
export const accountError = writable<string | null>(null);

// --- Load guard ---

let loading = false;
let loaded = false;

export function resetData() {
  loading = false;
  loaded = false;
  billing.set(null);
  billingLoading.set(true);
  electric.set(null);
  electricLoading.set(true);
  activeAccount.set(null);
  accountLoading.set(true);
  accountError.set(null);
}

// --- Data loaders ---

export async function loadBillingData() {
  const { username } = getAuth();
  if (!username) return;

  billingLoading.set(true);
  try {
    const overview = await fetchCustomerOverview(username);
    const enriched = await fetchLastBilled(overview);
    // Merge first entries (last-billed enriches overview with lastPayment fields)
    billing.set({ ...overview[0], ...enriched[0] });
  } catch (err: any) {
    console.error('Failed to load billing data:', err);
  } finally {
    billingLoading.set(false);
  }
}

export async function loadAccountData() {
  const { username } = getAuth();
  if (!username) return;

  accountLoading.set(true);
  accountError.set(null);

  try {
    const accounts = await fetchUserData(username);
    const active = accounts.find((a) => !a.inactive) ?? null;
    activeAccount.set(active);

    // Once we have the active account, load electric usage
    if (active) {
      await loadElectricData(active.account, active.primaryServiceLocationId);
    }
  } catch (err: any) {
    accountError.set(err.message);
  } finally {
    accountLoading.set(false);
  }
}

async function loadElectricData(account: string, serviceLocation: string) {
  electricLoading.set(true);
  try {
    const data = await fetchUsageOverview(account, serviceLocation, 'ELECTRIC');
    electric.set(data);
  } catch (err: any) {
    console.error('Failed to load electric data:', err);
  } finally {
    electricLoading.set(false);
  }
}

export async function loadAllData() {
  if (loading || loaded) return;
  loading = true;
  try {
    await Promise.all([loadBillingData(), loadAccountData()]);
    loaded = true;
  } finally {
    loading = false;
  }
}

// --- Helper functions ---

export function getChartData(data: ElectricData) {
  return [...data.pastYearOverviewData].reverse();
}

export function getMeterNumber(account: UserDataAccount): string {
  const loc = account.serviceLocationIdToServiceLocationSummary[
    account.primaryServiceLocationId
  ];
  const meters = Object.keys(loc?.meterNumbersToExternalMeterBaseIds ?? {});
  return meters[0] ?? 'N/A';
}

export function getServiceAddress(account: UserDataAccount): string {
  const loc = account.serviceLocationIdToServiceLocationSummary[
    account.primaryServiceLocationId
  ];
  if (!loc) return account.address;
  const a = loc.address;
  return `${a.addr1}, ${a.city}, ${a.state} ${a.zip}`;
}
