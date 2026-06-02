import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import QuantityStepper from '@/components/kiosk/QuantityStepper';
import { getPromotion, formatEuro, getDiscountPercent } from '@/data/promotions';

const QuantitySelectScreen = () => {
  const { t, navigate, goHome, selectedPromotionId, quantity, setQuantity } = useApp();
  const promo = getPromotion(selectedPromotionId);
  const subtotal = promo.price * quantity;

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: product */}
        <div className="flex flex-col items-center justify-center gap-2 min-h-0">
          <div className="w-32 h-32 rounded-xl overflow-hidden border border-border shadow-sm bg-black">
            <img src={promo.mediaUrl} alt={promo.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-sm font-semibold text-center leading-tight">{promo.title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] text-muted-foreground line-through">{formatEuro(promo.originalPrice)}</span>
            <span className="text-lg font-extrabold text-primary">{formatEuro(promo.price)}</span>
            <span className="bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">-{getDiscountPercent(promo)}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground">{t('quantity.unit')}</p>
        </div>

        {/* Right: quantity + total */}
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-base font-bold text-center">{t('quantity.title')}</h1>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <div className="bg-card border border-border rounded-xl px-4 py-2 flex flex-col items-center gap-0.5 min-w-[180px]">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{t('quantity.total')}</span>
            <span className="text-2xl font-extrabold text-primary tabular-nums">{formatEuro(subtotal)}</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {quantity} × {formatEuro(promo.price)}
            </span>
          </div>
          <button
            onClick={() => navigate('promo_pay')}
            className="kiosk-button bg-primary text-primary-foreground rounded-xl"
          >
            {t('quantity.continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelectScreen;
