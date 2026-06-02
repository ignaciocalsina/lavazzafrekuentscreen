import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';

const CoffeeDoneScreen = () => {
  const { goHome, coffeeOfferAccepted } = useApp();
  const total = coffeeOfferAccepted ? 17.50 : 3.50;
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-36 h-36 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
            <QrCode className="w-32 h-32 text-foreground" strokeWidth={1} />
          </div>
          <p className="text-[10px] text-muted-foreground text-center px-2 leading-relaxed">
            Escanea para descargar tu recibo
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <CheckCircle2 className="w-12 h-12 text-success" strokeWidth={2} />
          <h1 className="text-base font-bold text-center leading-tight">¡Disfruta tu café!</h1>
          <div className="text-center space-y-0.5">
            <p className="text-[11px] text-muted-foreground">Cappuccino · 3,50 €</p>
            {coffeeOfferAccepted && (
              <p className="text-[11px] text-muted-foreground">Pack 5 cafés · 14,00 €</p>
            )}
          </div>
          <p className="text-2xl font-extrabold text-primary tabular-nums">€{fmt(total)}</p>
          <button onClick={goHome} className="mt-1 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDoneScreen;
