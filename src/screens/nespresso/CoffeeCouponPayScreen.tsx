import { useApp } from '@/context/AppContext';
import { ArrowLeft, Ticket } from 'lucide-react';
import { FlowBackground, KioskHeader } from '@/components/NespressoBrand';

const CoffeeCouponPayScreen = () => {
  const { navigate, couponRemaining, consumeCoupon, orderType } = useApp();
  const canRedeem = couponRemaining > 0;
  const productLabel =
    orderType === 'bono_semanal' ? 'Bono semanal' :
    orderType === 'bono_mensual' ? 'Bono mensual' : 'Café Nespresso';

  const redeem = () => {
    if (!canRedeem) return;
    consumeCoupon();
    navigate('coffee_processing');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate('coffee_payment_method')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10">
        <KioskHeader caption={<>Cupones</>} tagline="Acumulas ventajas con esta operación." />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center gap-6 px-8">
        <div className="flex-1 rounded-xl bg-white/8 border border-white/15 p-4 text-white text-[13px] backdrop-blur-sm text-center">
          <Ticket className="w-10 h-10 mx-auto text-nes-gold-text" strokeWidth={1.5} />
          <p className="mt-2 opacity-80">Cupón activo</p>
          <p className="font-serif-nes text-[28px] text-nes-gold-text leading-none">{couponRemaining}</p>
          <p className="text-[11px] opacity-75">cafés disponibles</p>
          <div className="border-t border-white/15 my-2" />
          <p className="text-[12px]">Producto: <span className="font-semibold">{productLabel}</span></p>
        </div>

        <button
          onClick={redeem}
          disabled={!canRedeem}
          className="flex flex-col items-center bg-nes-gold text-nes-cream rounded-full px-6 py-4 shadow-lg active:scale-95 transition-transform disabled:opacity-40"
        >
          <span className="font-serif-nes text-[15px] tracking-[0.15em]">CANJEAR CAFÉ</span>
          <span className="text-[10px] opacity-85">Sin pago adicional</span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeCouponPayScreen;
