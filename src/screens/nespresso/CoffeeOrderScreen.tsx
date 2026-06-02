import { useApp } from '@/context/AppContext';
import { Coffee, Calendar, ChevronRight, Hand } from 'lucide-react';
import { KioskHeader } from '@/components/NespressoBrand';
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
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      {/* Triptych background */}
      <div className="absolute inset-0 grid grid-cols-3 opacity-35">
        <img src={bg1} alt="" className="w-full h-full object-cover" />
        <img src={bg2} alt="" className="w-full h-full object-cover" />
        <img src={bg3} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />

      {/* Header */}
      <div className="relative z-10">
        <KioskHeader caption={<>Importe: <span className="text-[16px] font-semibold">1,50 €</span></>} />
      </div>

      {/* 3 cards: 25% más bajas, contenido anclado abajo */}
      <div className="relative z-10 px-3 mt-auto pb-3 grid grid-cols-3 gap-2 h-[184px]">
        {/* Card 1 */}
        <button
          onClick={choosePuntual}
          className="relative rounded-xl bg-nes-cream text-nes-onyx p-2.5 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
            <Coffee className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">
            PAGAR ESTE CAFÉ
          </h3>
          <p className="text-[10px] text-nes-onyx/75 mt-1 leading-snug">
            Paga solo este café<br />de forma puntual.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em]">
            PAGAR AHORA <ChevronRight className="w-3 h-3" />
          </span>
        </button>

        {/* Card 2 */}
        <button
          onClick={chooseWeek}
          className="relative rounded-xl bg-nes-sand text-nes-onyx p-2.5 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">5</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-nes-cream flex items-center justify-center shadow-inner">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">BONO SEMANAL</h3>
          <p className="text-[11px] mt-1 leading-snug">
            Paga <strong>4</strong> cafés y recibe <strong>5</strong>.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3 h-3" /> TOCA PARA COMPRAR
          </span>
        </button>

        {/* Card 3 */}
        <button
          onClick={chooseMonth}
          className="relative rounded-xl bg-nes-gold text-nes-cream p-2.5 flex flex-col items-center text-center justify-end active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">20</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-nes-cream flex items-center justify-center shadow-inner">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] mt-1.5 leading-tight">BONO MENSUAL</h3>
          <p className="text-[11px] mt-1 leading-snug">
            Paga <strong>15</strong> cafés y recibe <strong>20</strong>.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3 h-3" /> TOCA PARA COMPRAR
          </span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeOrderScreen;
