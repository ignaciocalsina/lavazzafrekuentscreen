import { useApp } from '@/context/AppContext';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { KioskHeader, NespressoLogo } from '@/components/NespressoBrand';

const CoffeePayChoiceScreen = () => {
  const { navigate, setPaymentMethod } = useApp();

  const payCard = () => { setPaymentMethod('card'); navigate('coffee_card_pay'); };
  const payLoyalty = () => { setPaymentMethod('loyalty'); navigate('coffee_processing'); };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <KioskHeader caption={<>Importe: <span className="text-[16px] font-semibold">1,50 €</span></>} />

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-[80%] h-[170px]">
          <button
            onClick={payCard}
            className="rounded-xl bg-nes-cream text-nes-onyx p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-inner">
              <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] mt-1.5">PAGAR CON TARJETA</h3>
            <p className="text-[10px] mt-1 leading-snug">
              Tarjeta, Apple Pay<br />o Google Pay.
            </p>
            <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em]">
              PAGAR CON TARJETA
            </span>
          </button>

          <button
            onClick={payLoyalty}
            className="rounded-xl bg-nes-gold text-nes-cream p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="h-11 flex items-center justify-center">
              <NespressoLogo className="!text-[13px] !tracking-[0.32em]" />
            </div>
            <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] mt-1.5">USAR FIDELIZACIÓN</h3>
            <p className="text-[10px] mt-1 leading-snug">
              Paga con tu cuenta<br />y acumula ventajas.
            </p>
            <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em]">
              CUENTA NESPRESSO
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeePayChoiceScreen;
