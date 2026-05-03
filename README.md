# Big Bites PWA

Premium React + Vite + Tailwind CSS v4 PWA for Big Bites.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL on desktop, or use your laptop IP on mobile because the dev script already uses `--host 0.0.0.0`.

## Main features

- Mobile-first PWA with install prompt and offline support
- Official Big Bites branding, logo, maps, phone and WhatsApp integration
- 35-item menu with search, category filter, sort and batch loading for smoother mobile scrolling
- Flip/twist food cards: front shows food, back shows price
- Customization modal with size/portion, add-ons, quantity and notes
- Cart system with quantity edit, coupon codes, bill summary and WhatsApp checkout
- Branch selection for Tiruvallur, Sriperumbudur, Pattabiram, Uthukottai and Andhra
- Delivery / pickup toggle with address, landmark and preferred time fields
- Order tracking screen after checkout
- Quick reorder from previous order
- Cart upsell suggestions
- Store open/closed status
- EmailJS-ready contact/franchise setup
- Google Sheets order storage before WhatsApp checkout

## Environment variables

The `.env.example` file contains the required EmailJS, WhatsApp and Google Sheets variables.

## Google Sheets order storage

This project includes a ready-to-deploy Apps Script in `google-sheets/Code.gs`.

Read `GOOGLE_SHEETS_SETUP.md`, deploy the Apps Script as a Web App, then paste the Web App URL into `.env` as `VITE_GOOGLE_SHEETS_WEB_APP_URL`.

At checkout, the app saves the order to Google Sheets first and then opens WhatsApp with the full order summary. If the Web App URL is not configured, the app will still continue WhatsApp checkout and queue the order locally.
