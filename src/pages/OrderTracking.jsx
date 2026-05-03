import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Bike,
  CheckCircle2,
  Clock3,
  Flame,
  MessageCircle,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  XCircle,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { brand, createWhatsAppLink } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/price.js';
import { getOrderStatus } from '../services/orderStorage.js';

const statusStyles = {
  'New Order': {
    title: 'Order sent',
    desc: 'Your order has been sent to Big Bites Tiruvallur.',
    icon: MessageCircle,
  },
  Confirmed: {
    title: 'Team confirmation',
    desc: 'The Big Bites team has confirmed your order.',
    icon: CheckCircle2,
  },
  Preparing: {
    title: 'Preparing',
    desc: 'Your food is being prepared fresh.',
    icon: Flame,
  },
  'Ready for Pickup': {
    title: 'Ready for Pickup',
    desc: 'Your order is ready. Please collect it from Big Bites Tiruvallur.',
    icon: PackageCheck,
  },
  'Out for Delivery': {
    title: 'Out for Delivery',
    desc: 'Your order is out for delivery.',
    icon: Bike,
  },
  Delivered: {
    title: 'Delivered',
    desc: 'Your order has been completed. Thank you!',
    icon: CheckCircle2,
  },
  Cancelled: {
    title: 'Cancelled',
    desc: 'This order has been cancelled. Please contact Big Bites for help.',
    icon: XCircle,
  },
};

function getSteps(orderType) {
  const isDelivery = String(orderType || '').toLowerCase().includes('delivery');

  if (isDelivery) {
    return ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
  }

  return ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Delivered'];
}

export default function OrderTracking() {
  const { orderId: routeOrderId } = useParams();
  const { lastOrder } = useCart();

  const savedOrderId =
    typeof window !== 'undefined'
      ? localStorage.getItem('lastBigBitesOrderId')
      : '';

  const orderId = routeOrderId || savedOrderId || lastOrder?.id || lastOrder?.orderId || '';

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const currentStatus = orderData?.status || 'New Order';
  const orderType = orderData?.orderType || lastOrder?.customer?.orderType || 'Pickup';

  const steps = useMemo(() => getSteps(orderType), [orderType]);
  const currentIndex = steps.indexOf(currentStatus);

  async function loadStatus(showRefresh = false) {
    if (!orderId) {
      setError('Order ID not found.');
      setLoading(false);
      return;
    }

    try {
      if (showRefresh) setRefreshing(true);

      const data = await getOrderStatus(orderId);

      if (!data.ok) {
        setError(data.message || 'Unable to fetch order status.');
      } else {
        setOrderData(data);
        setError('');
      }
    } catch (err) {
      setError('Unable to connect to live order tracking.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    loadStatus();

    const interval = setInterval(() => {
      loadStatus(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!orderId && !lastOrder) {
    return (
      <PageTransition className="space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center">
          <ShoppingBag className="mx-auto h-14 w-14 text-brand-orange" />
          <h1 className="mt-4 font-display text-3xl font-black">
            No recent order yet
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-white/55">
            Place an order from the menu, then this screen will show the live order status.
          </p>
          <Link to="/menu" className="mt-6 inline-flex">
            <Button as="span">Start Order</Button>
          </Link>
        </section>
      </PageTransition>
    );
  }

  const ActiveIcon = statusStyles[currentStatus]?.icon || Clock3;

  return (
    <PageTransition className="space-y-6">
      <section className="rounded-[2rem] border border-brand-orange/25 bg-brand-orange/10 p-5 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-black/20 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-orange-100">
            <PackageCheck className="h-4 w-4" />
            Order ID {orderId}
          </div>

          <button
            onClick={() => loadStatus(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-black text-white/70"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <SectionHeader
          eyebrow="Live order tracking"
          title="Track your Big Bites order"
          description="This screen updates from the Big Bites Tiruvallur team. Please keep this page open for live status updates."
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">
              Branch
            </p>
            <p className="mt-1 font-display text-lg font-black">
              Big Bites Tiruvallur
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">
              Type
            </p>
            <p className="mt-1 font-display text-lg font-black">
              {orderType}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">
              Current Status
            </p>
            <p className="mt-1 font-display text-lg font-black text-brand-orange">
              {statusStyles[currentStatus]?.title || currentStatus}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
        {loading ? (
          <div className="rounded-2xl bg-black/20 p-5 text-center text-sm font-semibold text-white/60">
            Checking live order status...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-200">
            {error}
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-[1.5rem] border border-brand-orange/25 bg-brand-orange/10 p-5">
              <div className="flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-orange text-white shadow-[0_0_24px_rgba(255,106,0,0.35)]">
                  <ActiveIcon className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-orange-100/70">
                    Live Status
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-black">
                    {statusStyles[currentStatus]?.title || currentStatus}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/60">
                    {statusStyles[currentStatus]?.desc || 'Your order status has been updated.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = statusStyles[step]?.icon || Clock3;
                const isActive = step === currentStatus;
                const isDone = currentIndex >= index;

                return (
                  <div key={step} className="relative flex gap-4">
                    {index !== steps.length - 1 ? (
                      <div
                        className={`absolute left-6 top-12 h-full w-px ${
                          isDone ? 'bg-brand-orange/45' : 'bg-white/10'
                        }`}
                      />
                    ) : null}

                    <div
                      className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${
                        isDone
                          ? 'border-brand-orange/30 bg-brand-orange text-white'
                          : 'border-white/10 bg-white/8 text-white/35'
                      }`}
                    >
                      {isDone && index < currentIndex ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>

                    <div className="min-w-0 pb-4">
                      <h3
                        className={`font-display text-lg font-black ${
                          isActive ? 'text-brand-orange' : isDone ? 'text-white' : 'text-white/45'
                        }`}
                      >
                        {statusStyles[step]?.title || step}
                      </h3>

                      <p className="mt-1 text-sm font-semibold leading-6 text-white/50">
                        {statusStyles[step]?.desc || 'Waiting for update.'}
                      </p>

                      {isActive ? (
                        <p className="mt-2 text-xs font-bold text-orange-200/80">
                          Updated from Big Bites team.
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {orderData?.staffNote ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">
                  Staff Note
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/65">
                  {orderData.staffNote}
                </p>
              </div>
            ) : null}

            <p className="mt-5 text-center text-xs font-semibold leading-5 text-white/40">
              This page checks for updates every 10 seconds.
            </p>
          </>
        )}
      </section>

      {lastOrder?.items?.length ? (
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
          <h3 className="font-display text-xl font-black">Order summary</h3>

          <div className="mt-4 space-y-3">
            {lastOrder.items.map((item) => (
              <div
                key={item.cartId || `${item.name}-${item.variant?.label}`}
                className="flex justify-between gap-3 rounded-2xl bg-black/20 p-3 text-sm font-bold"
              >
                <span className="text-white/70">
                  {item.quantity}× {item.name}{' '}
                  <span className="text-white/35">
                    ({item.variant?.label || 'Regular'})
                  </span>
                </span>
                <span className="text-brand-orange">
                  {money(item.unitTotal * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {lastOrder?.totals?.total ? (
            <div className="mt-4 flex justify-between rounded-2xl border border-brand-orange/20 bg-brand-orange/10 p-4 font-black">
              <span>Total</span>
              <span className="text-brand-orange">
                {money(lastOrder.totals.total)}
              </span>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={createWhatsAppLink(`Hi Big Bites, I need an update for my order ID: ${orderId}`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Ask status on WhatsApp
          </a>

          <a
            href={brand.phoneHref}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white/70"
          >
            Call Store
          </a>
        </div>

        <Link
          to="/menu"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-black text-white/70"
        >
          Back to Menu
        </Link>
      </section>
    </PageTransition>
  );
}