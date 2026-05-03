/**
 * Big Bites PWA → Google Sheets order storage
 *
 * Setup:
 * 1. Create a Google Sheet named "Big Bites Orders".
 * 2. Go to Extensions → Apps Script.
 * 3. Paste this complete file into Code.gs.
 * 4. Deploy → New deployment → Web app.
 * 5. Execute as: Me.
 * 6. Who has access: Anyone.
 * 7. Copy the Web App URL and paste it into .env:
 *    VITE_GOOGLE_SHEETS_WEB_APP_URL=YOUR_WEB_APP_URL
 */

const SHEET_NAME = 'Orders';
const SPREADSHEET_ID = ''; // Optional: paste a Sheet ID here. Leave empty when script is attached to the target Sheet.

const HEADERS = [
  'Order ID',
  'Created At',
  'Status',
  'Customer Name',
  'Customer Phone',
  'Branch',
  'Order Type',
  'Preferred Time',
  'Address',
  'Landmark',
  'Customer Notes',
  'Coupon',
  'Coupon Status',
  'Subtotal',
  'Discount Amount',
  'Grand Total',
  'Item Count',
  'Items',
  'Source',
  'Raw JSON',
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const order = payload.order || {};
    const rawOrder = payload.rawOrder || payload;
    const sheet = getOrdersSheet_();

    ensureHeaders_(sheet);

    sheet.appendRow([
      order.orderId || '',
      order.createdAt || new Date().toISOString(),
      order.status || 'New',
      order.customerName || '',
      order.customerPhone || '',
      order.branch || '',
      order.orderType || '',
      order.preferredTime || '',
      order.address || '',
      order.landmark || '',
      order.customerNotes || '',
      order.coupon || '',
      order.couponStatus || '',
      Number(order.subtotal || 0),
      Number(order.discountAmount || 0),
      Number(order.grandTotal || 0),
      Number(order.itemCount || 0),
      order.items || '',
      order.source || 'Big Bites PWA',
      JSON.stringify(rawOrder),
    ]);

    return json_({ ok: true, orderId: order.orderId || '' });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, message: 'Big Bites order storage is live.' });
}

function getOrdersSheet_() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
