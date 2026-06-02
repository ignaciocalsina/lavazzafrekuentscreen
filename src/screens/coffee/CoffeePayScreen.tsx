import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import contactlessIcon from '@/assets/contactless-icon.png';

const CoffeePayScreen = () => {
  const { navigate, setProcessing, coffeeOfferAccepted } = useApp();
  const [processing, setLocal] = useState(false);

  const total = coffeeOfferAccepted ? 17.5 : 3.5;
  const formatted = total.toFixed(2).replace('.', ',') + ' €';

  const pay = () => {
    if (processing) return;
    setLocal(true);
    setProcessing(true);
    setTimeout(() => navigate('coffee_done'), 1600);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-1 w-full h-full">
      <div className="text-center">
        <h1 className="text-base font-bold leading-tight">Tu pedido</h1>
        <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
          <p>1 × Cappuccino · 3,50 €</p>
          {coffeeOfferAccepted && <p>1 × Pack 5 cafés · 14,00 €</p>}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-5xl font-extrabold text-primary tabular-nums">{formatted}</p>

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
