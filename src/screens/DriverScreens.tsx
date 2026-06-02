import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Wifi, ArrowLeft, Package, DoorOpen, CheckCircle2 } from 'lucide-react';

/* ── NFC Identification (driver-only) ── */
export const DriverNfc = () => {
  const { t, navigate, goHome, setProcessing } = useApp();
  const [processing, setLocal] = useState(false);

  const handleNfcTap = () => {
    if (processing) return;
    setLocal(true);
    setProcessing(true);
    setTimeout(() => {
      navigate('driver_package_list', 'driver_collect');
    }, 2000);
  };

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>
      <h1 className="text-xl font-bold text-center">{t('id.title')}</h1>
      <p className="text-muted-foreground text-center text-sm">{t('id.nfc')}</p>

      <div className="flex-1 flex flex-col items-center justify-center">
        {processing ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium text-sm">{t('id.processing')}</p>
          </div>
        ) : (
          <button onClick={handleNfcTap} className="relative w-28 h-28 flex items-center justify-center active:scale-95 transition-transform">
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 nfc-ring" />
            <div className="absolute inset-3 rounded-full border-4 border-primary/20 nfc-ring" style={{ animationDelay: '0.3s' }} />
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center nfc-pulse">
              <Wifi className="w-7 h-7 text-primary" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Package List ── */
const PACKAGES = [
  { locker: 2, code: '#INP-DRV-4821A' },
  { locker: 5, code: '#INP-DRV-7293B' },
  { locker: 11, code: '#INP-DRV-1058C' },
];

export const DriverPackageList = () => {
  const { t, navigate, flow, goHome } = useApp();
  const title = flow === 'driver_collect' ? t('driver.packages.collect_title') : t('driver.packages.deposit_title');

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      {flow === 'driver_collect' ? (
        <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
          <ArrowLeft className="w-4 h-4" /> {t('id.back')}
        </button>
      ) : (
        <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> {t('id.back')}
        </div>
      )}
      <h1 className="text-xl font-bold text-center">{title}</h1>

      <div className="flex flex-col gap-2 w-full flex-1 justify-center">
        <div className="kiosk-card flex items-start gap-3 p-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left space-y-1">
            {PACKAGES.map((pkg) => (
              <p key={pkg.code} className="text-sm">
                <span className="font-bold">Locker {pkg.locker}</span>{' '}
                <span className="text-muted-foreground font-mono text-xs">{pkg.code}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('driver_open')}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.97] transition-transform"
      >
        {t('driver.open.button')}
      </button>
    </div>
  );
};

/* ── Compartments Open ── */
export const DriverOpen = () => {
  const { t, navigate, flow } = useApp();

  const handleContinue = () => {
    if (flow === 'driver_collect') {
      navigate('driver_collect_done');
    } else {
      navigate('driver_done');
    }
  };

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>
      <h1 className="text-xl font-bold text-center">{t('driver.open.title')}</h1>

      <div className="flex flex-col gap-2 w-full flex-1 justify-center">
        <div className="kiosk-card flex items-start gap-3 p-4 border-primary/30 bg-primary/5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 mt-0.5">
            <DoorOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left flex-1 space-y-1">
            {PACKAGES.map((pkg) => (
              <p key={pkg.code} className="text-sm">
                <span className="font-bold">Locker {pkg.locker}</span>{' '}
                <span className="text-muted-foreground font-mono text-xs">{pkg.code}</span>
                <span className="text-xs font-semibold text-primary ml-2">{t('common.open')}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.97] transition-transform"
      >
        {t('collect.opening.continue')}
      </button>
    </div>
  );
};

/* ── Collect Done (intermediate) ── */
export const DriverCollectDone = () => {
  const { t, navigate } = useApp();

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-center">{t('driver.collect_done.title')}</h1>
        <p className="text-sm text-muted-foreground text-center">{t('driver.done.text')}</p>
      </div>

      <button
        onClick={() => navigate('driver_package_list', 'driver_deposit')}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.97] transition-transform"
      >
        {t('driver.collect_done.continue')}
      </button>
    </div>
  );
};

/* ── Done ── */
export const DriverDone = () => {
  const { t, goHome } = useApp();

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      <div className="self-start flex items-center gap-1 text-transparent mb-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-center">{t('driver.done.title')}</h1>
        <p className="text-sm text-muted-foreground text-center">{t('driver.done.text')}</p>
      </div>

      <button
        onClick={goHome}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.97] transition-transform"
      >
        {t('collect.done.finish')}
      </button>
    </div>
  );
};
