import { useEffect, useState } from 'react';
import { Download, RefreshCw, Smartphone, WifiOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button.jsx';
import useInstallPrompt from '../hooks/useInstallPrompt.js';

export default function InstallPrompt() {
  const { canInstall, installApp } = useInstallPrompt();
  const [showOfflineReady, setShowOfflineReady] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dismissedInstall, setDismissedInstall] = useState(false);

  useEffect(() => {
    const offline = () => {
      setShowOfflineReady(true);
      window.setTimeout(() => setShowOfflineReady(false), 4500);
    };
    const update = () => setShowUpdate(true);
    window.addEventListener('bb-offline-ready', offline);
    window.addEventListener('bb-update-ready', update);
    return () => {
      window.removeEventListener('bb-offline-ready', offline);
      window.removeEventListener('bb-update-ready', update);
    };
  }, []);

  const shouldShowInstall = canInstall && !dismissedInstall;
  const visible = shouldShowInstall || showOfflineReady || showUpdate;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          className="fixed inset-x-4 bottom-48 z-50 mx-auto max-w-md rounded-[1.7rem] border border-brand-orange/[0.25] bg-[#151515]/[0.92] p-4 shadow-[0_0_44px_rgba(255,106,0,.22)]  lg:bottom-6"
        >
          {shouldShowInstall ? (
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-orange/[0.20] text-brand-orange">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm font-black">Install Big Bites & Get App Offers</h3>
                <p className="mt-1 text-xs leading-5 text-white/[0.55]">Install the app for faster menu access, quick reorder and exclusive coupon reminders.</p>
              </div>
              <Button onClick={installApp} className="px-4 py-2 text-xs">
                <Download className="h-4 w-4" /> Add
              </Button>
              <button onClick={() => setDismissedInstall(true)} className="text-xs font-bold text-white/[0.45] hover:text-white">Later</button>
            </div>
          ) : showUpdate ? (
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-orange/[0.20] text-brand-orange">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-black">Fresh update available</h3>
                <p className="mt-1 text-xs leading-5 text-white/[0.55]">Reload once to get the newest Big Bites experience.</p>
              </div>
              <Button onClick={() => window.location.reload()} className="px-4 py-2 text-xs">Reload</Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-orange/[0.20] text-brand-orange">
                <WifiOff className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-sm font-black">Offline ready</h3>
                <p className="mt-1 text-xs leading-5 text-white/[0.55]">Big Bites menu pages are cached for quick access.</p>
              </div>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
