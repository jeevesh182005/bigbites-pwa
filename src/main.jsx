import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import { ToastProvider } from './components/ToastProvider.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './styles/index.css';

registerSW({
  immediate: true,
  onOfflineReady() {
    window.dispatchEvent(new CustomEvent('bb-offline-ready'));
  },
  onNeedRefresh() {
    window.dispatchEvent(new CustomEvent('bb-update-ready'));
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
