import { useApp } from '@/context/AppContext';
import { CheckCircle2, QrCode } from 'lucide-react';

const PromoDoneScreen = () => {
  const { t, goHome, promotionCode } = useApp();

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <div className="flex flex-col items-center gap-1 pt-1">
        <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={2} />
        <h1 className="text-lg font-bold text-center">{t('promo.done.title')}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-28 h-28 rounded-xl border-2 border-foreground bg-white flex items-center justify-center">
          <QrCode className="w-24 h-24 text-foreground" strokeWidth={1} />
        </div>

        <div className="w-full max-w-xs bg-secondary/20 border-2 border-secondary rounded-xl px-4 py-3 flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t('promo.done.code')}
          </span>
          <span className="text-xl font-extrabold tracking-widest text-foreground tabular-nums">
            {promotionCode || 'PROMO-XXXXXX'}
          </span>
        </div>

        <p className="text-xs text-muted-foreground text-center px-2 leading-relaxed">
          {t('promo.done.codeHint')}
        </p>
      </div>

      <button onClick={goHome} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
        {t('promo.done.finish')}
      </button>
    </div>
  );
};

export default PromoDoneScreen;
