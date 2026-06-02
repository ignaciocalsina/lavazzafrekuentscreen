import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Wifi, QrCode, Hash, ArrowLeft } from 'lucide-react';

type Method = 'nfc' | 'qr' | 'pin' | null;

const IdentificationScreen = () => {
  const { t, navigate, flow, goHome, setProcessing } = useApp();
  const [method, setMethod] = useState<Method>(null);
  const [pin, setPin] = useState('');
  const [nfcProcessing, setNfcProcessing] = useState(false);

  const onSuccess = () => {
    if (flow === 'collect') navigate('collect_found');
    else if (flow === 'return') navigate('return_confirmed');
  };

  const handlePinSubmit = () => {
    if (pin.length > 0) {
      onSuccess();
    }
  };

  const addDigit = (d: string) => {
    if (pin.length < 6) {
      setPin(p => p + d);
    }
  };

  // Method selection
  if (method === null) {
    return (
      <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
        <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
          <ArrowLeft className="w-4 h-4" /> {t('id.back')}
        </button>
        <h1 className="text-xl font-bold text-center">{t('id.title')}</h1>

        <div className="flex-1 flex flex-col justify-center w-full gap-3">
          <button
            onClick={() => setMethod('nfc')}
            className="kiosk-card w-full flex items-center gap-3 p-4 border-primary/30 bg-primary/5 hover:border-primary active:scale-[0.97] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{t('id.nfcLabel')}</p>
              <p className="text-xs text-muted-foreground">{t('id.nfc')}</p>
            </div>
          </button>

          <button
            onClick={() => setMethod('qr')}
            className="kiosk-card w-full flex items-center gap-3 p-4 hover:border-primary/50 active:scale-[0.97] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{t('id.qrLabel')}</p>
              <p className="text-xs text-muted-foreground">{t('id.qr')}</p>
            </div>
          </button>

          <button
            onClick={() => setMethod('pin')}
            className="kiosk-card w-full flex items-center gap-3 p-4 hover:border-primary/50 active:scale-[0.97] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <Hash className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{t('id.pinLabel')}</p>
              <p className="text-xs text-muted-foreground">{t('id.pin')}</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // NFC
  if (method === 'nfc') {
    const handleNfcTap = () => {
      if (nfcProcessing) return;
      setNfcProcessing(true);
      setProcessing(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    };

    return (
      <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
        <button onClick={() => setMethod(null)} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
          <ArrowLeft className="w-4 h-4" /> {t('id.back')}
        </button>
        <h1 className="text-xl font-bold text-center">{t('id.nfcLabel')}</h1>
        <p className="text-muted-foreground text-center text-sm">{t('id.nfc')}</p>

        <div className="flex-1 flex flex-col items-center justify-center">
          {nfcProcessing ? (
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
  }

  // QR
  if (method === 'qr') {
    return (
      <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
        <button onClick={() => setMethod(null)} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
          <ArrowLeft className="w-4 h-4" /> {t('id.back')}
        </button>
        <h1 className="text-xl font-bold text-center">{t('id.qrLabel')}</h1>
        <p className="text-muted-foreground text-center text-sm">{t('id.qr')}</p>

        <div className="flex-1 flex flex-col items-center justify-center">
          <button onClick={onSuccess} className="active:scale-95 transition-transform">
            <QrCode className="w-40 h-40 text-foreground" />
          </button>
        </div>
      </div>
    );
  }

  // PIN
  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto w-full">
      <button onClick={() => { setMethod(null); setPin(''); }} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>
      <h1 className="text-xl font-bold text-center">{t('id.pinLabel')}</h1>
      <p className="text-muted-foreground text-center text-sm">{t('id.enterPin')}</p>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2 my-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all ${
              i < pin.length ? 'border-primary bg-primary/10 text-primary' : 'border-border'
            }`}>
              {i < pin.length ? '•' : ''}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto w-full">
        <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] mx-auto">
          {['1','2','3','4','5','6','7','8','9'].map(d => (
            <button key={d} onClick={() => addDigit(d)} className="h-12 rounded-xl bg-muted text-base font-bold active:scale-90 active:bg-primary/10 transition-all">
              {d}
            </button>
          ))}
          <button onClick={() => setPin('')} className="h-12 rounded-xl bg-muted text-xs font-semibold text-muted-foreground active:scale-90 transition-all">
            {t('id.clear')}
          </button>
          <button onClick={() => addDigit('0')} className="h-12 rounded-xl bg-muted text-base font-bold active:scale-90 active:bg-primary/10 transition-all">
            0
          </button>
          <button onClick={handlePinSubmit} className="h-12 rounded-xl bg-primary text-primary-foreground text-xs font-bold active:scale-90 transition-all">
            {t('id.submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentificationScreen;
