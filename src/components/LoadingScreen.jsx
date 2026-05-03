import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '../data/appData.js';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 620);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]"
        >
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-5 text-center">
            <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-[2rem] bg-black/80 p-2 shadow-[0_0_58px_rgba(255,106,0,.36)] ring-1 ring-brand-orange/[0.25]">
              <img src={brand.logo} alt="Big Bites logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black tracking-tight">Big Bites</h1>
              <p className="mt-1 text-xs font-black uppercase tracking-[.36em] text-brand-orange">Loading fresh bites</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
