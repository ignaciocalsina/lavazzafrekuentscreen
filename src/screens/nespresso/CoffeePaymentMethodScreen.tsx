import { useApp, PaymentMethod } from '@/context/AppContext';
import { CreditCard, Ticket, Wallet, ArrowLeft, ChevronRight } from 'lucide-react';
import { FlowBackground, NespressoLogo, SecureFooter } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeePaymentMethodScreen = () => {
  const { navigate, setPaymentMethod, orderType, getOrderAmount, purchaseFlow } = useApp();
  const amount = getOrderAmount();
  const isBundle =
    orderType === 'bono_semanal' || orderType === 'bono_mensual' || orderType === 'suscripcion';

  const title =
    orderType === 'bono_semanal' ? 'Bono semanal' :
    orderType === 'bono_mensual' ? 'Bono mensual' :
    orderType === 'suscripcion'  ? 'Plan Desayuno' :
    'Cappuccino';

  const subtitle =
    orderType === 'bono_semanal' ? '5 cafés' :
    orderType === 'bono_mensual' ? '20 cafés' :
    orderType === 'suscripcion'  ? 'Mensual' :
    null;

  const pick = (m: PaymentMethod) => () => {
    setPaymentMethod(m);
    if (m === 'normal') navigate('coffee_normal_pay');
    else if (m === 'balance') navigate('coffee_balance_summary');
    else navigate('coffee_coupon_pay');
  };

  type Card = {
    key: PaymentMethod;
    iconBg: string;
    iconColor: string;
    icon: React.ReactNode;
    title: string;
    desc: React.ReactNode;
  };

  const cards: Card[] = [
    {
      key: 'normal',
      iconBg: 'bg-nes-cream',
      iconColor: 'text-nes-blue-dark',
      icon: <CreditCard className="w-5 h-5" strokeWidth={1.7} />,
      title: 'Pago normal',
      desc: <>Tarjeta, Apple Pay o Google Pay.</>,
    },
    ...(isBundle ? [] : [{
      key: 'coupon' as PaymentMethod,
      iconBg: 'bg-nes-blue-dark',
      iconColor: 'text-nes-cream',
      icon: <Ticket className="w-5 h-5" strokeWidth={1.7} />,
      title: 'Cupones',
      desc: <>Canjea un café de tu cupón activo.</>,
    }]),
    {
      key: 'balance',
      iconBg: 'bg-nes-blue-dark',
      iconColor: 'text-nes-cream',
      icon: <Wallet className="w-5 h-5" strokeWidth={1.7} />,
      title: 'Saldo',
      desc: <>Usa tu saldo y acumula ventajas.</>,
    },
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate(purchaseFlow ? 'ad' : 'coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[15px] !tracking-[0.32em]" />
      </div>

      <div className="relative z-10 text-center mt-3 px-4">
        <p className="font-serif-nes text-nes-cream text-[31px] leading-none">{title}</p>
        <p className="font-serif-nes text-nes-blue-light text-[24px] mt-1">
          {subtitle ? `${subtitle} · ${fmt(amount)}` : fmt(amount)}
        </p>
      </div>

      <div className="relative z-10 mx-6 mt-3 border-t border-white/15" />
      <p className="relative z-10 text-center text-white text-[12px] tracking-[0.3em] mt-2 mb-3">
        ELIGE CÓMO PAGAR
      </p>

      <div className="relative z-10 px-4 flex flex-col gap-2.5 flex-1 justify-center pb-2">
        {cards.map((c) => (
          <button
            key={c.key}
            onClick={pick(c.key)}
            className="relative rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md px-3 h-[110px] flex items-center gap-3 active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className={`w-11 h-11 rounded-full ${c.iconBg} ${c.iconColor} flex items-center justify-center shrink-0 shadow-inner`}>
              {c.icon}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-serif-nes text-nes-cream text-[24px] leading-tight">{c.title}</h3>
              <p className="text-white/65 text-[15px] leading-snug mt-0.5">{c.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/55 shrink-0" />
          </button>
        ))}
      </div>

      <SecureFooter className="relative z-10 pb-3 pt-2" />
    </div>
  );
};

export default CoffeePaymentMethodScreen;
