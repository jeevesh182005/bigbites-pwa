export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({
        ok: false,
        message: 'Order ID is required',
      });
    }

    const scriptUrl =
      process.env.GOOGLE_SHEETS_WEB_APP_URL ||
      process.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

    if (!scriptUrl) {
      return res.status(500).json({
        ok: false,
        message: 'Google Sheets Web App URL is not configured',
      });
    }

    const url = new URL(scriptUrl);
    url.searchParams.set('action', 'GET_ORDER_STATUS');
    url.searchParams.set('orderId', orderId);
    url.searchParams.set('t', Date.now().toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-store',
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        ok: false,
        message: 'Invalid response from Google Apps Script',
        raw: text,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}