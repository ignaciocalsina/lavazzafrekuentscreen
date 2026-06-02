import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations } from '@/i18n/translations';

export type Screen =
  | 'ad'
  | 'coffee_preparing'
  | 'coffee_order'
  | 'coffee_payment_method'
  | 'coffee_normal_pay'
  | 'coffee_balance_summary'
  | 'coffee_balance_pay'
  | 'coffee_coupon_pay'
  | 'coffee_processing'
  | 'coffee_brewing'
  | 'coffee_ready';

export type KioskMode = 'promo' | 'coffee';
export type OrderType = 'puntual' | 'bono_semanal' | 'bono_mensual';
export type BundleType = 'week' | 'month';
export type PaymentMethod = 'normal' | 'balance' | 'coupon';

// Pedido en curso (detectado en la cafetera Nespresso)
export const CURRENT_COFFEE_NAME = 'Cappuccino';
export const COFFEE_PRICE = 3.5;
export const BONO_WEEK_PRICE = 6;
export const BONO_MONTH_PRICE = 22.5;
export const BONO_WEEK_COFFEES = 5;
export const BONO_MONTH_COFFEES = 20;

// My Espresso (mock)
export const MY_ESPRESSO_BALANCE = 3.5;
export const COUPON_INITIAL = 3;

interface AppState {
  screen: Screen;
  language: Language;
  processing: boolean;
  kioskMode: KioskMode;
  orderType: OrderType;
  bundleType: BundleType | null;
  paymentMethod: PaymentMethod | null;
  couponRemaining: number;
}

interface AppContextType extends AppState {
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  navigate: (screen: Screen) => void;
  goHome: () => void;
  setProcessing: (v: boolean) => void;
  setKioskMode: (m: KioskMode) => void;
  setOrderType: (t: OrderType) => void;
  setBundleType: (t: BundleType | null) => void;
  setPaymentMethod: (m: PaymentMethod | null) => void;
  getOrderAmount: () => number;
}

declare global {
  interface Window {
    __lovableAppContext__?: React.Context<AppContextType | null>;
  }
}

const AppContext =
  window.__lovableAppContext__ ?? createContext<AppContextType | null>(null);

AppContext.displayName = 'AppContext';
window.__lovableAppContext__ = AppContext;

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    screen: 'ad',
    language: 'es',
    processing: false,
    kioskMode: 'promo',
    orderType: 'puntual',
    bundleType: null,
    paymentMethod: null,
    couponRemaining: COUPON_INITIAL,
  });

  const t = useCallback((key: string): string => translations[state.language]?.[key] || key, [state.language]);
  const setLanguage = useCallback((lang: Language) => setState(s => ({ ...s, language: lang })), []);
  const navigate = useCallback((screen: Screen) => setState(s => ({ ...s, screen, processing: false })), []);

  const goHome = useCallback(() => {
    setState(s => ({
      ...s,
      screen: 'ad',
      processing: false,
      kioskMode: 'promo',
      orderType: 'puntual',
      bundleType: null,
      paymentMethod: null,
    }));
  }, []);

  const setProcessing = useCallback((v: boolean) => setState(s => ({ ...s, processing: v })), []);

  const setKioskMode = useCallback((m: KioskMode) => {
    setState(s => ({
      ...s,
      kioskMode: m,
      // Al entrar en modo café, primero pasamos por la pantalla de "procesando tu selección"
      screen: m === 'promo' ? 'ad' : 'coffee_preparing',
      processing: false,
      orderType: 'puntual',
      bundleType: null,
      paymentMethod: null,
    }));
  }, []);

  const setOrderType = useCallback((orderType: OrderType) => setState(s => ({ ...s, orderType })), []);
  const setBundleType = useCallback((bundleType: BundleType | null) => setState(s => ({ ...s, bundleType })), []);
  const setPaymentMethod = useCallback((paymentMethod: PaymentMethod | null) => setState(s => ({ ...s, paymentMethod })), []);

  const getOrderAmount = useCallback(() => {
    if (state.orderType === 'bono_semanal') return BONO_WEEK_PRICE;
    if (state.orderType === 'bono_mensual') return BONO_MONTH_PRICE;
    return COFFEE_PRICE;
  }, [state.orderType]);

  return (
    <AppContext.Provider value={{
      ...state, t, setLanguage, navigate, goHome, setProcessing,
      setKioskMode, setOrderType, setBundleType, setPaymentMethod,
      getOrderAmount,
    }}>
      {children}
    </AppContext.Provider>
  );
};
