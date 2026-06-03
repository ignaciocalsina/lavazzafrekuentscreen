import { useApp, CURRENT_COFFEE_NAME, COFFEE_PRICE } from '@/context/AppContext';
import { Coffee, Calendar, Hand, ChevronRight } from 'lucide-react';
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

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />

      {/* Header idéntico al de CoffeePaymentMethodScreen */}
      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
        <p className="mt-2 font-serif-nes text-nes-gold-text text-[26px] leading-none">
          {CURRENT_COFFEE_NAME}
        </p>
        <p className="mt-1 text-white/85 font-serif-nes text-[18px] leading-tight">
          Importe <span className="font-semibold">{fmt(COFFEE_PRICE)}</span>
        </p>
      </div>

      {/* Título de sección, justo encima de los bloques */}
      <p className="relative z-10 text-center text-white text-[13px] tracking-[0.15em] mt-auto mb-2">
        SELECCIONA TU MÉTODO DE PAGO
      </p>

      <div className="relative z-10 px-3 pb-3 grid grid-cols-3 gap-2 h-[160px]">
        {/* Card 1 */}
        <button
          onClick={choose('puntual')}
          className="relative rounded-xl bg-nes-cream text-nes-onyx p-2.5 grid grid-rows-[40px_22px_36px_1fr] justify-items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
            <Coffee className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] leading-tight self-center">
            PAGAR ESTE CAFÉ
          </h3>
          <p className="text-[10px] text-nes-onyx/75 leading-snug self-start">
            Paga solo este café<br />de forma puntual.
          </p>
          <span className="self-end inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em]">
            PAGAR AHORA <ChevronRight className="w-3 h-3" />
          </span>
        </button>

        {/* Card 2 */}
        <button
          onClick={choose('week')}
          className="relative rounded-xl bg-nes-sand text-nes-onyx p-2.5 grid grid-rows-[40px_22px_36px_1fr] justify-items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">5</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-nes-cream flex items-center justify-center shadow-inner">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] leading-tight self-center">
            BONO SEMANAL
          </h3>
          <p className="text-[11px] leading-snug self-start">
            Paga <strong>4</strong> cafés<br />y recibe <strong>5</strong>.
          </p>
          <span className="self-end inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3 h-3" /> TOCA PARA COMPRAR
          </span>
        </button>

        {/* Card 3 */}
        <button
          onClick={choose('month')}
          className="relative rounded-xl bg-nes-gold text-nes-cream p-2.5 grid grid-rows-[40px_22px_36px_1fr] justify-items-center text-center active:scale-[0.98] transition-transform shadow-lg"
        >
          <div className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-nes-onyx text-nes-cream flex flex-col items-center justify-center">
            <span className="font-serif-nes text-sm leading-none font-bold">20</span>
            <span className="text-[7px] tracking-[0.15em]">CAFÉS</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-nes-cream flex items-center justify-center shadow-inner">
            <Calendar className="w-5 h-5 text-nes-onyx" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif-nes text-[14px] font-semibold tracking-[0.1em] leading-tight self-center">
            BONO MENSUAL
          </h3>
          <p className="text-[11px] leading-snug self-start">
            Paga <strong>15</strong> cafés<br />y recibe <strong>20</strong>.
          </p>
          <span className="self-end inline-flex items-center gap-1 bg-nes-onyx text-nes-cream rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] animate-pulse">
            <Hand className="w-3 h-3" /> TOCA PARA COMPRAR
          </span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeOrderScreen;
