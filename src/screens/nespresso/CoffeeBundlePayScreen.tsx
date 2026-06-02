import { useApp, BONO_WEEK_PRICE, BONO_MONTH_PRICE, BONO_WEEK_COFFEES, BONO_MONTH_COFFEES, MOCK_BALANCE } from '@/context/AppContext';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';
import { NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeBundlePayScreen = () => {
  const { navigate, setPaymentMethod, bundleType, mockState } = useApp();
  const isWeek = bundleType === 'week';
  const total = isWeek ? BONO_WEEK_PRICE : BONO_MONTH_PRICE;
  const coffees = isWeek ? BONO_WEEK_COFFEES : BONO_MONTH_COFFEES;
  const balanceOk = mockState === 'balance' && MOCK_BALANCE >= total;

  const pay = (m: 'card' | 'balance') => {
    setPaymentMethod(m);
    if (m === 'card') navigate('coffee_card_pay');
    else navigate('coffee_processing');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">
          {isWeek ? 'BONO SEMANAL' : 'BONO MENSUAL'}
        </p>
      </div>

      {/* Compact summary band */}
      <div className="mx-4 mt-2 rounded-lg border border-nes-gold-text/25 bg-black/40 px-3 py-2 flex items-center justify-between">
        <div className="text-left">
          <p className="font-serif-nes text-white text-[15px] leading-tight">{coffees} cafés Nespresso</p>
          <p className="text-[10px] text-nes-gold-text">
            {isWeek ? 'Paga 4, llévate 5 esta semana.' : 'Paga 15, llévate 20 este mes.'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] tracking-[0.25em] text-white/60">TOTAL</p>
          <p className="font-serif-nes text-white text-xl leading-none">{fmt(total)}</p>
        </div>
      </div>

      <p className="text-center text-[10px] italic text-nes-gold-text mt-2">Elige cómo quieres pagarlo</p>

      <div className="flex-1 grid grid-cols-2 gap-3 px-4 pb-3 mt-2">
        <button
          onClick={() => pay('card')}
          className="rounded-xl bg-nes-cream text-nes-onyx px-3 py-2 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform shadow"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] leading-tight">PAGAR CON TARJETA</h3>
            <p className="text-[11px] mt-0.5 leading-snug">Tarjeta, Apple Pay o Google Pay.</p>
            <span className="inline-flex items-center mt-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em]">
              {fmt(total)}
            </span>
          </div>
        </button>

        <button
          onClick={() => balanceOk && pay('balance')}
          disabled={!balanceOk}
          className={`rounded-xl px-3 py-2 flex items-center gap-2.5 text-left transition-transform shadow ${
            balanceOk ? 'bg-nes-gold text-nes-cream active:scale-[0.98]' : 'bg-nes-cream/15 text-nes-cream/50'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${balanceOk ? 'bg-nes-cream' : 'bg-white/10'}`}>
            <Wallet className={`w-5 h-5 ${balanceOk ? 'text-nes-onyx' : ''}`} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] leading-tight">PAGAR CON SALDO</h3>
            <p className="text-[11px] mt-0.5 leading-snug">
              {balanceOk ? 'Usa el saldo de tu cuenta Nespresso.' : 'Saldo insuficiente para este bono.'}
            </p>
            <span className={`inline-flex items-center mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] ${
              balanceOk ? 'bg-nes-onyx text-nes-cream' : 'bg-white/10 text-white/60'
            }`}>
              SALDO {fmt(MOCK_BALANCE)}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CoffeeBundlePayScreen;
