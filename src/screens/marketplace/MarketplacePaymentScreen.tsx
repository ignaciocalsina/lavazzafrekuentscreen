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
  const fmt = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;

  const handlePayment = () => {
    if (processing) return;
    setProcessing(true);
    setGlobalProcessing(true);
    setTimeout(() => navigate('marketplace_done'), 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={() => navigate('marketplace_quantity')} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="text-center">
        <h1 className="text-base font-bold leading-tight">{brand?.name}</h1>
        <p className="text-[11px] text-muted-foreground tabular-nums">{quantity} × {fmt(unit)}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <p className="text-4xl font-extrabold text-primary tabular-nums">{fmt(total)}</p>

        {processing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground text-xs">{t('send.payment.processing')}</p>
          </div>
        ) : (
          <>
            <button onClick={handlePayment} className="active:scale-95 transition-transform nfc-pulse">
              <img src={contactlessIcon} alt="Contactless" className="w-20 h-auto" />
            </button>
            <p className="text-[11px] text-muted-foreground text-center">{t('send.payment.instruction')}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketplacePaymentScreen;
