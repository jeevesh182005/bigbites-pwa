import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/price.js';

export default function FloatingCartButton() {
  const { totals, pulseKey } = useCart();
  const [shake, setShake] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!totals.itemCount) return;
    setShake(false);
    const frame = requestAnimationFrame(() => setShake(true));
    const timer = window.setTimeout(() => setShake(false), 780);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pulseKey, totals.itemCount]);

  if (!totals.itemCount) return null;

  return (
    <Link
      to="/cart"
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+92px)] right-4 z-50 flex items-center gap-3 rounded-full border border-brand-orange/35 bg-[#17110d]/95 px-4 py-3 text-white shadow-[0_14px_34px_rgba(0,0,0,.42)] ring-1 ring-white/10 backdrop-blur-sm lg:hidden ${shake ? 'cart-shake' : ''}`}
      aria-label={`Open cart with ${totals.itemCount} items`}
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brand-orange text-white shadow-[0_0_22px_rgba(255,106,0,.35)]">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-black text-brand-orange">{totals.itemCount}</span>
      </span>
      <span className="leading-none">
        <span className="block text-[10px] font-black uppercase tracking-[.18em] text-brand-orange">View Cart</span>
        <span className="mt-1 block font-display text-base font-black">{money(totals.total)}</span>
      </span>
    </Link>
  );
}
