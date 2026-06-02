import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { getBrand } from '@/data/marketplaceBrands';
import { Input } from '@/components/ui/input';

const MarketplaceCodeScreen = () => {
  const { t, navigate, marketplaceBrandId, setMarketplaceActivationCode } = useApp();
  const brand = getBrand(marketplaceBrandId);
  const [code, setCode] = useState('');

  const handleContinue = () => {
    if (!code.trim()) return;
    setMarketplaceActivationCode(code.trim());
    navigate('marketplace_payment');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <button
        onClick={() => navigate('marketplace_type')}
        className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>

      {brand && (
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-xl bg-card border border-border p-2 flex items-center justify-center shadow-sm">
            <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-xs text-muted-foreground">{brand.name}</p>
        </div>
      )}

      <h1 className="text-lg font-bold text-center">{t('marketplace.code.title')}</h1>

      <div className="flex-1 flex flex-col justify-center gap-4 px-2">
        <Input
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder={t('marketplace.code.placeholder')}
          className="h-14 text-center text-xl font-mono tracking-widest"
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!code.trim()}
        className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full disabled:opacity-50"
      >
        {t('marketplace.code.continue')}
      </button>
    </div>
  );
};

export default MarketplaceCodeScreen;
