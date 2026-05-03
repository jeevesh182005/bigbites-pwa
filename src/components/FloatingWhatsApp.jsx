import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';

export default function FloatingWhatsApp() {
  const { totals } = useCart();
  return (
    <a
      href={createWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Order Big Bites on WhatsApp"
      className={`pulse-ring fixed right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_28px_rgba(37,211,102,.38)] transition-transform active:scale-95 lg:bottom-6 lg:right-6 ${
        totals.itemCount ? 'bottom-[calc(env(safe-area-inset-bottom)+156px)]' : 'bottom-[calc(env(safe-area-inset-bottom)+92px)]'
      }`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
