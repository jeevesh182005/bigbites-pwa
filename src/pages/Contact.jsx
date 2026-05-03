import { useState } from 'react';
import { Camera, CirclePlay, ExternalLink, Loader2, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { sendEmailJS } from '../services/emailService.js';
import { brand, createWhatsAppLink } from '../data/appData.js';

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
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
        templateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        templateParams: {
          form_type: 'Contact Enquiry',
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          user_phone: form.phone,
          message: form.message || 'Customer contacted from Big Bites PWA.',
          brand: brand.name,
          website: brand.websiteUrl,
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
      });
      toast({ type: 'success', title: 'Message sent', message: 'Big Bites team will get back to you soon.' });
      setForm({ name: '', phone: '', message: '' });
    } catch (error) {
      toast({ type: 'error', title: 'Email failed', message: 'Please call or WhatsApp Big Bites directly.' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <div className="glass-card rounded-[2.1rem] p-6 sm:p-8">
          <SectionHeader
            eyebrow="Contact"
            title="Order fast. Visit fresh. Connect instantly."
            description="Call, WhatsApp, navigate, follow or send an enquiry directly from the mobile app."
          />
          <div className="space-y-3">
            <Button as="a" href={brand.phoneHref} className="w-full">
              <Phone className="h-5 w-5" /> Call {brand.phoneDisplay}
            </Button>
            <Button as="a" href={createWhatsAppLink()} target="_blank" rel="noreferrer" variant="secondary" className="w-full">
              <MessageCircle className="h-5 w-5" /> WhatsApp Big Bites
            </Button>
            <Button as="a" href={brand.mapsUrl} target="_blank" rel="noreferrer" variant="secondary" className="w-full">
              <MapPin className="h-5 w-5" /> Open in Google Maps
            </Button>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-black uppercase tracking-[.25em] text-brand-orange">Location</p>
            <p className="mt-2 flex items-center gap-2 font-bold text-white/[0.80]"><MapPin className="h-5 w-5 text-brand-orange" /> {brand.address}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-white/[0.72] transition hover:border-brand-orange/[0.35] hover:text-brand-orange">
              <Camera className="h-5 w-5" />
            </a>
            <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-white/[0.72] transition hover:border-brand-orange/[0.35] hover:text-brand-orange">
              <CirclePlay className="h-5 w-5" />
            </a>
            <a href={brand.websiteUrl} target="_blank" rel="noreferrer" aria-label="Website" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-white/[0.72] transition hover:border-brand-orange/[0.35] hover:text-brand-orange">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-[2.1rem] p-5 sm:p-7">
          <SectionHeader eyebrow="Quick enquiry" title="Send a message" description="This uses the EmailJS contact template from your website credentials." />
          <label className="mb-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Name</span>
            <input value={form.name} onChange={(event) => updateField('name', event.target.value)} required placeholder="Enter your name" className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]" />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Phone / WhatsApp</span>
            <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} required inputMode="tel" placeholder="Enter phone number" className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]" />
          </label>
          <label className="mb-5 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[.22em] text-white/[0.45]">Message</span>
            <textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} rows="4" placeholder="Order enquiry / branch enquiry / catering enquiry" className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-white outline-none transition placeholder:text-white/[0.25] focus:border-brand-orange/[0.45] focus:ring-4 focus:ring-brand-orange/[0.10]" />
          </label>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </section>

      <section className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-white/5 shadow-[0_22px_60px_rgba(0,0,0,.32)]">
        <iframe
          title="Big Bites Tiruvallur location"
          src={brand.mapsEmbed}
          className="h-[420px] w-full border-0 grayscale-[.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </PageTransition>
  );
}
