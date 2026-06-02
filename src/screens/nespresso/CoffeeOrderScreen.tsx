import { useApp } from '@/context/AppContext';
import { Coffee, Calendar, ChevronRight, Gift } from 'lucide-react';
import { NespressoLogo, BrandFooter } from '@/components/NespressoBrand';
import coffeeBg from '@/assets/nespresso-coffee-bg.jpg';

const CoffeeOrderScreen = () => {
  const { navigate, setOrderType, setBundleType } = useApp();

  const choosePuntual = () => {
    setOrderType('puntual');
    setBundleType(null);
    navigate('coffee_pay_choice');
  };
  const chooseWeek = () => {
    setOrderType('bono_semanal');
    setBundleType('week');
    navigate('coffee_bundle_summary');
  };
  const chooseMonth = () => {
    setOrderType('bono_mensual');
    setBundleType('month');
    navigate('coffee_bundle_summary');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee">
      <img src={coffeeBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Header */}
      <div className="relative z-10 pt-2 px-3 flex items-start justify-between">
        <div className="w-[60px]" />
        <div className="text-center">
          <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
          <p className="mt-1 text-[8px] tracking-[0.3em] text-nes-gold-text font-semibold">TU PEDIDO</p>
          <h1 className="font-serif-nes text-[18px] text-white tracking-[0.08em] leading-none">ESPRESSO NESPRESSO</h1>
          <div className="mx-auto my-0.5 h-px w-10 bg-nes-gold-text/60" />
          <p className="text-[10px] text-white/90">
            Importe: <span className="font-serif-nes text-sm font-semibold">1,50 €</span>
          </p>
          <p className="text-[9px] italic text-nes-gold-text mt-0.5">Elige cómo quieres pagarlo</p>
        </div>
        <div className="flex items-center gap-1 bg-black/60 border border-nes-gold-text/30 rounded-md px-1.5 py-1">
          <Gift className="w-3 h-3 text-nes-gold-text" />
          <div className="leading-tight">
            <p className="text-[7px] tracking-[0.18em] text-nes-gold-text font-semibold">ACUMULA</p>
            <p className="text-[7px] tracking-[0.18em] text-white/85">VENTAJAS</p>
          </div>
        </div>
      </div>

      {/* 3 cards */}
      <div className="relative z-10 px-3 mt-2 grid grid-cols-3 gap-2 pb-8">
        {/* Card 1 */}
        <button
          onClick={choosePuntual}
          className="relative rounded-xl bg-nes-cream text-nes-onyx p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-inner mt-0.5">
            <Coffee className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">
            PAGAR<br />ESTE CAFÉ
          </h3>
          <p className="text-[9px] text-nes-onyx/75 mt-1 leading-snug">
            Paga solo este café<br />de forma puntual.
          </p>
          <div className="my-1 h-px w-6 bg-nes-onyx/30" />
          <span className="mt-auto inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[9px] font-semibold tracking-[0.15em]">
            PAGAR AHORA <ChevronRight className="w-3 h-3" />
          </span>
        </button>

        {/* Card 2 */}
        <button
          onClick={chooseWeek}
          className="relative rounded-xl bg-nes-sand text-nes-onyx p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">5</span>
            <span className="text-[6px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-nes-cream flex items-center justify-center shadow-inner mt-0.5">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">BONO SEMANAL</h3>
          <p className="text-[10px] mt-1 leading-snug">
            Paga <strong>4</strong> cafés<br />y recibe <strong>5</strong>.
          </p>
          <div className="my-1 h-px w-6 bg-nes-onyx/30" />
          <p className="text-[8px] italic text-nes-onyx/70 leading-tight">Ideal para tu café<br />diario de la semana.</p>
          <span className="mt-1.5 inline-flex items-center gap-1 bg-[hsl(32_30%_38%)] text-nes-cream rounded-full px-2.5 py-1 text-[8px] font-semibold tracking-[0.12em]">
            COMPRAR BONO SEMANAL <ChevronRight className="w-3 h-3" />
          </span>
        </button>

        {/* Card 3 */}
        <button
          onClick={chooseMonth}
          className="relative rounded-xl bg-nes-gold text-nes-cream p-2.5 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">20</span>
            <span className="text-[6px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-nes-cream flex items-center justify-center shadow-inner mt-0.5">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[13px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">BONO MENSUAL</h3>
          <p className="text-[10px] mt-1 leading-snug">
            Paga <strong>15</strong> cafés<br />y recibe <strong>20</strong>.
          </p>
          <div className="my-1 h-px w-6 bg-nes-cream/40" />
          <p className="text-[8px] italic text-nes-cream/80 leading-tight">Asegúrate tus cafés<br />del mes y ahorra más.</p>
          <span className="mt-1.5 inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-1 text-[8px] font-semibold tracking-[0.12em]">
            COMPRAR BONO MENSUAL <ChevronRight className="w-3 h-3" />
          </span>
        </button>
      </div>

      <BrandFooter />
    </div>
  );
};

export default CoffeeOrderScreen;
