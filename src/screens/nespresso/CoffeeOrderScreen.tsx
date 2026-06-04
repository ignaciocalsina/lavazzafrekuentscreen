import { useApp, CURRENT_COFFEE_NAME, COFFEE_PRICE } from '@/context/AppContext';
import { Coffee, Calendar, ChevronRight } from 'lucide-react';
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
    ctaBg: string;
  };

  const cards: Card[] = [
    {
      onClick: choose('puntual'),
      bg: 'bg-nes-cream text-nes-onyx',
      icon: <Coffee className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />,
      title: 'PAGAR ESTE CAFÉ',
      desc: <>Paga solo este café de forma puntual.</>,
      cta: 'PAGAR AHORA',
      ctaBg: 'bg-nes-onyx text-nes-cream',
    },
    {
      onClick: choose('week'),
      bg: 'bg-nes-sand text-nes-onyx',
      icon: <Calendar className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />,
      badge: { n: '5', label: 'CAFÉS' },
      title: 'BONO SEMANAL',
      desc: <>Paga <strong>4</strong> cafés y recibe <strong>5</strong>.</>,
      cta: 'TOCA PARA COMPRAR',
      ctaBg: 'bg-nes-onyx text-nes-cream',
    },
    {
      onClick: choose('month'),
      bg: 'bg-nes-gold text-nes-cream',
      icon: <Calendar className="w-6 h-6 text-nes-cream" strokeWidth={1.5} />,
      badge: { n: '20', label: 'CAFÉS' },
      title: 'BONO MENSUAL',
      desc: <>Paga <strong>15</strong> cafés y recibe <strong>20</strong>.</>,
      cta: 'TOCA PARA COMPRAR',
      ctaBg: 'bg-nes-cream text-nes-onyx',
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
            className={`relative rounded-xl ${c.bg} p-3 flex items-center gap-3 active:scale-[0.98] transition-transform shadow-lg flex-1`}
          >
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-inner shrink-0">
              {c.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-serif-nes text-[15px] font-semibold tracking-[0.1em] leading-tight">
                {c.title}
              </h3>
              <p className="text-[11px] leading-snug opacity-85 mt-0.5">{c.desc}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {c.badge && (
                <div className="w-10 h-10 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
                  <span className="font-serif-nes text-sm leading-none font-bold">{c.badge.n}</span>
                  <span className="text-[7px] tracking-[0.15em]">{c.badge.label}</span>
                </div>
              )}
              <span className={`inline-flex items-center gap-1 ${c.ctaBg} rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em]`}>
                {c.cta} <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoffeeOrderScreen;
