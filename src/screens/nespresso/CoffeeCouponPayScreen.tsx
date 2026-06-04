import { useApp, COUPON_INITIAL } from '@/context/AppContext';
import { ArrowLeft, Ticket } from 'lucide-react';
import { FlowBackground, KioskHeader } from '@/components/NespressoBrand';

const CoffeeCouponPayScreen = () => {
  const { navigate, orderType } = useApp();
  const productLabel =
    orderType === 'bono_semanal' ? 'Bono semanal' :
    orderType === 'bono_mensual' ? 'Bono mensual' : 'Café Lavazza';

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate('coffee_payment_method')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10">
        <KioskHeader caption={<>Cupones</>} tagline="Acumulas ventajas con esta operación." />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3 px-8 pb-3">
        <div className="w-[92%] rounded-xl bg-white/8 border border-white/15 p-3 text-white text-[13px] backdrop-blur-sm text-center">
          <Ticket className="w-8 h-8 mx-auto text-nes-gold-text" strokeWidth={1.5} />
          <p className="mt-1 opacity-80 text-[11px] tracking-[0.2em] font-semibold">CUPÓN ACTIVO</p>
          <p className="font-serif-nes text-[26px] text-nes-gold-text leading-none">{COUPON_INITIAL}</p>
          <p className="text-[11px] opacity-75">cafés disponibles · {productLabel}</p>
        </div>

        <button
          onClick={() => navigate('coffee_processing')}
          className="bg-nes-gold text-nes-cream rounded-full px-7 py-2.5 shadow-lg active:scale-95 transition-transform flex flex-col items-center"
        >
          <span className="font-serif-nes text-[14px] tracking-[0.15em]">CANJEAR CAFÉ</span>
          <span className="text-[10px] opacity-85">Sin pago adicional</span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeCouponPayScreen;
