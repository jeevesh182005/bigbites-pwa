import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ShoppingBag, Star, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider.jsx';
import Button from '../components/Button.jsx';
import CategoryScroller from '../components/CategoryScroller.jsx';
import MenuCard from '../components/MenuCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StoreStatus from '../components/StoreStatus.jsx';
import heroFood from '../assets/images/hero-food.svg';
import { brand, businessStats, featuredItems, outletStats } from '../data/appData.js';

export default function Home() {
  return (
    <PageTransition className="space-y-10 sm:space-y-14">
      <section className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] px-5 py-7 shadow-[0_26px_80px_rgba(0,0,0,.42)] sm:rounded-[2.25rem] sm:px-10">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-orange/[0.20]" />
        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-brand-orange/[0.10]" />
        <div className="relative z-10 grid w-full items-center gap-7 lg:grid-cols-[1fr_.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-orange/[0.30] bg-brand-orange/[0.12] px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-orange-100"
            >
              <Star className="h-4 w-4 fill-brand-orange text-brand-orange" /> Premium fast food app
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }} className="mb-5">
              <StoreStatus />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5 flex items-center gap-3">
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-[1.4rem] bg-black/70 p-1 shadow-[0_0_34px_rgba(255,106,0,.24)] ring-1 ring-white/10">
                <img src={brand.logo} alt="Big Bites logo" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-sm font-black uppercase tracking-[.25em] text-brand-orange">{brand.locationLine}</span>
                <span className="mt-1 block text-sm font-semibold text-white/[0.55]">Official mobile experience</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-black leading-[.95] tracking-[-.05em] text-white sm:text-6xl lg:text-7xl"
            >
              Craving Something <span className="text-brand-orange drop-shadow-[0_0_28px_rgba(255,106,0,.42)]">Delicious?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/[0.68]"
            >
              Fresh Shawarma, BBQ & Mojitos
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/menu" className="w-full sm:w-auto">
                <Button as="span" className="w-full">
                  <ShoppingBag className="h-5 w-5" /> Start Order
                </Button>
              </Link>
              <Link to="/menu" className="w-full sm:w-auto">
                <Button as="span" variant="secondary" className="w-full">
                  View Menu <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {outletStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 ">
                  <p className="font-display text-2xl font-black text-brand-orange">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[.16em] text-white/[0.45]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
          >
            <div className="absolute inset-10 rounded-full bg-brand-orange/[0.20]" />
            <img src={heroFood} alt="Big Bites shawarma BBQ and mojito hero" className="relative z-10 w-full drop-shadow-[0_24px_48px_rgba(0,0,0,.50)]" />
          </motion.div>
        </div>
      </section>

      <section className="section-render">
        <BannerSlider />
      </section>

      <section className="section-render">
        <SectionHeader eyebrow="Explore" title="Choose your craving" description="Quick mobile categories with professional icons and direct access to the menu." />
        <CategoryScroller />
      </section>

      <section className="section-render grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {businessStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className="glass-card rounded-[1.6rem] p-4"
          >
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-brand-orange/[0.15] text-brand-orange">
              {index % 2 === 0 ? <BadgeCheck className="h-5 w-5" /> : <Utensils className="h-5 w-5" />}
            </div>
            <p className="font-display text-2xl font-black text-white">{stat.value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[.18em] text-white/[0.45]">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="section-render">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Featured" title="Customer favourites" description="Tap a card to flip, see price and add multiple items to cart." />
          <Link to="/menu" className="mb-6 hidden text-sm font-black text-brand-orange hover:text-orange-300 sm:block">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
