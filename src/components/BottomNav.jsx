import { NavLink } from 'react-router-dom';
import { Gift, Home, MapPin, Store, UtensilsCrossed } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/offers', label: 'Offers', icon: Gift },
  { to: '/franchise', label: 'Franchise', icon: Store },
  { to: '/contact', label: 'Contact', icon: MapPin },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0f0f0f]/95 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_-12px_34px_rgba(0,0,0,.32)]">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-extrabold transition active:scale-[0.96] ${
                isActive ? 'bg-brand-orange text-white shadow-[0_8px_20px_rgba(255,106,0,.22)]' : 'text-white/55 active:bg-white/10 active:text-white'
              }`
            }
          >
            <Icon className="h-[19px] w-[19px]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
