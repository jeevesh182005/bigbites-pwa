import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import MenuCard from '../components/MenuCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { menuFilters, menuItems } from '../data/appData.js';

const hashToFilter = {
  special: 'Special',
  shawarma: 'Shawarma',
  bbq: 'BBQ',
  mojitos: 'Mojitos',
  mojito: 'Mojitos',
  franchise: 'All',
};

function minPrice(item) {
  return Math.min(...(item.variants || []).map((variant) => variant.price || 0));
}

export default function Menu() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hashToFilter[hash]) setActive(hashToFilter[hash]);
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [active, query, sort]);

  const filteredItems = useMemo(() => {
    const nextItems = menuItems.filter((item) => {
      const categoryMatch = active === 'All' || item.category === active;
      const searchMatch = !query.trim() || `${item.name} ${item.description} ${item.category} ${item.tag}`.toLowerCase().includes(query.trim().toLowerCase());
      return categoryMatch && searchMatch;
    });

    if (sort === 'low') return [...nextItems].sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === 'high') return [...nextItems].sort((a, b) => minPrice(b) - minPrice(a));
    if (sort === 'spicy') return [...nextItems].sort((a, b) => b.spice - a.spice);
    return nextItems;
  }, [active, query, sort]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <PageTransition className="space-y-8">
      <section className="rounded-[2.1rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.035] p-5 sm:p-8">
        <SectionHeader
          eyebrow="Full menu"
          title="35 Big Bites items with smooth cart ordering"
          description="Search, filter, sort, tap to flip cards, choose sizes and add multiple items to cart before WhatsApp checkout. Cards load in batches for smoother mobile scrolling."
        />
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-brand-orange/45 focus-within:ring-4 focus-within:ring-brand-orange/10">
          <Search className="h-5 w-5 shrink-0 text-brand-orange" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shawarma, BBQ, mojitos..."
            className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
          />
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_220px]">
          <div className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {menuFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition active:scale-[0.96] ${
                  active === filter ? 'bg-brand-orange text-white' : 'border border-white/10 bg-white/[0.07] text-white/60 hover:border-brand-orange/30 hover:text-white'
                }`}
              >
                {filter === 'All' ? <SlidersHorizontal className="h-4 w-4" /> : null}
                {filter}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-black text-white outline-none focus:border-brand-orange/50">
            <option value="recommended">Recommended</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="spicy">Spicy first</option>
          </select>
        </div>
        <p className="text-xs font-bold text-white/45">Showing {visibleItems.length} of {filteredItems.length} items</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <div key={item.id} id={item.slug} className="section-render">
            <MenuCard item={item} />
          </div>
        ))}
      </section>

      {hasMore ? (
        <div className="flex justify-center">
          <button type="button" onClick={() => setVisibleCount((count) => count + 9)} className="rounded-full border border-brand-orange/30 bg-brand-orange/10 px-6 py-3 text-sm font-black text-orange-100 active:scale-[0.97]">
            Load more items
          </button>
        </div>
      ) : null}
    </PageTransition>
  );
}
