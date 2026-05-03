# Google Sheets order storage setup

The app already contains the frontend integration. Follow these steps once to connect it to your own Google Sheet.

## 1. Create the Sheet

Create a Google Sheet named:

```txt
Big Bites Orders
```

## 2. Add Apps Script

Open the Sheet, then go to:

```txt
Extensions → Apps Script
```

Delete the default code and paste the full code from:

```txt
google-sheets/Code.gs
```

## 3. Deploy as Web App

Go to:

```txt
Deploy → New deployment → Select type → Web app
```

Use these settings:

```txt
Execute as: Me
Who has access: Anyone
```

Click Deploy, allow permissions, then copy the Web App URL.

## 4. Add the Web App URL to the PWA

Open `.env` and update:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then restart Vite:

```bash
npm run dev
```

## 5. Test

Place a test order in the app. During checkout, the app will:

```txt
Save order to Google Sheets → Open WhatsApp with full order summary
```

## Sheet columns created automatically

- Order ID
- Created At
- Status
- Customer Name
- Customer Phone
- Branch
- Order Type
- Preferred Time
- Address
- Landmark
- Customer Notes
- Coupon
- Coupon Status
- Subtotal
- Discount Amount
- Grand Total
- Item Count
- Items
- Source
- Raw JSON

## Important

Do not paste private Google credentials into the frontend. Only paste the Apps Script Web App URL into `.env`.
