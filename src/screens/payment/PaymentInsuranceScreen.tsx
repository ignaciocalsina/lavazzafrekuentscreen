import { useApp, getInsurancePrice } from '@/context/AppContext';
import { ArrowLeft, ShieldCheck, ShieldOff } from 'lucide-react';

const PaymentInsuranceScreen = () => {
  const { t, navigate, paymentAmount, setPaymentInsurance } = useApp();
  const insurance = getInsurancePrice(paymentAmount);
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const choose = (withInsurance: boolean) => {
    setPaymentInsurance(withInsurance ? insurance : 0);
    navigate('payment_pay');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={() => navigate('payment_amount')} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: summary */}
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          <h1 className="text-base font-bold leading-tight">{t('payment.insurance.title')}</h1>
          <p className="text-[10px] text-muted-foreground">{t('payment.insurance.subtitle')}</p>
          <p className="text-3xl font-extrabold text-primary tabular-nums">€{fmt(paymentAmount)}</p>
        </div>

        {/* Right: options */}
        <div className="flex flex-col gap-2 justify-center">
          <button
            onClick={() => choose(true)}
            className="kiosk-card flex items-center gap-2 p-3 hover:border-primary/50 active:bg-primary/5 transition-colors"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-success/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-success" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col items-start text-left leading-tight">
              <span className="text-sm font-semibold">{t('payment.insurance.add')}</span>
              <span className="text-[10px] text-muted-foreground">+€{fmt(insurance)} · {t('payment.insurance.annual')}</span>
            </div>
          </button>

          <button
            onClick={() => choose(false)}
            className="kiosk-card flex items-center gap-2 p-3 hover:border-primary/50 active:bg-primary/5 transition-colors"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-muted flex items-center justify-center">
              <ShieldOff className="w-6 h-6 text-muted-foreground" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col items-start text-left leading-tight">
              <span className="text-sm font-semibold">{t('payment.insurance.skip')}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInsuranceScreen;
