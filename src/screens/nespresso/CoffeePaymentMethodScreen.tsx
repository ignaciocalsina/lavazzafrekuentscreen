import { useApp, PaymentMethod } from '@/context/AppContext';
import { CreditCard, Ticket, ArrowLeft } from 'lucide-react';
import { FlowBackground, KioskHeader, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeePaymentMethodScreen = () => {
  const { navigate, setPaymentMethod, orderType, getOrderAmount } = useApp();
  const amount = getOrderAmount();

  const caption =
    orderType === 'bono_semanal' ? <>Bono semanal · 5 cafés · <span className="font-semibold">{fmt(amount)}</span></> :
    orderType === 'bono_mensual' ? <>Bono mensual · 20 cafés · <span className="font-semibold">{fmt(amount)}</span></> :
    <>Importe: <span className="font-semibold">{fmt(amount)}</span></>;

  const pick = (m: PaymentMethod) => () => {
    setPaymentMethod(m);
    if (m === 'normal') navigate('coffee_normal_pay');
    else if (m === 'balance') navigate('coffee_balance_summary');
    else navigate('coffee_coupon_pay');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate('coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10">
        <KioskHeader caption={caption} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 w-[92%] h-[180px]">
          {/* Pago normal */}
          <button
            onClick={pick('normal')}
            className="rounded-xl bg-nes-cream text-nes-onyx p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-inner">
              <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5">PAGO NORMAL</h3>
            <p className="text-[10px] mt-1 leading-snug">
              Tarjeta, Apple Pay<br />o Google Pay.
            </p>
            <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.15em]">
              CONTINUAR
            </span>
          </button>

          {/* Cupones */}
          <button
            onClick={pick('coupon')}
            className="rounded-xl bg-nes-sand text-nes-onyx p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="w-11 h-11 rounded-full bg-nes-cream flex items-center justify-center shadow-inner">
              <Ticket className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5">CUPONES</h3>
            <p className="text-[10px] mt-1 leading-snug">
              Canjea un café<br />de tu cupón activo.
            </p>
            <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.15em]">
              CANJEAR
            </span>
          </button>

          {/* Saldo My Espresso */}
          <button
            onClick={pick('balance')}
            className="rounded-xl bg-nes-gold text-nes-cream p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className="h-11 flex items-center justify-center">
              <NespressoLogo className="!text-[12px] !tracking-[0.28em]" />
            </div>
            <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1">SALDO MY ESPRESSO</h3>
            <p className="text-[10px] mt-1 leading-snug">
              Usa tu saldo y<br />acumula ventajas.
            </p>
            <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.15em]">
              PASE DE FIDELIZACIÓN
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeePaymentMethodScreen;
