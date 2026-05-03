import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { offers } from '../data/appData.js';

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % offers.length), 3600);
    return () => clearInterval(timer);
  }, []);

  const offer = offers[index];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-orange/[0.20] bg-gradient-to-br from-brand-orange/[0.20] via-white/[0.08] to-white/[0.05] p-5 shadow-[0_0_46px_rgba(255,106,0,.18)]">
      <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-brand-orange/[0.25]" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/[0.10] to-transparent" />
      <AnimatePresence mode="wait">
        <motion.div
          key={offer.title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex items-center justify-between gap-4"
        >
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-orange/[0.20] px-3 py-1 text-[11px] font-black uppercase tracking-[.2em] text-orange-100">
              <Sparkles className="h-3.5 w-3.5" /> {offer.badge}
            </span>
            <h3 className="font-display text-xl font-black leading-tight sm:text-3xl">{offer.title}</h3>
            <p className="mt-1 max-w-lg text-sm leading-6 text-white/[0.68]">{offer.subtitle}</p>
          </div>
          <Link
            to="/offers"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-[#151515] shadow-xl transition  sm:flex"
          >
            Explore <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 mt-4 flex gap-2">
        {offers.map((item, dotIndex) => (
          <button
            key={item.title}
            aria-label={`Show offer ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
            className={`h-2 rounded-full transition-all ${dotIndex === index ? 'w-8 bg-brand-orange' : 'w-2 bg-white/[0.25]'}`}
          />
        ))}
      </div>
    </div>
  );
}
