import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getPromotion } from '@/data/promotions';

const PromoDoneScreen = () => {
  const { t, goHome, promotionCode, selectedPromotionId } = useApp();
  const promo = getPromotion(selectedPromotionId);

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="flex items-center justify-center gap-2 pt-2">
        <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={2.5} />
        <h1 className="text-base font-bold">{t('promo.done.title')}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="w-28 h-28 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
          <QrCode className="w-24 h-24 text-foreground" strokeWidth={1} />
        </div>
        <p className="text-[11px] font-semibold text-center">{promo.title}</p>
        <div className="bg-secondary/20 border-2 border-secondary rounded-lg px-3 py-1 flex flex-col items-center">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{t('promo.done.code')}</span>
          <span className="text-sm font-extrabold tracking-widest tabular-nums">{promotionCode || 'PROMO-XXXXXX'}</span>
        </div>
        <p className="text-[10px] text-muted-foreground text-center">{t('promo.done.codeHint')}</p>
      </div>

      <div className="flex justify-center">
        <button onClick={goHome} className="w-full max-w-xs py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-95 transition-transform">
          {t('promo.done.finish')}
        </button>
      </div>
    </div>
  );
};

export default PromoDoneScreen;
