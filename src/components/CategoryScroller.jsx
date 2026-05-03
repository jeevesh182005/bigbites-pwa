import { Link } from 'react-router-dom';
import { Flame, GlassWater, Sandwich, ShoppingCart, Sparkles, Store } from 'lucide-react';
import { categories } from '../data/appData.js';

const iconMap = {
  sparkles: Sparkles,
  wrap: Sandwich,
  flame: Flame,
  cup: GlassWater,
  store: Store,
  cart: ShoppingCart,
};

export default function CategoryScroller() {
  return (
    <div className="hide-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Sparkles;
        return (
          <Link
            key={category.name}
            to={category.route}
            className="glass-card flex min-w-40 snap-start flex-col gap-3 rounded-[1.6rem] p-4 transition active:scale-[0.98] hover:border-brand-orange/35"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-orange/15 text-brand-orange shadow-[0_0_22px_rgba(255,106,0,.12)]">
              <Icon className="h-7 w-7" />
            </span>
            <span>
              <span className="block font-display text-base font-black">{category.name}</span>
              <span className="text-xs font-semibold text-white/50">{category.caption}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
