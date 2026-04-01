export interface UsageEntry {
  month: number;
  year: number;
  usage: number;
  cost: number;
  unitsOfMeasure: string[];
}

export interface ElectricData {
  customer: string;
  account: string;
  serviceLocation: string;
  industry: string;
  current: UsageEntry;
  lastMonth: UsageEntry;
  lastYear: UsageEntry;
  pastYearOverviewData: UsageEntry[];
  percentChange: number;
}

export interface CustomerOverview {
  customerName: string;
  customerId: string;
  accountNumbers: string[];
  type: string;
  totalBalance: number;
  dueOn: number;
  hasDueOn: boolean;
  hasAmountDue: boolean;
  hasLastPayment: boolean;
  lastPayment?: number;
  lastPaymentOn?: number;
  hasLastPaymentOn: boolean;
}

export interface DomainConfig {
  name: string;
  phoneNumber: string;
  primaryColor: string;
  imageResource: string;
}

export interface QuickLink {
  link: string;
  text: string;
}

export interface HomeConfig {
  customQuickLink1: QuickLink;
  customQuickLink2: QuickLink;
  customQuickLink3: QuickLink;
  customQuickLink4: QuickLink;
  customQuickLink5: QuickLink;
}

export interface ServiceLocationAddress {
  addr1: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserDataAccount {
  account: string;
  address: string;
  inactive: boolean;
  isAutoPay: boolean;
  services: string[];
  primaryServiceLocationId: string;
  serviceLocationIdToServiceLocationSummary: Record<string, {
    address: ServiceLocationAddress;
    serviceStatus: string;
    meterNumbersToExternalMeterBaseIds: Record<string, string>;
  }>;
}
