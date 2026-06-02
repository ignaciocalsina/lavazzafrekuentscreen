import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';

const CoffeePayScreen = () => {
  const { navigate, setProcessing } = useApp();
  const [processing, setLocal] = useState(false);

  const pay = () => {
    if (processing) return;
    setLocal(true);
    setProcessing(true);
    setTimeout(() => navigate('coffee_offer'), 1600);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-1 w-full h-full">
      <button onClick={() => navigate('coffee_idle')} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> Atrás
      </button>

      <div className="text-center">
        <h1 className="text-base font-bold leading-tight">Cappuccino</h1>
        <p className="text-[11px] text-muted-foreground">1 × 3,50 €</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-5xl font-extrabold text-primary tabular-nums">3,50 €</p>

        {processing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground text-sm">Procesando pago…</p>
          </div>
        ) : (
          <>
            <button onClick={pay} className="active:scale-95 transition-transform nfc-pulse">
              <img src={contactlessIcon} alt="Contactless" className="w-28 h-auto" />
            </button>
            <p className="text-sm text-muted-foreground text-center">Acerca tu tarjeta o móvil</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CoffeePayScreen;
