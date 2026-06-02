import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceDoneScreen = () => {
  const { t, goHome, marketplaceBrandId, quantity } = useApp();
  const brand = getBrand(marketplaceBrandId);
  const unit = brand?.amount ?? 25;
  const total = unit * quantity;
  const fmt = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="flex items-center justify-center gap-2 pt-2">
        <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={2.5} />
        <h1 className="text-base font-bold">{t('marketplace.done.title')}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="w-28 h-28 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
          <QrCode className="w-24 h-24 text-foreground" strokeWidth={1} />
        </div>
        {brand && (
          <p className="text-[11px] font-semibold text-center">{brand.name} · {quantity} × {fmt(unit)}</p>
        )}
        <p className="text-2xl font-extrabold text-primary tabular-nums">{fmt(total)}</p>
        <p className="text-[10px] text-muted-foreground text-center">{t('marketplace.done.scanReceipt')}</p>
      </div>

      <div className="flex justify-center">
        <button onClick={goHome} className="w-full max-w-xs py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
          {t('marketplace.done.finish')}
        </button>
      </div>
    </div>
  );
};

export default MarketplaceDoneScreen;
