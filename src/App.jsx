import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import FloatingCartButton from './components/FloatingCartButton.jsx';
import InstallPrompt from './components/InstallPrompt.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Offers from './pages/Offers.jsx';
import Franchise from './pages/Franchise.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import OrderTracking from './pages/OrderTracking.jsx';

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: 'easeOut' }}>
      <div className="relative min-h-screen overflow-x-hidden bg-[#0f0f0f] text-white selection:bg-brand-orange/30 selection:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,0,.14),transparent_68%)]" />
        <LoadingScreen />
        <Navbar />
        <main className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-4 pb-28 pt-20 sm:px-6 lg:px-8 lg:pb-10">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/track" element={<OrderTracking />} />
            </Routes>
          </AnimatePresence>
        </main>
        <InstallPrompt />
        <FloatingCartButton />
        <FloatingWhatsApp />
        <ScrollToTop />
        <BottomNav />
      </div>
    </MotionConfig>
  );
}
