import { Clock3, Sparkles } from 'lucide-react';
import { getStoreStatus } from '../data/appData.js';

export default function StoreStatus({ compact = false }) {
  const status = getStoreStatus();
  return (
    <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.16em] ${status.isOpen ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100' : 'border-brand-orange/25 bg-brand-orange/10 text-orange-100'}`}>
      <span className={`relative grid h-8 w-8 place-items-center rounded-full ${status.isOpen ? 'bg-emerald-400/15 text-emerald-200' : 'bg-brand-orange/15 text-brand-orange'}`}>
        {status.isOpen ? <Sparkles className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
      </span>
      <span>
        <span className="block">{status.label}</span>
        {!compact ? <span className="mt-0.5 block text-[10px] font-bold normal-case tracking-normal text-white/45">{status.helper} · {status.hours}</span> : null}
      </span>
    </div>
  );
}
