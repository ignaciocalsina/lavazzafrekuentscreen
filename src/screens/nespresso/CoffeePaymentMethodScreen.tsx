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
    orderType === 'bono_semanal' ? 'Bono semanal · 5 cafés' :
    orderType === 'bono_mensual' ? 'Bono mensual · 20 cafés' :
    orderType === 'suscripcion'  ? 'Plan Desayuno y Sobremesa' :
    'Cappuccino';

  const pick = (m: PaymentMethod) => () => {
    setPaymentMethod(m);
    if (m === 'normal') navigate('coffee_normal_pay');
    else if (m === 'balance') navigate('coffee_balance_summary');
    else navigate('coffee_coupon_pay');
  };

  type Card = { key: PaymentMethod; bg: string; icon: React.ReactNode; title: string; desc: React.ReactNode; cta: string };
  const cards: Card[] = [
    {
      key: 'normal',
      bg: 'bg-nes-cream text-nes-onyx',
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />,
      title: 'PAGO NORMAL',
      desc: <>Tarjeta, Apple Pay<br />o Google Pay.</>,
      cta: 'CONTINUAR',
    },
    ...(isBundle ? [] : [{
      key: 'coupon' as PaymentMethod,
      bg: 'bg-nes-sand text-nes-onyx',
      icon: <Ticket className="w-5 h-5" strokeWidth={1.5} />,
      title: 'CUPONES',
      desc: <>Canjea un café<br />de tu cupón activo.</>,
      cta: 'CANJEAR',
    }]),
    {
      key: 'balance',
      bg: 'bg-nes-gold text-nes-cream',
      icon: <Wallet className="w-5 h-5" strokeWidth={1.5} />,
      title: 'SALDO',
      desc: <>Usa tu saldo y<br />acumula ventajas.</>,
      cta: 'CONTINUAR',
    },
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate(purchaseFlow ? 'ad' : 'coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      {/* Header: aprovecha el espacio vertical superior */}
      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
        <p className="mt-2 font-serif-nes text-nes-gold-text text-[26px] leading-none">
          {captionLine}
        </p>
        <p className="mt-1 text-white/85 font-serif-nes text-[18px] leading-tight">
          Importe <span className="font-semibold">{fmt(amount)}</span>
        </p>
      </div>

      {/* Título de sección, justo encima de los bloques */}
      <p className="relative z-10 text-center text-white text-[13px] tracking-[0.15em] mt-auto mb-2">
        SELECCIONA TU MÉTODO DE PAGO
      </p>

      <div className="relative z-10 px-3 pb-3">
        <div className={`grid gap-2 h-[160px] ${isBundle ? 'grid-cols-2 w-[80%] mx-auto' : 'grid-cols-3'}`}>
          {cards.map((c) => (
            <button
              key={c.key}
              onClick={pick(c.key)}
              className={`rounded-xl ${c.bg} p-3 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg`}
            >
              <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-inner text-nes-onyx">
                {c.icon}
              </div>
              <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5">{c.title}</h3>
              <p className="text-[10px] mt-1 leading-snug">{c.desc}</p>
              <span className="mt-2 inline-flex items-center bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.15em]">
                {c.cta}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeePaymentMethodScreen;
