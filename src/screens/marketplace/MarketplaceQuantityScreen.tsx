import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import QuantityStepper from '@/components/kiosk/QuantityStepper';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceQuantityScreen = () => {
  const { t, navigate, goHome, marketplaceBrandId, marketplaceCardType, quantity, setQuantity } = useApp();
  const brand = getBrand(marketplaceBrandId);
  const unit = brand?.amount ?? 25;
  const subtotal = unit * quantity;

  const back = () => navigate(marketplaceCardType === 'physical' ? 'marketplace_code' : 'marketplace_type');

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={back} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center gap-2 min-h-0">
          {brand && (
            <div className="w-24 h-24 rounded-xl bg-card border border-border p-3 flex items-center justify-center shadow-sm">
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <p className="text-sm font-semibold">{brand?.name}</p>
          <p className="text-lg font-extrabold text-primary">€{unit},00</p>
          <p className="text-[10px] text-muted-foreground">{t('quantity.unit')}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-base font-bold text-center">{t('quantity.title')}</h1>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <div className="bg-card border border-border rounded-xl px-4 py-2 flex flex-col items-center gap-0.5 min-w-[180px]">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{t('quantity.total')}</span>
            <span className="text-2xl font-extrabold text-primary tabular-nums">€{subtotal.toFixed(2).replace('.', ',')}</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">{quantity} × €{unit},00</span>
          </div>
          <button
            onClick={() => navigate('marketplace_payment')}
            className="kiosk-button bg-primary text-primary-foreground rounded-xl"
          >
            {t('quantity.continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceQuantityScreen;
