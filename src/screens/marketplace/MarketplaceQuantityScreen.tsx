import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import QuantityStepper from '@/components/kiosk/QuantityStepper';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceQuantityScreen = () => {
  const { t, navigate, goHome, marketplaceBrandId, marketplaceCardType, quantity, setQuantity } = useApp();
  const brand = getBrand(marketplaceBrandId);
  const unit = brand?.amount ?? 25;
  const subtotal = unit * quantity;
  const fmt = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;

  const back = () => navigate(marketplaceCardType === 'physical' ? 'marketplace_code' : 'marketplace_type');

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={back} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="text-center">
        <h1 className="text-base font-bold leading-tight">{brand?.name}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
        <h2 className="text-sm font-bold">{t('quantity.title')}</h2>
        <QuantityStepper value={quantity} onChange={setQuantity} />

        <div className="bg-muted rounded-lg px-4 py-2 w-full max-w-xs space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">{t('quantity.unit')}</span>
            <span className="font-bold tabular-nums">{fmt(unit)}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-base">
            <span className="font-bold">{t('quantity.total')}</span>
            <span className="font-extrabold text-primary tabular-nums">{fmt(subtotal)}</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-xs mt-2">
          <button onClick={goHome} className="flex-1 py-2 rounded-xl bg-muted text-foreground font-bold text-sm active:scale-95 transition-transform">
            {t('id.back')}
          </button>
          <button onClick={() => navigate('marketplace_payment')} className="flex-[2] py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
            {t('quantity.continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceQuantityScreen;
