import { writable } from 'svelte/store';
import electricData from '../../data/electric_2.json';
import customerOverviewData from '../../data/customer_overview.json';
import lastBilledData from '../../data/last_billed.json';
import domainData from '../../data/domain.json';
import homeData from '../../data/home.json';

import { fetchUserData } from './api';
import { getAuth } from './auth';

import type {
  ElectricData,
  CustomerOverview,
  DomainConfig,
  HomeConfig,
  QuickLink,
  UserDataAccount,
} from './types';

// --- Static data (no API endpoints yet) ---

export const electric = electricData as ElectricData;

export const billing: CustomerOverview = {
  ...(customerOverviewData as CustomerOverview[])[0],
  ...(lastBilledData as CustomerOverview[])[0],
};

export const domain = (domainData as DomainConfig[])[0];

const home = homeData as HomeConfig;

export const quickLinks: QuickLink[] = [
  home.customQuickLink1,
  home.customQuickLink2,
  home.customQuickLink3,
  home.customQuickLink4,
  home.customQuickLink5,
];

export function getChartData() {
  return [...electric.pastYearOverviewData].reverse();
}

// --- Live data (fetched from API) ---

export const activeAccount = writable<UserDataAccount | null>(null);
export const accountLoading = writable(true);
export const accountError = writable<string | null>(null);

export async function loadAccountData() {
  const { username } = getAuth();
  if (!username) return;

  accountLoading.set(true);
  accountError.set(null);

  try {
    const accounts = await fetchUserData(username);
    const active = accounts.find((a) => !a.inactive) ?? null;
    activeAccount.set(active);
  } catch (err: any) {
    accountError.set(err.message);
  } finally {
    accountLoading.set(false);
  }
}

// --- Helper functions (now work with store values) ---

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
