import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const tone = {
  success: {
    icon: CheckCircle2,
    classes: 'border-emerald-400/25 bg-emerald-500/[0.10] text-emerald-50',
    iconClasses: 'text-emerald-300',
  },
  error: {
    icon: AlertTriangle,
    classes: 'border-red-400/25 bg-red-500/[0.10] text-red-50',
    iconClasses: 'text-red-300',
  },
  info: {
    icon: Info,
    classes: 'border-brand-orange/[0.30] bg-brand-orange/[0.10] text-orange-50',
    iconClasses: 'text-brand-orange',
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((items) => items.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = 'info', title, message, duration = 4200 }) => {
      const id = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      setToasts((items) => [...items.slice(-2), { id, type, title, message }]);
      window.setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-3 top-20 z-[90] mx-auto flex max-w-md flex-col gap-3 sm:inset-x-auto sm:right-5 sm:left-auto">
        <AnimatePresence initial={false}>
          {toasts.map((item) => {
            const config = tone[item.type] || tone.info;
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className={`pointer-events-auto overflow-hidden rounded-[1.35rem] border p-4 shadow-[0_22px_70px_rgba(0,0,0,.45)]  ${config.classes}`}
              >
                <div className="flex gap-3">
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClasses}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-black leading-5">{item.title}</p>
                    {item.message ? <p className="mt-1 text-xs font-semibold leading-5 text-white/[0.60]">{item.message}</p> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeToast(item.id)}
                    aria-label="Close notification"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white/[0.55] transition hover:bg-white/15 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
}
