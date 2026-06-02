import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Truck, CheckCircle2, QrCode, AlertTriangle, Package, DoorOpen } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';

import OperationCard from '@/components/kiosk/OperationCard';

export const SendDetails = () => {
  const { t, navigate, goHome } = useApp();

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-4 mx-auto">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Truck className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-xl font-bold text-center">{t('send.details.title')}</h1>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <button onClick={() => navigate('send_payment')} className="active:scale-95 transition-transform">
          <QrCode className="w-40 h-40 text-foreground" />
        </button>
        <p className="text-muted-foreground text-center text-sm">{t('send.details.scanQr')}</p>
      </div>
    </div>
  );
};

export const SendPrice = () => {
  const { t, navigate } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-4 mx-auto">
      <button onClick={() => navigate('send_details')} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>
      <h1 className="text-xl font-bold text-center">{t('send.price.title')}</h1>
      <div className="mt-auto w-full">
        <button onClick={() => navigate('send_payment')} className="kiosk-button bg-primary text-primary-foreground rounded-xl w-full">
          {t('send.price.proceed')}
        </button>
      </div>
    </div>
  );
};

export const SendPayment = () => {
  const { t, navigate, generateTracking, setProcessing: setGlobalProcessing } = useApp();
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (processing) return;
    setProcessing(true);
    setGlobalProcessing(true);
    setTimeout(() => {
      generateTracking();
      navigate('send_created');
    }, 2000);
  };

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <h1 className="text-xl font-bold text-center">{t('send.payment.title')}</h1>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-bold uppercase tracking-wide text-foreground">{t('send.payment.preauth')}</p>

        <p className="text-3xl font-extrabold text-primary">€15,00</p>

        {processing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium text-sm">{t('send.payment.processing')}</p>
          </div>
        ) : (
          <button onClick={handlePayment} className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse">
            <img src={contactlessIcon} alt="Contactless" className="w-28 h-auto" />
          </button>
        )}
      </div>

      <div className="w-full rounded-xl border-2 border-[hsl(45,100%,51%)] bg-[hsl(45,100%,51%,0.08)] p-3 flex items-start gap-2.5">
        <AlertTriangle className="w-5 h-5 text-[hsl(45,100%,51%)] shrink-0 mt-0.5" />
        <p className="text-xs text-foreground leading-relaxed">{t('send.payment.warning')}</p>
      </div>
    </div>
  );
};

export const SendCreated = () => {
  const { t, navigate, trackingNumber } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          icon={Package}
          title={t('send.created.ready')}
          data={[
            { label: t('send.created.tracking'), value: trackingNumber },
            { label: t('common.compartment'), value: '5' },
          ]}
          step={1}
          totalSteps={3}
        />
        <p className="text-sm text-muted-foreground">{t('send.created.instruction')}</p>
      </div>

      <div className="mt-auto w-full">
        <button onClick={() => navigate('send_deposit')} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('send.created.open')}
        </button>
      </div>
    </div>
  );
};

export const SendDeposit = () => {
  const { t, navigate } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          title={`${t('common.compartment').toUpperCase()} 5 - ${t('common.open').toUpperCase()}`}
          step={2}
          totalSteps={3}
        />
        <p className="text-sm font-medium text-foreground">{t('send.deposit.instruction')}</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs font-medium text-success">{t('common.lockerReady')}</span>
        </div>
      </div>

      <div className="mt-auto w-full">
        <button onClick={() => navigate('send_done')} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('send.deposit.continue')}
        </button>
      </div>
    </div>
  );
};

export const SendDone = () => {
  const { t, goHome } = useApp();
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col justify-center w-full gap-3">
        <OperationCard
          title={t('send.done.completed')}
          step={3}
          totalSteps={3}
        />
        <p className="text-sm text-muted-foreground">{t('send.done.text')}</p>
      </div>

      <div className="mt-auto w-full">
        <button onClick={goHome} className="kiosk-button-lg bg-primary text-primary-foreground rounded-xl w-full">
          {t('send.done.finish')}
        </button>
      </div>
    </div>
  );
};