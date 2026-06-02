import { useApp, MY_ESPRESSO_BALANCE } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { FlowBackground, KioskHeader, ContactlessIcon } from '@/components/NespressoBrand';

const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

const productLabel = (orderType: string) => {
  if (orderType === 'bono_semanal') return 'Bono semanal · 5 cafés';
  if (orderType === 'bono_mensual') return 'Bono mensual · 20 cafés';
  return 'Café Nespresso';
};

const CoffeeBalancePayScreen = () => {
  const { navigate, orderType, getOrderAmount } = useApp();
  const amount = getOrderAmount();
  const applied = Math.min(MY_ESPRESSO_BALANCE, amount);
  const pending = Math.max(0, amount - applied);
  const fullyCovered = pending <= 0.0001;

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <button onClick={() => navigate('coffee_payment_method')} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10">
        <KioskHeader caption={<>Saldo My Espresso</>} tagline="Acumulas ventajas con esta operación." />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center gap-6 px-6">
        <div className="flex-1 rounded-xl bg-white/8 border border-white/15 p-3 text-white text-[13px] backdrop-blur-sm">
          <div className="flex justify-between py-1">
            <span className="opacity-80">Producto</span>
            <span>{productLabel(orderType)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="opacity-80">Importe</span>
            <span>{fmt(amount)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="opacity-80">Saldo disponible</span>
            <span>{fmt(MY_ESPRESSO_BALANCE)}</span>
          </div>
          <div className="flex justify-between py-1 text-nes-gold-text">
            <span>Saldo aplicado</span>
            <span>− {fmt(applied)}</span>
          </div>
          {!fullyCovered && (
            <div className="flex justify-between py-1">
              <span className="opacity-80">Importe pendiente</span>
              <span>{fmt(pending)}</span>
            </div>
          )}
          <div className="border-t border-white/15 my-1" />
          <div className="flex justify-between py-1 font-serif-nes text-[16px]">
            <span>Importe final</span>
            <span className="text-nes-gold-text">{fmt(pending)}</span>
          </div>
        </div>

        {fullyCovered ? (
          <button
            onClick={() => navigate('coffee_processing')}
            className="flex flex-col items-center text-nes-cream active:scale-95 transition-transform bg-nes-gold rounded-full px-5 py-3 shadow-lg"
          >
            <span className="font-serif-nes text-[14px] tracking-[0.15em]">CONFIRMAR</span>
            <span className="text-[10px] opacity-80">Sin pago adicional</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('coffee_processing')}
            className="flex flex-col items-center text-nes-gold-text nfc-pulse active:scale-95 transition-transform"
          >
            <ContactlessIcon className="w-24 h-24" />
            <span className="text-white text-[12px] mt-1 font-serif-nes tracking-wide">Acerca tu tarjeta para pagar el pendiente</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CoffeeBalancePayScreen;
