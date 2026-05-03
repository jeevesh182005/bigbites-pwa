import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import Button from './Button.jsx';
import { orderAddOns } from '../data/appData.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from './ToastProvider.jsx';
import { getDefaultVariant, money, priceToOptions } from '../utils/price.js';

export default function ProductCustomizeModal({ item, onClose }) {
  const variants = useMemo(() => priceToOptions(item), [item]);
  const [variant, setVariant] = useState(getDefaultVariant(item));
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const unitTotal = variant.price + addOnsTotal;

  function toggleAddOn(addOn) {
    setSelectedAddOns((items) => (items.some((item) => item.id === addOn.id) ? items.filter((item) => item.id !== addOn.id) : [...items, addOn]));
  }

  function handleAdd() {
    addItem({
      menuId: item.id,
      name: item.name,
      image: item.image,
      category: item.category,
      variant,
      addOns: selectedAddOns,
      note,
      quantity,
      unitTotal,
    });
    toast({ type: 'success', title: 'Added to cart', message: `${quantity} × ${item.name} is ready for checkout.` });
    onClose();
  }

  const modalContent = (
    <div className="fixed inset-0 z-[120] flex items-end justify-center overflow-hidden px-3 pb-3 pt-12 sm:items-center sm:p-5" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/78" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className="relative mb-[max(env(safe-area-inset-bottom),0px)] flex max-h-[calc(100svh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#141414] shadow-[0_18px_55px_rgba(0,0,0,.55)] sm:max-h-[84vh]"
      >
        <div className="shrink-0 border-b border-white/10 bg-[#141414] p-4">
          <div className="flex items-start gap-3">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[1.25rem] object-cover" loading="lazy" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-orange">Customize order</p>
              <h2 className="mt-1 font-display text-xl font-black leading-tight">{item.name}</h2>
              <p className="mt-1 text-xs font-semibold leading-5 text-white/50">Choose size, add-ons and quantity before adding to cart.</p>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white/70 active:scale-95" aria-label="Close customization">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 [-webkit-overflow-scrolling:touch]">
          <div className="space-y-5 pb-3">
            <section>
              <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-white/50">Select option</p>
              <div className="grid gap-2">
                {variants.map((option) => {
                  const active = option.label === variant.label && option.price === variant.price;
                  return (
                    <button
                      key={`${option.label}-${option.price}`}
                      type="button"
                      onClick={() => setVariant(option)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition active:scale-[0.98] ${
                        active ? 'border-brand-orange bg-brand-orange/15 text-white' : 'border-white/10 bg-white/[0.05] text-white/65'
                      }`}
                    >
                      <span className="font-bold">{option.label}</span>
                      <span className="font-display text-lg font-black text-brand-orange">{money(option.price)}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-white/50">Need extra?</p>
              <div className="grid grid-cols-2 gap-2">
                {orderAddOns.map((addOn) => {
                  const active = selectedAddOns.some((item) => item.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      type="button"
                      onClick={() => toggleAddOn(addOn)}
                      className={`rounded-2xl border p-3 text-left transition active:scale-[0.98] ${active ? 'border-brand-orange bg-brand-orange/15' : 'border-white/10 bg-white/[0.05]'}`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold leading-5">{addOn.name}</span>
                        {active ? <Check className="h-4 w-4 text-brand-orange" /> : null}
                      </span>
                      <span className="mt-1 block text-xs font-black text-brand-orange">+ {money(addOn.price)}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-white/50">Quantity & note</p>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-2">
                <button type="button" onClick={() => setQuantity((qty) => Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 active:scale-95">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-xl font-black">{quantity}</span>
                <button type="button" onClick={() => setQuantity((qty) => qty + 1)} className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange active:scale-95">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows="3"
                placeholder="Any note? Example: less spicy, no onion..."
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-white/30 focus:border-brand-orange/50"
              />
            </section>
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[#141414] p-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-white/55">Item total</span>
            <span className="font-display text-2xl font-black text-brand-orange">{money(unitTotal * quantity)}</span>
          </div>
          <Button type="button" onClick={handleAdd} className="w-full py-4">
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
