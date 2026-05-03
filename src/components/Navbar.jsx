import { Link, NavLink } from 'react-router-dom';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { brand } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/offers', label: 'Offers' },
  { to: '/franchise', label: 'Franchise' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { totals } = useCart();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0f0f0f]/95">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Big Bites home">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-black shadow-[0_0_22px_rgba(255,106,0,.22)] ring-1 ring-white/10">
            <img src={brand.logo} alt="Big Bites logo" className="h-11 w-11 object-contain" width="44" height="44" />
          </span>
          <span>
            <span className="block font-display text-lg font-black leading-none tracking-tight">Big Bites</span>
            <span className="text-[11px] font-bold uppercase tracking-[.28em] text-brand-orange">Official</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? 'bg-brand-orange text-white' : 'text-white/65 hover:bg-white/8 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:text-brand-orange">
            <ShoppingCart className="h-5 w-5" />
            {totals.itemCount ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-orange px-1 text-[10px] font-black text-white">{totals.itemCount}</span> : null}
          </NavLink>
          <a
            href={brand.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white/70 transition hover:border-brand-orange/35 hover:text-brand-orange sm:flex"
          >
            Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
