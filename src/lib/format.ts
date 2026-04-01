const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatMonth(month: number, year: number): string {
  return `${MONTH_NAMES[month - 1]} '${String(year).slice(2)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(epochMs: number): string {
  return new Date(epochMs).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}
