import { useApp } from '@/context/AppContext';
import { Coffee, Calendar, ChevronRight, Gift, Hand } from 'lucide-react';
import { NespressoLogo } from '@/components/NespressoBrand';
import bg1 from '@/assets/nespresso-ad-1.jpg';
import bg2 from '@/assets/nespresso-ad-4.jpg';
import bg3 from '@/assets/nespresso-ad-5.jpg';

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
    navigate('coffee_bundle_pay');
  };
  const chooseMonth = () => {
    setOrderType('bono_mensual');
    setBundleType('month');
    navigate('coffee_bundle_pay');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee">
      {/* Triptych background */}
      <div className="absolute inset-0 grid grid-cols-3 opacity-35">
        <img src={bg1} alt="" className="w-full h-full object-cover" />
        <img src={bg2} alt="" className="w-full h-full object-cover" />
        <img src={bg3} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />

      {/* Header */}
      <div className="relative z-10 pt-2 px-3 flex items-start justify-between">
        <div className="w-[60px]" />
        <div className="text-center">
          <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
          <p className="mt-1 text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold">TU PEDIDO</p>
          <p className="text-[11px] text-white/90 mt-0.5">
            Importe: <span className="font-serif-nes text-base font-semibold">1,50 €</span>
          </p>
          <p className="text-[10px] italic text-nes-gold-text mt-0.5">Elige cómo quieres pagarlo</p>
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
      <div className="relative z-10 px-3 mt-2 grid grid-cols-3 gap-2 h-[245px]">
        {/* Card 1 */}
        <button
          onClick={choosePuntual}
          className="relative rounded-xl bg-nes-cream text-nes-onyx p-3 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner mt-0.5">
            <Coffee className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[16px] font-semibold tracking-[0.1em] mt-2 leading-tight">
            PAGAR<br />ESTE CAFÉ
          </h3>
          <p className="text-[11px] text-nes-onyx/75 mt-1.5 leading-snug">
            Paga solo este café<br />de forma puntual.
          </p>
          <div className="my-1.5 h-px w-6 bg-nes-onyx/30" />
          <span className="mt-auto inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.15em]">
            PAGAR AHORA <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Card 2 */}
        <button
          onClick={chooseWeek}
          className="relative rounded-xl bg-nes-sand text-nes-onyx p-3 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-10 h-10 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-base leading-none font-bold">5</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-nes-cream flex items-center justify-center shadow-inner mt-0.5">
            <Calendar className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[16px] font-semibold tracking-[0.1em] mt-2 leading-tight">BONO SEMANAL</h3>
          <p className="text-[12px] mt-1.5 leading-snug">
            Paga <strong>4</strong> cafés<br />y recibe <strong>5</strong>.
          </p>
          <div className="my-1.5 h-px w-6 bg-nes-onyx/30" />
          <span className="mt-auto inline-flex items-center gap-1.5 bg-nes-onyx text-nes-cream rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3.5 h-3.5" /> TOCA PARA COMPRAR
          </span>
        </button>

        {/* Card 3 */}
        <button
          onClick={chooseMonth}
          className="relative rounded-xl bg-nes-gold text-nes-cream p-3 flex flex-col items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-10 h-10 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-base leading-none font-bold">20</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-nes-cream flex items-center justify-center shadow-inner mt-0.5">
            <Calendar className="w-6 h-6 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[16px] font-semibold tracking-[0.1em] mt-2 leading-tight">BONO MENSUAL</h3>
          <p className="text-[12px] mt-1.5 leading-snug">
            Paga <strong>15</strong> cafés<br />y recibe <strong>20</strong>.
          </p>
          <div className="my-1.5 h-px w-6 bg-nes-cream/40" />
          <span className="mt-auto inline-flex items-center gap-1.5 bg-nes-onyx text-nes-cream rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3.5 h-3.5" /> TOCA PARA COMPRAR
          </span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeOrderScreen;
