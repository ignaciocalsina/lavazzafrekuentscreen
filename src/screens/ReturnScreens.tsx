import { useApp } from '@/context/AppContext';
import { Package, ArrowLeft } from 'lucide-react';
import OperationCard from '@/components/kiosk/OperationCard';

export const ReturnConfirmed = () => {
  const { t, navigate, goHome } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          icon={Package}
          title={t('return.confirmed.ready')}
          data={[
            { label: 'ID', value: '#INP-RET-1923B' },
            { label: t('common.compartment'), value: '8' },
          ]}
          step={1}
          totalSteps={3}
        />
        <p className="text-sm text-muted-foreground">{t('return.confirmed.text')}</p>
      </div>

      <div className="mt-auto w-full flex flex-col gap-2">
        <button onClick={() => navigate('return_open')} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('return.confirmed.continue')}
        </button>
        <button onClick={goHome} className="kiosk-button bg-muted text-foreground rounded-xl w-full">
          {t('collect.found.cancel')}
        </button>
      </div>
    </div>
  );
};

export const ReturnOpen = () => {
  const { t, navigate } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          title={`${t('common.compartment').toUpperCase()} 8 - ${t('common.open').toUpperCase()}`}
          step={2}
          totalSteps={3}
        />
        <p className="text-sm font-medium text-foreground">{t('return.open.instruction')}</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs font-medium text-success">{t('return.open.lockerReady')}</span>
        </div>
      </div>

      <div className="mt-auto w-full">
        <button onClick={() => navigate('return_done')} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('return.open.continue')}
        </button>
      </div>
    </div>
  );
};

export const ReturnDone = () => {
  const { t, goHome } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          title={t('return.done.completed')}
          step={3}
          totalSteps={3}
        />
        <p className="text-sm text-muted-foreground">{t('return.done.text')}</p>
      </div>

      <div className="mt-auto w-full">
        <button onClick={goHome} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('return.done.finish')}
        </button>
      </div>
    </div>
  );
};
