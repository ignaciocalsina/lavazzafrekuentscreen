import { useApp, PaymentMethod } from '@/context/AppContext';
import { CreditCard, Ticket, Wallet, ArrowLeft } from 'lucide-react';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeePaymentMethodScreen = () => {
  const { navigate, setPaymentMethod, orderType, getOrderAmount, purchaseFlow } = useApp();
  const amount = getOrderAmount();
  const isBundle =
    orderType === 'bono_semanal' || orderType === 'bono_mensual' || orderType === 'suscripcion';

  const captionLine =
    orderType === 'bono_semanal' ? `Bono semanal · 5 cafés · ${fmt(amount)}` :
    orderType === 'bono_mensual' ? `Bono mensual · 20 cafés · ${fmt(amount)}` :
    orderType === 'suscripcion'  ? `Plan Desayuno y Sobremesa · ${fmt(amount)} / mes` :
    `Cappuccino · ${fmt(amount)}`;

  const pick = (m: PaymentMethod) => () => {
    setPaymentMethod(m);
    if (m === 'normal') navigate('coffee_normal_pay');
    else if (m === 'balance') navigate('coffee_balance_summary');
    else navigate('coffee_coupon_pay');
  };

  type Card = { key: PaymentMethod; icon: React.ReactNode; title: string; desc: React.ReactNode; cta: string };
  const baseCards: Card[] = [
    {
      key: 'normal',
      icon: <CreditCard className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      title: 'PAGO NORMAL',
      desc: <>Tarjeta, Apple Pay o Google Pay.</>,
      cta: 'CONTINUAR',
    },
    ...(isBundle ? [] : [{
      key: 'coupon' as PaymentMethod,
      icon: <Ticket className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      title: 'CUPONES',
      desc: <>Canjea un café de tu cupón activo.</>,
      cta: 'CANJEAR',
    }]),
    {
      key: 'balance',
      icon: <Wallet className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      title: 'SALDO',
      desc: <>Usa tu saldo y acumula ventajas.</>,
      cta: 'CONTINUAR',
    },
  ];

  // Gradación azul light → mid → dark según número de tarjetas
  const bgFor = (i: number, total: number) => {
    if (total === 2) return i === 0 ? 'bg-nes-blue-light' : 'bg-nes-blue-dark';
    return ['bg-nes-blue-light', 'bg-nes-blue-mid', 'bg-nes-blue-dark'][i];
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate(purchaseFlow ? 'ad' : 'coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[15px] !tracking-[0.32em]" />
      </div>

      <div className="relative z-10 text-center mt-2 px-4">
        <p className="font-serif-nes text-nes-gold-text text-[22px] leading-tight">
          {captionLine}
        </p>
      </div>

      <p className="relative z-10 text-center text-white text-[11px] tracking-[0.2em] mt-3 mb-2">
        SELECCIONA TU MÉTODO DE PAGO
      </p>

      <div className="relative z-10 px-3 pb-3 flex flex-col gap-2 flex-1">
        {baseCards.map((c, i) => (
          <button
            key={c.key}
            onClick={pick(c.key)}
            className={`rounded-xl ${bgFor(i, baseCards.length)} text-nes-cream p-3 flex flex-col items-center justify-between active:scale-[0.98] transition-transform shadow-lg flex-1`}
          >
            <div className="w-11 h-11 rounded-full bg-nes-cream flex items-center justify-center shadow-inner shrink-0">
              {c.icon}
            </div>
            <div className="text-center px-2">
              <h3 className="font-serif-nes text-[15px] font-semibold tracking-[0.12em] leading-tight">{c.title}</h3>
              <p className="text-[11px] mt-0.5 leading-snug opacity-90">{c.desc}</p>
            </div>
            <span className="inline-flex items-center bg-nes-cream text-nes-blue-dark rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em]">
              {c.cta}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoffeePaymentMethodScreen;
