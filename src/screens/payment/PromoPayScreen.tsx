import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';
import { getPromotion, getDiscountPercent, formatEuro } from '@/data/promotions';

const PromoPayScreen = () => {
  const { t, navigate, goHome, setProcessing: setGlobal, setPromotionCode, selectedPromotionId, quantity } = useApp();
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

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: summary */}
        <div className="flex flex-col items-center justify-center gap-2 min-h-0">
          <div className="w-28 h-28 rounded-xl overflow-hidden border border-border shadow-sm bg-black">
            <img src={promo.mediaUrl} alt={promo.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-sm font-semibold text-center leading-tight">{promo.title}</p>
          {!isSub && (
            <p className="text-[10px] text-muted-foreground tabular-nums">
              {qty} × {formatEuro(promo.price)}
            </p>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-primary">{formatEuro(total)}</span>
            {isSub && <span className="text-xs text-muted-foreground">/mes</span>}
            <span className="bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">-{getDiscountPercent(promo)}%</span>
          </div>
        </div>

        {/* Right: NFC */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-sm font-bold text-center">{t('promo.pay.title')}</h1>
          {processing ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-medium text-xs">{t('send.payment.processing')}</p>
            </div>
          ) : (
            <>
              <button onClick={handlePay} className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse">
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

export default PromoPayScreen;
