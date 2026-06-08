import { useApp, CURRENT_COFFEE_NAME, COFFEE_PRICE } from '@/context/AppContext';
import { Coffee, Calendar } from 'lucide-react';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeOrderScreen = () => {
  const { navigate, setOrderType, setBundleType } = useApp();

  const choose = (kind: 'puntual' | 'week' | 'month') => () => {
    if (kind === 'puntual') { setOrderType('puntual'); setBundleType(null); }
    if (kind === 'week')    { setOrderType('bono_semanal'); setBundleType('week'); }
    if (kind === 'month')   { setOrderType('bono_mensual'); setBundleType('month'); }
    navigate('coffee_payment_method');
  };

  type Card = {
    onClick: () => void;
    bg: string;
    icon: React.ReactNode;
    badge?: { n: string; label: string };
    title: string;
    desc: React.ReactNode;
    cta: string;
  };

  const cards: Card[] = [
    {
      onClick: choose('puntual'),
      bg: 'bg-nes-blue-light',
      icon: <Coffee className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      title: 'PAGAR ESTE CAFÉ',
      desc: <>Paga solo este café de forma puntual.</>,
      cta: 'PAGAR AHORA',
    },
    {
      onClick: choose('week'),
      bg: 'bg-nes-blue-mid',
      icon: <Calendar className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      badge: { n: '5', label: 'CAFÉS' },
      title: 'BONO SEMANAL',
      desc: <>Paga <strong>4</strong> cafés y recibe <strong>5</strong>.</>,
      cta: 'TOCA PARA COMPRAR',
    },
    {
      onClick: choose('month'),
      bg: 'bg-nes-blue-dark',
      icon: <Calendar className="w-5 h-5 text-nes-blue-dark" strokeWidth={1.7} />,
      badge: { n: '20', label: 'CAFÉS' },
      title: 'BONO MENSUAL',
      desc: <>Paga <strong>15</strong> cafés y recibe <strong>20</strong>.</>,
      cta: 'TOCA PARA COMPRAR',
    },
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />

      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[15px] !tracking-[0.32em]" />
      </div>

      <div className="relative z-10 text-center mt-2 px-4">
        <p className="font-serif-nes text-nes-gold-text text-[26px] leading-tight">
          {CURRENT_COFFEE_NAME} · <span className="font-semibold">{fmt(COFFEE_PRICE)}</span>
        </p>
      </div>

      <p className="relative z-10 text-center text-white text-[11px] tracking-[0.2em] mt-3 mb-2">
        ELIGE TU OPCIÓN
      </p>

      <div className="relative z-10 px-3 pb-3 flex flex-col gap-2 flex-1">
        {cards.map((c, idx) => (
          <button
            key={idx}
            onClick={c.onClick}
            className={`relative rounded-xl ${c.bg} text-nes-cream p-3 flex flex-col items-center justify-between active:scale-[0.98] transition-transform shadow-lg flex-1`}
          >
            {c.badge && (
              <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
                <span className="font-serif-nes text-sm leading-none font-bold">{c.badge.n}</span>
                <span className="text-[7px] tracking-[0.15em]">{c.badge.label}</span>
              </div>
            )}

            <div className="w-11 h-11 rounded-full bg-nes-cream flex items-center justify-center shadow-inner shrink-0">
              {c.icon}
            </div>

            <div className="text-center px-2">
              <h3 className="font-serif-nes text-[15px] font-semibold tracking-[0.12em] leading-tight">
                {c.title}
              </h3>
              <p className="text-[11px] leading-snug opacity-90 mt-0.5">{c.desc}</p>
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

export default CoffeeOrderScreen;
