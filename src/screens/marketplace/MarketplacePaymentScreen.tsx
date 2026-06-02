import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplacePaymentScreen = () => {
  const { t, navigate, marketplaceBrandId, setProcessing: setGlobalProcessing } = useApp();
  const [processing, setProcessing] = useState(false);
  const brand = getBrand(marketplaceBrandId);
  const amount = brand?.amount ?? 25;

  const handlePayment = () => {
    if (processing) return;
    setProcessing(true);
    setGlobalProcessing(true);
    setTimeout(() => {
      navigate('marketplace_done');
    }, 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <button
        onClick={() => navigate('marketplace_type')}
        className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>

      <h1 className="text-lg font-bold text-center">{t('marketplace.payment.title')}</h1>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        {brand && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-card border border-border p-1 flex items-center justify-center">
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-sm font-semibold text-foreground">{brand.name}</span>
          </div>
        )}

        <p className="text-4xl font-extrabold text-primary">€{amount},00</p>

        {processing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium text-sm">{t('send.payment.processing')}</p>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse"
          >
            <img src={contactlessIcon} alt="Contactless" className="w-28 h-auto" />
          </button>
        )}

        {!processing && (
          <p className="text-xs text-muted-foreground text-center">{t('send.payment.instruction')}</p>
        )}
      </div>
    </div>
  );
};

export default MarketplacePaymentScreen;
