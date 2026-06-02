import React, { createContext, useContext, useState, useCallback } from 'react';

import { Language, translations } from '@/i18n/translations';
import type { MarketplaceBrandId } from '@/data/marketplaceBrands';
import type { PromotionId } from '@/data/promotions';

export type Screen =
  | 'ad'
  | 'role_select'
  | 'home'
  | 'identification'
  | 'collect_found'
  | 'collect_opening'
  | 'collect_done'
  | 'return_confirmed'
  | 'return_open'
  | 'return_done'
  | 'send_details'
  | 'send_price'
  | 'send_payment'
  | 'send_created'
  | 'send_deposit'
  | 'send_done'
  | 'driver_nfc'
  | 'driver_package_list'
  | 'driver_open'
  | 'driver_collect_done'
  | 'driver_done'
  | 'marketplace_type'
  | 'marketplace_code'
  | 'marketplace_quantity'
  | 'marketplace_payment'
  | 'marketplace_done'
  | 'payment_amount'
  | 'payment_insurance'
  | 'payment_pay'
  | 'payment_done'
  | 'promo_quantity'
  | 'promo_pay'
  | 'promo_done'
  | 'coffee_idle'
  | 'coffee_loading'
  | 'coffee_pay'
  | 'coffee_offer'
  | 'coffee_done';

export type KioskMode = 'promo' | 'coffee';

export type Flow =
  | 'collect'
  | 'return'
  | 'send'
  | 'driver_collect'
  | 'driver_deposit'
  | 'marketplace'
  | 'payment'
  | 'promotion'
  | 'coffee'
  | null;

export type MarketplaceCardType = 'digital' | 'physical' | null;

export const getInsurancePrice = (amount: number): number => {
  if (amount >= 700 && amount <= 1000) return 70;
  if (amount >= 400 && amount < 700) return 50;
  if (amount >= 200 && amount < 400) return 30;
  if (amount >= 100 && amount < 200) return 15;
  return 0;
};

interface AppState {
  screen: Screen;
  flow: Flow;
  language: Language;
  trackingNumber: string;
  processing: boolean;
  marketplaceBrandId: MarketplaceBrandId | null;
  marketplaceCardType: MarketplaceCardType;
  marketplaceActivationCode: string | null;
  paymentAmount: number;
  paymentInsurance: number;
  promotionCode: string | null;
  selectedPromotionId: PromotionId;
  quantity: number;
}

interface AppContextType extends AppState {
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  navigate: (screen: Screen, flow?: Flow) => void;
  goHome: () => void;
  generateTracking: () => void;
  setProcessing: (v: boolean) => void;
  setMarketplaceBrand: (id: MarketplaceBrandId) => void;
  setMarketplaceCardType: (type: MarketplaceCardType) => void;
  setMarketplaceActivationCode: (code: string | null) => void;
  setPaymentAmount: (n: number) => void;
  setPaymentInsurance: (n: number) => void;
  setPromotionCode: (code: string | null) => void;
  setSelectedPromotion: (id: PromotionId) => void;
  setQuantity: (n: number) => void;
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
    flow: null,
    language: 'es',
    trackingNumber: '',
    processing: false,
    marketplaceBrandId: null,
    marketplaceCardType: null,
    marketplaceActivationCode: null,
    paymentAmount: 0,
    paymentInsurance: 0,
    promotionCode: null,
    selectedPromotionId: 'originals',
    quantity: 1,
  });

  const t = useCallback((key: string): string => {
    return translations[state.language][key] || key;
  }, [state.language]);

  const setLanguage = useCallback((lang: Language) => {
    setState(s => ({ ...s, language: lang }));
  }, []);

  const navigate = useCallback((screen: Screen, flow?: Flow) => {
    setState(s => ({ ...s, screen, flow: flow !== undefined ? flow : s.flow, processing: false }));
  }, []);

  const goHome = useCallback(() => {
    setState(s => ({
      ...s,
      screen: 'ad',
      flow: null,
      trackingNumber: '',
      processing: false,
      marketplaceBrandId: null,
      marketplaceCardType: null,
      marketplaceActivationCode: null,
      paymentAmount: 0,
      paymentInsurance: 0,
      promotionCode: null,
      quantity: 1,
    }));
  }, []);

  const setProcessing = useCallback((v: boolean) => {
    setState(s => ({ ...s, processing: v }));
  }, []);

  const generateTracking = useCallback(() => {
    const tracking = 'INP' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setState(s => ({ ...s, trackingNumber: tracking }));
  }, []);

  const setMarketplaceBrand = useCallback((id: MarketplaceBrandId) => {
    setState(s => ({ ...s, marketplaceBrandId: id, marketplaceCardType: null, flow: 'marketplace', quantity: 1 }));
  }, []);

  const setMarketplaceCardType = useCallback((type: MarketplaceCardType) => {
    setState(s => ({ ...s, marketplaceCardType: type }));
  }, []);

  const setMarketplaceActivationCode = useCallback((code: string | null) => {
    setState(s => ({ ...s, marketplaceActivationCode: code }));
  }, []);

  const setPaymentAmount = useCallback((n: number) => {
    setState(s => ({ ...s, paymentAmount: n, paymentInsurance: 0 }));
  }, []);

  const setPaymentInsurance = useCallback((n: number) => {
    setState(s => ({ ...s, paymentInsurance: n }));
  }, []);

  const setPromotionCode = useCallback((code: string | null) => {
    setState(s => ({ ...s, promotionCode: code }));
  }, []);

  const setSelectedPromotion = useCallback((id: PromotionId) => {
    setState(s => ({ ...s, selectedPromotionId: id, quantity: 1 }));
  }, []);

  const setQuantity = useCallback((n: number) => {
    setState(s => ({ ...s, quantity: Math.max(1, Math.min(20, n)) }));
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      t,
      setLanguage,
      navigate,
      goHome,
      generateTracking,
      setProcessing,
      setMarketplaceBrand,
      setMarketplaceCardType,
      setMarketplaceActivationCode,
      setPaymentAmount,
      setPaymentInsurance,
      setPromotionCode,
      setSelectedPromotion,
      setQuantity,
    }}>
      {children}
    </AppContext.Provider>
  );
};
