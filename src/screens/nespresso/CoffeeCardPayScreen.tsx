import { useState } from 'react';
import { useApp, COFFEE_PRICE } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { BrandFooter, NespressoLogo } from '@/components/NespressoBrand';

const ContactlessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-20 h-20">
    <path d="M4 7c5 0 9 4 9 9" />
    <path d="M2 11c3.3 0 6 2.7 6 6" />
    <path d="M2 15c1.7 0 3 1.3 3 3" />
    <path d="M9 4c8.3 0 15 6.7 15 15" />
  </svg>
);

const CoffeeCardPayScreen = () => {
  const { navigate, setProcessing } = useApp();
  const [processing, setLocal] = useState(false);
  const fmt = COFFEE_PRICE.toFixed(2).replace('.', ',') + ' €';

  const pay = () => {
    if (processing) return;
    setLocal(true);
    setProcessing(true);
    setTimeout(() => navigate('coffee_brewing'), 1600);
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_pay_choice')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">PAGO CON TARJETA</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-9">
        <p className="font-serif-nes text-5xl text-white tabular-nums">{fmt}</p>
        {processing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-4 border-nes-gold-text border-t-transparent animate-spin" />
            <p className="text-white/80 text-xs">Procesando pago…</p>
          </div>
        ) : (
          <>
            <button onClick={pay} className="text-nes-gold-text active:scale-95 transition-transform nfc-pulse">
              <ContactlessIcon />
            </button>
            <p className="text-xs text-white/80 text-center">Acerca tu tarjeta, Apple Pay o Google Pay</p>
          </>
        )}
      </div>
      <BrandFooter />
    </div>
  );
};

export default CoffeeCardPayScreen;
