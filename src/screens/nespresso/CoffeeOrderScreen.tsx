import { useApp, CURRENT_COFFEE_NAME, COFFEE_PRICE } from '@/context/AppContext';
import { Coffee, Calendar, ChevronRight } from 'lucide-react';
import { SecureFooter } from '@/components/NespressoBrand';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

type Card = {
  onClick: () => void;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  badge?: { n: string; label: string };
  title: string;
  desc: React.ReactNode;
};

const CoffeeOrderScreen = () => {
  const { navigate, setOrderType, setBundleType } = useApp();

  const choose = (kind: 'puntual' | 'week' | 'month') => () => {
    if (kind === 'puntual') { setOrderType('puntual'); setBundleType(null); }
    if (kind === 'week')    { setOrderType('bono_semanal'); setBundleType('week'); }
    if (kind === 'month')   { setOrderType('bono_mensual'); setBundleType('month'); }
    navigate('coffee_payment_method');
  };

  const cards: Card[] = [
    {
      onClick: choose('puntual'),
      iconBg: 'bg-nes-cream',
      iconColor: 'text-nes-blue-dark',
      icon: <Coffee className="w-5 h-5" strokeWidth={1.7} />,
      title: 'Pagar este café',
      desc: <>Paga solo este café<br />de forma puntual.</>,
    },
    {
      onClick: choose('week'),
      iconBg: 'bg-nes-blue-dark',
      iconColor: 'text-nes-cream',
      icon: <Calendar className="w-5 h-5" strokeWidth={1.7} />,
      badge: { n: '5', label: 'CAFÉS' },
      title: 'Bono semanal',
      desc: <>Paga 4 cafés y recibe 5.</>,
    },
    {
      onClick: choose('month'),
      iconBg: 'bg-nes-blue-dark',
      iconColor: 'text-nes-cream',
      icon: <Calendar className="w-5 h-5" strokeWidth={1.7} />,
      badge: { n: '20', label: 'CAFÉS' },
      title: 'Bono mensual',
      desc: <>Paga 15 cafés y recibe 20.</>,
    },
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />

      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[15px] !tracking-[0.32em]" />
      </div>

      <div className="relative z-10 text-center mt-3 px-4">
        <p className="font-serif-nes text-nes-cream text-[31px] leading-none">{CURRENT_COFFEE_NAME}</p>
        <p className="font-serif-nes text-nes-blue-light text-[24px] mt-1">{fmt(COFFEE_PRICE)}</p>
      </div>

      <div className="relative z-10 mx-6 mt-3 border-t border-white/15" />
      <p className="relative z-10 text-center text-white text-[12px] tracking-[0.3em] mt-2 mb-3">
        ELIGE TU OPCIÓN
      </p>

      <div className="relative z-10 px-4 flex flex-col gap-2.5 flex-1 justify-center pb-2">
        {cards.map((c, idx) => (
          <button
            key={idx}
            onClick={c.onClick}
            className="group relative rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md px-3 h-[110px] flex items-center gap-3 active:scale-[0.98] transition-transform shadow-lg"
          >
            <div className={`w-11 h-11 rounded-full ${c.iconBg} ${c.iconColor} flex items-center justify-center shrink-0 shadow-inner`}>
              {c.icon}
            </div>

            <div className="flex-1 text-left min-w-0">
              <h3 className="font-serif-nes text-nes-cream text-[24px] leading-tight">{c.title}</h3>
              <p className="text-white/65 text-[15px] leading-snug mt-0.5">{c.desc}</p>
            </div>

            {c.badge && (
              <div className="w-10 h-10 rounded-full bg-nes-blue-dark text-nes-cream flex flex-col items-center justify-center shrink-0 border border-white/20">
                <span className="font-serif-nes text-[13px] leading-none font-semibold">{c.badge.n}</span>
                <span className="text-[6.5px] tracking-[0.15em] mt-0.5">{c.badge.label}</span>
              </div>
            )}

            <ChevronRight className="w-4 h-4 text-white/55 shrink-0" />
          </button>
        ))}
      </div>

      <SecureFooter className="relative z-10 pb-3 pt-2" />
    </div>
  );
};

export default CoffeeOrderScreen;
