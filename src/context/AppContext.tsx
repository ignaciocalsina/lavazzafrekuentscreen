import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations } from '@/i18n/translations';

export type Screen =
  | 'ad'
  | 'coffee_order'
  | 'coffee_pay_choice'
  | 'coffee_card_pay'
  | 'coffee_identify'
  | 'coffee_account_options'
  | 'coffee_bundle_pay'
  | 'coffee_processing'
  | 'coffee_brewing'
  | 'coffee_ready';

export type KioskMode = 'promo' | 'coffee';
export type OrderType = 'puntual' | 'bono_semanal' | 'bono_mensual';
export type BundleType = 'week' | 'month';
export type PaymentMethod = 'card' | 'balance' | 'bundle_credit';
export type MockUserState = 'empty' | 'balance' | 'bundle';

export const COFFEE_PRICE = 1.5;
export const BONO_WEEK_PRICE = 6;
export const BONO_MONTH_PRICE = 22.5;
export const BONO_WEEK_COFFEES = 5;
export const BONO_MONTH_COFFEES = 20;
export const MOCK_BALANCE = 10;
export const MOCK_BUNDLE_REMAINING = 3;

interface AppState {
  screen: Screen;
  language: Language;
  processing: boolean;
  kioskMode: KioskMode;
  orderType: OrderType;
  bundleType: BundleType | null;
  paymentMethod: PaymentMethod | null;
  mockState: MockUserState;
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
  setMockState: (s: MockUserState) => void;
}

const AppContext = createContext<AppContextType | null>(null);

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
    mockState: 'balance',
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
      screen: m === 'promo' ? 'ad' : 'coffee_order',
      processing: false,
      orderType: 'puntual',
      bundleType: null,
      paymentMethod: null,
    }));
  }, []);

  const setOrderType = useCallback((orderType: OrderType) => setState(s => ({ ...s, orderType })), []);
  const setBundleType = useCallback((bundleType: BundleType | null) => setState(s => ({ ...s, bundleType })), []);
  const setPaymentMethod = useCallback((paymentMethod: PaymentMethod | null) => setState(s => ({ ...s, paymentMethod })), []);
  const setMockState = useCallback((mockState: MockUserState) => setState(s => ({ ...s, mockState })), []);

  return (
    <AppContext.Provider value={{
      ...state, t, setLanguage, navigate, goHome, setProcessing,
      setKioskMode, setOrderType, setBundleType, setPaymentMethod, setMockState,
    }}>
      {children}
    </AppContext.Provider>
  );
};
