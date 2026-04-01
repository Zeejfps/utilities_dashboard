import electricData from '../../data/electric_2.json';
import customerOverviewData from '../../data/customer_overview.json';
import lastBilledData from '../../data/last_billed.json';
import domainData from '../../data/domain.json';
import homeData from '../../data/home.json';
import userDataRaw from '../../data/user_data.json';

import type {
  ElectricData,
  CustomerOverview,
  DomainConfig,
  HomeConfig,
  QuickLink,
  UserDataAccount,
} from './types';

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

export const activeAccount = (userDataRaw as UserDataAccount[]).find(
  (a) => !a.inactive
)!;

export function getChartData() {
  return [...electric.pastYearOverviewData].reverse();
}

export function getMeterNumber(): string {
  const loc = activeAccount.serviceLocationIdToServiceLocationSummary[
    activeAccount.primaryServiceLocationId
  ];
  const meters = Object.keys(loc?.meterNumbersToExternalMeterBaseIds ?? {});
  return meters[0] ?? 'N/A';
}

export function getServiceAddress(): string {
  const loc = activeAccount.serviceLocationIdToServiceLocationSummary[
    activeAccount.primaryServiceLocationId
  ];
  if (!loc) return activeAccount.address;
  const a = loc.address;
  return `${a.addr1}, ${a.city}, ${a.state} ${a.zip}`;
}
