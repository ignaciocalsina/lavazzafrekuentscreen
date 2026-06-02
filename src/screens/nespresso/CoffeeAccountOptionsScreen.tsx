import { useApp, MOCK_BALANCE, MOCK_BUNDLE_REMAINING, COFFEE_PRICE } from '@/context/AppContext';
import { Wallet, Coffee, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react';
import { BrandFooter, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeAccountOptionsScreen = () => {
  const { navigate, setPaymentMethod, mockState } = useApp();

  const choose = (m: 'balance' | 'bundle_credit' | 'card') => {
    setPaymentMethod(m);
    navigate('coffee_brewing');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_identify')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2 pb-1.5">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">HOLA, ANA</p>
        <p className="text-white/85 text-[10px] italic mt-0.5">Importe a pagar: {fmt(COFFEE_PRICE)}</p>
      </div>

      {mockState === 'empty' ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-9 gap-3">
          <div className="flex items-center gap-2 bg-nes-cream/10 border border-nes-gold-text/30 text-white rounded-xl px-3 py-2 text-[11px]">
            <AlertCircle className="w-4 h-4 text-nes-gold-text" />
            No tienes saldo ni cafés disponibles.
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <button onClick={() => choose('card')} className="rounded-xl bg-nes-cream text-nes-onyx p-3 active:scale-[0.98] shadow">
              <CreditCard className="w-5 h-5 mx-auto" strokeWidth={1.5} />
              <p className="font-serif-nes text-[12px] font-semibold mt-1 tracking-wide">PAGAR CON TARJETA</p>
            </button>
            <button onClick={() => { navigate('coffee_order'); }} className="rounded-xl bg-nes-gold text-nes-cream p-3 active:scale-[0.98] shadow">
              <Coffee className="w-5 h-5 mx-auto" strokeWidth={1.5} />
              <p className="font-serif-nes text-[12px] font-semibold mt-1 tracking-wide">COMPRAR BONO</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-2 px-3 pb-9">
          <button
            onClick={() => choose('balance')}
            disabled={mockState !== 'balance'}
            className={`rounded-xl p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow ${
              mockState === 'balance' ? 'bg-nes-cream text-nes-onyx' : 'bg-nes-cream/30 text-nes-cream/40'
            }`}
          >
            <Wallet className="w-7 h-7 mt-1" strokeWidth={1.4} />
            <p className="font-serif-nes text-[12px] font-semibold tracking-wide mt-1.5 leading-tight">PAGAR CON<br />SALDO</p>
            <p className="text-[9px] mt-1 leading-snug">
              Saldo disponible:<br />
              <strong className="font-serif-nes text-[13px]">{fmt(MOCK_BALANCE)}</strong>
            </p>
          </button>
          <button
            onClick={() => choose('bundle_credit')}
            disabled={mockState !== 'bundle'}
            className={`rounded-xl p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow ${
              mockState === 'bundle' ? 'bg-nes-sand text-nes-onyx' : 'bg-nes-cream/30 text-nes-cream/40'
            }`}
          >
            <Coffee className="w-7 h-7 mt-1" strokeWidth={1.4} />
            <p className="font-serif-nes text-[12px] font-semibold tracking-wide mt-1.5 leading-tight">USAR CAFÉ<br />DE MI BONO</p>
            <p className="text-[9px] mt-1 leading-snug">
              Bono semanal:<br />
              <strong className="font-serif-nes text-[13px]">{MOCK_BUNDLE_REMAINING} cafés</strong>
            </p>
          </button>
          <button
            onClick={() => choose('card')}
            className="rounded-xl bg-nes-gold text-nes-cream p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow"
          >
            <CreditCard className="w-7 h-7 mt-1" strokeWidth={1.4} />
            <p className="font-serif-nes text-[12px] font-semibold tracking-wide mt-1.5 leading-tight">TARJETA Y<br />ACUMULAR</p>
            <p className="text-[9px] mt-1 leading-snug opacity-90">Suma ventajas a tu cuenta Nespresso</p>
          </button>
        </div>
      )}

      <BrandFooter />
    </div>
  );
};

export default CoffeeAccountOptionsScreen;
