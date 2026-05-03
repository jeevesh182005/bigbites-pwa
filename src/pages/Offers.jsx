import { Gift, ShieldCheck } from 'lucide-react';
import OfferCard from '../components/OfferCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { offers } from '../data/appData.js';

export default function Offers() {
  return (
    <PageTransition className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-brand-orange/[0.25] bg-gradient-to-br from-brand-orange/[0.22] via-white/[0.08] to-white/[0.04] p-6 shadow-[0_0_54px_rgba(255,106,0,.18)] sm:p-9">
        <div className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-brand-orange/[0.25]" />
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-brand-orange text-white shadow-[0_0_38px_rgba(255,106,0,.35)]">
            <Gift className="h-7 w-7" />
          </div>
          <SectionHeader
            eyebrow="Active offers"
            title="Limited-time deals designed to bring customers back"
            description="Glow cards, urgency badges and cart coupon and checkout actions make offers feel premium and easy to understand."
          />
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-white/[0.65]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.07] px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-brand-orange" /> Branch-specific offers supported
            </span>
            <span className="rounded-full border border-white/[0.10] bg-white/[0.07] px-4 py-2">Election / festival campaign ready</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {offers.map((offer, index) => (
          <OfferCard key={offer.title} offer={offer} index={index} />
        ))}
      </section>
    </PageTransition>
  );
}
