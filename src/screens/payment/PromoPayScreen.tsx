import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';
import { getPromotion, getDiscountPercent, formatEuro } from '@/data/promotions';

const PromoPayScreen = () => {
  const { t, navigate, goHome, setProcessing: setGlobal, setPromotionCode, selectedPromotionId } = useApp();
  const [processing, setProcessing] = useState(false);
  const promo = getPromotion(selectedPromotionId);

  const handlePay = () => {
    if (processing) return;
    setProcessing(true);
    setGlobal(true);
    const code = 'PROMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPromotionCode(code);
    setTimeout(() => navigate('promo_done'), 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>

      <h1 className="text-lg font-bold text-center">{t('promo.pay.title')}</h1>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-border shadow-sm bg-black">
          {promo.mediaType === 'video' ? (
            <video
              key={promo.id}
              src={promo.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img key={promo.id} src={promo.mediaUrl} alt={promo.title} className="w-full h-full object-cover" />
          )}
        </div>
        <p className="text-sm font-semibold text-center px-4">{promo.title}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-sm text-muted-foreground line-through">{formatEuro(promo.originalPrice)}</span>
          <span className="text-4xl font-extrabold text-primary">{formatEuro(promo.price)}</span>
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">-{getDiscountPercent(promo)}%</span>
        </div>

        {processing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium text-sm">{t('send.payment.processing')}</p>
          </div>
        ) : (
          <button onClick={handlePay} className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse">
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

export default PromoPayScreen;
