import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-28 left-4 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/[0.10] bg-white/[0.10] text-white shadow-2xl  transition hover:border-brand-orange/[0.35] hover:bg-brand-orange/[0.20] lg:bottom-6 lg:left-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
