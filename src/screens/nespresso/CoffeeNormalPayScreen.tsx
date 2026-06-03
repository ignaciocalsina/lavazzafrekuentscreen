import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { FlowBackground, NespressoLogo, ContactlessIcon } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeNormalPayScreen = () => {
  const { navigate, getOrderAmount } = useApp();
  const amount = getOrderAmount();

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate('coffee_payment_method')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[15px] !tracking-[0.32em]" />
        <p className="mt-1.5 text-white/75 text-[11px] tracking-[0.25em] font-semibold">TOTAL A PAGAR</p>
        <p className="font-serif-nes text-nes-gold-text text-[39px] leading-none mt-0.5">{fmt(amount)}</p>
      </div>

      <button
        onClick={() => navigate('coffee_processing')}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0 text-nes-gold-text nfc-pulse active:scale-95 transition-transform"
      >
        <ContactlessIcon className="w-56 h-56" />
        <span className="text-white text-[28px] font-serif-nes tracking-wide leading-none -mt-10">Acerca tu tarjeta para pagar</span>
      </button>
    </div>
  );
};

export default CoffeeNormalPayScreen;
