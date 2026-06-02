import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';
import { getBrand } from '@/data/marketplaceBrands';

const MarketplacePaymentScreen = () => {
  const { t, navigate, marketplaceBrandId, quantity, setProcessing: setGlobalProcessing } = useApp();
  const [processing, setProcessing] = useState(false);
  const brand = getBrand(marketplaceBrandId);
  const unit = brand?.amount ?? 25;
  const total = unit * quantity;

  const handlePayment = () => {
    if (processing) return;
    setProcessing(true);
    setGlobalProcessing(true);
    setTimeout(() => navigate('marketplace_done'), 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button
        onClick={() => navigate('marketplace_quantity')}
        className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center gap-2">
          {brand && (
            <div className="w-20 h-20 rounded-lg bg-card border border-border p-2 flex items-center justify-center">
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <span className="text-xs font-semibold text-foreground">{brand?.name}</span>
          <p className="text-[10px] text-muted-foreground tabular-nums">{quantity} × €{unit},00</p>
          <p className="text-3xl font-extrabold text-primary tabular-nums">€{total.toFixed(2).replace('.', ',')}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-sm font-bold text-center">{t('marketplace.payment.title')}</h1>
          {processing ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-medium text-xs">{t('send.payment.processing')}</p>
            </div>
          ) : (
            <>
              <button onClick={handlePayment} className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse">
                <img src={contactlessIcon} alt="Contactless" className="w-24 h-auto" />
              </button>
              <p className="text-[10px] text-muted-foreground text-center px-2">{t('send.payment.instruction')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePaymentScreen;
