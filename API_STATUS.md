# API Migration Status

## Replaced (live data from SmartHub API)

- [x] `accounts.json` → `GET /services/secured/accounts?user={email}`
- [x] `user_data.json` → `GET /services/secured/user-data?userId={email}`
- [x] `profile.json` → `GET /services/secured/userProfile?emailAddress={email}`
- [x] `user.json` → `GET /services/secured/user/{email}`
- [x] `auth_response.json` → `POST /services/oauth/auth/v2`

## Still using static JSON (need to capture endpoints)

- [ ] `electric_2.json` — Electric usage history + current month cost (BillCard, UsageSnapshot, UsageChart)
- [ ] `customer_overview.json` — Balance, due date, customer name (BillCard, Header)
- [ ] `last_billed.json` — Last payment amount (BillCard)
- [ ] `domain.json` — Utility name, phone number, branding (Header, Footer)
- [ ] `home.json` — Quick links (QuickLinks)

## How to capture missing endpoints

1. Open https://hsvutil.smarthub.coop/ui/ in Chrome
2. Open DevTools → Network tab → filter by "Fetch/XHR"
3. Log in and navigate around the dashboard
4. Right-click requests → "Copy as cURL"
5. Look for requests whose responses match the static JSON files above
