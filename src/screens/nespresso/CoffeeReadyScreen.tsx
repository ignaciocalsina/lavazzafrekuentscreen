import { useApp, BONO_WEEK_COFFEES, BONO_MONTH_COFFEES, MOCK_BUNDLE_REMAINING } from '@/context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import { NespressoLogo } from '@/components/NespressoBrand';

const CoffeeReadyScreen = () => {
  const { goHome, orderType, paymentMethod } = useApp();

  let subtitle = 'Gracias por disfrutar de Nespresso.';
  let badge: string | null = null;

  if (orderType === 'bono_semanal') {
    const left = BONO_WEEK_COFFEES - 1;
    subtitle = `Te quedan ${left} cafés en tu bono semanal.`;
    badge = `Bono semanal activado · ${left}/${BONO_WEEK_COFFEES}`;
  } else if (orderType === 'bono_mensual') {
    const left = BONO_MONTH_COFFEES - 1;
    subtitle = `Te quedan ${left} cafés en tu bono mensual.`;
    badge = `Bono mensual activado · ${left}/${BONO_MONTH_COFFEES}`;
  } else if (paymentMethod === 'bundle_credit') {
    const left = MOCK_BUNDLE_REMAINING - 1;
    subtitle = `Te quedan ${left} cafés en tu bono semanal.`;
    badge = `1 café descontado · ${left} restantes`;
  } else if (paymentMethod === 'balance') {
    subtitle = 'Pagado con tu saldo Nespresso. Gracias por disfrutar.';
  }

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={2} />
        <h1 className="font-serif-nes text-3xl text-white leading-tight">Tu café está listo.</h1>
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

export default CoffeeReadyScreen;
