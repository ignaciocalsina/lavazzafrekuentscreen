import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceDoneScreen = () => {
  const { t, goHome, marketplaceBrandId } = useApp();
  const brand = getBrand(marketplaceBrandId);

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <div className="flex flex-col items-center gap-1.5 pt-1">
        <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={2} />
        <h1 className="text-lg font-bold text-center">{t('marketplace.done.title')}</h1>
        {brand && (
          <p className="text-xs text-muted-foreground">
            {brand.name} · €{brand.amount},00
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-36 h-36 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
          <QrCode className="w-32 h-32 text-foreground" strokeWidth={1} />
        </div>
        <p className="text-xs text-muted-foreground text-center px-2 leading-relaxed">
          {t('marketplace.done.scanReceipt')}
        </p>
      </div>

      <button
        onClick={goHome}
        className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full"
      >
        {t('marketplace.done.finish')}
      </button>
    </div>
  );
};

export default MarketplaceDoneScreen;
