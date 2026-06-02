import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';
import { getPromotion } from '@/data/promotions';

const PromoDoneScreen = () => {
  const { t, goHome, promotionCode, selectedPromotionId } = useApp();
  const promo = getPromotion(selectedPromotionId);

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: QR */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-32 h-32 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
            <QrCode className="w-28 h-28 text-foreground" strokeWidth={1} />
          </div>
          <p className="text-[10px] text-muted-foreground text-center px-2 leading-relaxed">
            {t('promo.done.codeHint')}
          </p>
        </div>

        {/* Right: success + code */}
        <div className="flex flex-col items-center justify-center gap-2">
          <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={2} />
          <h1 className="text-base font-bold text-center leading-tight">{t('promo.done.title')}</h1>
          <p className="text-[10px] text-muted-foreground text-center">{promo.title}</p>
          <div className="bg-secondary/20 border-2 border-secondary rounded-xl px-3 py-2 flex flex-col items-center gap-0.5 w-full max-w-[220px]">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t('promo.done.code')}
            </span>
            <span className="text-base font-extrabold tracking-widest text-foreground tabular-nums">
              {promotionCode || 'PROMO-XXXXXX'}
            </span>
          </div>
          <button onClick={goHome} className="kiosk-button bg-primary text-primary-foreground rounded-xl mt-1">
            {t('promo.done.finish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoDoneScreen;
