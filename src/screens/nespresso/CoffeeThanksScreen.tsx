import { useApp, BONO_WEEK_COFFEES, SUSCRIPCION_PRICE } from '@/context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const CoffeeThanksScreen = () => {
  const { goHome, orderType } = useApp();

  let subtitle = 'Gracias por disfrutar de Nespresso.';
  let badge: string | null = null;

  if (orderType === 'bono_semanal') {
    subtitle = `Bono semanal activado: ${BONO_WEEK_COFFEES} cafés disponibles.`;
    badge = `${BONO_WEEK_COFFEES} cafés en tu bono semanal`;
  } else if (orderType === 'suscripcion') {
    subtitle = `Plan Desayuno y Sobremesa activado: ${SUSCRIPCION_PRICE} € / mes.`;
    badge = 'Suscripción activa';
  }

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <div className="relative z-10 text-center pt-2">
        <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <CheckCircle2 className="w-14 h-14 text-nes-gold-text" strokeWidth={2} />
        <h1 className="font-serif-nes text-3xl text-white leading-tight">Gracias por tu compra.</h1>
        <p className="text-[12px] text-white/85 italic">{subtitle}</p>
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

export default CoffeeThanksScreen;
