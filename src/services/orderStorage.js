const GOOGLE_SHEETS_WEB_APP_URL = (import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL || '').trim();
const ORDER_SYNC_QUEUE_KEY = 'big-bites-order-sync-queue-v1';

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

function readQueue() {
  if (typeof window === 'undefined') return [];
  return safeJsonParse(window.localStorage.getItem(ORDER_SYNC_QUEUE_KEY), []);
}

function writeQueue(queue) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ORDER_SYNC_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
  } catch {
    // Ignore storage failures. Checkout should never be blocked by local storage.
  }
}

function enqueueOrder(order, reason = 'Not synced') {
  const queue = readQueue();
  writeQueue([{ order, reason, queuedAt: new Date().toISOString() }, ...queue]);
}

function itemLine(item) {
  const extras = item.addOns?.length
    ? ` | Extras: ${item.addOns.map((addOn) => `${addOn.name} (${addOn.price})`).join(', ')}`
    : '';
  const note = item.note ? ` | Note: ${item.note}` : '';
  return `${item.quantity} x ${item.name} (${item.variant?.label || 'Regular'} - ${item.variant?.price || 0})${extras}${note}`;
}

export function flattenOrderForGoogleSheets(order) {
  const customer = order.customer || {};
  const totals = order.totals || {};
  const discount = totals.discount || {};
  const items = Array.isArray(order.items) ? order.items : [];

  return {
    orderId: order.id,
    createdAt: order.createdAt,
    status: order.status || 'New WhatsApp order',
    customerName: customer.name || '',
    customerPhone: customer.phone || '',
    branch: customer.branch || '',
    orderType: customer.orderType || '',
    preferredTime: customer.preferredTime || '',
    address: customer.address || '',
    landmark: customer.landmark || '',
    customerNotes: customer.notes || '',
    coupon: order.coupon || '',
    couponStatus: discount.label || '',
    subtotal: totals.subtotal || 0,
    discountAmount: discount.amount || 0,
    grandTotal: totals.total || 0,
    itemCount: totals.itemCount || 0,
    items: items.map(itemLine).join('\n'),
    source: 'Big Bites PWA',
  };
}

export async function saveOrderToGoogleSheets(order) {
  if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL.includes('PASTE_')) {
    enqueueOrder(order, 'Google Sheets Web App URL not configured');
    return { ok: false, skipped: true, queued: true };
  }

  const payload = {
    order: flattenOrderForGoogleSheets(order),
    rawOrder: order,
  };

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-store',
      keepalive: true,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { ok: true, queued: false };
  } catch (error) {
    enqueueOrder(order, error?.message || 'Network error while saving to Google Sheets');
    return { ok: false, queued: true, error };
  }
}

export function getQueuedOrdersCount() {
  return readQueue().length;
}
