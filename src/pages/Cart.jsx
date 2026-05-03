import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock3, MapPin, Minus, PackageCheck, Plus, RotateCcw, ShoppingBag, Trash2, Truck, WalletCards } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { brand, branchOptions, cartUpsellItems, couponHints, createWhatsAppLink, orderAddOns } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { getDefaultVariant, money } from '../utils/price.js';
import { saveOrderToGoogleSheets } from '../services/orderStorage.js';

function buildOrderMessage({ items, customer, totals, coupon }) {
  const lines = [];
  lines.push('Hi Big Bites, I want to place this order:');
  lines.push('');
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Option: ${item.variant.label} - ${money(item.variant.price)}`);
    if (item.addOns.length) lines.push(`   Extras: ${item.addOns.map((addOn) => `${addOn.name} (${money(addOn.price)})`).join(', ')}`);
    if (item.note) lines.push(`   Note: ${item.note}`);
    lines.push(`   Qty: ${item.quantity}`);
    lines.push(`   Item Total: ${money(item.unitTotal * item.quantity)}`);
  });
  lines.push('');
  lines.push(`Subtotal: ${money(totals.subtotal)}`);
  if (coupon) lines.push(`Coupon: ${coupon} (${totals.discount.label || 'noted'})`);
  if (totals.discount.amount) lines.push(`Discount: -${money(totals.discount.amount)}`);
  lines.push(`Grand Total: ${money(totals.total)}`);
  lines.push('');
  lines.push(`Preferred Branch: ${customer.branch}`);
  lines.push(`Order Type: ${customer.orderType}`);
  lines.push(`Preferred Time: ${customer.preferredTime}`);
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  if (customer.orderType === 'Delivery') {
    lines.push(`Address: ${customer.address}`);
    if (customer.landmark) lines.push(`Landmark: ${customer.landmark}`);
  }
  if (customer.notes) lines.push(`Customer Note: ${customer.notes}`);
  lines.push('');
  lines.push('Please confirm availability, final bill and preparation time.');
  return lines.join('\n');
}

function summarizeItems(items) {
  return items.map((item) => `${item.quantity}× ${item.name}`).join(', ');
}

export default function Cart() {
  const { items, customer, totals, removeItem, updateQty, setCoupon, setCustomer, clearCart, state, addItem, replaceItems, lastOrder, saveLastOrder } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  function addMenuItemToCart(item) {
    const variant = getDefaultVariant(item);
    addItem({
      menuId: item.id,
      name: item.name,
      image: item.image,
      category: item.category,
      variant,
      addOns: [],
      note: 'Added from cart suggestion',
      quantity: 1,
      unitTotal: variant.price,
    });
    toast({ type: 'success', title: 'Added suggestion', message: `${item.name} added to cart.` });
  }

  function addWaterBottle() {
    addItem({
      menuId: 'water-bottle',
      name: 'Water Bottle',
      image: brand.logo,
      category: 'Add-ons',
      variant: { label: 'Bottle', price: 20 },
      addOns: [],
      note: 'Quick add-on',
      quantity: 1,
      unitTotal: 20,
    });
    toast({ type: 'success', title: 'Water bottle added', message: 'Water bottle added to cart.' });
  }

  function orderAgain() {
    if (!lastOrder?.items?.length) return;
    replaceItems(lastOrder.items);
    setCoupon(lastOrder.coupon || '');
    setCustomer(lastOrder.customer || {});
    toast({ type: 'success', title: 'Previous order added', message: 'Review your cart and checkout again.' });
  }

  async function checkout() {
    if (!items.length) {
      toast({ type: 'error', title: 'Cart is empty', message: 'Add food items first before checkout.' });
      return;
    }
    if (!customer.name.trim() || !customer.phone.trim()) {
      toast({ type: 'error', title: 'Customer details needed', message: 'Enter your name and phone number.' });
      return;
    }
    if (customer.orderType === 'Delivery' && !customer.address.trim()) {
      toast({ type: 'error', title: 'Delivery address needed', message: 'Enter your delivery address before checkout.' });
      return;
    }

    const order = {
      id: `BB-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      items,
      customer,
      coupon: state.coupon,
      totals,
      status: 'Sent through WhatsApp',
    };
    saveLastOrder(order);

    setIsCheckingOut(true);
    const sheetResult = await saveOrderToGoogleSheets(order);
    setIsCheckingOut(false);

    if (sheetResult.ok) {
      toast({ type: 'success', title: 'Order saved', message: 'Order stored in Google Sheets. Opening WhatsApp now.' });
    } else if (sheetResult.skipped) {
      toast({ type: 'info', title: 'Google Sheets not connected', message: 'WhatsApp checkout will continue. Add your Apps Script URL in .env to enable storage.' });
    } else {
      toast({ type: 'info', title: 'Order queued locally', message: 'WhatsApp checkout will continue. The order is kept locally for retry.' });
    }

    const message = buildOrderMessage({ items, customer, totals, coupon: state.coupon });
    window.open(createWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    navigate('/track');
  }

  return (
    <PageTransition className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 sm:p-8">
        <SectionHeader eyebrow="Your cart" title="Finalize your Big Bites order" description="Choose branch, delivery or pickup, apply coupon and send one complete order through WhatsApp." />
      </section>

      {lastOrder?.items?.length ? (
        <section className="rounded-[1.7rem] border border-brand-orange/25 bg-brand-orange/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.18em] text-brand-orange">Order again</p>
              <h3 className="mt-1 font-display text-lg font-black">Your previous Big Bites order</h3>
              <p className="mt-1 text-xs font-semibold leading-5 text-white/55">{summarizeItems(lastOrder.items)}</p>
            </div>
            <Button type="button" onClick={orderAgain} variant="secondary" className="shrink-0">
              <RotateCcw className="h-4 w-4" /> Order Again
            </Button>
          </div>
        </section>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-4">
          {items.length ? (
            items.map((item) => (
              <article key={item.cartId} className="rounded-[1.55rem] border border-white/10 bg-white/[0.055] p-3">
                <div className="flex gap-3">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[1.2rem] object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-base font-black leading-tight">{item.name}</h3>
                        <p className="mt-1 text-xs font-semibold text-white/50">{item.variant.label} · {money(item.variant.price)}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item.cartId)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/55">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {item.addOns.length ? <p className="mt-2 text-xs font-semibold leading-5 text-white/45">Extras: {item.addOns.map((addOn) => addOn.name).join(', ')}</p> : null}
                    {item.note ? <p className="mt-1 text-xs font-semibold text-brand-orange">Note: {item.note}</p> : null}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-white/10 bg-black/20 p-1">
                        <button type="button" onClick={() => updateQty(item.cartId, item.quantity - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.cartId, item.quantity + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="font-display text-lg font-black text-brand-orange">{money(item.unitTotal * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[1.7rem] border border-dashed border-white/15 bg-white/[0.045] p-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-brand-orange" />
              <h3 className="mt-4 font-display text-xl font-black">Your cart is empty</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/50">Go to menu, tap a food card to see price, then customize and add items.</p>
              <Link to="/menu" className="mt-5 inline-flex"><Button as="span">Browse Menu</Button></Link>
            </div>
          )}

          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-4">
            <div className="mb-3 flex items-center gap-2"><PackageCheck className="h-5 w-5 text-brand-orange" /><h3 className="font-display text-lg font-black">Complete your meal</h3></div>
            <div className="grid gap-2 sm:grid-cols-2">
              {cartUpsellItems.map((item) => (
                <button key={item.id} type="button" onClick={() => addMenuItemToCart(item)} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-left active:scale-[0.98]">
                  <span className="block text-sm font-black">Add {item.name}</span>
                  <span className="mt-1 block text-xs font-bold text-brand-orange">From {money(getDefaultVariant(item).price)}</span>
                </button>
              ))}
              <button type="button" onClick={addWaterBottle} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-left active:scale-[0.98]">
                <span className="block text-sm font-black">Add Water Bottle</span>
                <span className="mt-1 block text-xs font-bold text-brand-orange">₹20</span>
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.065] p-4">
            <div className="mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-brand-orange" /><h3 className="font-display text-lg font-black">Branch & order type</h3></div>
            <div className="grid gap-3">
              <select value={customer.branch} onChange={(event) => setCustomer({ branch: event.target.value })} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50">
                {branchOptions.map((branch) => <option key={branch.name}>{branch.name}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-1">
                {['Delivery', 'Pickup'].map((type) => (
                  <button key={type} type="button" onClick={() => setCustomer({ orderType: type })} className={`rounded-xl px-3 py-3 text-sm font-black transition ${customer.orderType === type ? 'bg-brand-orange text-white' : 'text-white/55'}`}>
                    {type}
                  </button>
                ))}
              </div>
              <select value={customer.preferredTime} onChange={(event) => setCustomer({ preferredTime: event.target.value })} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50">
                <option>As soon as possible</option>
                <option>Within 30 minutes</option>
                <option>Within 1 hour</option>
                <option>Today evening</option>
                <option>Tomorrow pre-order</option>
              </select>
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.065] p-4">
            <div className="mb-3 flex items-center gap-2"><WalletCards className="h-5 w-5 text-brand-orange" /><h3 className="font-display text-lg font-black">Coupon code</h3></div>
            <input value={state.coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Enter coupon code" className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-brand-orange/50" />
            <div className="mt-3 flex flex-wrap gap-2">
              {couponHints.map((coupon) => <button key={coupon.code} type="button" onClick={() => setCoupon(coupon.code)} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black text-white/60">{coupon.code}</button>)}
            </div>
            {state.coupon ? <p className="mt-2 text-xs font-semibold text-brand-orange">{totals.discount.label}</p> : null}
          </div>

          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.065] p-4">
            <div className="mb-3 flex items-center gap-2"><Truck className="h-5 w-5 text-brand-orange" /><h3 className="font-display text-lg font-black">Customer details</h3></div>
            <div className="grid gap-3">
              <input value={customer.name} onChange={(event) => setCustomer({ name: event.target.value })} placeholder="Customer name" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50" />
              <input value={customer.phone} onChange={(event) => setCustomer({ phone: event.target.value })} placeholder="Phone number" inputMode="tel" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50" />
              {customer.orderType === 'Delivery' ? (
                <>
                  <textarea value={customer.address} onChange={(event) => setCustomer({ address: event.target.value })} rows="3" placeholder="Full delivery address" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50" />
                  <input value={customer.landmark} onChange={(event) => setCustomer({ landmark: event.target.value })} placeholder="Landmark / nearby place" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50" />
                </>
              ) : null}
              <textarea value={customer.notes} onChange={(event) => setCustomer({ notes: event.target.value })} rows="2" placeholder="Any order note" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange/50" />
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-brand-orange/25 bg-brand-orange/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-orange-100"><Clock3 className="h-4 w-4" /> Bill summary</div>
            <div className="space-y-2 text-sm font-bold text-white/65">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{money(totals.discount.amount)}</span></div>
              <div className="flex justify-between"><span>Items</span><span>{totals.itemCount}</span></div>
              <div className="flex justify-between"><span>Delivery fee</span><span>Team confirms</span></div>
              <div className="flex justify-between"><span>Taxes</span><span>Included / confirmed</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-lg text-white"><span>Total</span><span className="font-display text-2xl font-black text-brand-orange">{money(totals.total)}</span></div>
            </div>
            <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-bold leading-5 text-white/55">
              The order is saved to Google Sheets first, then WhatsApp opens with the complete order summary.
            </p>
            <div className="mt-4 grid gap-2">
              <Button type="button" onClick={checkout} disabled={isCheckingOut} className="w-full py-4">{isCheckingOut ? 'Saving order...' : 'Save & Checkout on WhatsApp'}</Button>
              <a href={brand.phoneHref} className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-center text-sm font-black text-white/70">Call Big Bites</a>
              {items.length ? <button type="button" onClick={clearCart} className="text-sm font-black text-white/35">Clear cart</button> : null}
            </div>
          </div>
        </aside>
      </section>
    </PageTransition>
  );
}
