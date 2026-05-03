import { Link } from 'react-router-dom';
import { Bike, CheckCircle2, ChefHat, Clock3, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { brand, createWhatsAppLink } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/price.js';

const steps = [
  { title: 'Order sent', desc: 'Your WhatsApp order summary is ready for the Big Bites team.', icon: MessageCircle, active: true },
  { title: 'Team confirmation', desc: 'Branch confirms item availability, bill and preparation time.', icon: Clock3, active: true },
  { title: 'Preparing', desc: 'Kitchen starts preparing your shawarma, BBQ or mojito.', icon: ChefHat, active: false },
  { title: 'Ready / Delivery', desc: 'Pickup ready or delivery update will be shared by the team.', icon: Bike, active: false },
];

export default function OrderTracking() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <PageTransition className="space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 text-center">
          <ShoppingBag className="mx-auto h-14 w-14 text-brand-orange" />
          <h1 className="mt-4 font-display text-3xl font-black">No recent order yet</h1>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-white/55">Place an order from the menu, then this screen will show the order flow.</p>
          <Link to="/menu" className="mt-6 inline-flex"><Button as="span">Start Order</Button></Link>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-6">
      <section className="rounded-[2rem] border border-brand-orange/25 bg-brand-orange/10 p-5 sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-black/20 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-orange-100">
          <PackageCheck className="h-4 w-4" /> Order ID {lastOrder.id}
        </div>
        <SectionHeader eyebrow="Order tracking" title="Your order has been sent to WhatsApp" description="This is a lightweight tracking flow. The Big Bites team will confirm live status, bill and timing through WhatsApp." />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">Branch</p>
            <p className="mt-1 font-display text-lg font-black">{lastOrder.customer.branch}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">Type</p>
            <p className="mt-1 font-display text-lg font-black">{lastOrder.customer.orderType}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-white/35">Total</p>
            <p className="mt-1 font-display text-lg font-black text-brand-orange">{money(lastOrder.totals.total)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex gap-4">
                {index !== steps.length - 1 ? <div className="absolute left-6 top-12 h-full w-px bg-white/10" /> : null}
                <div className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${step.active ? 'border-brand-orange/30 bg-brand-orange text-white' : 'border-white/10 bg-white/8 text-white/35'}`}>
                  {step.active && index === 0 ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                </div>
                <div className="min-w-0 pb-4">
                  <h3 className="font-display text-lg font-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-white/50">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
        <h3 className="font-display text-xl font-black">Order summary</h3>
        <div className="mt-4 space-y-3">
          {lastOrder.items.map((item) => (
            <div key={item.cartId || `${item.name}-${item.variant.label}`} className="flex justify-between gap-3 rounded-2xl bg-black/20 p-3 text-sm font-bold">
              <span className="text-white/70">{item.quantity}× {item.name} <span className="text-white/35">({item.variant.label})</span></span>
              <span className="text-brand-orange">{money(item.unitTotal * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={createWhatsAppLink('Hi Big Bites, I need an update for my recent order.')} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-black text-white">
            <MessageCircle className="h-4 w-4" /> Ask status on WhatsApp
          </a>
          <a href={brand.phoneHref} className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white/70">Call Store</a>
        </div>
      </section>
    </PageTransition>
  );
}
