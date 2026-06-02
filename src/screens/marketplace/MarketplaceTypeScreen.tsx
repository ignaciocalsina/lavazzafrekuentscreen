import { useApp } from '@/context/AppContext';
import { ArrowLeft, Smartphone, CreditCard } from 'lucide-react';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplaceTypeScreen = () => {
  const { t, navigate, goHome, marketplaceBrandId, setMarketplaceCardType } = useApp();
  const brand = getBrand(marketplaceBrandId);

  const choose = (type: 'digital' | 'physical') => {
    setMarketplaceCardType(type);
    navigate(type === 'physical' ? 'marketplace_code' : 'marketplace_quantity');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>

      {brand && (
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-20 rounded-xl bg-card border border-border p-2 flex items-center justify-center shadow-sm">
            <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-xs text-muted-foreground">{brand.name}</p>
        </div>
      )}

      <h1 className="text-lg font-bold text-center leading-tight">{t('marketplace.type.title')}</h1>

      <div className="grid grid-cols-2 gap-3 flex-1">
        <button
          onClick={() => choose('digital')}
          className="kiosk-card flex flex-col items-center justify-center gap-3 hover:border-primary/50 active:bg-primary/5 transition-colors"
        >
          <Smartphone className="w-14 h-14 text-primary" strokeWidth={1.75} />
          <span className="text-lg font-semibold">{t('marketplace.type.digital')}</span>
        </button>
        <button
          onClick={() => choose('physical')}
          className="kiosk-card flex flex-col items-center justify-center gap-3 hover:border-primary/50 active:bg-primary/5 transition-colors"
        >
          <CreditCard className="w-14 h-14 text-primary" strokeWidth={1.75} />
          <span className="text-lg font-semibold">{t('marketplace.type.physical')}</span>
        </button>
      </div>
    </div>
  );
};

export default MarketplaceTypeScreen;
