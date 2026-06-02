import { useEffect } from 'react';
import { useApp, COFFEE_PRICE, BONO_WEEK_PRICE, BONO_MONTH_PRICE } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { NespressoLogo } from '@/components/NespressoBrand';

const ContactlessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-20 h-20">
    <path d="M4 7c5 0 9 4 9 9" />
    <path d="M2 11c3.3 0 6 2.7 6 6" />
    <path d="M2 15c1.7 0 3 1.3 3 3" />
    <path d="M9 4c8.3 0 15 6.7 15 15" />
  </svg>
);

const CoffeeCardPayScreen = () => {
  const { navigate, orderType } = useApp();
  const amount =
    orderType === 'bono_semanal' ? BONO_WEEK_PRICE :
    orderType === 'bono_mensual' ? BONO_MONTH_PRICE :
    COFFEE_PRICE;
  const fmt = amount.toFixed(2).replace('.', ',') + ' €';

  useEffect(() => {
    const id = setTimeout(() => navigate('coffee_processing'), 1800);
    return () => clearTimeout(id);
  }, [navigate]);

  const back = () => navigate(orderType === 'puntual' ? 'coffee_pay_choice' : 'coffee_bundle_pay');

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={back} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">PAGO CON TARJETA</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="font-serif-nes text-5xl text-white tabular-nums">{fmt}</p>
        <div className="text-nes-gold-text nfc-pulse">
          <ContactlessIcon />
        </div>
        <p className="text-sm text-white/90 text-center font-serif-nes tracking-wide">
          Acerca tu tarjeta para pagar
        </p>
        <p className="text-[10px] text-white/55">Tarjeta · Apple Pay · Google Pay</p>
      </div>
    </div>
  );
};

export default CoffeeCardPayScreen;
