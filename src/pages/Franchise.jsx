import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeIndianRupee, CheckCircle2, Handshake, Loader2, Send, TrendingUp } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { sendEmailJS } from '../services/emailService.js';
import { brand, createWhatsAppLink, franchiseBenefits, franchiseSupport, investmentCards, outletStats } from '../data/appData.js';

export default function Franchise() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', location: '', message: '' });
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ type: 'error', title: 'Missing details', message: 'Please enter name and phone number.' });
      return;
    }

    setLoading(true);
    try {
      await sendEmailJS({
        templateId: import.meta.env.VITE_EMAILJS_FRANCHISE_TEMPLATE_ID,
        templateParams: {
          form_type: 'Franchise Enquiry',
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          user_phone: form.phone,
          location: form.location || 'Not provided',
          message: form.message || 'Interested in Big Bites franchise.',
          brand: brand.name,
          website: brand.websiteUrl,
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
      });
      toast({ type: 'success', title: 'Franchise enquiry sent', message: 'Big Bites team will contact you shortly.' });
      setForm({ name: '', phone: '', location: '', message: '' });
    } catch (error) {
      toast({ type: 'error', title: 'Email failed', message: 'Please check EmailJS credentials or try WhatsApp.' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative overflow-hidden rounded-[2.1rem] border border-brand-orange/[0.20] bg-gradient-to-br from-brand-orange/[0.18] via-white/[0.08] to-white/[0.04] p-6 shadow-[0_0_48px_rgba(255,106,0,.14)] sm:p-9">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-brand-orange/[0.22] blur-3xl" />
          <div className="relative z-10">
            <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-brand-orange text-white shadow-[0_0_34px_rgba(255,106,0,.32)]">
              <Handshake className="h-7 w-7" />
            </div>
            <SectionHeader
              eyebrow="Franchise"
              title="Start a high-demand fast-food business with Big Bites"
              description="A premium local brand system for shawarma, BBQ, wings and mojitos with practical setup support and clear menu positioning."
            />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {outletStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/[0.22] p-4">
                  <p className="font-display text-xl font-black text-brand-orange sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/[0.45]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {investmentCards.map((card) => (
                <div key={card.tag} className={`rounded-[1.3rem] border p-4 ${card.highlight ? 'border-brand-orange/[0.30] bg-brand-orange/[0.10]' : 'border-white/10 bg-black/20'}`}>
                  <BadgeIndianRupee className="mb-3 h-5 w-5 text-brand-orange" />
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/[0.40]">{card.tag}</p>
                  <p className="mt-1 font-display text-lg font-black text-white">{card.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/[0.50]">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-[2.1rem] p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-orange/[0.15] text-brand-orange">
              <TrendingUp className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-black">Franchise Enquiry</h3>
              <p className="text-sm text-white/[0.52]">Your form is sent directly through EmailJS.</p>
            </div>
          </div>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Phone / WhatsApp</span>
            <input
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              required
              inputMode="tel"
              placeholder="Enter WhatsApp number"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Preferred Location</span>
            <input
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              placeholder="City / area"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]"
            />
          </label>
          <label className="mb-5 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Message</span>
            <textarea
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              rows="3"
              placeholder="Tell us about your franchise plan"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]"
            />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            {loading ? 'Sending...' : 'Submit Enquiry'}
          </Button>
          <a href={createWhatsAppLink('Hi Big Bites, I am interested in franchise details.')} target="_blank" rel="noreferrer" className="mt-3 block text-center text-xs font-bold text-white/[0.45] transition hover:text-brand-orange">
            Email not working? Send enquiry on WhatsApp
          </a>
        </form>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {franchiseBenefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="glass-card rounded-[1.7rem] p-5"
          >
            <CheckCircle2 className="mb-4 h-6 w-6 text-brand-orange" />
            <h3 className="font-display text-base font-black text-white">{benefit.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/[0.58]">{benefit.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="glass-card rounded-[2rem] p-5 sm:p-7">
        <SectionHeader eyebrow="Support" title="What franchise partners get" description="Clear startup support for building a consistent Big Bites outlet experience." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {franchiseSupport.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white/[0.70]">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-orange" /> {item}
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
