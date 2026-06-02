import { useState } from 'react';
import { useApp, BONO_WEEK_PRICE, BONO_MONTH_PRICE, MOCK_BALANCE } from '@/context/AppContext';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';
import { BrandFooter, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeBundlePayScreen = () => {
  const { navigate, setProcessing, setPaymentMethod, bundleType, mockState } = useApp();
  const [processing, setLocal] = useState(false);
  const total = bundleType === 'week' ? BONO_WEEK_PRICE : BONO_MONTH_PRICE;
  const balanceOk = mockState === 'balance' && MOCK_BALANCE >= total;

  const pay = (m: 'card' | 'balance') => {
    if (processing) return;
    setPaymentMethod(m);
    setLocal(true);
    setProcessing(true);
    setTimeout(() => navigate('coffee_brewing'), 1600);
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_identify')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">
          {bundleType === 'week' ? 'BONO SEMANAL' : 'BONO MENSUAL'} · {fmt(total)}
        </p>
      </div>

      {processing ? (
        <div className="flex-1 flex flex-col items-center justify-center pb-9 gap-2">
          <div className="w-12 h-12 rounded-full border-4 border-nes-gold-text border-t-transparent animate-spin" />
          <p className="text-white/85 text-xs">Procesando pago…</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-2 gap-3 px-4 pb-9">
          <button
            onClick={() => pay('card')}
            className="rounded-xl bg-nes-cream text-nes-onyx p-3 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow"
          >
            <CreditCard className="w-9 h-9 mt-1" strokeWidth={1.4} />
            <h3 className="font-serif-nes text-sm font-semibold tracking-[0.1em] mt-2">PAGAR CON TARJETA</h3>
            <p className="text-[10px] mt-1 leading-snug max-w-[90%]">
              Paga el bono con tarjeta<br />y acumula ventajas en tu cuenta.
            </p>
            <span className="mt-auto inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em]">
              PAGAR · {fmt(total)}
            </span>
          </button>
          <button
            onClick={() => balanceOk && pay('balance')}
            disabled={!balanceOk}
            className={`rounded-xl p-3 flex flex-col items-center text-center transition-transform shadow ${
              balanceOk ? 'bg-nes-gold text-nes-cream active:scale-[0.98]' : 'bg-nes-cream/20 text-nes-cream/50'
            }`}
          >
            <Wallet className="w-9 h-9 mt-1" strokeWidth={1.4} />
            <h3 className="font-serif-nes text-sm font-semibold tracking-[0.1em] mt-2">PAGAR CON SALDO</h3>
            <p className="text-[10px] mt-1 leading-snug max-w-[90%]">
              {balanceOk
                ? <>Usa el saldo disponible<br />en tu cuenta Nespresso.</>
                : <>Saldo insuficiente para<br />este bono.</>}
            </p>
            <span className={`mt-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] ${
              balanceOk ? 'bg-nes-onyx text-nes-cream' : 'bg-white/10 text-white/60'
            }`}>
              SALDO: {fmt(MOCK_BALANCE)}
            </span>
          </button>
        </div>
      )}

      <BrandFooter />
    </div>
  );
};

export default CoffeeBundlePayScreen;
