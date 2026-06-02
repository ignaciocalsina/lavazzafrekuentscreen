import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

const CoffeeOfferScreen = () => {
  const { navigate, setCoffeeOfferAccepted } = useApp();

  const accept = () => {
    setCoffeeOfferAccepted(true);
    navigate('coffee_pay');
  };
  const skip = () => {
    setCoffeeOfferAccepted(false);
    navigate('coffee_pay');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-secondary/15 text-secondary-foreground px-2.5 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Oferta exclusiva</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
        <h1 className="text-lg font-extrabold text-center leading-tight">
          Llévate 5 cafés y paga solo 4
        </h1>
        <p className="text-xs text-muted-foreground text-center max-w-[80%]">
          Pack de 5 cafés canjeables en cualquier máquina Frekuent
        </p>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-muted-foreground text-base line-through tabular-nums">17,50 €</span>
          <span className="text-4xl font-extrabold text-primary tabular-nums">14,00 €</span>
        </div>
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
          AHORRA 3,50 €
        </span>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-2 w-full max-w-sm">
          <button
            onClick={skip}
            className="flex-1 py-2.5 rounded-xl bg-muted text-foreground font-bold text-sm active:scale-95 transition-transform"
          >
            No, gracias
          </button>
          <button
            onClick={accept}
            className="flex-[2] py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform"
          >
            Añadir al recibo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeOfferScreen;
