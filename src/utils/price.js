export function money(value) {
  return `₹${Math.round(Number(value || 0))}`;
}

const rupeeRegex = /([^₹•]+)?₹\s*(\d+)/g;

export function priceToOptions(item) {
  if (Array.isArray(item.variants) && item.variants.length) return item.variants;
  const priceText = item.price || '';
  const matches = [];
  let match;
  while ((match = rupeeRegex.exec(priceText)) !== null) {
    const label = (match[1] || '').replace(/[•,]/g, '').trim() || 'Regular';
    matches.push({ label, price: Number(match[2]) });
  }
  if (matches.length) return matches;
  return [{ label: 'Regular', price: 0 }];
}

export function getDefaultVariant(item) {
  return priceToOptions(item)[0];
}
