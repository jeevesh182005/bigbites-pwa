import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.28 }}
      className="mb-5 flex flex-col gap-2"
    >
      {eyebrow && <span className="text-xs font-black uppercase tracking-[.32em] text-brand-orange">{eyebrow}</span>}
      <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm leading-6 text-white/[0.60] sm:text-base">{description}</p>}
    </motion.div>
  );
}
