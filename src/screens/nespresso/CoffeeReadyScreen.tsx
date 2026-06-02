import { useApp, BONO_WEEK_COFFEES, BONO_MONTH_COFFEES } from '@/context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const CoffeeReadyScreen = () => {
  const { goHome, orderType, paymentMethod, couponRemaining } = useApp();

  let subtitle = 'Gracias por disfrutar de Nespresso.';
  let badge: string | null = null;

  if (orderType === 'bono_semanal') {
    subtitle = `Bono semanal activado: ${BONO_WEEK_COFFEES} cafés disponibles.`;
    badge = `${BONO_WEEK_COFFEES} cafés en tu bono semanal`;
  } else if (orderType === 'bono_mensual') {
    subtitle = `Bono mensual activado: ${BONO_MONTH_COFFEES} cafés disponibles.`;
    badge = `${BONO_MONTH_COFFEES} cafés en tu bono mensual`;
  } else if (paymentMethod === 'coupon') {
    subtitle = `Café canjeado de tu cupón. Te quedan ${couponRemaining} cafés.`;
    badge = `${couponRemaining} cafés en tu cupón`;
  }

  const showVentajas = paymentMethod === 'balance' || paymentMethod === 'coupon';

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <div className="relative z-10 text-center pt-2">
        <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={2} />
        <h1 className="font-serif-nes text-3xl text-white leading-tight">Tu café está listo.</h1>
        <p className="text-[12px] text-white/85 italic">{subtitle}</p>
        {showVentajas && (
          <p className="text-[11px] text-nes-gold-text">Acumulas ventajas con esta operación.</p>
        )}
        {badge && (
          <span className="mt-1 inline-flex items-center gap-1 bg-nes-gold-text/15 border border-nes-gold-text/40 text-nes-gold-text rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em]">
            {badge}
          </span>
        )}
        <button
          onClick={goHome}
          className="mt-3 inline-flex items-center gap-1 bg-nes-cream text-nes-onyx rounded-full px-5 py-2 text-[11px] font-semibold tracking-[0.18em] active:scale-95 transition-transform"
        >
          FINALIZAR
        </button>
      </div>
    </div>
  );
};

export default CoffeeReadyScreen;
