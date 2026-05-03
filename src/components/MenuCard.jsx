import { memo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Flame, RotateCw, ShoppingCart } from 'lucide-react';
import Button from './Button.jsx';
import ProductCustomizeModal from './ProductCustomizeModal.jsx';

function MenuCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  const flip = () => setFlipped((value) => !value);

  return (
    <>
      <article className="menu-card-shell rounded-[1.55rem]">
        <div
          role="button"
          tabIndex="0"
          onClick={flip}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') flip();
          }}
          className={`flip-card h-[390px] w-full cursor-pointer text-left ${flipped ? 'is-flipped' : ''}`}
          aria-label={`Tap to ${flipped ? 'view details' : 'see price'} for ${item.name}`}
        >
          <div className="flip-card-inner h-full">
            <div className="flip-card-face glass-card overflow-hidden rounded-[1.55rem]">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-orange/15 to-white/5">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" decoding="async" width="560" height="420" />
                <span className="absolute left-3 top-3 rounded-full border border-brand-orange/30 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-orange-100">
                  {item.tag}
                </span>
                <div className="absolute right-3 top-3 flex gap-0.5 rounded-full bg-black/55 px-2 py-1">
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <Flame key={itemIndex} className={`h-3.5 w-3.5 ${itemIndex < item.spice ? 'fill-brand-orange text-brand-orange' : 'text-white/25'}`} />
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-orange">{item.category}</p>
                  <h3 className="mt-1 font-display text-lg font-black leading-tight">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-white/55">{item.description}</p>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                  <span className="text-xs font-bold text-white/45">Tap to see price</span>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-brand-orange"><RotateCw className="h-4 w-4" /> Flip</span>
                </div>
              </div>
            </div>

            <div className="flip-card-face flip-card-back glass-card rounded-[1.55rem] p-4">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-orange">Price options</p>
                  <h3 className="mt-1 font-display text-xl font-black leading-tight">{item.name}</h3>
                  <div className="mt-4 rounded-[1.25rem] border border-brand-orange/25 bg-brand-orange/10 p-4">
                    <p className="text-xs font-bold text-white/55">Available price</p>
                    <p className="mt-2 text-lg font-black leading-8 text-orange-100">{item.price}</p>
                  </div>
                  <p className="mt-4 text-xs font-semibold leading-5 text-white/50">After selecting, choose size/portion, extra mayonnaise, flakes, water bottle, quantity and notes.</p>
                </div>
                <div className="grid gap-2">
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setCustomizing(true);
                    }}
                    className="w-full py-3"
                  >
                    <ShoppingCart className="h-4 w-4" /> Customize & Add
                  </Button>
                  <span className="text-center text-[11px] font-bold text-white/35">Tap card again to view food image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <AnimatePresence>{customizing ? <ProductCustomizeModal item={item} onClose={() => setCustomizing(false)} /> : null}</AnimatePresence>
    </>
  );
}

export default memo(MenuCard);
