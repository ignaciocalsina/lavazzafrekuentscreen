import { useState } from 'react';
import { useApp, getInsurancePrice } from '@/context/AppContext';
import { ArrowLeft, Delete } from 'lucide-react';

const PaymentAmountScreen = () => {
  const { t, navigate, goHome, setPaymentAmount } = useApp();
  const [raw, setRaw] = useState('');

  const append = (d: string) => {
    if (raw.length >= 7) return;
    setRaw(prev => (prev + d).replace(/^0+/, ''));
  };
  const back = () => setRaw(prev => prev.slice(0, -1));
  const clear = () => setRaw('');

  const cents = parseInt(raw || '0', 10);
  const amount = cents / 100;
  const display = amount.toFixed(2).replace('.', ',');

  const handleContinue = () => {
    if (amount <= 0) return;
    setPaymentAmount(amount);
    navigate(getInsurancePrice(amount) > 0 ? 'payment_insurance' : 'payment_pay');
  };

  const Key = ({ label, onClick, className = '' }: { label: React.ReactNode; onClick: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`h-9 rounded-md bg-card border border-border text-base font-semibold active:scale-95 active:bg-primary/10 transition-all ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: amount display + continue */}
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-sm font-bold text-center">{t('payment.amount.title')}</h1>
          <p className="text-5xl font-extrabold text-primary tabular-nums leading-none">€{display}</p>
          <p className="text-[10px] text-muted-foreground text-center">{t('payment.amount.placeholder')}</p>
          <p className="text-[10px] text-muted-foreground/80 text-center px-2">{t('payment.amount.insuranceHint')}</p>
          <button
            onClick={handleContinue}
            disabled={amount <= 0}
            className="kiosk-button bg-primary text-primary-foreground rounded-xl disabled:opacity-50 mt-1"
          >
            {t('payment.amount.continue')}
          </button>
        </div>

        {/* Right: keypad */}
        <div className="grid grid-cols-3 gap-1.5 content-center">
          {['1','2','3','4','5','6','7','8','9'].map(d => (
            <Key key={d} label={d} onClick={() => append(d)} />
          ))}
          <Key label="C" onClick={clear} className="text-destructive" />
          <Key label="0" onClick={() => append('0')} />
          <Key label={<Delete className="w-4 h-4 mx-auto" />} onClick={back} />
        </div>
      </div>
    </div>
  );
};

export default PaymentAmountScreen;
