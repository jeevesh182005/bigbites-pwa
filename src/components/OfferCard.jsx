import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import Button from './Button.jsx';

export default function OfferCard({ offer }) {
  const path = offer.price?.includes('₹2,60,000') ? '/franchise' : '/cart';
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-brand-orange/25 bg-gradient-to-br from-brand-orange/18 via-white/[0.08] to-white/[0.05] p-5 shadow-[0_0_30px_rgba(255,106,0,.13)]">
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3 py-1.5 text-[11px] font-black uppercase tracking-[.18em] text-white">
            <Tag className="h-3.5 w-3.5" /> {offer.badge}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-white/55">
            <Clock className="h-3.5 w-3.5" /> {offer.meta}
          </span>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[.25em] text-brand-orange">{offer.price}</p>
          <h3 className="mt-1 font-display text-2xl font-black leading-tight">{offer.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{offer.subtitle}</p>
        </div>
        <Link to={path} className="block">
          <Button as="span" variant="secondary" className="w-full">
            {offer.cta || 'Use offer'}
          </Button>
        </Link>
      </div>
    </article>
  );
}
