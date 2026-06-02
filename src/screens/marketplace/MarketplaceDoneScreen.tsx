import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceDoneScreen = () => {
  const { t, goHome, marketplaceBrandId, quantity } = useApp();
  const brand = getBrand(marketplaceBrandId);
  const unit = brand?.amount ?? 25;
  const total = unit * quantity;

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-32 h-32 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
            <QrCode className="w-28 h-28 text-foreground" strokeWidth={1} />
          </div>
          <p className="text-[10px] text-muted-foreground text-center px-2 leading-relaxed">
            {t('marketplace.done.scanReceipt')}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={2} />
          <h1 className="text-base font-bold text-center leading-tight">{t('marketplace.done.title')}</h1>
          {brand && (
            <p className="text-[10px] text-muted-foreground text-center">
              {brand.name} · {quantity} × €{unit},00
            </p>
          )}
          <p className="text-2xl font-extrabold text-primary tabular-nums">€{total.toFixed(2).replace('.', ',')}</p>
          <button onClick={goHome} className="kiosk-button bg-primary text-primary-foreground rounded-xl mt-1">
            {t('marketplace.done.finish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDoneScreen;
