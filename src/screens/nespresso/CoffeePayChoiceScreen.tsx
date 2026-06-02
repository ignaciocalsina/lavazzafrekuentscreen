import { useApp } from '@/context/AppContext';
import { CreditCard, UserCircle, ArrowLeft } from 'lucide-react';
import { OrderHeader } from '@/components/NespressoBrand';

const CoffeePayChoiceScreen = () => {
  const { navigate, setPaymentMethod } = useApp();
  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <OrderHeader />
      <div className="flex-1 px-4 pb-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => { setPaymentMethod('card'); navigate('coffee_card_pay'); }}
          className="rounded-xl bg-nes-cream text-nes-onyx p-4 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-inner">
            <CreditCard className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-base font-semibold tracking-[0.1em]">PAGAR CON TARJETA</h3>
          <p className="text-[11px] mt-1 leading-snug max-w-[90%]">
            Paga este café con tarjeta,<br />Apple Pay o Google Pay.
          </p>
          <span className="mt-auto inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em]">
            PAGAR CON TARJETA
          </span>
        </button>
        <button
          onClick={() => navigate('coffee_identify')}
          className="rounded-xl bg-nes-gold text-nes-cream p-4 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-12 h-12 rounded-full bg-nes-cream flex items-center justify-center mb-2 shadow-inner">
            <UserCircle className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-base font-semibold tracking-[0.1em]">USAR FIDELIZACIÓN</h3>
          <p className="text-[11px] mt-1 leading-snug max-w-[90%]">
            Identifícate para pagar con saldo<br />o usar un café de tu bono.
          </p>
          <span className="mt-auto inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em]">
            CUENTA NESPRESSO
          </span>
        </button>
      </div>
    </div>
  );
};

export default CoffeePayChoiceScreen;
