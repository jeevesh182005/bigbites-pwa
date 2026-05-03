import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'big-bites-cart-v4';

const initialCustomer = {
  name: '',
  phone: '',
  branch: 'Tiruvallur Main',
  orderType: 'Delivery',
  address: '',
  landmark: '',
  preferredTime: 'As soon as possible',
  notes: '',
};

const initialState = {
  items: [],
  coupon: '',
  customer: initialCustomer,
  lastOrder: null,
  pulseKey: 0,
};

function safeId() {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function prepareCartItems(items = []) {
  return items.map((item) => ({ ...item, cartId: safeId() }));
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, pulseKey: Date.now(), items: [{ ...action.payload, cartId: safeId() }, ...state.items] };
    case 'ADD_ITEMS':
      return { ...state, pulseKey: Date.now(), items: [...prepareCartItems(action.payload), ...state.items] };
    case 'REPLACE_ITEMS':
      return { ...state, pulseKey: Date.now(), items: prepareCartItems(action.payload) };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.cartId !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((item) => (item.cartId === action.payload.cartId ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item)),
      };
    case 'SET_COUPON':
      return { ...state, coupon: action.payload.toUpperCase().trim() };
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case 'SAVE_LAST_ORDER':
      return { ...state, lastOrder: action.payload };
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: '', pulseKey: 0 };
    case 'HYDRATE':
      return {
        ...initialState,
        ...action.payload,
        items: Array.isArray(action.payload?.items) ? action.payload.items : [],
        customer: { ...initialCustomer, ...(action.payload?.customer || {}) },
      };
    default:
      return state;
  }
}

function getDiscount(code, subtotal, itemNames = []) {
  const coupon = code.trim().toUpperCase();
  if (!coupon) return { amount: 0, label: '' };

  if (coupon === 'BIGBITES10') {
    return { amount: Math.min(Math.round(subtotal * 0.1), 50), label: 'BIGBITES10 applied - 10% off up to ₹50' };
  }

  if (coupon === 'FAMILY50') {
    if (subtotal < 499) return { amount: 0, label: 'FAMILY50 needs minimum cart value of ₹499' };
    return { amount: 50, label: 'FAMILY50 applied - ₹50 off above ₹499' };
  }

  if (coupon === 'BBNEW20') {
    if (subtotal < 200) return { amount: 0, label: 'BBNEW20 needs minimum cart value of ₹200' };
    return { amount: 20, label: 'BBNEW20 applied - ₹20 off above ₹200' };
  }

  if (coupon === 'SHAWARMA89') {
    const hasShawarma = itemNames.some((name) => name.toLowerCase().includes('shawarma'));
    return { amount: 0, label: hasShawarma ? 'SHAWARMA89 noted. Team will confirm roll offer eligibility.' : 'Add a shawarma item to use SHAWARMA89.' };
  }

  if (coupon === 'VOTE89') {
    return { amount: 0, label: 'VOTE89 noted. Team will confirm ink-proof offer eligibility.' };
  }

  return { amount: 0, label: 'Invalid coupon' };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored) dispatch({ type: 'HYDRATE', payload: stored });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Local storage can fail in private mode. Cart still works in memory.
    }
  }, [state]);

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: item }), []);
  const addItems = useCallback((items) => dispatch({ type: 'ADD_ITEMS', payload: items }), []);
  const replaceItems = useCallback((items) => dispatch({ type: 'REPLACE_ITEMS', payload: items }), []);
  const removeItem = useCallback((cartId) => dispatch({ type: 'REMOVE_ITEM', payload: cartId }), []);
  const updateQty = useCallback((cartId, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { cartId, quantity } }), []);
  const setCoupon = useCallback((coupon) => dispatch({ type: 'SET_COUPON', payload: coupon }), []);
  const setCustomer = useCallback((customer) => dispatch({ type: 'SET_CUSTOMER', payload: customer }), []);
  const saveLastOrder = useCallback((order) => dispatch({ type: 'SAVE_LAST_ORDER', payload: order }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => sum + item.unitTotal * item.quantity, 0);
    const itemNames = state.items.map((item) => item.name);
    const discount = getDiscount(state.coupon, subtotal, itemNames);
    const total = Math.max(0, subtotal - discount.amount);
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, discount, total, itemCount };
  }, [state.items, state.coupon]);

  const value = useMemo(
    () => ({
      state,
      items: state.items,
      customer: state.customer,
      lastOrder: state.lastOrder,
      totals,
      pulseKey: state.pulseKey,
      addItem,
      addItems,
      replaceItems,
      removeItem,
      updateQty,
      setCoupon,
      setCustomer,
      saveLastOrder,
      clearCart,
    }),
    [state, totals, addItem, addItems, replaceItems, removeItem, updateQty, setCoupon, setCustomer, saveLastOrder, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
