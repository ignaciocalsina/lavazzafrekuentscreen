import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';
import { getPromotion, formatEuro } from '@/data/promotions';

const PromoPayScreen = () => {
  const { t, navigate, setProcessing: setGlobal, setPromotionCode, selectedPromotionId, quantity } = useApp();
  const [processing, setProcessing] = useState(false);
  const promo = getPromotion(selectedPromotionId);
  const isSub = promo.kind === 'subscription';
  const qty = isSub ? 1 : quantity;
  const total = promo.price * qty;

  const back = () => navigate(isSub ? 'ad' : 'promo_quantity');

  const handlePay = () => {
    if (processing) return;
    setProcessing(true);
    setGlobal(true);
    const code = 'PROMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPromotionCode(code);
    setTimeout(() => navigate('promo_done'), 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={back} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="text-center">
        <h1 className="text-base font-bold leading-tight">{promo.title}</h1>
        {!isSub && (
          <p className="text-[11px] text-muted-foreground tabular-nums">{qty} × {formatEuro(promo.price)}</p>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-5xl font-extrabold text-primary tabular-nums">
          {formatEuro(total)}{isSub && <span className="text-sm text-muted-foreground font-normal"> /mes</span>}
        </p>

        {processing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground text-sm">{t('send.payment.processing')}</p>
          </div>
        ) : (
          <>
            <button onClick={handlePay} className="active:scale-95 transition-transform nfc-pulse">
              <img src={contactlessIcon} alt="Contactless" className="w-28 h-auto" />
            </button>
            <p className="text-sm text-muted-foreground text-center">{t('send.payment.instruction')}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PromoPayScreen;
