import { useApp, BONO_WEEK_PRICE, BONO_MONTH_PRICE, BONO_WEEK_COFFEES, BONO_MONTH_COFFEES } from '@/context/AppContext';
import { Check, ArrowLeft, ChevronRight } from 'lucide-react';
import { BrandFooter, NespressoLogo } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const CoffeeBundleSummaryScreen = () => {
  const { navigate, bundleType } = useApp();
  const isWeek = bundleType === 'week';
  const total = isWeek ? BONO_WEEK_PRICE : BONO_MONTH_PRICE;
  const count = isWeek ? BONO_WEEK_COFFEES : BONO_MONTH_COFFEES;
  const paid = isWeek ? 4 : 15;

  const features = [
    `${count} cafés disponibles`,
    isWeek ? 'Válido durante la semana' : 'Válido durante el mes',
    'Asociado a tu cuenta Nespresso',
    'El primer café se descuenta tras la compra',
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={() => navigate('coffee_order')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2 pb-1">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">
          {isWeek ? 'BONO SEMANAL' : 'BONO MENSUAL'}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 px-4 pb-9">
        <div className={`rounded-xl ${isWeek ? 'bg-nes-sand' : 'bg-nes-gold'} ${isWeek ? 'text-nes-onyx' : 'text-nes-cream'} p-3 flex flex-col items-center text-center shadow`}>
          <h2 className="font-serif-nes text-base font-semibold tracking-[0.1em]">
            {isWeek ? 'BONO SEMANAL' : 'BONO MENSUAL'}
          </h2>
          <p className="font-serif-nes text-2xl mt-1">
            Paga <strong>{paid}</strong> y recibe <strong>{count}</strong>
          </p>
          <p className="text-[10px] italic mt-1.5 opacity-90">
            Tu café actual queda incluido en este bono.
          </p>
          <div className="mt-auto pt-2">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-80">Total</p>
            <p className="font-serif-nes text-3xl font-semibold tabular-nums">{fmt(total)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-1.5 text-white/90 text-[10px] leading-snug">
              <Check className="w-3 h-3 text-nes-gold-text shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>{f}</span>
            </div>
          ))}
          <button
            onClick={() => navigate('coffee_identify')}
            className="mt-auto inline-flex items-center justify-center gap-1 bg-nes-cream text-nes-onyx rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.18em] active:scale-95 transition-transform"
          >
            CONTINUAR <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <BrandFooter />
    </div>
  );
};

export default CoffeeBundleSummaryScreen;
